import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/interface';
import { AuthService } from '../shared/components/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public myForm!: FormGroup;
  public submited: boolean = false;
  private message: string;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  public submit() {
    if (this.myForm.invalid) {
      return;
    }

    this.submited = true;

    const user: IUser = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.myForm.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submited = false;
      },
      () => {
        this.submited = false;
      }
    );
  }

  public email() {
    return this.myForm.controls['email'];
  }

  public password() {
    return this.myForm.controls['password'];
  }
}
