import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { categoryservice } from '../../../../sharedservices/categories/category.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
addCategoryForm = new FormGroup({
  title: new FormControl('', Validators.required),
  status: new FormControl('', Validators.required)
  });
  categoryId: number=0;
  categoryData: any;
  constructor(
    private fb: FormBuilder,
    private _category: categoryservice,
    private toastr: ToastrService, 
    private _Router:Router,
    private _ActivatedRouter:ActivatedRoute
  ) {
    this.categoryId = _ActivatedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.categoryId) {
      this._category.getcategory(this.categoryId).subscribe({
        next: (res: any) => {
          this.addCategoryForm.patchValue({
            title: res.title,
            status: res.status
          });
        },
        error: () => {
          this.toastr.error('Failed to load category data');
        }
      });
    }
  }
  onEditCategory(): void {
    if (this.addCategoryForm.invalid || !this.categoryId) {
      this.toastr.error('Please fill all fields correctly.');
      return;
    }
  
    const data = {
      title: this.addCategoryForm.get('title')?.value ?? '',
      status: this.addCategoryForm.get('status')?.value ?? ''
    };
  
    this._category.editCategory(data, this.categoryId).subscribe({
      next: (res: any) => {
        this.toastr.success('Category updated successfully');
      },
      complete: () => {
        this._Router.navigate(['/categorys/list']);
      },
      error: (err: any) => {
        console.error('Error editing category:', err);
        this.toastr.error('Error updating category');
      }
    });
  }
  onAddCategory(): void {
    if (this.addCategoryForm.invalid) {
      this.toastr.error('Please fill all fields correctly.');
      return;
    }

    const data = {
      title: this.addCategoryForm.get('title')?.value ?? '',
      status: this.addCategoryForm.get('status')?.value ?? ''
    };
    
    this._category.addCategory(data).subscribe({
      next: (res: any) => {
        this.toastr.success('Category added successfully');
      },
      complete: () => {
        this._Router.navigate(['admin/categorys/list']);
      },
      error: (err: any) => {
        console.error('Error adding category:', err);
        this.toastr.error('Error adding category');
      }
    });
  }
}