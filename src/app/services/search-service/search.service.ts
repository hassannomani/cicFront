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
export class SearchService {

  private urlcase : string ='';
  private urlfile : string ='';


  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) {
    let temp = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.urlcase = temp+"api/case-details-search/"
    this.urlfile = temp+"api/file-track-search/"
   }

  returnHTTPOptions(){
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return httpOptions
  }

  track_name(name: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlfile+'name/'+name,httpop);
  }

  track_tin(tin: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlfile+'tin/'+tin,httpop);
  }

  track_bin(bin: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlfile+'bin/'+bin,httpop);
  }
  track_house(house: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlfile+'house/'+house,httpop);
  }
  track_lc(lc: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlfile+'lc/'+lc,httpop);
  }
  case_name(name: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlcase+'name/'+name,httpop);
  }

  case_tin(tin: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlcase+'tin/'+tin,httpop);
  }

  case_bin(bin: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlcase+'bin/'+bin,httpop);
  }

  case_io(io: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlcase+'io/'+io,httpop);
  }

  case_status(status: any): Observable<any>{
    let httpop = this.returnHTTPOptions()
    return this.http.get(this.urlcase+'status/'+status,httpop);
  }
}
