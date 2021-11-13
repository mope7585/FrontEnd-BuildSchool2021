export default {
    props: {
        pokemon: {
            type: Object,
            required: false,
            default: function () {
                return {
                    index: 0,
                    id: "016",
                    name: '啵啵',
                    hp: 0,
                    attack: 0,
                    defense: 0,
                    sp_attack: 0,
                    sp_defense: 0,
                    speed: 0,
                    img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png`,
                    evolution: [],
                    genus: '小鳥寶可夢',
                }
            }
        }
    },
    data: () => ({}),
    methods: {
        showPokemon() {
            this.$emit("show-modal")
        }
    },
    template: `
        <div class="col-6 col-md-4 col-lg-3 my-3">
            <div class="card bg-light">
                <div class="card-body p-0">
                    <div class="card-img">
                        <img :src="pokemon.img" class="card-img-top">
                    </div>
                    <h5 class="card-title rounded bg-dark text-light d-flex p-1 mx-3">
                        <span class="pokemon-id pl-2">{{pokemon.id}}</span>
                        <span>．</span>
                        <span class="pokemon-name">{{pokemon.name}}</span>
                    </h5>
                </div>
                <div class="card-footer text-center bg-light border-0">
                    <a href="#" class="btn btn-secondary" data-toggle="modal" data-target=".modal" @click="showPokemon">詳細資訊</a>
                </div>
            </div>
        </div>
    `
}