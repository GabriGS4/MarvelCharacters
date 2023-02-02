import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {
        id: 1,
        name: 'Super-Man',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 120
      },
      {
        id: 2,
        name: 'Spider-Man',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 310
      },
      {
        id: 3,
        name: 'Juanca',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 320
      },{
        id: 4,
        name: 'Ant-Man',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 420
      },{
        id: 5,
        name: 'Daredevil',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 120
      },{
        id: 6,
        name: 'Peter Parker',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 120
      },{
        id: 7,
        name: 'Peter Puerro',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 120
      },
      {
        id: 8,
        name: 'Pepe Man',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 120
      },
      {
        id: 9,
        name: 'Alonso Furioso',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 120
      },
      {
        id: 10,
        name: 'Sebastián Vettel',
        superpower: 'Uno to guapo',
        hasCape: true,
        height: 120
      }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
