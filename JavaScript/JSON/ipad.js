let AlliPads = {
    iPadPro : [],
    iPad : [],
    iPadAir : [
        { "id":"A001", "color": "太空灰色",  "price": 18900, "storage":"64GB", "network": "Wi-Fi", "picture":"gray.png" },
        { "id":"A002", "color": "銀色",  "price": 18900, "storage":"64GB", "network": "Wi-Fi", "picture":"silver.png" },
        { "id":"A003", "color": "玫瑰金色",  "price": 18900, "storage":"64GB", "network": "Wi-Fi", "picture":"rose.png" },
        { "id":"A004", "color": "綠色",  "price": 18900, "storage":"64GB", "network": "Wi-Fi", "picture":"green.png" },
        { "id":"A005", "color": "天藍色",  "price": 18900, "storage":"64GB", "network": "Wi-Fi", "picture":"blue.png" },
        { "id":"B001", "color": "太空灰色",  "price": 23900, "storage":"256GB", "network": "Wi-Fi", "picture":"gray.png" },
        { "id":"B002", "color": "銀色",  "price": 23900, "storage":"256GB", "network": "Wi-Fi", "picture":"silver.png" },
        { "id":"B003", "color": "玫瑰金色",  "price": 23900, "storage":"256GB", "network": "Wi-Fi", "picture":"rose.png" },
        { "id":"B004", "color": "綠色",  "price": 23900, "storage":"256GB", "network": "Wi-Fi", "picture":"green.png" },
        { "id":"B005", "color": "天藍色",  "price": 23900, "storage":"256GB", "network": "Wi-Fi", "picture":"blue.png" },
        { "id":"C001", "color": "太空灰色",  "price": 23200, "storage":"64GB", "network": "Cellular", "picture":"gray.png" },
        { "id":"C002", "color": "銀色",  "price": 23200, "storage":"64GB", "network": "Cellular", "picture":"silver.png" },
        { "id":"C003", "color": "玫瑰金色",  "price": 23200, "storage":"64GB", "network": "Cellular", "picture":"rose.png" },
        { "id":"C004", "color": "綠色",  "price": 23200, "storage":"64GB", "network": "Cellular", "picture":"green.png" },
        { "id":"C005", "color": "天藍色",  "price": 23200, "storage":"64GB", "network": "Cellular", "picture":"blue.png" },
        { "id":"D001", "color": "太空灰色",  "price": 28200, "storage":"256GB", "network": "Cellular", "picture":"gray.png" },
        { "id":"D002", "color": "銀色",  "price": 28200, "storage":"256GB", "network": "Cellular", "picture":"silver.png" },
        { "id":"D003", "color": "玫瑰金色",  "price": 28200, "storage":"256GB", "network": "Cellular", "picture":"rose.png" },
        { "id":"D004", "color": "綠色",  "price": 28200, "storage":"256GB", "network": "Cellular", "picture":"green.png" },
        { "id":"D005", "color": "天藍色",  "price": 28200, "storage":"256GB", "network": "Cellular", "picture":"blue.png" }
    ],
    iPadMini : []
};
// console.log(AlliPads.iPadAir.forEach(item=>{
//     console.log(item)
// }))

// AlliPads.iPadAir.forEach(item=>{
//     let keys = Object.keys(item);
//     let value = Object.values(item)
//     keys.forEach(key=>{
//         console.log(key + "=" + item[key])
//     })
//     console.log("*_".repeat(30))
// })

AlliPads.iPadAir.forEach((item,index) =>{
    let ipadArray = [];
    ipadArray.push(index)
    // console.log(ipadArray)
    let keys = Object.keys(item);
    keys.forEach(key=>{
        let keyvalue = `${key} = ${item[key]}`;
        ipadArray.push(keyvalue)
    })
    console.log(ipadArray.join())
})