
const skills: string[] = ['Bash', 'Counter', 'Healing'];

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

const andres: Character = {
    name: 'Andres',
    hp: 100,
    skills: ['Bash', 'Counter']
};

andres.hometown = 'Vigo';

console.log(andres);
console.table(andres); 
