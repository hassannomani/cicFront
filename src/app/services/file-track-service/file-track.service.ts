import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class FileTrackService {
  private url : string ='http://localhost:8080/api/file-track/';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { }

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
}
