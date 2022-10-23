import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() isFullScreen: boolean = true;
  @Input() hasLoadingParagraph: boolean = true;
  @Input() loading: boolean = false;
  @Output() spinnerStopEvent: EventEmitter<void> = new EventEmitter<void>();

  subscriptions: Subscription = new Subscription();

  constructor(
    private spinner: NgxSpinnerService,
    private httpService: HttpService
  ) {
    this.subscriptions.add(
      this.httpService.startReqAsObservable.subscribe(() => {
        this.loading = true;
      })
    );

    this.subscriptions.add(
      this.httpService.endFinalReqAsObservable.subscribe(() => {
        this.loading = false;

        this.spinnerStopEvent.emit();
      })
    );
  }

  ngOnInit() {
    this.spinner.show('primary', {
      bdColor: 'rgba(0, 0, 0, 0.4)',
      size: 'medium',
      color: '#fff',
      type: 'ball-clip-rotate',
      fullScreen: this.isFullScreen,
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
