import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailsBoxComponent } from './thumbnails-box.component';

describe('ThumbnailsBoxComponent', () => {
  let component: ThumbnailsBoxComponent;
  let fixture: ComponentFixture<ThumbnailsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailsBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
