import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "userName": "",
    "password": ""
  }

  masterService = inject(MasterService)
  router= inject(Router)
  onLogin() {
    this.masterService.login(this.loginObj).subscribe((res:any)=>{
      if(res.result) {
        alert("Login Success");
        localStorage.setItem('realUser',JSON.stringify(res.data));
        this.masterService.onLogin$.next(true);
        this.router.navigateByUrl('/home')
      } else {
        alert(res.message)
      }
    })
  }
}
