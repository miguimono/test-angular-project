import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSummaryComponent } from './client-summary.component';

describe('ClientSummaryComponent', () => {
  let component: ClientSummaryComponent;
  let fixture: ComponentFixture<ClientSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
