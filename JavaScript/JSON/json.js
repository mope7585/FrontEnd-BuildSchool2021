let person = {
    name: "kevin",
    age: "35",
    phone: {
        mobile: "0912-123-456",
        tel: "03-3345678"
    },
    cars: ["BMW", "BenZ", "Lexus"]
};

console.log(person)
console.log(typeof person)


let jsonText = JSON.stringify(person);

let json = '{"age ":35,"name" :"kevin", "cars": "[ "BMW", "BenZ", "Lexus" ]","phone" :{ mobile: "0912-123-456", tel: "03-3345678"}}';
let personObject = JSON.parse(json);
console.log(personObject);
console.log(personObject.name);
console.log(typeof personObject)
