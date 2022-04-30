import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private userService:UserService, private auth:AuthService, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {}

  changeName() {
    // work on this
  }

  changeProfilePic(e:any){
    const img = e.target.files[0]
    console.log(img)
    let formData = new FormData();
    let currUser = this.auth.getUserVal
    let imgFileName = `${currUser.username}.${img.name.split('.')[1]}`;
    formData.append('image', img, imgFileName);
    this.userService.uploadPic(formData).subscribe(()=>{
      this.auth.getUpdatedUser()
      window.location.reload()
    }, (err)=>{
      console.log(err)
    })
  }

  signOut(){
    this.auth.logout()
  }
}
