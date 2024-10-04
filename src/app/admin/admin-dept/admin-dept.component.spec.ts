import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeptComponent } from './admin-dept.component';

describe('AdminDeptComponent', () => {
  let component: AdminDeptComponent;
  let fixture: ComponentFixture<AdminDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
