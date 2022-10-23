import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header-light',
  templateUrl: './page-header-light.component.html',
  styleUrls: ['./page-header-light.component.scss'],
})
export class PageHeaderLightComponent implements OnInit {
  @Input() link: string = '/';

  constructor() {}

  ngOnInit(): void {}
}
