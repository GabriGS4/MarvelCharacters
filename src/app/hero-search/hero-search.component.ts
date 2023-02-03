import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit{
  public heroesFound$: Observable<Hero[]> = of([]);
  public searchTerm: Subject<string> = new Subject();
  constructor(
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.heroesFound$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // completa el observable anterior y devuelve otro observable
      switchMap(term => {
        return this.heroService.searchHeroes(term)
      })
    );
  }
  public search(value: string) {
    //this.heroesFound$ = this.heroService.searchHeroes(value);
    this.searchTerm.next(value);

  }
}
