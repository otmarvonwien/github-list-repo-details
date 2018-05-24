import { Component, OnInit } from '@angular/core';
import { GitubDataService } from './shared/github-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GitHub Repo Listing';
  pullRequests: number;
  repository = 'Typescript';
  owner = 'Microsoft';

  constructor(private githubDataService: GitubDataService) {}

  ngOnInit() {
    this.githubDataService.getPullRequests(this.owner, this.repository)
      .subscribe(result => {
        this.pullRequests = result.pullRequests;
      });
  }
}
