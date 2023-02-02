import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, pluck} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from './data';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private PUBLIC_KEY: string = '15a3a8b2ed9b09386e8381c33792cfa1';
  private HASH: string = '9528fb937804c7c5b7bf79299f433d02';
  private API_URL:string = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
  private total: number;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Hace una llamada a la API para devolver todos los heroes
   * Como es una operacion asincrona, devuelve un observable
   */
  public getTotal(): number {
    return this.total;
  }

  public getHeroes(limit?: number, offset?: number): Observable<Hero[]> {
    let url = this.API_URL;
    if (offset !== undefined || limit !== undefined) {
      if (offset !== undefined) {
        url += `&offset=${offset}`
      }
      if (limit !== undefined) {
        url += `&limit=${limit}`
      }
    }
    return this.http.get<{data: {results: Hero[], total: number}}>(url).pipe(
      map((data: Data) => {
        this.total = data.data.total;
        return data.data.results;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getHeroeById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.API_URL}/${id}`);
  }

  public updateHero(hero: Hero): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${hero.id}`, hero);
  }

  public searchHeroes(text: string): Observable<Hero[]> {
    if (!text.trim()) {
      return of([]);
    }
    console.log('Hago peticion con ' , text)
    return this.http.get<Hero[]>(`${this,this.API_URL}/?name=${text}`);
  }
}
