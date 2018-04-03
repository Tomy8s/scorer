import {Component, OnInit} from '@angular/core';
import {GymanstsService, Gymnast} from './gymansts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GymanstsService]
})
export class AppComponent implements OnInit {
  title = 'app';
  gymnasts: Gymnast[] = [
    new Gymnast(0, '', null, null, null),
  ];
  gym: any;
  private sortCriterion: string;
  private filterCriterion: string;
  private filterparams: string[] = [];
  clubs: Set<string>;
  constructor(
    private gymnastsService: GymanstsService
  ) { }

  ngOnInit() {
   this.gym = this.gymnastsService.gymnastsSub.subscribe((gymnasts) => {
     this.gym = gymnasts;
   });
   this.gymnastsService.getGymnasts();
   this.clubs = new Set(this.gymnasts.map((gymnast: Gymnast) => gymnast.club));
  }


  sortBy(attr: string): void {
    this.gymnasts.forEach((gymnast: Gymnast) => {
      gymnast.total = gymnast.free + gymnast.rope
    });
    const old: string = this.gymnasts.map((gymnast: Gymnast) => gymnast.num).join();
    this.gymnasts.sort((a, b) => {
      if (a[attr] < b[attr]) {
        return -1;
      }
      if (a[attr] > b[attr]) {
        return 1;
      }
      return 0;
    });
    if (this.gymnasts.map((gymnast: Gymnast) => gymnast.num).join() === old) {
      this.gymnasts = this.gymnasts.reverse();
    }
    this.sortCriterion = attr;
  }

  get gymnastsToShow() {
    return this.gymnasts.filter((gymnast: Gymnast) => !gymnast.hidden);
  }

  filterBy(criteria): void {
    this.gymnasts.forEach((gymnast: Gymnast) => {
      if (gymnast.club === criteria) {
        gymnast.hidden = !gymnast.hidden;
      }
    });
  }
}
