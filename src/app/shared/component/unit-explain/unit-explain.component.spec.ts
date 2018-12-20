import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitExplainComponent } from './unit-explain.component';

describe('UnitExplainComponent', () => {
  let component: UnitExplainComponent;
  let fixture: ComponentFixture<UnitExplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitExplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitExplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
