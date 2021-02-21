import { ErorrComponent } from './error/error.component';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";



@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknow error occured!";
        if (error.error.message) {
          errorMessage = error.error.message
        }
        this.dialog.open(ErorrComponent, {data: { message: errorMessage }})
        return throwError(error)
      })
    )
  }
}
