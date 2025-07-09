import { TestBed } from '@angular/core/testing';

import { categoryService } from './category.service';

describe('categoryService', () => {
  let service: categoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(categoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
