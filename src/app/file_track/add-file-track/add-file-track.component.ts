import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CommonService } from 'src/app/services/common-service/common.service';
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
    'details':  new FormControl('',[Validators.required])
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

  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Add to File Track");
  }

  ngOnInit(): void {
    
    forkJoin([
      this.commonService.getDistrict(),
      this.commonService.getDivision(),
    ])
    .subscribe({
      next: (data) => {
        //console.log(data)
        this.district = data[0];
        this.division = data[1];
        this.thana = data[2];
        this.banks = data[3];
        this.bankdist = data[4];
        this.citycorporation = data[5]
      },
      error: (e) => {
       
          console.log("Error retrieving")
      }
    });

  }

  saveFileTrackDetails(){
    
  }

}
