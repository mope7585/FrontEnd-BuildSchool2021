function circle(r){
let area = parseFloat(r) * Math.PI * 2.0;
return area;
}
console.log(circle(5));

const getRectArea = function(height,width)
{
    return height*width;
}

console.log(getRectArea(3,2));

const computRecArea = new function("height", 'width' , ' return height * width') {
    console.log(computRecArea(9,7))
}

window.onload = function(){
    setMovie();
}
function setMovie(){
    let h1 = document.querySelector('h1');
    let img = document.getElementById('image');
    h1.innerText    = moviename;
    h1.innerHTML = `<b>${moviename}</b>`;

    img.src = movie;
}