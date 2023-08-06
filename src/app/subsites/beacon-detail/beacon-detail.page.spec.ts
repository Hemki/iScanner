import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeaconDetailPage } from './beacon-detail.page';

describe('BeaconDetailPage', () => {
  let component: BeaconDetailPage;
  let fixture: ComponentFixture<BeaconDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeaconDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
