let Computer = ['CPU', 'DRAM' , 'SSD', 'Mouse'];
let comp = new Array('CPU', 'DRAM' , 'SSD',
 'Mouse');
let Cars = ['BMW', 'Benz', 'Audi', 'Lexus'];
let Prices = [280, 320, 250, 210];
let Fruits = ['Apple', 'Banana', 'Cherry'];
let Person = ['John', 35, 'john@gmail.com']; 
let friends = ['David', 'Mary', 'John'];
friends=[]; //重新指派⼀個空陣列
friends.length=0; //將length設為0
friends.splice(0, friends.length); //移除N個陣列元素

let Fruits = ['Apple', 'Banana', 'Cherry'];
let text1 = Fruits[0]+Fruits[1]+Fruits[2];
// console.log(text1);

let text2= "";
Fruits.forEach((item,index)=>{
    text2 += item;
});
// console.log(text2);
const fruits = ["Apple", "Banana" , "Cherry"];
console.log(fruits.join());
console.log(fruits.join(','));
console.log(fruits.join('-')); 

let Friends = [];
Friends.push('Mary','Mao','Stanely');
console.log(Friends);

Friends.pop();
console.log(Friends);

var array1 = ['a','b','c'];
var array2 = ['d','e','f'];
var array3 = array1.concat(array2);

console.log(array3);

// Ex-用Spared Syntax
var array4 = [ ...array1, ...array2];
console.log(array4);

var prods = Computer.concat(Cars).concat(Fruits);
console.log(prods);

let Cars = ['BMW', 'Benz', 'Audi', 'Lexus'];
console.log(Cars);
console.log(Cars.reverse());
console.log(Cars.sort());
console.log(Cars.sort().reverse()); 
console.log('.'.repeat(60));

let car = Cars.find( c => c =='Benz');
console.log(car);
let index = Cars.indexOf('Audi');
console.log(index);
let idx = Cars.findIndex(c => c=="Benz");
console.log(idx);

let Prices = [280, 320, 250, 210];
console.log(Prices.findIndex(a => a>300));

console.log(Prices.filter(a => a >250));

Prices.filter(function (item,index) {
    if(item>250){
        console.log(Cars[index] + "'s prtice is " + item + ",it's large 250.")
    }
})