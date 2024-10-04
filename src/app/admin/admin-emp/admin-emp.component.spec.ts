import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmpComponent } from './admin-emp.component';

describe('AdminEmpComponent', () => {
  let component: AdminEmpComponent;
  let fixture: ComponentFixture<AdminEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
