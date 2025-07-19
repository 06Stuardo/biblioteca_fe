import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlReportsComponent } from './etl-reports.component';

describe('EtlReportsComponent', () => {
  let component: EtlReportsComponent;
  let fixture: ComponentFixture<EtlReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtlReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtlReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
