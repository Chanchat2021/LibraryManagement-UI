import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}
  
  update(data: any): Observable<string> {
    return this.httpClient.put('http://localhost:7181/api/Book', data, {
      responseType: 'text',
    });
  }

  allAvailableBooks() {
    return this.httpClient.get('http://localhost:7181/api/Book/AvailableBooks');
  }

  searchBooks(search: any) {
    return this.httpClient.get(
      `http://localhost:7181/api/Book/Search?search=${search}`
    );
  }
}
