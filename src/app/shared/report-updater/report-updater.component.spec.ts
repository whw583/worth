import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUpdaterComponent } from './report-updater.component';

describe('ReportUpdaterComponent', () => {
  let component: ReportUpdaterComponent;
  let fixture: ComponentFixture<ReportUpdaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUpdaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
