import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReserveBookService {
  constructor(private httpClient: HttpClient) {}    
  reserveBook(data: any) {
    return this.httpClient.post('http://localhost:7181/api/Reserve', data, {
      responseType: 'text',
    });
  }
}
