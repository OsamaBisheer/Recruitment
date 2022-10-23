import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { getNavItems } from '../../models/nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  public sidebarMinimized = false;
  public navItems = [];
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {
    this.navItems = getNavItems();
  }

  ngOnInit() {
    const token = localStorage.getItem('token') as string;
    if (token == null) this.router.navigate(['/login']);
  }

  toggleMinimize(e: any) {
    this.sidebarMinimized = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
