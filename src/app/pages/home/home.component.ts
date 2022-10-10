import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { ReserveBookService } from 'src/app/services/reserve-book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent implements OnInit {
  receivedData: any[] = [];
  userId: any = sessionStorage.getItem('id');
  constructor(
    private service: HomeService,
    private serviceReserve: ReserveBookService,
    private fb: FormBuilder,
  ) {}

  searchForm = this.fb.group({
    searchBook: [''],
  });
  ngOnInit(): void {
    this.service.allAvailableBooks().subscribe({
      next: (response: any) => {
        this.receivedData = response;
      },
      error(error: HttpErrorResponse) {
        throw Error(error.message);
      },
    });
  }
  search(key: any) {
    this.service.searchBooks(key).subscribe({
      next: (data: any) => {
        this.receivedData = data;
      },
      error(error: HttpErrorResponse) {
        throw Error(error.message);
      },
    });
  }
  onSubmit() {
    this.search(this.searchForm.value.searchBook);
  }
}
