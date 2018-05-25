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
  repository = 'Typescript';
  owner = 'Microsoft';
  token = '';
  @ViewChild('f') myForm: NgForm;

  constructor(private githubDataService: GitubDataService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.token !== '') {
      this.githubDataService.getPullRequests(this.owner, this.repository, this.myForm.value.token)
      .subscribe(result => {
        this.totalCount = result.totalCount;
        this.pullRequests = result.nodes;
      });
    }
  }
}
