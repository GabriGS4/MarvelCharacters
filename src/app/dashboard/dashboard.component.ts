import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero';
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public heroes: Hero[] = [];
  @Input() limit: number = 12;

  constructor(
    private heroService: HeroService) {
  }
  ngOnInit():void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getRandomHeroes(this.limit).subscribe(heroes => {
      this.heroes = heroes;
      });
  }
}
