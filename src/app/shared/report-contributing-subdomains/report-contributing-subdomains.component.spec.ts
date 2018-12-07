import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportContributingSubdomainsComponent } from './report-contributing-subdomains.component';

describe('ReportContributingSubdomainsComponent', () => {
  let component: ReportContributingSubdomainsComponent;
  let fixture: ComponentFixture<ReportContributingSubdomainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportContributingSubdomainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportContributingSubdomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
