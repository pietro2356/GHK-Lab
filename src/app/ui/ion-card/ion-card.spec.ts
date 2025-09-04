import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonCard } from './ion-card';

describe('IonCard', () => {
  let component: IonCard;
  let fixture: ComponentFixture<IonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IonCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
