import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  employeeList: any[] = []
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "View"
  buttonLabel1: string = "Search"
  buttonColor: string = "primary"
  buttonType: string = "button"
  searchForm = new FormGroup({
    'name' : new FormControl('',[Validators.required]),
    'batch' : new FormControl('',[Validators.required]),
    'courseName' : new FormControl('',[Validators.required]),
    'courseCountry' : new FormControl('',[Validators.required]),
    'subject' : new FormControl('',[Validators.required]),
    'courseCount' : new FormControl('',[Validators.required]),
    'courseYear' : new FormControl('',[Validators.required]),
    'category': new FormControl('',[Validators.required]),
  })
  category : any =[
    "Customs",
    "VAT",
    "IT",
    "Others"
  ]
  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private employeeServ: EmployeeService,
    private _snackBar: MatSnackBar,
  ){
    this.titleService.setTitle("List of Employees");
  }

  ngOnInit(): void{
    this.employeeServ.listEmployees().subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
          this.message = "Error occurred! Please try again!"
          this.openSnackBar()
      }
    })
  
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  view(lid: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['employee'],{ queryParams: {id: lid}});
    }); 
    console.log(lid)
  }

  responseNonError(data: any){
    //if(data.length){
      this.employeeList = data
      this.displayedColumns = [ 'name','rank','dateJoining','courseCount','homeDistrict','batch','action']
    // }
    // else{
    //   this.message = "No Employees found"
    //   this.openSnackBar()
    // }
  }

  responseError(){
    this.message = "Error occurred! Please try again!"
    this.openSnackBar()
  }

  employeeSearch(){
    let name = this.searchForm.value["name"]
    let batch = this.searchForm.value["batch"]
    let courseName = this.searchForm.value["courseName"]
    let courseCountry = this.searchForm.value["courseCountry"]
    let subject = this.searchForm.value["subject"]
    let courseCount = this.searchForm.value["courseCount"]
    let courseYear = this.searchForm.value["courseYear"]
    let category = this.searchForm.value["category"]
    if(name!="")
      this.getEmployeeByName(name) 
    else if(batch!="")
      this.getEmployeeByBatch(batch) 
    else if(courseName!="")
      this.getEmployeeByCourseName(courseName)
    else if(courseCountry!="")
      this.getEmployeeByCourseCountry(courseCountry)  
    else if(courseCount!="")
      this.getEmployeeByCourseCount(courseCount)  
    else if(subject!="")
      this.getEmployeeBySubject(subject)  
    else if(category!="")
      this.getEmployeeByCategory(category)
    else if(courseYear!="")
      this.getEmployeeByCourseYear(courseYear)

  }

  getEmployeeByName(name: any){
    this.employeeServ.findName(name).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })
  }

  getEmployeeByBatch(batch: any){
    this.employeeServ.findBatch(batch).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })
  }

  getEmployeeByCourseName(coursname: any){
    this.employeeServ.findCourse(coursname).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })
  }

  getEmployeeByCourseCountry(courseCountry: any){
    this.employeeServ.findCourseCountry(courseCountry).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })
  }
  getEmployeeBySubject(subject: any){
    this.employeeServ.findSubject(subject).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })
  }

  getEmployeeByCourseCount(count: any){
    this.employeeServ.findCourseCount(count).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })
  }

  getEmployeeByCategory(category: any){
    this.employeeServ.findCourseCategory(category).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })
  }

  getEmployeeByCourseYear(courseYear: any){

    this.employeeServ.findCourseYear(courseYear).subscribe({
      next: (data) => {
        this.responseNonError(data)
      },
      error: (e) => {
        this.responseError()
      }
    })

  }

}


