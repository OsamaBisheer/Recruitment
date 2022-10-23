import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitlesListComponent } from './job-titles-list.component';

describe('JobTitlesListComponent', () => {
  let component: JobTitlesListComponent;
  let fixture: ComponentFixture<JobTitlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTitlesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
