//Ex1 - 基本Promise語法
const promise1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
    resolve("成功的話，會呼叫resolve方法！");
    reject("失敗的話，會呼叫reject方法！");
    }, 3000);
});

console.log(promise1); 
promise1
    .then(result => {
        console.log("成功的回傳值：" + result);
        console.log(promise1);
    })
    .catch(ex => {
        console.log("失敗原因 : " + ex);
        console.log(promise1);
    })
    .finally(() => {
        console.log("Promise finally 完成");
        console.log(promise1);
    });

console.log(promise1);

