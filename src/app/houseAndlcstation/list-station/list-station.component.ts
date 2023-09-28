import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-station',
  templateUrl: './list-station.component.html',
  styleUrls: ['./list-station.component.css']
})
export class ListStationComponent implements OnInit {
  addlcstation = new FormGroup({
    'name':  new FormControl('',[Validators.required]),
  })
  displayedColumns: any =[]
  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Add"
  buttonLabel2: string= "Delete"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  lcstations : any = []
  noData : boolean = false
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Add LC Station");
  }

  ngOnInit(): void {
    this.loadlcstations()
   }
 
   addlcstationfunc(){
     this.commonServ.addlcstation(this.addlcstation.value).subscribe({
       next: (data) => {
         if(data?.name){
           this.loadlcstations()
           this.addlcstation.reset()
         }
         
       },
       error: (e) => {
        this.message = "Error adding data"
        this.openSnackBar()
       }
     })
   }
 
   loadlcstations(){
     this.commonServ.getlcstations().subscribe({
       next: (data) => {
         if(data.length){
           this.lcstations = data
           this.displayedColumns = [ 'id','name','action']  
         }else{
           this.displayedColumns = [ 'id','name','action']  
           this.noData = true
         }
         
       },
       error: (e) => {
        this.message = "Error fetching data"
        this.openSnackBar()
       }
      })
   }
 
   delete(id: any){
     this.commonServ.deletelcstation(id).subscribe({
       next: (data) => {
         if(data==true){
           this.loadlcstations()
         }else{
           this.message = "Failed to delete"
           this.openSnackBar()
         }
       },
      error: (e) => {
        this.message = "Error deleting"
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
