import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitubDataService {

  constructor(private http: HttpClient) { }

  getPullRequests(user: string, repo: string, token: string): Observable<any> {
    const httpOptions =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    }

    const queryString = `
      query { 
        repository (owner:"${user}", name:"${repo}") { 
          pullRequests (first: 10, states: OPEN, orderBy: {
            direction: DESC, field: CREATED_AT 
          }) {
            totalCount
            nodes {
              id
              title
              createdAt
              bodyHTML
            }
          } 
        } 
      }
    `;

    const body = {
      query:  queryString
    };

    return this.http.post<any>('https://api.github.com/graphql', body, httpOptions)
      .pipe(
        map(result => {
          return {
            totalCount: result.data.repository.pullRequests.totalCount,
            nodes: result.data.repository.pullRequests.nodes
          }
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
