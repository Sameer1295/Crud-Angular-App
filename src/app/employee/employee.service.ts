import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
    
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURL = "http://127.0.0.1:8000/api";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  errorHandler: (err: any, caught: Observable<Object>) => ObservableInput<any>;
   
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/employee/')

    .pipe(
      catchError(this.errorHandler)
    )
  }

}
