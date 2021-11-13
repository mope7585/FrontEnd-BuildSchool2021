import PokemonCard from './card.js';

let app = new Vue({
    el: '#app',
    data: {
        //頁首的設定
        headerSetting: {
            mainImg: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/722.png',
            subImg: ''
        },
        pokemonData: {
            pokemonRequestUri: 'https://raw.githubusercontent.com/jacko1114/Homeworks/main/Pokemon/js/pokemons.json',
            pokemonArray: [],
            cardArray: [],
            // index = 0,
            currentPokemon: {
                index: '',
                id: '',
                name: '',
                hp: '',
                attack: '',
                defense: '',
                sp_attack: '',
                sp_defense: '',
                speed: '',
                img: '',
                type: '',
                evolution: '',
                genus: '',
            }

        }
    },
    created() {
        this.getPokemonData();
    },
    methods: {
        getPokemonData() {
            axios.get(this.pokemonData.pokemonRequestUri)
                .then((res) => {
                    if (Array.isArray(res.data) && res.status == 200) {
                        this.pokemonData.pokemonArray = res.data.map((item, index) => ({
                            index: index,
                            id: item.id.toString().padStart(3, "0"),
                            name: item.name.chinese,
                            hp: item.base.HP,
                            attack: item.base.Attack,
                            defense: item.base.Defense,
                            sp_attack: item.base["Sp_Attack"],
                            sp_defense: item.base["Sp_Defense"],
                            speed: item.base.Speed,
                            img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3, "0")}.png`,
                            type: item.type,
                            evolution: item.evolution,
                            genus: item.genus,
                        }));
                        console.log(this.pokemonData.pokemonArray);
                    }
                })
        },
        addAllCards() {
            this.pokemonData.cardArray = this.pokemonData.pokemonArray;
            this.pokemonData.index = this.pokemonData.pokemonArray.length - 1;
        },
        resetCards() {
            this.pokemonData.cardArray = [];
            this.pokemonData.index = 0;

        },
        addOneCard() {
            if (this.pokemonData.index > this.pokemonData.pokemonArray.length - 1) return;
            this.pokemonData.cardArray.push(this.pokemonData.pokemonArray[this.pokemonData.index]);
            this.pokemonData.index++;
        },
        //移除一張
        removeOneCard() {
            if (this.pokemonData.index == 0) return;
            this.pokemonData.cardArray.splice(this.pokemonData.index - 1, 1);
            this.pokemonData.index--;
        },
        //詳細資訊
        showModalData(index) {
            this.pokemonData.currentPokemon = this.pokemonData.pokemonArray[index];
        },

    },
    components: {
        'Pokemon': PokemonCard
    }
})









// let index = 0;
// let pokemonArray = [];
// let newPokemonArray = [];
// const addOne = document.querySelector("#addOne");
// const removeOne = document.querySelector("#removeOne");
// const addAll = document.querySelector("#addAll");
// const reset = document.querySelector("#reset");
// const row = document.querySelector(".render");
// const topRightImg = document.querySelector(".jumbotron img:nth-of-type(3)");
// const bottomRightImg = document.querySelector(".jumbotron img:nth-of-type(4)");
// const loading = document.querySelector(".loading");

// const getPokemonFromJSON = () => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://raw.githubusercontent.com/jacko1114/Homeworks/main/Pokemon/js/pokemons.json");
//     xhr.send();
//     xhr.addEventListener("load", function () {
//         pokemonArray = JSON.parse(this.responseText);
//         newPokemonArray = getNewPokemonData();
//     })
// }

// const addPokemon = (id) => {
//     clean();
//     newPokemonArray.forEach((item, index) => {
//         if (index + 1 > id) return;
//         let card = document.querySelector("#pokemonTemplate");
//         let cloneContent = card.content.cloneNode(true);
//         let padding = item.name.length > 4 ? "pr-0" : "pr-1"
//         let fontSize = item.name.length > 3 ? "h6" : "h4"
//         cloneContent.querySelector(".pokemon-id").innerText = item.id;
//         cloneContent.querySelector(".pokemon-name").innerText = item.name;
//         cloneContent.querySelector(".pokemon-name").classList.add(padding,fontSize);
//         cloneContent.querySelector("img").src = item.img;
//         cloneContent.querySelector(".btn").setAttribute("data-toggle", "modal");
//         cloneContent.querySelector(".btn").setAttribute("data-target", ".modal");

//         dataToModal(cloneContent, index);

//         row.appendChild(cloneContent);
//     })
// }

// const getNewPokemonData = () => {
//     return pokemonArray.map( item => 
//         ({
//             id: item.id.toString().padStart(3, "0"),
//             name: item.name.chinese,
//             hp: item.base.HP,
//             attack: item.base.Attack,
//             defense: item.base.Defense,
//             sp_attack: item.base["Sp_Attack"],
//             sp_defense: item.base["Sp_Defense"],
//             speed: item.base.Speed,
//             img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3, "0")}.png`,
//             type: item.type,
//             evolution: item.evolution,
//             genus: item.genus,
//         })
//     )
// }

// const dataToModal = (clone, index) => {
//     clone.querySelector(".btn").addEventListener("click", function () {
//         let modal = document.querySelector(".modal");
//         modal.querySelector("h5").innerText = `No.${newPokemonArray[index].id} ． ${newPokemonArray[index].name}`;
//         modal.querySelector("#pokemonImage").src = newPokemonArray[index].img;
//         modal.querySelector("#hp").textContent = newPokemonArray[index].hp;
//         modal.querySelector("#attack").textContent = newPokemonArray[index].attack;
//         modal.querySelector("#defense").textContent = newPokemonArray[index].defense;
//         modal.querySelector("#spAttack").textContent = newPokemonArray[index].sp_attack;
//         modal.querySelector("#spDefense").textContent = newPokemonArray[index].sp_defense;
//         modal.querySelector("#speed").textContent = newPokemonArray[index].speed;
//         modal.querySelector(".genus span").textContent = newPokemonArray[index].genus;

//         let types = document.querySelector(".types");
//         types.innerHTML = "";
//         newPokemonArray[index].type.forEach(type => {
//             let span = document.createElement("span");
//             span.textContent = attributeTransform(type);
//             span.classList.add("type", `${type}`, "py-2", "px-3", "text-white", "mx-1", "rounded-pill", "h6");
//             types.appendChild(span);
//         })

//         let evolution = document.querySelector(".evolution");
//         evolution.innerHTML = "";
//         newPokemonArray[index].evolution.forEach((item)=>{
//             let img = document.createElement("img");
//             let div = document.createElement("div");
//             div.classList.add("p-5","my-5","h4");

//             if(item.id.toString().padStart(3,"0") != "000"){
//                 img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3,"0")}.png`
//                 img.classList.add("w-50")
//                 evolution.appendChild(img)
//             }
//             else{
//                 div.innerText = "無法進化"
//                 evolution.appendChild(div);
//             }
//         }) 
//     })
// }
// const clean = () => { 
//     row.innerHTML = "";
// }

// // const removeOneByRemoveChild = () =>{
// //     let lastOne = document.querySelector(".row:last-of-type .col-6:last-of-type");
// //     let parent = document.querySelector(".render");
// //     parent.removeChild(lastOne);
// // }

// //屬性轉中文
// const attributeTransform = (eng) => {
//     switch (eng) {
//         case "Normal":
//             return "一般";
//         case "Grass":
//             return "草";
//         case "Poison":
//             return "毒";
//         case "Fire":
//             return "火焰";
//         case "Electric":
//             return "雷電";
//         case "Dragon":
//             return "龍";
//         case "Fighting":
//             return "格鬥";
//         case "Ground":
//             return "地面";
//         case "Ghost":
//             return "鬼";
//         case "Water":
//             return "水";
//         case "Psychic":
//             return "超能力";
//         case "Dark":
//             return "惡";
//         case "Flying":
//             return "飛行";
//         case "Rock":
//             return "岩石";
//         case "Steel":
//             return "鋼鐵";
//         case "Ice":
//             return "冰";
//         case "Fairy":
//             return "妖精";
//         case "Bug":
//             return "蟲";
//     }
// }

// //事件監聽
// window.addEventListener("load", getPokemonFromJSON);
// addOne.addEventListener("click", function () {
//     index++;
//     addPokemon(index);
// })
// removeOne.addEventListener("click", function () {
//     index = index <= 0 ? 0 : --index;
//     addPokemon(index);
// });
// addAll.addEventListener("click", function () {
//     setTimeout(function(){
//         loading.classList.add("active");
//     },0)

//     setTimeout(function(){
//         index = newPokemonArray.length;
//         addPokemon(index);
//     },500)

//     setTimeout(function(){
//         loading.classList.remove("active");
//     },3000)
// });
// reset.addEventListener("click", function () {
//     index = 0;
//     clean();
// });

// topRightImg.addEventListener("click",function(){
//     this.setAttribute("style","top:-100%;");
//     setTimeout(function(){
//         topRightImg.removeAttribute("style");
//     },2000)
// })
// bottomRightImg.addEventListener("click",function(){
//     this.classList.add("active");
//     setTimeout(function(){
//         bottomRightImg.classList.remove("active");
//     },2500)
// })
