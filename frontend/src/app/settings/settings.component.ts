import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currNewUsername: string = ""
  constructor(private userService:UserService, private auth:AuthService, private router:Router, private _snackbar:MatSnackBar) {
    this.auth.getUpdatedUser()

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {}

  changeName() {
    // work on this
    if (this.currNewUsername.length === 0) {
      this._snackbar.open("Please enter into the field", undefined, {duration: 2000})
      return
    } 
    this.userService.changeUsername(this.currNewUsername).subscribe(()=>{
      this._snackbar.open("Username updated", undefined, {duration: 2000})
      window.location.reload()

    }, (err)=>{
      this._snackbar.open(err, undefined, {duration: 2000})

    })
  }

  changeProfilePic(e:any){
    const img = e.target.files[0]
    console.log(img)
    let formData = new FormData();
    let currUser = this.auth.getUserVal
    let imgFileName = `${currUser.username}.${img.name.split('.')[1]}`;
    formData.append('image', img, imgFileName);
    this.userService.uploadPic(formData).subscribe(()=>{
      this._snackbar.open("User image updated", undefined, {duration: 2000})
      window.location.reload()
    }, (err)=>{
      console.log(err)
    })
  }

  signOut(){
    this.auth.logout()
  }
}
