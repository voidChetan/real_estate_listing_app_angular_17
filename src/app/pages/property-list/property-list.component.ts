import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {

  isListView: boolean = true;

  propertyObj: any = {
    "propertyId": 0,
    "title": "",
    "description": "",
    "propertyType": "",
    "address": "",
    "city": "",
    "state": "",
    "pincode": "",
    "agentId": 0,
    "price": 0,
    "createdDate": new Date(),
    "thumbnailImage": "",
    "RealPropertyImages": [ ]
  }
  propertyList: any [] = [];

  masterService= inject(MasterService)
  loggedUserData: any;

  ngOnInit(): void {
    const localData= localStorage.getItem('realUser');
    if(localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.propertyObj.agentId = this.loggedUserData.userId;
    }
    this.getAllProperty();
  }

 
  getAllProperty() {
    this.masterService.GetAllProperty().subscribe((res:any)=> {
      const allList =  res.data;
      this.propertyList = allList.filter((m:any) => m.agentId == this.loggedUserData.userId) 
    })
  }
 
  createProperty() {
    this.masterService.addProperty(this.propertyObj).subscribe((res:any)=> {
      if(res.result) {
        alert('Property Created Succesfully')
        this.getAllProperty();
      } else {
        alert(res.message)
      }
    })
  }

  updateProperty() {
    this.masterService.updateProperty(this.propertyObj).subscribe((res:any)=> {
      if(res.result) {
        alert('Property Updated Succesfully')
        this.getAllProperty();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id:number) {
    const siDelete= confirm("Are you sure want to delete");
    if(siDelete)  {
      this.masterService.deletProperty(id).subscribe((res:any)=> {
        if(res.result) {
          alert('Property Delete Succesfully')
          this.getAllProperty();
        } else {
          alert(res.message)
        }
      })
    }
  }

  onedit(data:any) {
    this.propertyObj =  data;
    this.isListView = false;
  }
}
