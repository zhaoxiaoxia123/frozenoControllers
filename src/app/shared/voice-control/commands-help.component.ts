import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'sa-commands-help',
  templateUrl: './commands-help.component.html',
  styles: [],
})
export class CommandsHelpComponent implements OnInit {

  @ViewChild('seeCommandsModal', { static: true }) seeCommandsModal;

  constructor() {}

  ngOnInit() {
  }

  public show(){
    this.seeCommandsModal.show()
  }

  public hide(){
    this.seeCommandsModal.hide()
  }
}
