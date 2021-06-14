//EX1
const promise1 = new promise(function(resolve,reject)
{
    setTimeout(() => {
        resolve('執行成功會呼叫resolve方法');
    }, 3000);
});

promise1
.then(result =>{
    console.log(result);
})
.catch(ex=>{
    console.log('Error '+ ex);
})
.finally(()=>{
    console.log('promise finally done')
})

//Ex2
const promise2 = new promise(function(resolve,reject)
{
    setTimeout(() => {
        resolve('執行成功會呼叫resolve方法');
    }, 3000);
});

promise2.then(result=>{
console.log(result);
})
.catch(ex =>{
    console.log('error: '+ ex)
})
.finally(()=>{
    console.log('promise finally done')
})

//Ex3
const promise3 = new promise(function(resolve,reject)
{
    setTimeout(() => {
        resolve('執行成功會呼叫resolve方法');
    }, 3000);
});

const promise3 = new Promise(function(resolve,reject){
    reject('電腦出錯');
});

promise3.then(function(result){
    console.log('成功的回傳值' + result);
},function(ex){
    console.log('失敗原因'+ ex);
});

console.log(promise3);