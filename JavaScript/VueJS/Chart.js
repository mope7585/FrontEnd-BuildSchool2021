Vue.component('pie-chart', {
    extends: VueChartJs.Doughnut,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"],
                        //backgroundColor: [ "#4e73df"],
                        //backgroundColor: [],
                        data: [],
                    },
                ],
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    position: 'right',
                },
            },
            CatePieBusy1: { PageBusy: false },
            isBusy: false,

        }
    },
    created() {
        this.getMainCategoryData("/api/Home/GetMainCategoryPie");
    },
    mounted() {
        // this.chartData is created in the mixin
        //this.renderChart(this.datacollection, this.options)
    },
    methods: {
        //將API回傳的商品簡化版清單的格式轉成Vue物件所需的格式
        getMainCategoryData(uri, busyobj) {
            //busyobj.PageBusy = true;
            this.isBusy = true;
            let cfg = {
                method: 'get',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': GenCurrentAuthBarerFormat(),
                },
                url: uri
            };
            axios(cfg)
                .then(res => {
                    if (res.status == 200) {
                        switch (res.data.status) {
                            case 0:
                                this.datacollection.labels = res.data.result.map(x => x.id);
                                this.datacollection.datasets[0].data = res.data.result.map(x => x.amount);
                                for (let i = this.datacollection.datasets[0].backgroundColor.length
                                    ; i < res.data.result.length; i++) {
                                    this.datacollection.datasets[0].backgroundColor.push(this.getRandomColor());
                                }
                                this.renderChart(this.datacollection, this.options);
                                break;
                            default:
                                console.warn(res);
                                break;
                        }

                        //console.log(res.data.result);
                        //console.log(this.datacollection);
                    }
                    else {
                        throw new UserException('Unknown Error');
                    }
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        LoginInvalidRedirect();
                    }
                    console.dir(err);
                })
                .finally(() => {
                    //busyobj.PageBusy = false;
                    this.isBusy = false;
                });

        },
        //隨機色碼
        getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },
    watch: {
        isBusy: function (value) {
            this.$emit('is-busy', value);
        }
    }
})