import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { categoryservice } from '../../../../sharedservices/categories/category.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  isLoadingcategory: boolean = true;
  listcategorys: any[] = [];
  paginatedCategorys: any[] = [];

  // Pagination state
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private _categorys: categoryservice,
    private router: Router,
    private toastr: ToastrService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._categorys.getAllcategory().subscribe({
      next: (res: any) => {
        this.listcategorys = res;
        this.totalPages = Math.ceil(this.listcategorys.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: err => console.log(err),
      complete: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isLoadingcategory = false;
      }
    });
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCategorys = this.listcategorys.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  deletecategory(id: number): void {
    this._categorys.deletecategory(id).subscribe({
      next: () => {
        this.toastr.success('Category deleted successfully');
        this.listcategorys = this.listcategorys.filter(b => b._id !== id);
        this.totalPages = Math.ceil(this.listcategorys.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: (res: any) => {
        this.toastr.error('Error deleting category');
        console.log("res", res);
      }
    });
  }
}
