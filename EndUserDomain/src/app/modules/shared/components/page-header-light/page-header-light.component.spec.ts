import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderLightComponent } from './page-header-light.component';

describe('PageHeaderLightComponent', () => {
  let component: PageHeaderLightComponent;
  let fixture: ComponentFixture<PageHeaderLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
