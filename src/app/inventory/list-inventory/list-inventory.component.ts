import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FileTrackService } from 'src/app/services/file-track-service/file-track.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.css']
})
export class ListInventoryComponent implements OnInit{

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "View"
  buttonLabel2: string= "Add"
  buttonLabel3: string= "Delete"
  buttonColor: string = "primary"
  buttonColor2: string = "warn"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  inventorylist : any = []
  displayedColumns: any = []
  imageArr: any = []
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private fileTrackServ: FileTrackService,
    private commonServ: CommonService,
    private sanitizer: DomSanitizer,

  ){
    this.titleService.setTitle("List of Inventory");
  }

  ngOnInit(): void {
    this.loadInventory()
  }

  loadInventory(){
    this.commonServ.getAllInventory().subscribe({
      next: (data) => {
        if(data.length==0){
          this.message="No inventory"
          this.openSnackBar
        }else{
          this.inventorylist = data
          this.displayedColumns = [ 'Serial','name','quantity','picture','action']
          for(let i = 0;i<data.length;i++)
          this.loadPhoto(data[i].picture)
        }
      },
      error: (e) => {
        this.message = "Error occurred"
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
  
  delete(id: any){
    this.commonServ.deleteInventory(id).subscribe({
      next: (data) => {
        if(data==true){
          this.message="Successfully deleted"
          this.openSnackBar()
          this.loadInventory()
        }else{
          this.message="Couldn't delete"
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = "Error occurred"
        this.openSnackBar()
      }
    })
  }

  loadPhoto(url: string){
    let temp = url.split("\\")
    console.log(temp)
    if(temp.length){
      console.log(temp[temp.length-1])
      this.commonServ.loadPhoto(temp[temp.length-1]).subscribe({
        next: (data) => {
         // console.log(data)
          //const fileURL = URL.createObjectURL(data);
          let temp = data
          let objectURL = URL.createObjectURL(temp)
          let obj = {path: url, img: this.sanitizer.bypassSecurityTrustUrl(objectURL)}
          this.imageArr.push(obj)
          // obj.path = url
          // return this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
        },
        error: (e) => {
          alert("File loading Failed!")
          console.log(e)
        } 
      })
    }else alert("file not found")
  }

  findPhoto(url: any){
    console.log(this.imageArr)
    for(let i=0;i<this.imageArr.length;i++){
      if(this.imageArr[i].path==url){
        return this.imageArr[i].img
      }
      
    }
  }

}
