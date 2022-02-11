import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/categories.service';
import { ICategory } from 'src/interface';
import { AuthService } from '../shared/components/services/auth.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  public form!: FormGroup;
  private category!: ICategory;
  private submited: boolean = false;
  private uSub!: Subscription;
  public textAlert!: string;
  private state: string = 'update';
  private popupOne!: Subscription;
  @Input() private delayOne: number = 2000;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.popupOne = this.auth.update$.subscribe((res) => {
      this.state = res.state;
      this.textAlert = res.textAlert;

      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textAlert = '';
      }, this.delayOne);
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.categoriesService.getById(params.categoryId);
        })
      )
      .subscribe((category: ICategory) => {
        this.category = category;
        this.form = new FormGroup({
          name: new FormControl(category.name, Validators.required),
          description: new FormControl(
            category.description,
            Validators.required
          ),
        });
      });
  }

  private submit() {
    if (this.form.invalid) {
      return;
    }

    this.submited = true;

    this.uSub = this.categoriesService
      .update({
        ...this.category,
        name: this.form.value.name,
        description: this.form.value.description,
      })
      .subscribe(() => {
        this.submited = false;
      });
  }

  private name() {
    return this.form.controls['name'];
  }

  private description() {
    return this.form.controls['description'];
  }

  private id() {
    return this.form.controls['id'];
  }

  private updateCategory() {
    this.auth.updateCategory();
  }
}
