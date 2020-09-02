import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service'
import { baseURL } from 'src/shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[];
  user: User;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseURL + 'users')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postNewUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content_Type': 'application/json'})
    };
    return this.http.post<User>(baseURL + 'users', user, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
