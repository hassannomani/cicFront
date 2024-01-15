import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
import { environmentProd } from './../../../environments/environment.prod';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileTrackService {
  //private url : string ='http://localhost:8080/api/file-track/';
  private url : string ='';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { 
    let temp = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url = temp+"api/file-track/"
  }

  addFileTrack(formData: any): Observable<any>{

    const body=JSON.stringify(formData);
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.post(this.url+'add', body,httpOptions);
  }

  listFileTracks(): Observable<any>{
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get(this.url+'list',httpOptions);
  }

  getAFileTrack(string: any): Observable<any>{
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get(this.url+'file/'+string,httpOptions);
  }

  deleteAFileTrack(string: any): Observable<any>{
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get(this.url+'remove/'+string,httpOptions);
  }

  updateFileTrack(formData: any): Observable<any>{

    const body=JSON.stringify(formData);
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.post(this.url+'update', body,httpOptions);
  }

}
