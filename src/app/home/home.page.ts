import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonButtons, IonButton, IonIcon, IonBadge,  IonMenuButton,
 } from '@ionic/angular/standalone';
import { Movie } from '../services/movie';
import { catchError, finalize } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieResult } from '../services/interfaces';

import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, RouterModule, DatePipe, IonLabel, IonButtons, IonButton, IonIcon, IonBadge,  IonMenuButton,],
})


export class HomePage implements OnInit {
  private movieService = inject(Movie);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
   public dummyArray = new Array(5);

     ngOnInit() {
    this.loadMovies();
  }




  constructor() {
    this.loadMovies();
     addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star });
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
   this.error = null;

   if (!event) {
     this.isLoading  = true;
   }

   this.movieService.getTopRatedMovie(this.currentPage).pipe(
    finalize(() => {
      this.isLoading = false;
   
    }),
    catchError((err : any) => {
      console.log(err);
      
      this.error = err.error.status_message;
      return [];
    })
   ).subscribe({
    next: (res) => {
      this.movies.push(...res.results);
       if (event) {
      event.target.disabled = res.total_pages === this.currentPage;
        }
    }

   
   })
  }


  loadMore(event: InfiniteScrollCustomEvent) {
this.currentPage++;
    this.loadMovies(event);
  }
}
