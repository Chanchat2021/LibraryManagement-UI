import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() response!: any;
  receivedData: any;
  userId = sessionStorage.getItem('loggedInUserId');
  image!: any;
  isActive: boolean = false;
  isReserved: boolean = true;
  constructor(private service: AdminService, private router: Router) {}

  ngOnInit(): void {
    if (
      this.response.isAvailable == null  &&
      this.response.isReserved == false
    ) {
      this.isActive = true;
    }
    if (this.response.isReserved == false && this.response.isAvailable== false || this.response.isReserved==true && this.response.isAvailable==false) {
      this.isReserved = false;
    }
  }
  enlist() {
    this.service.enlistBook(this.response.id).subscribe({
      next: (response: any) => {
        this.receivedData = response;
        alert('Book Enlisted Successfully');
      },
      error(error: HttpErrorResponse) {
        console.log('error');
        throw Error(error.message);
      },
    });
  }

  delist() {
    this.service.delistBook(this.response.id).subscribe({
      next: (response: any) => {
        this.receivedData = response;
        alert('Book Delisted Successfully');
      },
      error(error: HttpErrorResponse) {
        console.log('error');
        throw Error(error.message);
      },
    });
  }
  editBook() {
    this.router.navigateByUrl('/update-book', {
      state: {
        response: this.response,
      },
    });
  }
}
