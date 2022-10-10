import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ReserveBookService } from 'src/app/services/reserve-book.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() response!: any;
  image!: any;

  receivedData: any;
  userId = Number(sessionStorage.getItem('loggedInUserId'));

  constructor(
    private service: HomeService,
    private router: Router,
    private serviceReserve: ReserveBookService
  ) {}

  ngOnInit(): void {}
  reserve() {
    let data = {
      userId: this.userId,
      bookId: this.response.id,
    };
    this.serviceReserve.reserveBook(data).subscribe({
      next: (response: any) => {
        this.receivedData = response;
        alert('Book Reserved Successfully');
      },
      error(error: HttpErrorResponse) {
        throw Error(error.message);
      },
    });
  }
}
