function $g(selector) {
    if (selector.includes('#') && !selector.includes(' ')) {
        // 回傳Element
        return document.querySelector(selector);
    }

    // 回傳NodeList集合
    let nodelist = document.querySelectorAll(selector);
    return nodelist.length == 1 ? nodelist[0] : nodelist;
};


function genUl(liArray) {
    let ul = document.createElement("ul");

    liArray.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = item;
        ul.appendChild(li);
    });
    return ul;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * max + min);
}
console.log(getRandom(1, 100));


function $c(element, text) {
    let el = document.createElement(element);

    if (text !== null && text !== undefined && text.length > 0) {
        el.innerText = text;
    }
    return el;
}

function $ce(element, text){
    let el = document.createElement(element);
    if(text !== "" && text !== null){
        el.innerText = text ;
    }
    return el;
}

function $drawChart(ctx,xArray,yArray){
    let chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xArray,
            datasets: [{
                label: "臺機電",
                data: yArray,
                fill: false,
                backgroundColor: 'rgba(255,165,0,0.3)',
                borderColor: 'rgb(255,165,0)',
                pointStyle: "circle",
                pointBackgroundColor: 'rgb(0,255,0)',
                pointRadius: 5,
                pointHoverRadius: 10,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                fontSize: 26,
                text: '2020台積電股價'
            },
            tooltips: {
                mode: 'point',
                intersect: true,
            },
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: 'black',
                }
            }
        }
    });
}
export { $g, genUl, getRandom, $c , $ce, $drawChart };