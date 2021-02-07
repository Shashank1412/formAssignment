import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  redirectTo = '/list';
  createForm: FormGroup;
  createUserData:any = []
  editMode = {
    id: null,
    data: null,
    status: null
  }
  submitted = false;
  params;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router:Router) {
    this.params = this.route.paramMap.subscribe(params => {
      let routeParam = params['params'];
      this.editMode.id = routeParam['id'];
      this.editMode.status = this.editMode.id != null ? true : false;
    });
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: [''],
      number: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
    })
    if(this.editMode.status){
      this.activateEditMode()
    } else {
      let record = localStorage.getItem('createUserData')
      record = JSON.parse(record)
      console.log(record)
      if(record != null) {
        for(let i = 0,l = record.length;i<l;i++){
          this.createUserData.push(record[i])
          console.log("====>", record[i])
        }
        console.log(this.createUserData)
      }
    }
  }

  get f() { return this.createForm.controls; }


  activateEditMode() {
    let editData = JSON.parse(localStorage.getItem('createUserData'))
    for(let i = 0,l = editData.length;i<l;i++){
      if(editData[i].id == this.editMode.id){
        this.editMode.data = editData[i]
      } else {
        this.createUserData.push(editData[i])
      }
    }
    console.log("this.data==>",this.editMode.data)
    this.createForm.addControl('id', this.formBuilder.control(this.editMode.data.id, Validators.required));
    for (let key in this.f) {
      console.log(key, this.editMode.data[key])
      this.f[key].setValue(this.editMode.data[key])
    }
  }
  ageCalculate(date){
    let dateFormat = new Date(date);
    var dob = new Date(date);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  }

  createUser() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    if(this.editMode.status){
      this.createForm.addControl('id', this.formBuilder.control(this.editMode.id, Validators.required));
      this.f.age.setValue(this.ageCalculate(this.createForm.value.dateOfBirth))
      this.createUserData.push(Object.assign({}, this.createForm.getRawValue()));
      localStorage.setItem('createUserData', JSON.stringify(this.createUserData))
      console.log(localStorage.getItem('createUserData'))
      this.router.navigate([this.redirectTo]);
    } else {
      this.createForm.addControl('id', this.formBuilder.control(this.createUserData.length+1, Validators.required));
      this.f.age.setValue(this.ageCalculate(this.createForm.value.dateOfBirth))
      this.createUserData.push(Object.assign({}, this.createForm.getRawValue()));
      localStorage.setItem('createUserData', JSON.stringify(this.createUserData))
      console.log(localStorage.getItem('createUserData'))
      this.router.navigate([this.redirectTo]);
    }
    console.log(this.createUserData)
  }
}
