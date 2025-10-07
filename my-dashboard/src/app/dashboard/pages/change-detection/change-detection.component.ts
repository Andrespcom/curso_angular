import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TitleComponent } from "@shared/title/title.component";

@Component({
  standalone: true,
  selector: 'app-change-detection',
  imports: [TitleComponent, JsonPipe],
  templateUrl: './change-detection.component.html',
})
export default class ChangeDetectionComponent {
  public currentFramework = computed(
    () => `Change detection - ${ this.frameworkAsSignal().name }`
  );


  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };


  constructor() {

    setTimeout(() => {


        // this.frameworkAsProperty.name = 'React';
        this.frameworkAsSignal.update( value => {
          value.name = 'React';

          return {...value};
        })

        console.log('Hecho');
    }, 3000);


  }
}
