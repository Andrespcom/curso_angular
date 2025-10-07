import { computed } from '@angular/core';
import { Component, signal } from '@angular/core';
import { Character } from '../../interfaces/character.interface';



@Component({
  imports: [],
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 99999,
    }
  ]);

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    //this.characters().push(newCharacter) //FORMA FACIL

    this.characters.update((list) => [...list, newCharacter]); //FORMA GUAY

    console.log(this.name(), this.power() + 'added');
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

  // powerClasses = computed( () => {
  //   return{
  //     'text-danger': true
  //   }
  // } )
}
