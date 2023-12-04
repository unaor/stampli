import { Component, Input, OnInit } from '@angular/core';
import { CustomFieldElement } from '../model/CustomFieldElement';

@Component({
  selector: 'app-element-renderer',
  templateUrl: './element-renderer.component.html',
  styleUrls: ['./element-renderer.component.css']
})
export class ElementRendererComponent implements OnInit {

  @Input()
  element!: CustomFieldElement;
  values: string[] = [];

  TEXT_INPUT = 'TEXT_INPUT';
  SELECT = 'SELECT';

  ngOnInit(): void {
    if(this.element.type === this.SELECT) {
      this.values = this.element.value.split(',')
    }
  }

}
