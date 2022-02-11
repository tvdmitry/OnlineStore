import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/categories.service';
import { ICategory } from 'src/interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shared-category',
  templateUrl: './shared-category.component.html',
  styleUrls: ['./shared-category.component.scss'],
})
export class SharedCategoryComponent implements OnInit {
  public categories: ICategory[] = [];
  private searchStr: string = '';
  private dSub?: Subscription;
  private pSub?: Subscription;
  public textDeleteCategory!: string;
  private categoryDelete: string = 'categoryDelete';
  private popupOne!: Subscription;
  @Input() private delayOne: number = 2000;

  constructor(
    private categoriesService: CategoriesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.pSub = this.categoriesService.getAll().subscribe((categories) => {
      this.categories = categories;
    });

    this.popupOne = this.auth.categoryDelete$.subscribe((res) => {
      this.categoryDelete = res.productUpdate;
      this.textDeleteCategory = res.textDeleteCategory;

      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textDeleteCategory = '';
      }, this.delayOne);
    });
  }

  private remove(id: string | undefined) {
    this.dSub = this.categoriesService.remove(id).subscribe(() => {
      this.categories = this.categories.filter(
        (category) => category.id !== id
      );
    });
  }

  private removeCategory() {
    this.auth.removeCategory();
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
