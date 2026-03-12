import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { delay, Observable } from 'rxjs';
import { MovieResult, ApiResult } from './interfaces';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;


@Injectable({
  providedIn: 'root',
})
export class Movie {
 
private http = inject(HttpClient);
  constructor() {}

  getTopRatedMovie(page = 1): Observable<ApiResult>  {
    // return this.http.get(`${BASE_URL}/movie/pupular?page=${page}&api_key=${API_KEY}`)
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`).pipe(
      delay(1000) )
    
  }

  getMovieDetails(id: string):  Observable<MovieResult>  {
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  }
}
