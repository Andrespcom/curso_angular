import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-view-transition',
  imports: [CommonModule, TitleComponent],
  templateUrl: './view-transition1.component.html',
})
export default class ViewTransition1Component { }
