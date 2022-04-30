import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  private emptyUser: User = { username: '', profileImage: undefined, email: '' , groupCode: null, buyingPower: 50000, prevValue: 0, currValue: 0, rank: 0};

  constructor(private http: HttpClient, private router:Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') ?? JSON.stringify(this.emptyUser))
    );
  }

 get  getUserSubject() {
    return this.currentUserSubject
  }

  // Tries to get User is gucci
  // else returns an empty one (null basically)
  get getUserVal(): User {
    try {
      const trying = this.currentUserSubject.value;
      return trying;
    } catch {
      return this.emptyUser;
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<User>(`http://localhost:3000/user/login`, { username, password }).pipe(
      map((user) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  getUpdatedUser() {
    // todo fix this weird bug
    return this.http.get<User>(`http://localhost:3000/user/latestUser`).pipe(map((user) => {
      return user
    })).subscribe(user => {
      const {prevValue, currValue, buyingPower, profileImage} = user  
      const updated = {...this.getUserVal, prevValue:prevValue, currValue:currValue, buyingPower:buyingPower, profileImage:profileImage}
        // console.log(user)
        // console.log(this.getUserVal)
        localStorage.setItem('currentUser', JSON.stringify(updated));
        this.currentUserSubject.next(updated);
        console.log(updated)
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as User);
    window.location.reload()
  }
}
