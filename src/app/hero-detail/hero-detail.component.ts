import { Component, Input, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { take } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() selectedHero?: Hero;
  // function(hero:Hero)
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroeById(id).pipe(take(1)).subscribe(hero => {
      this.selectedHero = hero;
    });
  }

  ngOnDestroy(): void {
    //this.subscripcion.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }

  /*public save(): void {
    this.heroService.updateHero(this.selectedHero).subscribe();
  }*/
}
