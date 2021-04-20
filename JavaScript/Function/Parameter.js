const print = function (...Args) {
console.log(typeof Args);
console.log(Args instanceof Array) ;
console.log(Args[0]);   
console.log(Args[1]);   
console.log(Args[2]);
console.log(Args[3]);
console.log(Args.join('-'));   
}
print("昔⼈已乘黃鶴去","此地空餘黃鶴樓","黃鶴⼀去不復返","雲千載空悠悠"); 
