import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePaletteComponent } from './one-palette.component';

describe('OnePaletteComponent', () => {
  let component: OnePaletteComponent;
  let fixture: ComponentFixture<OnePaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnePaletteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
