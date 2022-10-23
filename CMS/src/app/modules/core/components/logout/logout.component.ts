import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/modules/shared/services/http.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
  constructor(private httpService: HttpService) {
    this.httpService.toLogin();
  }

  ngOnInit() {}
}
