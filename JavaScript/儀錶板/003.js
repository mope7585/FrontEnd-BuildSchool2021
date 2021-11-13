let thevue = new Vue({
    el: "#vue-home",
    data() {
        return {
            StatisticsInfo: [],
            TopProductTable: [],
            fields: [
                { key: 'index', label: '排名', class: 'text-center' },
                { key: 'productName', label: '商品名稱' },
                {
                    key: 'sales', label: '銷售額',
                    formatter: (value) => {
                        return (value == null) ? 0 : CurrencyFormat(value);
                    },
                    class: 'text-center'
                },
                { key: 'total', label: '銷售數', class: 'text-center' }
            ],
            //url列表
            //for live server
            urllist: {
                getStatisticsInfo: '/api/Home/GetHomeInfo',
                getTopProduct: '/api/Home/GetTopProductTable',
            },
            //描述頁面是否忙碌中，EX:進行非同步作業

            StatisticsBusy: { PageBusy: false },
            CatePieBusy: { PageBusy: false },
            TopProductTableBusy: { PageBusy: false },
            AreaBusy: { PageBusy: false },

            isEarningsAreaBusy: false,
            isGeUserAreaBusy: false,
            isGetMainCategoryPieBusy: false,

        }
    },
    computed: {
    },
    watch: {
    },
    created() {
        //初始化頁面
        this.getStatisticsInfoData(this.urllist.getStatisticsInfo, this.StatisticsBusy);
        this.getTopProductData(this.urllist.getTopProduct, this.TopProductTableBusy);
    },
    mounted() {

    },
    methods: {
        ChartBusyState(name, value) {
            this[name] = value;
        },
        //取得商品簡化版清單
        getStatisticsInfoData(uri, busyobj) {
            busyobj.PageBusy = true;
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
                                this.StatisticsInfo = res.data.result;
                                break;
                            default:
                                console.warn(res);
                                break;
                        }
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
                    busyobj.PageBusy = false;
                });
        },
        getTopProductData(uri, busyobj) {
            busyobj.PageBusy = true;
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
                                this.TopProductTable = res.data.result;
                                break;
                            default:
                                console.warn(res);
                                break;
                        }
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
                    busyobj.PageBusy = false;
                });
        },

    }
});