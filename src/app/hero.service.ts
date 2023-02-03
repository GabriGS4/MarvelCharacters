import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, pluck} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from './interfaces/data';
import { Hero } from './interfaces/hero';

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

  public getAllHeroes(limit?: number, offset?: number): Observable<Hero[]> {
    let url = this.API_URL;
    if (offset !== undefined || limit !== undefined) {
      if (offset !== undefined) {
        url += `&offset=${offset}`
      }
      if (limit !== undefined) {
        url += `&limit=${limit}`
      }
    }
    return this.http.get<Data>(url).pipe(
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

  public getRandomHeroes(limit?: number): Observable<Hero[]> {
    let url = this.API_URL;
    if (limit !== undefined) {
      if (limit !== undefined) {
        url += `&limit=${limit}&offset=${Math.floor(Math.random() * 1542)}`
      }
    }
    return this.http.get<Data>(url).pipe(
      map((data: Data) => {
        return data.data.results;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getHeroeById(id: number): Observable<Hero> {
    let url = this.API_URL
    if (id !== undefined) {
      url += `&id=${id}`
    }
    return this.http.get<Data>(url).pipe(
      map((data: Data) => {
        return data.data.results[0];
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public searchHeroes(text: string): Observable<Hero[]> {
    let url = this.API_URL;
    if (!text.trim()) {
      return of([]);
    }
    url += `&nameStartsWith=${text}&limit=5`;
    console.log(url)
    console.log('Hago peticion con ' , text)
    return this.http.get<Data>(url).pipe(
      map((data: Data) => {
        return data.data.results;
      })
    )
  }
}
