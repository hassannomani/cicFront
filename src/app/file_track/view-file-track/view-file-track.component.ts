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
  selector: 'app-view-file-track',
  templateUrl: './view-file-track.component.html',
  styleUrls: ['./view-file-track.component.css']
})
export class ViewFileTrackComponent implements OnInit{

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
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private fileTrackServ: FileTrackService,
  ){
    this.titleService.setTitle("View File Details");
  }

  ngOnInit(): void {
    this
    .actroute
    .queryParams
    .subscribe(paramsg=>{
      let id = paramsg['id']
      if(id!=""){
        this.fileTrackServ.getAFileTrack(id).subscribe({
          next: (data) => {
            if(data.taxfileuuid!=undefined){
              this.fileTrack = data
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

  list(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['list-file-tracks'],);
    }); 
  }

  

}
