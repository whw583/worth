import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAlexaRankComponent } from './report-alexa-rank.component';

describe('ReportAlexaRankComponent', () => {
  let component: ReportAlexaRankComponent;
  let fixture: ComponentFixture<ReportAlexaRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAlexaRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAlexaRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
