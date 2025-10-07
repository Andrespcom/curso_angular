
export function whatsMyType<T>(argument: T) : T{
    return argument;
}

let amIString = whatsMyType('Hola Mundo');
let amINumber = whatsMyType(100);
let amIArray = whatsMyType([1,2,3,4,5,6]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));