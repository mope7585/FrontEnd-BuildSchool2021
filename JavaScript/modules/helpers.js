function $g(selector) {
    if (selector.includes('#') && !selector.includes(' ')) {
        // 回傳Element
        return document.querySelector(selector);
    }

// 回傳NodeList集合
let nodelist = document.querySelectorAll(selector);

return nodelist.length == 1 ? nodelist[0] : nodelist;

}
function genUl(liArray) {
    let ul = document.createElement("ul");

    liArray.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = item;
        ul.appendChild(li);
    });
    return ul;
}



export { $g ,genUl};