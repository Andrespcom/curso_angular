import { Hero } from '../interfaces/hero.interface';
import { heroes } from './../data/heroes.data';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroSortBy',
})
export class HeroSortByPipe implements PipeTransform {
  transform(value: Hero[], sortBy: keyof Hero | null, ...args: unknown[]): Hero[] {
    if (!sortBy) return value;

    switch (sortBy) {
      case 'canFly':
        return value.sort((a, b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1));
      case 'name':
        return value.sort((a, b) => a.name.localeCompare(b.name));
      case 'color':
        return value.sort((a, b) => a.color - b.color);
      case 'creator':
        return value.sort((a, b) => a.creator - (b.creator));
      default:
        return value.sort((a, b) => a.id - b.id);
    }
  }
}
