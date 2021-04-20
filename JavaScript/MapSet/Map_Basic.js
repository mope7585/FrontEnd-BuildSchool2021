//宣告變數
var taiwanArray = ['台灣',41,1,12];
var chinaArray = ['中國',80134,2914,44595];
var americaArray = ['美國',9665,146,694];

var map = new Map();    //初始化Map物件
//Ex1:加入key-value pairs資料到Map物件
map.set('taiwan',taiwanArray);
map.set('china',chinaArray);
map.set('america',americaArray);
console.log(map);

//讀取Map成員
console.log(map.get('america'));
console.log(map.get('taiwan'));
console.log(map.get('china'));


//刪除指定key的key-value pair
map.delete('china');

//clear()全部清除
map.clear();

/**Iteration迴圈迭代for...of*/
//Ex3 - key
for (let key of map.keys()) {
    console.log(key);
} 

//Ex4 - value
for(let value of map.values()){
    console.log(values);
}

//Ex5 - key & value
for (let [key, value] of map) {
    console.log(`${key} : ${value}`);
   }
   