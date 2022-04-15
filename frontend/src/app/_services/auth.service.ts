import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  private emptyUser: User = { username: '', name: '', profileImage: undefined, email: '' };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') ?? JSON.stringify(this.emptyUser))
    );
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

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as User);
  }
}
