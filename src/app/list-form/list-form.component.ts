import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  createUserData:any = []
  ageGroupFinder:any = "";
  ageGroup :any = [
    {
      id:0,
      name:"10-15",
      dateRange:[10,11,12,13,14,15]
    },
    {
      id: 1,
      name: "16-20",
      dateRange: [16, 17, 18, 19, 20]
    },
    {
      id: 2,
      name: "20-25",
      dateRange: [20, 21, 22, 23, 24, 25]
    }
  ]
  originalUserData:any = [];
  constructor() { }

  ngOnInit(): void {
    this.createUserData = JSON.parse(localStorage.getItem('createUserData'))
    console.log(this.createUserData)
    this.originalUserData = this.createUserData
  }

  submit() {

    console.log(this.createUserData)
    var filterData = []
    for(var i = 0,l = this.createUserData.length;i< l ;i++){
      if (this.ageGroup[this.ageGroupFinder].dateRange.includes(this.createUserData[i].age)) {
        console.log("this.createUserData[i]==>",this.createUserData[i])
        filterData.push(this.createUserData[i])
        console.log(this.createUserData)
      }
      if(filterData.length){
        this.createUserData = [];
        this.createUserData = filterData
      }
    }
  }

  reset(){
    window.location.reload()
  }
}
