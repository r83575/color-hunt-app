import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaletteComponent } from './create-palette.component';

describe('CreatePaletteComponent', () => {
  let component: CreatePaletteComponent;
  let fixture: ComponentFixture<CreatePaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePaletteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
