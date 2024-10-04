import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [],
  templateUrl: './enquiries.component.html',
  styleUrl: './enquiries.component.css'
})
export class EnquiriesComponent implements OnInit {

  loggedUserData: any;
  masterService = inject(MasterService);
  enqurryList: any []=[];
  ngOnInit(): void {
    const localData= localStorage.getItem('realUser');
    if(localData != null) {
      this.loggedUserData = JSON.parse(localData)
    }
    this.getEnquiry()
  }

  getEnquiry() {
    this.masterService.getEnquiryByAgentId(this.loggedUserData.userId).subscribe((res:any)=>{
      this.enqurryList =  res.data;
    })
  }
}
