const title = function (title) {
    console.log('');
    console.log(`=========${title}==========`);
}
title('一維陣列')
let array1 = [];
let array2 = new Array();
let array3 = new Array(10);

let Computer = ["CPU", "DRAM", "SSD", "Mouse"];
console.log(typeof Computer);
console.log(Computer instanceof Array);
console.log(Array.isArray(Computer));

let products = [
    ['CPU', 'DRAM', 'SSD', 'Mouse'],
    ['BMW', 'Benz', 'Audi', 'Lexus'],
    ['Apple', 'Banana', 'Cherry']
];

for (let i = 0; i < Computer.length; i++) {
    console.log(Computer[i]);
}
Computer.forEach(function (item, index) {
    console.log(`${index},${item}`);
})
console.log('.', repeat(60))

Computer.forEach((item, index) => {
    console.log(`${index},${item}`);
}
)

var array1 = [1, 3, 5, 7]

//顯示型別-不精準
console.log(typeof array1);
//判斷是否為Array實例-精準
console.log(array1 instanceof Array);
console.log(Array.isArray(arra1));

function listArray(arraydata) {
    if (Array.isArray(arraydata)) {
        arraydata.forEach((item, index) => {
            console.log(`第${index}個:${item}`)
        })
    }
    else {
        console.log('參數型別不是陣列，導致錯誤')
    }
}
listArray('myName')

let Cars = ['BMW','Benz','Audi','Lexus'];
Cars.forEach(function(item,index){
    console.log(index,item,typeof item)
})

//或用Arrow Function
Cars.forEach((item,index)=>{
    console.log(index,item,typeof item)
})

let districtObject = {
    taipei: [
        { id: 'taipei01', district: '中正區' },
        { id: 'taipei02', district: '萬華區' },
        { id: 'taipei03', district: '信義區' }],
    taoyuan: [
        { id: 'taoyuan01', district: '桃園市' },
        { id: 'taoyuan02', district: '八德市' },
        { id: 'taoyuan03', district: '中壢市' }],
    taichung: [
        { id: 'taichung01', district: '台中市' },
        { id: 'taichung02', district: '大⾥市' },
        { id: 'taichung03', district: '清水市' }]
};

let cities = Object.keys(districtObject);
let values = Object.values(districtObject);

let index =1;
cities.forEach((city) => {
    // console.log(city)
    let districtArray = districtObject[city];
    // console.log(districtObject[city])
    

    districtArray.forEach(dtRow => {
        // console.log(`${index++}. city = ${city}, id =${dtRow.id}, district= ${dtRow.district}<br>`);
        console.log(dtRow)
    });
});