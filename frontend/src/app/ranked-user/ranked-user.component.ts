import { Component, OnInit, Input } from '@angular/core';
import {User} from '../_models/user';
@Component({
  selector: 'app-ranked-user',
  templateUrl: './ranked-user.component.html',
  styleUrls: ['./ranked-user.component.scss']
})
export class RankedUserComponent implements OnInit {
  @Input() rankedUser: User | undefined;
  name: string | undefined = "";
  rank: number | undefined = 1;
  accountValue: number | undefined;
  constructor() { }

  ngOnInit(): void {
    this.name = this.rankedUser?.username;
    this.accountValue = this.rankedUser?.currValue;
    this.rank = this.rankedUser?.rank;
  }

}
