var person = { name: "Kevin", age: "32", height: 175, weight: 64 };
// console.log(person);
// console.log(person.name);
// console.log(person.age);
// console.log(person.height);
// console.log(person.weight);

// console.log(".".repeat(60));
// console.log(person["name"]);
// console.log(person["age"]);
// console.log(person["height"]);
// console.log(person["weight"]);

// object.keys() values()
let keys = Object.keys(person);
let values = Object.values(person);

console.log(keys);
console.log(values);

keys.forEach((item, index) => {
    console.log(item + ":" + person[item]);
})

for (let item in person) {
    console.log(person[item])
}
people
let people = [
    { name: "Kevin", age: "32", height: 175, weight: 64 },
    { name: "Mary", age: "28", height: 163, weight: 48 },
    { name: "Emily", age: "22", height: 160, weight: 59 }
];
console.log(people);

people.forEach((item, index) => {
    console.log(item);//item可自行替換
})

people.forEach((person, index) => {
    let keys = Object.keys(person);
    let msg = index + ".";
    keys.forEach((key, index) => {
        msg += key + ":" + person[key] + ",";
    });
    console.log(msg);
});

var person = {
    name: "Kevin",
    age: 32,
    height: 175,
    weight: 64,
    bmi: function () {
        //object literal語法需要⽤this才能存取到本⾝屬性
        return this.weight / ((this.weight / 100) ** 2);
    }
};

console.log(person);
console.log(person.bmi());

var person = {
    name: "Kevin", age: 32,
    height: 175, weight: 64
};

var person = {
    name: "Kevin", age: 32,
    height: 175, weight: 63
};

console.log(person);
console.log("This Object is" + person);
console.log("This Object is %o", person);
console.log("This Object is :" + JSON.stringify(person));

var jsonText = JSON.stringify(person);
console.log(typeof jsonText);

var p = JSON.parse(jsonText);
console.log(p);
console.log(typeof p);

var person = {
    name: "Kevin", age: 32, height: 175, weight: 64,
        bmi: function(){
        return this.weight / ((this.height / 100) ** 2);
    }
};
console.log(person);
console.log(person.bmi());

let person = { name: "Kevin", age: 32,
 height: 175, weight: 64 }; 
// console.log(person.name)

console.log(Object.keys(person))
Object.keys(person).forEach((item,index)=>{
    console.log(item)
})
console.log(Object.values(person))
//  console.log(person)
//  console.log('The Object is ' + person)
//  console.log('This Object is %o',person)
 let JsonText = JSON.stringify(person);
 console.log(JsonText);
 console.log(typeof JsonText);
 let p = JSON.parse(JsonText);
 console.log(p);
 console.log(typeof p)
 var person ={"full-name": "Kevin", age: 32, height: 175, weight: 64}
 console.log(person["full-name"])