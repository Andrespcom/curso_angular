export interface Product {
    description: string;
    price: number;

}

interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

const phone: Product = {
    description: 'Iphone 15',
    price: 800
}

const tablet: Product = {
    description: 'Ipad Air',
    price: 1200
}

// function taxCalculation( options:TaxCalculationOptions ): [number, number]{
export function taxCalculation(options: TaxCalculationOptions): [number, number] {

    const { tax, products } = options;

    let total = 0;

    products.forEach(({ price }) => {
        total += price;
    });

    return [total, total * tax];
}

const shopppingCart = [phone, tablet];

const taxConst = 0.15;

const [total, taxTotal] = taxCalculation({
    products: shopppingCart,
    tax: taxConst,

})

// console.log('TOTAL: ', total);
// console.log('Tax: ', taxTotal);

