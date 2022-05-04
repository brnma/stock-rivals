import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(private http: HttpClient) {}

  create() {
    return this.http.get(`http://localhost:3000/groups/create`);
  }

  join(code: String) {
    return this.http.post(`http://localhost:3000/groups/join`, { code });
  }

  leave() {
    return this.http.post(`http://localhost:3000/groups/leave`, {});
  }
  getGroup() {
    return this.http.get(`http://localhost:3000/groups/getGroup`);
  }
  getGroupUsers() {
    return this.http.get(`http://localhost:3000/groups/getGroupUsers`);
  }
}
