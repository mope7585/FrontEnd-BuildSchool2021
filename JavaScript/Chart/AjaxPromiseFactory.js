/* 呼叫使用方式Example
 * 
         window.onload = function () {
            document.querySelector("button").addEventListener("click", function () {

                document.querySelector("button").disabled = true;

                let ajaxPromiseFactory = new AjaxPromiseFactory();
                let promise = ajaxPromiseFactory.getPromise("$xhr", championsJsonUrl);

                promise
                    .then((response) => {
                        //取得所有英雄人物資料(Object)
                        championsObject = response.data;

                        //載入所有的Champions英雄卡片資料
                        loadAllChampions();

                    })
                    .catch((ex) => {
                        console.log("失敗原因:" + ex);
                    })
                    .finally(() => {
                        enableButton();
                    })
            });

        };
*/


//Simple Factory will return Promise
function AjaxPromiseFactory() {
    this.getPromise = function (type, url) {
        switch (type) {
            case "$xhr":
                return new $xhr(url);
                break;
            case "$fetch":
                return new $fetch(url);
                break;
        }
    }

    this.postPromise = function (type, json) {
        switch (type) {
            case "":
                break;

        }
    }
}

//Promise + XMLHttpRequest
let $xhr = function (url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.status);
        // xhr.onload = () => resolve(this.response);
        // xhr.onerror = () => reject(this.status);
        xhr.send()
    });
}

//fetch will return promise
let $fetch = function (url) {
    return fetch(url)
        .then(response => response.json())
}