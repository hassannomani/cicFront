import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { FileTrackService } from 'src/app/services/file-track-service/file-track.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { forkJoin } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent {

  addInventory = new FormGroup({
    'name':  new FormControl('',[Validators.required]),
    'quantity':  new FormControl('',[Validators.required]),
    'picture':  new FormControl('',[Validators.required]),
    'file': new FormControl(File,[Validators.required])
  })

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Upload"
  buttonLabel2: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  photoUploaded: boolean = false

  photo!: File;
  @ViewChild('fileInput', { static: true }) fileInput?: ElementRef;


  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private commonServ: CommonService,
    private fileTrackServ: FileTrackService,
  ){
    this.titleService.setTitle("Add Inventory");
  }

  saveInventory(){
    this.commonServ.addInventory(this.addInventory.value).subscribe({
      next: (data) => {
        if(data.inventoriid){
          this.message = "Successfully added"
          if(this.fileInput)
            this.fileInput.nativeElement.value = ""
          this.addInventory.reset()
          this.photoUploaded = false
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = "Error occurred"
        this.openSnackBar()
      }
    })
  }

  selectFile(event: any){
    this.photo = event.target.files.item(0);
  }

  uploadPhoto() {
    this.commonServ.uploadPhoto(this.photo).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.addInventory.get('picture')?.setValue(data.fileUri);
          this.photoUploaded = true
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
}
