import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExplainComponent } from './report-explain.component';

describe('ReportExplainComponent', () => {
  let component: ReportExplainComponent;
  let fixture: ComponentFixture<ReportExplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
