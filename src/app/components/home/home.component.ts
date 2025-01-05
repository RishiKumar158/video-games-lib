import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  sort?: string;
  games?: Array<Game>;
  private routeSub?: Subscription;
  private gameSub?: Subscription;

  sortingCategories = [
    { name: 'Name', value: 'name' },
    { name: 'Released', value: '-released' },
    { name: 'Added', value: '-added' },
    { name: 'Created', value: '-created' },
    { name: 'Updated', value: '-updated' },
    { name: 'Rating', value: '-rating' },
    { name: 'Metacritic', value: 'metacritic' },
  ];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.http
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }
}
