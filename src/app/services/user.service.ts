import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  login(data: any): Observable<string> {
    return this.httpClient.post('http://localhost:7181/api/User/Login', data, {
      responseType: 'text',
    });
  }
  signup(data: any): Observable<string> {
    return this.httpClient.post('http://localhost:7181/api/User', data, {
      responseType: 'text',
    });
  }
  verifyAdmin(userId: number) {
    return this.httpClient.get(
      `http://localhost:7181/api/UserRolePermission/verify/${userId}`
    );
  }
}
