import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent implements OnChanges {
  @Input() title: string;
  @Input() message: string;
  @Input() isShow: boolean;
  @Output() action: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild("confirmDialog", { static: false }) confirmDialog: ModalDirective;

  constructor() {}

  ngOnChanges(): void {
    if (this.isShow) this.confirmDialog.show();
  }

  confirmDelete() {
    this.action.emit();
    this.close();
  }

  close() {
    this.confirmDialog.hide();
    this.closeEvent.emit();
  }
}
