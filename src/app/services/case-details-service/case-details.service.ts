import { environmentProd } from './../../../environments/environment.prod';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
@Injectable({
  providedIn: 'root'
})
export class CaseDetailsService {

  private url : string ='';
  //private url : string ='http://localhost:8080/api/case-details/';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { 
    let temp = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url = temp+"api/case-details/"
  }

  addCaseDetails(formData: any): Observable<any>{

    const body=JSON.stringify(formData);
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.post(this.url+'add', body,httpOptions);
  }

  updateCaseDetails(formData: any): Observable<any>{

    const body=JSON.stringify(formData);
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.post(this.url+'update', body,httpOptions);
  }

  listCaseDetails(): Observable<any>{
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get(this.url+'list',httpOptions);
  }

  getACaseDetails(string: any): Observable<any>{
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get(this.url+'case/'+string,httpOptions);
  }

  deleteACaseDetail(string: any): Observable<any>{
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get(this.url+'remove/'+string,httpOptions);
  }

}
