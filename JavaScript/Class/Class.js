class Rectangle{
    constructor(height,width){
        this.name='四邊形'
        this.height= height;
        this.width = width;
    }

    get area(){
        return this.height * this.width;
    }
}
var r = new Rectangle(6,3);
console.log(r);
console.log(r.area);