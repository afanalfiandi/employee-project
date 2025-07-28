import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../shared/components/input/input.component";
import { CardComponent } from "../../shared/components/card/card.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { BaseComponent } from '../../core/components/base.component';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Toast } from '../../shared/utils/toast.util';

@Component({
  selector: 'app-auth',
  imports: [InputComponent, CardComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent extends BaseComponent implements OnInit {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.checkToken();
  }

  onAuth() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      this._authService.auth(username, password).pipe(
        tap((res) => {
          if (res) {
            this._router.navigate(['/dashboard'])
          } else {
            Toast('error', 'Incorrect username or password')
          }
        })
      ).subscribe();
    }
  }

  checkToken() {
    const isLoggedIn = this._authService.isLoggedIn();

    if (isLoggedIn) {
      this._router.navigate(['/dashboard'])
    }
  }
}
