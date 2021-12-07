import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalinfoBoxComponent } from './originalinfo-box.component';

describe('OriginalinfoBoxComponent', () => {
  let component: OriginalinfoBoxComponent;
  let fixture: ComponentFixture<OriginalinfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginalinfoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalinfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
