import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FileTrackService } from 'src/app/services/file-track-service/file-track.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-file-tracks',
  templateUrl: './list-file-tracks.component.html',
  styleUrls: ['./list-file-tracks.component.css']
})
export class ListFileTracksComponent implements OnInit{

  searchbox= new FormGroup({
    'taxpayername':  new FormControl('',[Validators.required]),
    'tinno':  new FormControl('',[Validators.required]),
    'bin':  new FormControl('',[Validators.required])
  })

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "View"
  buttonLabel2: string= "Add"
  buttonLabel3: string= "Delete"
  buttonLabel4: string= "Edit"
  buttonColor: string = "primary"
  buttonColor2: string = "warn"
  buttonLabelSr: string= "Search"
  buttonLabelClr: string= "Clear"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  fileTrackList : any = []
  displayedColumns: any = []
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private fileTrackServ: FileTrackService,
  ){
    this.titleService.setTitle("Add to File Track");
  }

  ngOnInit(): void {
    this.loadAllFile()
  }

  loadAllFile(){
    this.fileTrackServ.listFileTracks().subscribe({
      next: (data) => {
        if(data.length){
          this.fileTrackList = data
          this.displayedColumns = [ 'Serial','taxpayername','action']
        }else{
          this.message = "No data Found"
          this.openSnackBar()
        }
        
      },
      error: (e) => {
       
        this.message = "Error occurred!"
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

  viewFileTrack(id: any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['view-file-track'],{ queryParams: {id: id}});
    }); 
  }

  edit(id:any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['edit-file-track'],{ queryParams: {id: id}});
    }); 
  }

  
  delete(id: any){
    this.fileTrackServ.deleteAFileTrack(id).subscribe({
      next: (data) => {
        if(data==true){
          this.message = "File Deteled"
          this.openSnackBar()
          this.loadAllFile()
        }else{
          this.message = "No data Found"
          this.openSnackBar()
        }
        
      },
      error: (e) => {
       
        this.message = "Error occurred!"
        this.openSnackBar()      
      } 
    })
  }

  search(){

  }

  clear(){
    this.searchbox.reset()
  }

}
