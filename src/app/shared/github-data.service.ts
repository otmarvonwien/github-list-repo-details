import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitubDataService {

  constructor(private http: HttpClient) { }

  getPullRequests(user: string, repo: string, token: string, itemsPerPage: number, 
      cursor?: string, nextPage?: boolean): Observable<any> {
    const httpOptions =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    }

    // for Pagination
    let startPoint = '';

    if (nextPage && cursor) {
      startPoint = `after: "${cursor}", `;
    } else if (!nextPage && cursor) {
      startPoint = `before: "${cursor}", `;
    }

    const queryString = `
      query { 
        repository (owner:"${user}", name:"${repo}") { 
          pullRequests (first: ${itemsPerPage}, ${startPoint}states: OPEN, orderBy: {
            direction: DESC, field: CREATED_AT 
          }) {
            totalCount
            nodes {
              id
              title
              createdAt
              bodyHTML
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          } 
        }
      }
    `;

    console.log(queryString);

    const body = {
      query:  queryString
    };

    return this.http.post<any>('https://api.github.com/graphql', body, httpOptions)
      .pipe(
        map(result => {
          return {
            totalCount: result.data.repository.pullRequests.totalCount,
            nodes: result.data.repository.pullRequests.nodes,
            pageInfo: result.data.repository.pullRequests.pageInfo
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
