import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../../sharedservices/books/book.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  isLoadingbook: boolean = true;
  constructor(private _books: BookService, private router: Router,private toastr: ToastrService ) {}
  listbooks: any[] = [];
  deletebook(id: number): void {
      this._books.deletebook(id).subscribe({
        next: () => {
          this.toastr.success('book deleted successfully');
          this.listbooks = this.listbooks.filter(b => b._id !== id);
        },
        error: (res: any) => {
          this.toastr.error('Error deleting book');
          console.log("res",res)
        }
      });
  }
  ngOnInit(): void {
    this._books.getAllbook().subscribe({
      next: (res: any) => {
        console.log(this.listbooks)
        this.listbooks = res.data;
      },
      error: err => console.log(err),
      complete: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isLoadingbook = false
      } 
    });
  }
}