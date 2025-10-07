import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase',
})
export class ToggleCasePipe implements PipeTransform {

  transform(value: string,upper: boolean): string {
    // if(!upper){
    //   return value;
    // }else{
    //   return value.toUpperCase();
    // }
    return upper ? value.toUpperCase() : value.toLowerCase();
  }

}
