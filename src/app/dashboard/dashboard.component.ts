import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../data';
import { Hero } from '../hero';
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public heroes: Hero[] = [];
  @Input() offset: number = 0;
  @Input() limit: number = 20;

  constructor(
    private heroService: HeroService) {
  }
  ngOnInit():void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getHeroes(this.limit, this.getRandomOffset()).subscribe(heroes => {
      console.log(this.heroes = heroes)
      this.heroes = heroes;
      });
  }

  public getRandomOffset(): number {
    console.log(this.heroService.getTotal())
    return Math.floor(Math.random() * this.heroService.getTotal());
  }
}
