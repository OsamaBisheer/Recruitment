import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthorizedUrl: boolean = false;

  constructor(router: Router) {
    router.events
      .pipe(filter((e) => e instanceof NavigationStart) as any)
      .subscribe((event: any) => {
        this.isAuthorizedUrl = (event.url as string).startsWith('/job-titles');
      });
  }

  ngOnInit() {}
}
