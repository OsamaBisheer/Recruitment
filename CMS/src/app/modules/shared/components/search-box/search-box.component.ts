import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
})
export class SearchBoxComponent {
  @Output() onEnter = new EventEmitter<string>();

  @Input() model: string;
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  keydownEnter() {
    this.onEnter.emit();
  }

  changeValue(event: any) {
    this.modelChange.emit(this.model);
  }
}
