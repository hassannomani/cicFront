import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-file-track',
  templateUrl: './add-file-track.component.html',
  styleUrls: ['./add-file-track.component.css']
})
export class AddFileTrackComponent implements OnInit{

  addFileTrackDetails = new FormGroup({
    'taxpayername':  new FormControl(''),
    'fileno':  new FormControl(''),
    'tin':  new FormControl(''),
    'bin':  new FormControl(''),
    'nid':  new FormControl(''),
    'customshouse':  new FormControl(''),
    'lcstation':  new FormControl(''),
    'rackno':  new FormControl(''),
    'storagedate':  new FormControl(''),
    'jurisdiction':  new FormControl(''),
    'details':  new FormControl(''),
    'status':  new FormControl(''),
    'classification': new FormControl('')
  })

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Submit"
  buttonLabel2: string= "Add"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dirty: boolean = false
  allHouses: any =[]
  allLCStations: any = []
  allJurisdictions: any = []
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private commonServ: CommonService,
    private fileTrackServ: FileTrackService,
  ){
    this.titleService.setTitle("Add to File Track");
  }

  ngOnInit(): void {
    
    forkJoin([
      this.commonServ.getHouses(),
      this.commonServ.getlcstations(),
      this.commonServ.getJurisdictions()
    ])
    .subscribe({
      next: (data) => {
        //console.log(data)
        this.allHouses = data[0];
        this.allLCStations = data[1];
        this.allJurisdictions = data[2]
      },
      error: (e) => {
       
          console.log("Error retrieving")
      }
    });

  }

  saveFileTrackDetails(){
    this.addFileTrackDetails.value['status']='1'
    this.fileTrackServ.addFileTrack(this.addFileTrackDetails.value).subscribe({
      next: (data) => {
        //console.log(data)
        if(data?.taxfileuuid){
          this.message = "File Added successfully"
          this.addFileTrackDetails.reset()
          this.openSnackBar()
        }
        else{
          this.message= "Failed to save file"
          this.openSnackBar()
        }
      },
      error: (e) => {
       this.message = "Error ocurred!"
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
