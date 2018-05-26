import { Component, OnInit, ViewChild } from '@angular/core';
import { GitubDataService } from './shared/github-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GitHub Repo Listing';
  pullRequests: Array<any> = new Array();
  totalCount = 0;
  itemsPerPage = 10;
  repository = 'Typescript';
  owner = 'Microsoft';
  token = '';
  search = '';
  pageInfo = {};

  constructor(private githubDataService: GitubDataService) {}

  ngOnInit() {}

  loadRequests(cursor?: string, nextPage?: boolean) {
    if (this.token !== '') {      
      if (this.search !== '') {
        this.githubDataService.filterPullRequests(this.owner, this.repository, this.token, this.itemsPerPage, 
          this.search, cursor, nextPage)
        .subscribe(result => {
          this.totalCount = 0;
          this.pullRequests = result.nodes;
          this.pageInfo = result.pageInfo;
        });
      } else {
        this.githubDataService.getPullRequests(this.owner, this.repository, this.token, this.itemsPerPage, cursor, nextPage)
        .subscribe(result => {
          this.totalCount = result.totalCount;
          this.pullRequests = result.nodes;
          this.pageInfo = result.pageInfo;
        });
      }        
    }
  }
}
