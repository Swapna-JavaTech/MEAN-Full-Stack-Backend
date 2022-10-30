import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUri : string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http : HttpClient) { }

  //create
  createProduct(data: any) : Observable<any>{
    let url = `${this.baseUri}/create`;
    return this.http.post(url,data).pipe(catchError(this.errorMgmt));
  }

  //get all products
  getProducts(){
    return this.http.get(`${this.baseUri}`);
  }

  //get an product
  getProduct(id : any): Observable<any>{
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url,{headers : this.headers}).pipe(
      map((res : any) =>{
        return res || {};
      }),
      catchError(this.errorMgmt)
    )}

    //update product
    updateProduct(id: any,data: any) : Observable<any>{
      let url = `${this.baseUri}/update/${id}`;
      return this.http.put(url,data,{headers : this.headers}).pipe(
        catchError(this.errorMgmt)
      )
    }

    //delete product
    deleteProduct(id: any) : Observable<any>{
      let url = `${this.baseUri}/delete/${id}`;
      return this.http.delete(url,{headers : this.headers}).pipe(
        catchError(this.errorMgmt)
      )
    }

  //Error handling
  errorMgmt(error:HttpErrorResponse){
    let errorMessage = ' ';
    if(error.error instanceof ErrorEvent){
      //get client-side error
      errorMessage = error.error.message;
    }else{
      //Get server-side error
      errorMessage = `Error Code : ${error.status}\n Message:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() =>{
      return errorMessage;
    });
  }
}
