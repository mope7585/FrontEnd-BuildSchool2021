Vue.component('bar-chart', {
    extends: VueChartJs.Bar,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [
                    {
                        label: '會員成長',
                        backgroundColor: '#ffa75d8f',
                        borderColor: '#fd7e14',
                        hoverBackgroundColor: '#ffa75d',
                        borderWidth: 1,
                        data: []
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        barPercentage: 1.7
                        //ticks: {
                        //	beginAtZero: true
                        //},
                        //gridLines: {
                        //	display: false
                        //}
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return tooltipItems.yLabel;
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                height: 200,
            },
            isBusy: false,
        }
    },
    created() {
        this.getBarData("/api/Home/GeUserArea");
    },
    mounted() {
        // this.chartData is created in the mixin
        //this.renderChart(this.datacollection, this.options)
    },
    methods: {
        //將API回傳的商品簡化版清單的格式轉成Vue物件所需的格式
        getBarData(uri, busyobj) {
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
                                this.datacollection.labels = res.data.result.map(x => x.date);
                                this.datacollection.datasets[0].data = res.data.result.map(x => x.amount);
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
    },
    watch: {
        isBusy: function (value) {
            this.$emit('is-busy', value);
        }
    }
})