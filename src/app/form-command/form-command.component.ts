import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomFieldElement } from '../model/CustomFieldElement';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-command',
  templateUrl: './form-command.component.html',
  styleUrls: ['./form-command.component.css']
})
export class FormCommandComponent implements OnInit {

  form: any;
  commandsForm: any;
  errorMsg: string = '';

  @Output() commandsChangedEvent: EventEmitter<CustomFieldElement[]> = new EventEmitter<CustomFieldElement[]>();


  commands: CustomFieldElement[] = [];

  constructor(private fb: FormBuilder) {
    this.commandsForm = this.fb.group({
      command: new FormControl('', [Validators.required]),
    });

    this.form = this.fb.group({
      commands: this.fb.array([this.commandsForm]),
    });


  }
  ngOnInit(): void {

  }

  clearError() {
    this.errorMsg = '';
  }

  get commandArray(): FormArray {
    return this.form.get('commands') as FormArray;
  }

  addCommand(): void {
    this.clearError();
    const lastControl = this.commandArray.controls[this.commandArray.length - 1];
    if (lastControl && lastControl.invalid) {
      this.errorMsg = 'Invalid command format, please write a valid command like shown in the example';
      return;
    }
    const newCommandForm = this.fb.group({
      command: new FormControl('', [Validators.required]),
    });
    this.commandArray.push(newCommandForm);
  }

  removeCommand(index: number): void {
    this.clearError();
    this.commandArray.removeAt(index);
  }

  prepareInputForGrid() {
    this.clearError();
    const uniqueElements: Set<string> = new Set();
    this.commands = [];
    this.commandArray.controls.forEach((control: AbstractControl) => {
      const members = (control as FormControl).value.command.split(';');
      if (members.length != 5) {
        this.errorMsg = `Looks like you have invalid format in here: ${control.value.command}`;
        throw new Error('No commands found, make sure you seperate them with a new line');
      }
      this.commands.push(this.generateCommand(members));
    });
    
    this.commands.forEach(command => {
      const key = `${command.line}-${command.column}`;
      if (uniqueElements.has(key)) {
        this.errorMsg = `Looks like you have duplicated elements in here: ${command.line}-${command.column}`;
        throw new Error('Duplicate command location found');
      }
      uniqueElements.add(key);
    });
    this.commandsChangedEvent.emit(this.commands);
  }

  generateCommand(members: string[]): CustomFieldElement {

    const line = parseInt(members[0]);
    const column = parseInt(members[1]);
    if (isNaN(line) || isNaN(column)) {
      this.errorMsg = `Looks like you have invalid format in here: ${members.join(';')}`;
      throw new Error('No commands found, make sure you seperate them with a new line');
    }
    return {
      line: line,
      column: column,
      label: members[2],
      type: members[3],
      value: members[4]
    }


  }



}
