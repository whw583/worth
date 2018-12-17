import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdRevenueComponent } from './report-ad-revenue.component';

describe('ReportAdRevenueComponent', () => {
  let component: ReportAdRevenueComponent;
  let fixture: ComponentFixture<ReportAdRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAdRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAdRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
