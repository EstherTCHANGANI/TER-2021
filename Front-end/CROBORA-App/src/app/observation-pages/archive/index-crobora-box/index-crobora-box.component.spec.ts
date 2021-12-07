import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCROBORABoxComponent } from './index-crobora-box.component';

describe('IndexCROBORABoxComponent', () => {
  let component: IndexCROBORABoxComponent;
  let fixture: ComponentFixture<IndexCROBORABoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCROBORABoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCROBORABoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
