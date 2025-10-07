import {type Product, taxCalculation} from './06-function-destructuring'

const shopppingCart: Product[] = [
    {
        description: 'iPhone',
        price : 800
    },
    {
        description: 'iPad',
        price : 1200
    }
];

const [total, tax] = taxCalculation({
    products: shopppingCart,
    tax : 0.15
});

console.log('Total: ', total);
console.log('Tax: ', tax);

export{}