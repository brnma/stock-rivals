import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService, private _snackbar: MatSnackBar) {
    if (this.auth.getUserVal.email) this.router.navigate([''])
  }

  ngOnInit(): void {
  }

  authenticate() {
    //Temp
    // this._snackbar.open('Implemented, but only demoing frontend part', 'Error');
    // auth user here
    this.auth.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      () => {
        this._snackbar.open('Ooop error login; wrong credentials', 'Error');
      }
    );
  }

  register() {
    // register user
    this.router.navigate(['/register']);
  }
}
