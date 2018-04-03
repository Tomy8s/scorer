import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Subject} from 'rxjs/Subject';

export type Region = null;
export type Club = null;
export class Gymnast {
  club: Club;
  free: number;
  hidden: boolean;
  name: string;
  num: number;
  region: Region;
  rope: number;
  total: number;
  constructor(
    num: number,
    name: string,
    club: Club,
    free: number,
    rope: number,
    region?: Region
  ) {
    this.club = club;
    this.free = free;
    this.name = name;
    this.num = num;
    this.region = region;
    this.rope = rope;
    this.total = (free || 0) + (rope || 0);
    this.hidden = false;
  }
}

@Injectable()
export class GymanstsService {
  gymnasts: any = new Subject();
  gymnastsSub = this.gymnasts.asObservable();
  constructor(
    private http: Http
  ) { }

  getGymnasts(): any {
    this.http.get('http://localhost:3000').subscribe((data) => {
      const stuff = data.toString();
      this.gymnasts = stuff;
      console.log(stuff);
    });
  }

}
