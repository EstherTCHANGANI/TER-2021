import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreemapsComponent } from './treemaps.component';

describe('TreemapsComponent', () => {
  let component: TreemapsComponent;
  let fixture: ComponentFixture<TreemapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreemapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
