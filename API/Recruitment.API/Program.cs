using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Portfolio.API.Errors;
using Recruitment.Domain.Entities;
using Recruitment.Domain.IRepositories;
using Recruitment.Persistence;
using Recruitment.Repository.Common;
using Recruitment.Repository.JobTitles;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

ConfigurationManager configuration = builder.Configuration;

builder.Services.AddDbContext<RecruitmentDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("default")));
builder.Services.Configure<IISOptions>(options =>
{
    options.AutomaticAuthentication = false;
    options.ForwardClientCertificate = false;
});

#region DI

builder.Services.AddScoped<IRecruitmentDbContext, RecruitmentDbContext>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IJobTitleRepository, JobTitleRepository>();

#endregion DI

#region Authorization

builder.Services.AddIdentity<User, ApplicationRole>(options =>
{
    options.Password.RequiredLength = 6;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.User.RequireUniqueEmail = true;
    options.Lockout.DefaultLockoutTimeSpan =
        TimeSpan.FromMinutes(Convert.ToInt32(configuration["Tokens:accessFailedWaitingMin"]));
    options.Lockout.MaxFailedAccessAttempts = Convert.ToInt32(configuration["Tokens:accessFailedCount"]);
}
).AddDefaultTokenProviders().AddEntityFrameworkStores<RecruitmentDbContext>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("EndUser", policy => policy.RequireRole("EndUser"));
});

#endregion Authorization

#region token

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt =>
{
    jwt.RequireHttpsMetadata = false;
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:SecretKey"])),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidIssuer = configuration["Jwt:Issuer"],
        ValidAudience = configuration["Jwt:Issuer"],
        ClockSkew = TimeSpan.Zero
    };
});

#endregion token

#region JsonSerializaerModifications

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
});

#endregion JsonSerializaerModifications

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1");
        c.RoutePrefix = string.Empty;
        c.DisplayRequestDuration();
    });

    app.UseSwagger();
}
else
{
    app.UseHsts();
}

app.UseAuthentication();
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.ConfigureCustomExceptionMiddleware();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
});

app.MapControllers();

app.Run();