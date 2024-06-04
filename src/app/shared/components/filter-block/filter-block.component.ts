import {Component, Input} from '@angular/core';
import {Model} from "../../../products/interfaces/model";

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrl: './filter-block.component.css'
})
export class FilterBlockComponent {
  @Input() filters: any[] = [];
  @Input() labela!: string;
  @Input() type!: string;
@Input() tip!: string;

  filterProducts(event: any, type: string, name: string) {
    console.log(this.filters);
  }

}
