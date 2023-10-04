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
  selector: 'app-edit-file-track',
  templateUrl: './edit-file-track.component.html',
  styleUrls: ['./edit-file-track.component.css']
})
export class EditFileTrackComponent implements OnInit{

  editFileTrackDetails = new FormGroup({
    'taxfileuuid' :  new FormControl('',[Validators.required]),
    'taxpayername':  new FormControl('',[Validators.required]),
    'fileno':  new FormControl('',[Validators.required]),
    'tin':  new FormControl('',[Validators.required]),
    'bin':  new FormControl('',[Validators.required]),
    'nid':  new FormControl('',[Validators.required]),
    'customshouse':  new FormControl('',[Validators.required]),
    'lcstation':  new FormControl('',[Validators.required]),
    'rackno':  new FormControl('',[Validators.required]),
    'storagedate':  new FormControl('',[Validators.required]),
    'jurisdiction':  new FormControl('',[Validators.required]),
    'details':  new FormControl('',[Validators.required]),
    'status':  new FormControl('',[Validators.required]),
    'classification':  new FormControl('',[Validators.required])
  })

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Go back"
  buttonLabel2: string= "Add"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  fileTrack : any = {}
  allHouses: any = []
  allLCStations: any =[]
  allJurisdictions: any =[]
  id: any= ""
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private fileTrackServ: FileTrackService,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Edit File Track");
  }

  ngOnInit(): void {
    this
    .actroute
    .queryParams
    .subscribe(paramsg=>{
      let id = paramsg['id']
      this.id = id
      if(id!=""){
        forkJoin([
          this.commonServ.getHouses(),
          this.commonServ.getlcstations(),
          this.fileTrackServ.getAFileTrack(id),
          this.commonServ.getJurisdictions()
        ])
        .subscribe({
          next: (data) => {
            //console.log(data)
            this.allHouses = data[0];
            this.allLCStations = data[1];
            this.fileTrack = data[2]
            this.allJurisdictions = data[3]
            this.fillupData()
          },
          error: (e) => {
           
            this.message = "Error occurred! Please try again!"
            this.openSnackBar()
          }
        });
        
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

  fillupData(){
    this.editFileTrackDetails.get('taxfileuuid')?.setValue(this.fileTrack.taxfileuuid)
    this.editFileTrackDetails.get('taxpayername')?.setValue(this.fileTrack.taxpayername)
    this.editFileTrackDetails.get('fileno')?.setValue(this.fileTrack.fileno)
    this.editFileTrackDetails.get('tin')?.setValue(this.fileTrack.tin)
    this.editFileTrackDetails.get('bin')?.setValue(this.fileTrack.bin)
    this.editFileTrackDetails.get('nid')?.setValue(this.fileTrack.nid)
    this.editFileTrackDetails.get('customshouse')?.setValue(this.fileTrack.customshouse)
    this.editFileTrackDetails.get('lcstation')?.setValue(this.fileTrack.lcstation)
    this.editFileTrackDetails.get('rackno')?.setValue(this.fileTrack.rackno)
    this.editFileTrackDetails.get('storagedate')?.setValue(this.fileTrack.storagedate)
    this.editFileTrackDetails.get('jurisdiction')?.setValue(this.fileTrack.jurisdiction)
    this.editFileTrackDetails.get('details')?.setValue(this.fileTrack.details)
    this.editFileTrackDetails.get('classification')?.setValue(this.fileTrack.classification)
    this.editFileTrackDetails.get('jurisdiction')?.setValue(this.fileTrack.jurisdiction)
    
  }

  saveFileTrackDetails(){
    this.fileTrackServ.updateFileTrack(this.editFileTrackDetails.value).subscribe({
      next: (data) => {
        //console.log(data)
       if(data==true){
        this.message="Successfully updated"
        this.openSnackBar()
       }else{
        this.message="Failed to update"
        this.openSnackBar()
       }
      },
      error: (e) => {
       
        this.message = "Error occurred! Please try again!"
        this.openSnackBar()
      }
    })
  }


}
