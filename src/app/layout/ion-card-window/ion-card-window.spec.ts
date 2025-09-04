import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonCardWindow } from './ion-card-window';

describe('IonCardWindow', () => {
  let component: IonCardWindow;
  let fixture: ComponentFixture<IonCardWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonCardWindow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IonCardWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
