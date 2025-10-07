import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
    templateUrl: './hero-page.component.html',
    imports: [UpperCasePipe],
    styles: `
        button {
            padding: 5px;
            margin: 5px 10 px;
            width: 75px;
        }
    `
})
export class HeroPageComponent {

    name = signal('Ironman');
    age = signal(45);

    nameStr: string = this.name.toString();
    ageStr: string = this.age.toString();

    heroDescription = computed(() => {
        const description = `${this.name()} - ${this.age()}`;
        return description;
    })

    capitalizedName = computed(() => {
        const upperName = this.name().toUpperCase();
        return upperName;
    })

    constructor() {

    }

    changeHero() {
        this.age.set(22);
        this.name.set('Spiderman');
    }

    resetForm() {
        this.name.set('Ironman');
        this.age.set(45);
    }

    changeAge() {
        this.age.set(60);
    }
}