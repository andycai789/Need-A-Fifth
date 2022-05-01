import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserValueComponent } from './user-value.component';

describe('UserValueComponent', () => {
  let component: UserValueComponent;
  let fixture: ComponentFixture<UserValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
