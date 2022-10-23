import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleItemComponent } from './job-title-item.component';

describe('JobTitleItemComponent', () => {
  let component: JobTitleItemComponent;
  let fixture: ComponentFixture<JobTitleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTitleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
