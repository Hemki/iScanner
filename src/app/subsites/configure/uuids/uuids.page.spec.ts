import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UuidsPage } from './uuids.page';

describe('UuidsPage', () => {
  let component: UuidsPage;
  let fixture: ComponentFixture<UuidsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UuidsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
