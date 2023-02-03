import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../interfaces/hero';
import {HeroService} from "../hero.service";
import {delay, Observable} from "rxjs";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  @Input() offset: number = 0;
  @Input() limit: number = 20;
  @Input() total: number = 0;

  constructor(
    //Indica a Angular que se requiere el uso de la instancia HeroService
    //Y en el mismo paso, crea una propiedad privada de nombre HeroService para
    //contener dicha instancia
    private heroService: HeroService,
  ) {
  }

  ngOnInit(): void {
    //obtenemos los
    //this.heroes = this.heroService.getHeroes();
    this.getHeroes();
  }

  //Por defecto una propiedad es pública
  //strig no sería necesario si inicializamos la variable directamente

  public getHeroes(): void {
    this.heroService.getAllHeroes(this.limit, this.offset).subscribe(heroes => {
      this.heroes = heroes;
      this.total = this.heroService.getTotal();
      });
  }

  public previousPage(): void {
    this.offset -= this.limit;
    this.getHeroes();
  }

  public nextPage(): void {
    this.offset += this.limit;
    this.getHeroes();
  }
}

