function $g(Cssselectorrule){
    if(Cssselectorrule.includes("#")){
        return document.querySelector(Cssselectorrule);
    }

    let nodelist = document.querySelectorAll(Cssselectorrule);
    
    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

function $getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
export{ $g, $getRandom }