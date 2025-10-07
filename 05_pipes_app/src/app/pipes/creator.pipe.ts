import { Pipe, type PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'creator',
})
export class CreatorPipe implements PipeTransform {

  transform(value: Creator): unknown {
    return Creator[value];
  }

}
