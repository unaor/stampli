import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CustomFieldElement } from '../model/CustomFieldElement';

@Component({
  selector: 'app-grid-renderer',
  templateUrl: './grid-renderer.component.html',
  styleUrls: ['./grid-renderer.component.css']
})
export class GridRendererComponent implements OnChanges {

  numLines = 0;
  numColumns = 0;

  @Input()
  commands: CustomFieldElement[] = [];

  ngOnChanges(): void {
    this.prepareGrid();
  }

  getNumberArray(num: number): number[] {
    return new Array(num);
  }

  checkMobile() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return  screenWidth < 400;
  }

  prepareGrid() {
    this.commands.sort((a, b) => a.column > b.column ? 1 : -1);
    this.numColumns = this.commands[this.commands.length - 1].column;
    this.commands.sort((a, b) => a.line > b.line ? 1 : -1);
    this.numLines = this.commands[this.commands.length - 1].line;
    if(this.checkMobile()) {
      const uniqueElements: Set<string> = new Set();
      this.numColumns = 1;
      this.commands.forEach(command => {
        command.column = 1;
        let key = `${command.line}-${command.column}`;
        if(uniqueElements.has(key)) {
          while(uniqueElements.has(key)) {
            command.line++;
            if (command.line > this.numLines) { 
              this.numLines = command.line;
            }
            key = `${command.line}-${command.column}`;
          }
          key = `${command.line}-${command.column}`;
        }
        uniqueElements.add(key);
      });
    }
  }

  getElementByCoords(line: number, column: number): CustomFieldElement[] {
    const elementToRender = this.commands.filter(c => c.line == line && c.column == column);
    return elementToRender;
  }

  clear() {
    this.numLines = 0;
    this.numColumns = 0;
    this.commands = [];
  }

}
