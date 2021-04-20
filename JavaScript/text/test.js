var name = "kevin";
let age = 35;
const weight = 65;
{
    var name = "Mary";
    let age = 26;
    const weight = 46;
}
console.log(name);
console.log(age);
console.log(weight);


function displayTime(){
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    console.log(`${h}:${m}:${s}<br/>`);
}