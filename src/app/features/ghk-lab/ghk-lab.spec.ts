import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhkLab } from './ghk-lab';

describe('GhkLab', () => {
  let component: GhkLab;
  let fixture: ComponentFixture<GhkLab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhkLab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhkLab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
