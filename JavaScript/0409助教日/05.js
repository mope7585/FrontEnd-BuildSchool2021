const pc = [
    { pc: "華碩", url: "https://www.asus.com" },
    { pc: "技嘉", url: "https://www.gigabyte.com" },
    { pc: "微星", url: "https://tw.msi.com" },
];

const parts = [
    { parts: "CPU", url: "https://24h.pchome.com.tw/region/DRAI" },
    { parts: "GPU", url: "https://24h.pchome.com.tw/region/DRAD" },
    { parts: "SSD", url: "https://24h.pchome.com.tw/region/DRAH" },
];

let Computer = {
    Pc : pc,
    Parts : parts

}
console.log(JSON.stringify(Computer))