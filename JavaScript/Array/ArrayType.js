const title = function(title){
    console.log('');
    console.log(`=========${title}==========`);
}
title('一維陣列')
let array1 = [];
let array2 = new Array();
let array3 = new Array(10);

let Computer = ["CPU","DRAM","SSD","Mouse"];
console.log(typeof Computer);
console.log(Computer instanceof Array);
console.log(Array.isArray(Computer));

for (let i=0;i<Computer.length ;i++){
console.log(Computer[i]);
}
Computer.forEach(function (item,index) {
console.log(`${index},${item}`);    
})
console.log('.',repeat(60))

Computer.forEach((item,index)=>
{
    console.log(`${index},${item}`); 
}
)