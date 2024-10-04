import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

 
  propertyList: any[]=[];
  masterService=  inject(MasterService);
  enquiryObj: any = {
    "enquiryId": 0,
    "userId": 0,
    "propertyId": 0,
    "enquiryMessage": "",
    "enquiryDate":  new Date()
  }
  loggedUserData: any;
  loader: boolean = true;

  ngOnInit(): void {
    this.getAllProperties();
    const localData= localStorage.getItem('realUser');
    if(localData != null) {
      this.loggedUserData = JSON.parse(localData)
      this.enquiryObj.userId =  this.loggedUserData.userId;
    }
  }

  getAllProperties() {
    this.masterService.GetAllProperty().subscribe((res:any)=>{
      this.propertyList = res.data;
      this.loader = false;
    })
  }

  openEnqueryModel(id: number) {
    if(this.enquiryObj.userId !== 0) {
      this.enquiryObj.propertyId = id;
      const model= document.getElementById('myModal');
      if(model  != null) {
        model.style.display = 'block'
      }
    } else {
      alert('Please Login First')
    }
    
  }
 closeEnqueryModel() {
    const model= document.getElementById('myModal');
    if(model  != null) {
      model.style.display = 'none'
    }
  }

  makeEnquery() {
    if(this.enquiryObj.userId !== 0) {
      this.masterService.makeEnquery(this.enquiryObj).subscribe((res:any)=>{
        if(res.result) {
          alert('Enquiery Sent Success')
          this.closeEnqueryModel();
        } else {
          alert(res.message)
        }
      })
    } else {
      alert('Please Login First')
    }
   
  }
}
