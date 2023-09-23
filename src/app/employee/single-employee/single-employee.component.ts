import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ActivatedRoute,Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  employee: any = []
  message : string = ""
  buttonLabel: string = "View"
  buttonColor: string = "primary"
  buttonType: string = "button"
  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private employeeServ: EmployeeService,
    private _snackBar: MatSnackBar,
  ){
    this.titleService.setTitle("Single Employee");
  }

  ngOnInit(): void{

    this
    .route
    .queryParams
    .subscribe(paramsg=>{
      let id = paramsg['id']
      if(id!=""){
        this.employeeServ.singleEmployee(id).subscribe({
          next: (data) => {
            //console.log(data)
            if(data.employeeId!=undefined){
              this.employee = data
            }
            else{ 
              this.message = "Information not found!"
              this.openSnackBar()
            }
          },
          error: (e) => {
           
              this.message = "Error occurred! Please try again!"
              this.openSnackBar()
          }
        })
        
      }else{
        this.message = "No id found!"
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

}
