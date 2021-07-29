var Cars = ['BMW', 'Benz', 'Audi', 'Lexus'];
var Prices = [280, 320, 250, 210]; 

var PricesWithTax = Prices.map(p => p * 1.05);
console.log(PricesWithTax);
console.log('*_'.repeat(60))
// let total = 0;
// Prices.forEach(item=>{
//     total += item;
// })
let totalPrice = Prices.reduce(function(total,item){
    return total + item;
})
console.log(totalPrice )