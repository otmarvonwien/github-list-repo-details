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
  totalCount: number;
  itemsPerPage = 10;
  repository = 'Typescript';
  owner = 'Microsoft';
  token = '';
  pageInfo = {};
  @ViewChild('f') myForm: NgForm;

  constructor(private githubDataService: GitubDataService) {}

  ngOnInit() {}

  loadRequests(cursor?: string, nextPage?: boolean) {
    if (this.token !== '') {
      this.githubDataService.getPullRequests(this.owner, this.repository, this.token, this.itemsPerPage, cursor, nextPage)
        .subscribe(result => {
          this.totalCount = result.totalCount;
          this.pullRequests = result.nodes;
          this.pageInfo = result.pageInfo;
          console.log(result);
        });
    }
  }
}
