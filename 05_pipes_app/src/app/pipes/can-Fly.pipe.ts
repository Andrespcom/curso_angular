import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {

  transform(value: boolean): string {
    switch(value){
      case true: return 'Puede volar';
      case false: return 'No puede volar'
    }
  }

}
