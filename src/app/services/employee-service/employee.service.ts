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
export class EmployeeService {

  private base : string = ''
  private add_url : string = ''
  private getall_url : string = ''
  private findname : string = ''
  private findbatch : string = ''
  private findcname : string = ''
  private findccountry : string = ''
  private findccfund : string = ''
  private findsubject : string = ''
  private findccount : string = ''
  private findccategory : string = ''
  private findcyear : string = ''
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService

  ) { 
    let temp = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.base = temp+"api/employees"
    this.add_url = this.base
    this.getall_url = this.base
    this.findname = this.base+"/searchname/"
    this.findbatch = this.base+"/searchbatch/"
    this.findcname = this.base+"/searchcname/"
    this.findccountry = this.base+"/searchccountry/"
    this.findccfund = this.base+"/searchcfund/"
    this.findsubject = this.base+"/searchsubject/"
    this.findccount = this.base+"/searchccount/"
    this.findccategory = this.base+"/searchccategory/"
    this.findcyear = this.base+"/searchcyear/"
  }
  //private base : string ='http://localhost:8080/api/employees';
  

  
  addUser(formData: any): Observable<any>{
    const body=JSON.stringify(formData);

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.post<any>(this.add_url,body,httpOptions)
  }

  listEmployees(): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.getall_url,httpOptions)
  }

  singleEmployee(id: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.base+"/"+id,httpOptions)
  }

  findName(name: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.findname+name,httpOptions)
  }
  findBatch(batch: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findbatch+batch,httpOptions)
  }
  findCourse(coursename: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findcname+coursename,httpOptions)
  }

  findCourseCountry(countryname: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccountry+countryname,httpOptions)
  
  }
  findCourseFund(fund: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccfund+fund,httpOptions)
  }

  findSubject(subject: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findsubject+subject,httpOptions)
  }

  findCourseCount(count: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccount+count,httpOptions)
  }

  findCourseCategory(cat: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccategory+cat,httpOptions)
  }

  findCourseYear(year: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findcyear+year,httpOptions)
  }
}
