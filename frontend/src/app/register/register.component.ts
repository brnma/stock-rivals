import { UserService } from './../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // imgFile:File|undefined;
  // email:String="";
  // password:String="";
  // name:String="";

  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  imageUrl: string = '';
  actualImg!: File;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private _snackbar: MatSnackBar
  ) {
    if (this.authService.getUserVal.email.length !== 0) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // Validators.pattern('^[a-zA-Z]+$')
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profileImage: [null, [Validators.required]]
    });
  }

  addImage(event: any) {
    this.actualImg = event.target.files[0];
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      this.submitted = true;
      let toSubmit = this.registerForm.value;

      toSubmit.profileImage = `${this.f['username'].value}.${this.actualImg.type.split('/')[1]}`;

      // Auths by register, login, then uploading the user's profile pic
      this.userService.register(toSubmit).subscribe(
        (val: User) => {
          this.authService.login(toSubmit['username'], toSubmit['password']).subscribe(
            (val) => {
              this.uploadPic();
            },
            () => {
              console.log('wtff????');
            }
          );
        },
        (err) => {
          this._snackbar.open(err, 'Error', {
            duration: 3000
          });
          this.submitted = false;
        }
      );
    } else {
      this._snackbar.open(`${this.registerForm.value} + something wrong with form`, 'Error', {
        duration: 3000
      });
    }
  }

  back() {
    this.router.navigate(['/login']);
  }

  private uploadPic() {
    let formData = new FormData();
    let imgFileName = `${this.f['username'].value}.${this.actualImg.type.split('/')[1]}`;
    formData.append('image', this.actualImg, imgFileName);

    this.userService.uploadPic(formData).subscribe(
      (val) => {
        console.log(val);
        this._snackbar.open('User created!', 'Weee', {
          duration: 3000
        });
        this.submitted = false;
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
        this._snackbar.open(err, 'Error', {
          duration: 3000
        });
        this.submitted = false;
      }
    );
  }
}
