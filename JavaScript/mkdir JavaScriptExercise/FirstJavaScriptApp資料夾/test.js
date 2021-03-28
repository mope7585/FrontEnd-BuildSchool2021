let username = "mary"; //global

{
    let username = "kevin";
    console.log(username)//kevin   local
}
console.log(username); //kevin

var username = "mary";

{
    var username = "kevin";
    console.log(username)//kevin
}
console.log(username); //mary

