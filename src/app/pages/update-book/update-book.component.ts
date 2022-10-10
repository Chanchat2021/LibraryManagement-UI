import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  dataToEdit = {
    id: 0,
    title: '',
    author: '',
    publisher: '',
    abstract: '',
    genre: '',
    thumbnails: '',
  };
  receivedData: any;
  updateBooks = {
    title: '',
    author: '',
    publisher: '',
    abstract: '',
    genre: '',
    thumbnails: '',
  };
  imageData: any;
  updateBook = this.fb.group({
    title: [''],
    author: [''],
    publisher: [''],
    abstract: [''],
    genre: [''],
    thumbnails: [''],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: HomeService
  ) {}

  ngOnInit(): void {
    this.receivedData = window.history.state;
    this.updateBook.patchValue({
      title: this.receivedData?.response.title,
      author: this.receivedData?.response.author,
      publisher: this.receivedData?.response.publisher,
      abstract: this.receivedData?.response.abstract,
      genre: this.receivedData?.response.genre,
      thumbnails: this.receivedData?.response.thumbnails,
    });
  }
  submit() {
    this.dataToEdit.title = String(this.updateBook.value.title);

    this.dataToEdit.author = String(this.updateBook.value.author);

    this.dataToEdit.id = Number(this.receivedData?.response.id);

    this.dataToEdit.publisher = String(this.updateBook.value.publisher);

    this.dataToEdit.abstract = String(this.updateBook.value.abstract);

    this.dataToEdit.genre = String(this.updateBook.value.genre);
    this.dataToEdit.thumbnails = String(this.updateBook.value.thumbnails);
    this.service.update(this.dataToEdit).subscribe({
      next: (res: any) => {
        alert('Book Edited successfully');

        this.router.navigate(['/admin-dashboard']);
      },

      error(error: HttpErrorResponse) {
        throw Error('Something went wrong');
      },
    });
  }
}
