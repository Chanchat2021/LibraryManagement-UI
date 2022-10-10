import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}
  
  enlistBook(id: any) {
    return this.httpClient.post(
      'http://localhost:7181/api/Book/Enlist',
      { id: id },
      {
        responseType: 'text',
      }
    );
  }
  getAllAvailableBooks() {
    return this.httpClient.get(
      'http://localhost:7181/api/Book/AvailableBooks',
      {
        responseType: 'json',
      }
    );
  }
  getAllNewBooks() {
    return this.httpClient.get('http://localhost:7181/api/Book/NewBooks', {
      responseType: 'json',
    });
  }

  getAllBooks() {
    return this.httpClient.get('http://localhost:7181/api/Book', {
      responseType: 'json',
    });
  }
  delistBook(id: any) {
    return this.httpClient.delete(
      `http://localhost:7181/api/Book/${id}`,
      {
        responseType: 'text',
      }
    );
  }
}
