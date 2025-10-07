import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanFlyPipe } from "../../pipes/can-Fly.pipe";
import { HeroColorPipe } from "../../pipes/hero-color.pipe";
import { HeroTextColorPipe } from "../../pipes/hero-text-color.pipe";
import { TitleCasePipe } from '@angular/common';
import { CreatorPipe } from "../../pipes/creator.pipe";
import { HeroSortByPipe } from "../../pipes/hero-sortBy.pipe";
import { Hero } from '../../interfaces/hero.interface';
import { HeroFilterPipe } from "../../pipes/hero-filter.pipe";

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, CanFlyPipe, HeroColorPipe, HeroTextColorPipe, TitleCasePipe, CreatorPipe, HeroSortByPipe, HeroFilterPipe],
  templateUrl: './custom-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomPageComponent { 

name = signal('Andres Pérez');
upperCase = signal(true);
heroes = signal(heroes);

sortBy = signal<keyof Hero | null>(null);
searchQuery = signal('');

}
