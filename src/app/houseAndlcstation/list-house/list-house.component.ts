import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit{
  addhouse = new FormGroup({
    'name':  new FormControl('',[Validators.required]),
  })

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Add"
  buttonLabel2: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  houses : any = []

  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Add Customs House");
  }

  ngOnInit(): void {
   this.loadhouses()
  }

  addHouse(){
    this.commonServ.addHouse(this.addhouse.value).subscribe({
      next: (data) => {
        if(data?.name){
          this.loadhouses
        }
        
      },
      error: (e) => {
       console.log(e)
      }
    })
  }

  loadhouses(){
    this.commonServ.getHouses().subscribe({
      next: (data) => {
  
        console.log(data)
      },
      error: (e) => {
       console.log(e)
      }
     })
  }

}
