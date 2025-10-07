import { Component, signal } from "@angular/core";

@Component({
    templateUrl:'./counter-page.component.html',
    styles: `
        button {
            padding: 5px;
            margin: 5px 10 px;
            width: 75px;
        }
    `
})
export class CounterPageComponent {

    counter = 0;
    counterSignal = signal(0);


    constructor(){
        
    }


    increaseBy(value: number) {
        this.counter += value;

        this.counterSignal.update((current) => current + value);
    }

    decreaseBy(value: number) {
        if(this.counter >0){
            this.counter -= value;
        }else{
            this.counter = this.counter;
        }            
    }

    resetCounter() {
        this.counter = 0;
        this.counterSignal.set(0);
    }

}