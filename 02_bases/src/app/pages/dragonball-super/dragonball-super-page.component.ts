import { DragonballService } from './../../services/dragonball.service';
import { Component, inject } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';

@Component({
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
})
export class DragonballSuperPageComponent {
  public DragonballService = inject(DragonballService);
}
