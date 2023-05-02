import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "app-generic-dropdown",
  templateUrl: "./generic-dropdown.component.html",
  styleUrls: ["./generic-dropdown.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericDropdownComponent<T> {
  @Input() floatLabel: boolean = true;
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() labels = {
    label: "",
    loadingMessage: "",
    emptyMessage: "",
    placeholder: "",
  };
  @Input() inputId: string = "";
  @Input() filterBy: string = "";
  @Input() disabled: boolean = false;

  @Input() items: T[] = [];
  @Input() selectedItem?: T;

  @Input() isLoading = false;

  @Output() onChange = new EventEmitter<T>();

  constructor() {}

  onItemChange() {
    this.onChange.emit(this.selectedItem);
  }
}
