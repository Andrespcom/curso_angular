// import { Person } from './08-classes';
export class Person {
    // public name?: string | undefined;
    // private address?: string | undefined;

    constructor(
        public firstName: string,
        public lastName: string,
        public address?: string
    ) {}
}

// export class Hero extends Person{



//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ){
//         super( realName,'New York' );        
//     }
// }

export class Hero {

    // public person : Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ) {
        // this.person = new Person(realName);
    }
}

const tonyPerson = new Person('Tony','Stark', 'New Yorl');
const ironMan = new Hero('IronMan', 45, 'Tony',tonyPerson);
// ironMan.person.firstName = 'Tony';
// ironMan.person.lastName = 'Stark';
// ironMan.person.address = 'New York';
console.log(ironMan);