import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedUserComponent } from './ranked-user.component';

describe('RankedUserComponent', () => {
  let component: RankedUserComponent;
  let fixture: ComponentFixture<RankedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
