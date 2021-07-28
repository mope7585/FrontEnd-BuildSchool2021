const promise1 = new Promise(function(resolve,reject){
    setTimeout(() =>{
        // resolve('程式執行成功，交易完成');
        resolve([1,3,5,7,9]);

    },3000);
})
promise1
    .then(result=>{
        console.log(typeof result);
        console.log(Array.isArray(result))
        console.log("成功的結果值" + result)
    })
    .catch(ex =>{
        console.log("失敗的原因" + ex)
    })
    .finally();
    // let url1 = "https://raw.githubusercontent.com/apprunner/FileStorage/master/iPadAir2020_Data.json";
    // let url2 = "https://raw.githubusercontent.com/apprunner/pokemon.json/master/pokedex.json";
    // let url3 = "https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json";
    let p1 = Promise.resolve(35);
    let p2 = Promise.resolve(p1);
    p2.then(result=>{
        console.log(p1)
        console.log(result)
        console.log(p2)
    })