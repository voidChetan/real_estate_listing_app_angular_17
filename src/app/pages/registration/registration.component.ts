import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registerObj: any =  {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate": new Date(),
    "password": "",
    "projectName": ""
  };
  isAgent: boolean = false;

  masterService = inject(MasterService);
  router= inject(Router)

  onRegister() {
    if(this.isAgent) {
      this.masterService.addAgent(this.registerObj).subscribe((res:any)=>{
        if(res.result) {
          alert('Registration Success');
          this.router.navigateByUrl('/login')
        }
      })
    } else {
      this.masterService.addCustomer(this.registerObj).subscribe((res:any)=>{
        if(res.result) {
          alert('Registration Success');
          this.router.navigateByUrl('/login')
        }
      })
    }
  }
}
