import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-logo-bar',
  templateUrl: './logo-bar.component.html',
  styleUrls: ['./logo-bar.component.scss'],
})
export class LogoBarComponent implements OnInit {
  constructor(private http: HttpService) {}

  ngOnInit() {}

  logOut() {
    this.http.logout();
  }
}
