import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadbandCroboraComponent } from './headband-crobora.component';

describe('HeadbandCroboraComponent', () => {
  let component: HeadbandCroboraComponent;
  let fixture: ComponentFixture<HeadbandCroboraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadbandCroboraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadbandCroboraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
