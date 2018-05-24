import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitubDataService {

  constructor(private http: HttpClient) { }

  getPullRequests(user: string, repo: string): Observable<any> {
    const httpOptions =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${environment.token}`
      })
    }

    const queryString = `
      query { repository (owner:"${user}", name:"${repo}") { pullRequests (states:OPEN) { totalCount } } }
    `;

    const request = {
      query:  queryString
    };

    return this.http.post<any>('https://api.github.com/graphql', request, httpOptions)
      .pipe(
        map(result => {
          return { pullRequests: result.data.repository.pullRequests.totalCount };
        }),
        catchError(this.handleError<any>('getPullRequests', repo))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}
}
