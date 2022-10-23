import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'body',
  template:
    '<router-outlet></router-outlet> <toaster-container [toasterconfig]="toasterconfig"></toaster-container>',
})
export class AppComponent implements OnInit {
  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000,
  });

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
