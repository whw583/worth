import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRankByCountryComponent } from './report-rank-by-country.component';

describe('ReportRankByCountryComponent', () => {
  let component: ReportRankByCountryComponent;
  let fixture: ComponentFixture<ReportRankByCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRankByCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRankByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
