import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormUser } from './modal-form-user';

describe('ModalFormUser', () => {
  let component: ModalFormUser;
  let fixture: ComponentFixture<ModalFormUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
