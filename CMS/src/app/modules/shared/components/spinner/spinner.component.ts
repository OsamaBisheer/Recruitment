/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() loading: boolean = false;

  subscriptions: Subscription = new Subscription();

  constructor(private httpService: HttpService) {
    this.subscriptions.add(
      this.httpService.startReqAsObservable.subscribe(() => {
        this.loading = true;
      })
    );

    this.subscriptions.add(
      this.httpService.endFinalReqAsObservable.subscribe(() => {
        this.loading = false;
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
