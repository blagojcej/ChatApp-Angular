import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  
  toolbarElement: any;

  constructor() { }

  ngOnInit() {
    //select element with class nav-content (look at toolbar component which item has this class)
    this.toolbarElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit(): void {
    this.toolbarElement.style.display = 'none';
  }

}
