import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  allAdmins!: any[];
  allNonAdmins!: any[];
  receivedData: any[] = [];
  allAvailableBooks!: any[];
  userId: any = sessionStorage.getItem('id');
  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.service.getAllAvailableBooks().subscribe({
      next: (res: any) => {
        this.allAvailableBooks = res;
      },
      error(error: HttpErrorResponse) {
        alert('Something Went Wrong');
      },
    });

    this.service.getAllBooks().subscribe({
      next: (response: any) => {
        this.receivedData = response;
      },
      error(error: HttpErrorResponse) {
        alert('Something Went Wrong');
      },
    });
  }
}
