import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/categories.service';
import { ICategory } from 'src/interface';
import { AuthService } from '../shared/components/services/auth.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  public form!: FormGroup;
  private popupOne!: Subscription;
  public text!: string;
  public type: string = 'success';
  @Input() private delayOne: number = 2000;

  constructor(
    private categoriesService: CategoriesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.popupOne = this.auth.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;

      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.text = '';
      }, this.delayOne);
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    const category: ICategory = {
      name: this.form.value.name,
      description: this.form.value.description,
    };

    this.categoriesService.create(category).subscribe((res) => {
      name: res.name;
      description: res.description;
    });
  }

  public name() {
    return this.form.controls['name'];
  }

  public description() {
    return this.form.controls['description'];
  }

  public createCategoryModal() {
    this.auth.createCategoryModal();
  }
}
