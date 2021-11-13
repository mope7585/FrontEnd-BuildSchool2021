Vue.use(VueQuillEditor);
const fileMaxByteSize = 512000;
let app = new Vue({
    el: "#productadd",
    data() {
        return {
            inputData: {
                onSale: false,
                productId: -1,
                productName: '',
                authorId: '',
                publisherId: '',
                mainCategoryId: '',
                subCategoryId: '',
                languageId: '',
                ISBN: '',
                price: 0,
                file: null,
                image: null,
                description: ''

            },

            inputDataCheck: {
                productName: { error: false, errorMsg: '' },
                author: { error: false, errorMsg: '' },
                publisher: { error: false, errorMsg: '' },
                mainCategory: { error: false, errorMsg: '' },
                subCategory: { error: false, errorMsg: '' },
                ISBN: { error: false, errorMsg: '' },
                price: { error: false, errorMsg: '' },
                language: { error: false, errorMsg: '' },
                file: { error: false, errorMsg: '' },
                image: { error: false, errorMsg: '' },
                description: { error: false, errorMsg: '' },
            },

            authorlist: {
                busy: false,
                options: [],
            },
            publisherlist: {
                busy: false,
                options: [],
            },
            mainCategorylist: {
                busy: false,
                options: [],
            },
            subCategorylist: {
                busy: false,
                options: [],
            },
            languagelist: {
                busy: false,
                options: [],
            },
            databuffer: {
                category: [],
            },

            pageInfo: {
                mode: 0,
                id: '',
                tabIndex: 0,
                isPageBusy: false,
                isModify: false,
            },


            progressModal: {
                id: 'progress-modal',
                title: '',
                value: 0,
                max: 100,
                description: '0%'
            },


            urllist: {
                authorList: '/api/Product/GetAuthorList',
                publisherList: '/api/Product/GetPublisherList',
                categoryList: '/api/Product/GetCategoryList',
                languageList: '/api/Product/GetLanguageList',
                productDetails: '/api/Product/GetProductDetails',
                productCreate: '/api/Product/Create',
                productModify: '/api/Product/Modify',
            },


            productimgProps: {
                blank: true,
                blankColor: '#bbb',
                width: 240,
                height: 340
            },


            breadCrumbItems: [
                {
                    text: '擐㚚�',
                    href: '/Home/Index'
                },
                {
                    text: '������𡑒”',
                    href: '/Product/Index'
                },
                {
                    text: '',
                    active: true
                }
            ],


            imgFileUpload: {
                dragEnterCounter: 0,
                isDragEnter: false,
                isValid: false,
                isModify: false,
                imageInfo: {
                    name: '',
                    data: '',
                    size: '',
                    width: '',
                    height: '',
                },
            },

            signalR: {
                connection: '',
                callerId: '',
            },


            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['link'],
                        ['blockquote', 'code-block'],

                        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'font': [] }],
                        [{ 'align': [] }],

                        ['clean']                                         // remove formatting button
                    ],
                },
                placeholder: '隢见銁�躰ㄐ蝺刻摩����蝪∩��',
                theme: 'snow'
            }
        }
    },
    computed: {
        allValidation() {
            let invalid = Object.keys(this.inputDataCheck).some(key => this.inputDataCheck[key].error === true);
            return {
                error: invalid,
                errorMsg: invalid ? '123' : ''
            }
        }
    },
    watch: {
        'inputData.productName': {
            immediate: true,
            handler: function () {
                if (this.inputData.productName == '') {
                    this.inputDataCheck.productName.error = true;
                    this.inputDataCheck.productName.errorMsg = '������滨迂銝滚�㛖�箇征';
                } else {
                    this.inputDataCheck.productName.error = false;
                    this.inputDataCheck.productName.errorMsg = '';

                }
            },
        },
        'inputData.authorId': {
            immediate: true,
            handler: function (value) {
                if (value) {
                    this.inputDataCheck.author.error = false;
                    this.inputDataCheck.author.errorMsg = '';
                } else {
                    this.inputDataCheck.author.error = true;
                    this.inputDataCheck.author.errorMsg = '隢钅�豢���𡏭��';
                }
            }
        },
        'inputData.publisherId': {
            immediate: true,
            handler: function (value) {
                if (value) {
                    this.inputDataCheck.publisher.error = false;
                    this.inputDataCheck.publisher.errorMsg = '';
                } else {
                    this.inputDataCheck.publisher.error = true;
                    this.inputDataCheck.publisher.errorMsg = '隢钅�豢��枂���冗';
                }
            }
        },
        'inputData.mainCategoryId': {
            immediate: true,
            handler: function (value) {
                if (value) {
                    this.MainCategoryChange(value);

                    let subCateSelectedIndex = this.subCategorylist.options
                        .findIndex(x => x.value == this.inputData.subCategoryId);
                    if (subCateSelectedIndex < 0) { this.inputData.subCategoryId = ''; }

                    this.inputDataCheck.mainCategory.error = false;
                    this.inputDataCheck.mainCategory.errorMsg = '';
                } else {
                    this.inputDataCheck.mainCategory.error = true;
                    this.inputDataCheck.mainCategory.errorMsg = '隢钅�豢��蜓��憿�';
                }
            }
        },
        'inputData.subCategoryId': {
            immediate: true,
            handler: function (value) {
                if (value) {
                    this.inputDataCheck.subCategory.error = false;
                    this.inputDataCheck.subCategory.errorMsg = '';
                } else {
                    this.inputDataCheck.subCategory.error = true;
                    this.inputDataCheck.subCategory.errorMsg = '隢钅�豢���𣂼�憿�';
                }
            }
        },
        'inputData.ISBN': {
            immediate: true,
            handler: function (value) {
                let ISBNRegexp = /^\d{13}$|^\d{10}$/;

                if (!ISBNRegexp.test(value)) {
                    this.inputDataCheck.ISBN.error = true;
                    this.inputDataCheck.ISBN.errorMsg = 'ISBN�聢撘讐��10雿齿��13雿齿彍摮�';
                } else {
                    this.inputDataCheck.ISBN.error = false;
                    this.inputDataCheck.ISBN.errorMsg = '';
                }
            }
        },
        'inputData.price': {
            immediate: true,
            handler: function (value) {
                if (value < 0) {
                    this.inputDataCheck.price.error = true;
                    this.inputDataCheck.price.errorMsg = '�寥椙銝滚�堒之�䲰';
                }
            }
        },
        'inputData.languageId': {
            immediate: true,
            handler: function (value) {
                if (value) {
                    this.inputDataCheck.language.error = false;
                    this.inputDataCheck.language.errorMsg = '';
                } else {
                    this.inputDataCheck.language.error = true;
                    this.inputDataCheck.language.errorMsg = '隢钅�豢���噼�';
                }
            }
        },
        'inputData.file': {
            immediate: true,
            handler: function (value) {
                //console.log(value);
                if (value === null) {
                    this.inputDataCheck.file.error = true;
                    this.inputDataCheck.file.errorMsg = '隢衤�𠰴�喳���瑼娍��';
                }
                else if (!(value instanceof File)) {
                    this.inputDataCheck.file.error = true;
                    this.inputDataCheck.file.errorMsg = '��隞嗅�见ê̌��㕑炊';
                    this.inputData.file = null;
                }
                else if (value.size > fileMaxByteSize) {
                    alert(`�豢���瑼娍��之撠讐��${Byte2KiloByte(value.size)}KB` +
                        `\n頞��𤾸虾銝𠰴�喟�銝𢠃��${Byte2KiloByte(fileMaxByteSize)} KB`);
                    this.inputDataCheck.file.error = true;
                    this.inputDataCheck.file.errorMsg = '瑼娍��之撠讛��𦒘�𢠃��';
                    //蝑匧��訜��滩���嗵��𧞄�𢒰皜脫�枏�𣬚佅敺䕘�峕�滚�峼his.inputData.file�㺿�槃ull
                    //�踹�滩���躰�毺𧞄�𢒰���衤�滢��稲
                    this.$nextTick(() => {
                        this.inputData.file = null;
                    });
                } else {
                    this.inputDataCheck.file.error = false;
                    this.inputDataCheck.file.errorMsg = '';
                }

                //ignore check
                this.inputDataCheck.file.error = false;
            }
        },
        'inputData.image': {
            immediate: true,
            handler: function (value) {
                if (value) {
                    this.inputDataCheck.image.error = false;
                    this.inputDataCheck.image.errorMsg = '';
                } else {
                    this.inputDataCheck.image.error = true;
                    this.inputDataCheck.image.errorMsg = '隢衤�𠰴�喳�����𣇉��';
                }
            }
        },
        'inputData.description': {
            immediate: true,
            handler: function (value) {
                if (value) {
                    this.inputDataCheck.description.error = false;
                    this.inputDataCheck.description.errorMsg = '';
                } else {
                    this.inputDataCheck.description.error = true;
                    this.inputDataCheck.description.errorMsg = '����蝪∩�衤�滚�㛖�箇征';
                }
            }
        },
    },
    created() {
        this.pageInfo.tabIndex = 0;
        //modify:1 ; create:0
        this.pageInfo.mode = (pagemode == 'modify') ? 1 : 0;
        this.pageInfo.id = pageid;

        if (this.pageInfo.mode) {
            //Modify Mode
            this.breadCrumbItems[this.breadCrumbItems.length - 1].text = "111"
            this.InitialModifyPage();
        } else {
            //Create Mode
            this.breadCrumbItems[this.breadCrumbItems.length - 1].text = "222"
            this.InitialCreatePage();
        }
    },
    mounted() {
        this.InitSignalR();
        window.onbeforeunload = this.beforeunload;
    },
    methods: {

        beforeunload() {
            if (this.pageInfo.isModify) {
                return '';
            }
        },
        IsChanged() {
            this.pageInfo.isModify = true;
        },

        async InitialCreatePage() {
            this.pageInfo.isPageBusy = true;

            this.imgFileUpload.imageInfo = this.CreateImgUploadImgInfo();

            await this.GetPageSelectors();

            this.pageInfo.isPageBusy = false;
        },

        async InitialModifyPage() {
            this.pageInfo.isPageBusy = true;


            let pageSelectorsRequest = this.GetPageSelectors();

            let pdDetailsRequest = this.GetProdctDetail(this.urllist.productDetails, this.pageInfo.id);


            await pageSelectorsRequest;

            let pdDetailsResponse = await pdDetailsRequest;


            if (pdDetailsResponse.status == 200 && pdDetailsResponse.data.status == 0
                && pdDetailsResponse.data.result.saleStatus == 0) {
                let pdDetails = pdDetailsResponse.data.result;


                this.inputData.onSale = pdDetails.saleStatus;
                this.inputData.productId = pdDetails.productID;
                this.inputData.productName = pdDetails.productName;
                this.inputData.authorId = pdDetails.authorID;
                this.inputData.publisherId = pdDetails.publisherID;
                this.inputData.ISBN = pdDetails.isbn.trim();
                this.inputData.price = pdDetails.fixedPrice;
                this.inputData.languageId = pdDetails.languageID;
                this.inputData.description = pdDetails.description;
                this.inputData.mainCategoryId = pdDetails.mainCategoryID;
                this.inputData.subCategoryId = pdDetails.subCategoryID;


                let pdimgBlob = await GetBlobResourceFromURL(pdDetails.imagePath);

                let pdimgFile = new File([pdimgBlob], "pic");
                this.inputData.image = pdimgFile;


                let fileresult = await FileReaderByDataURL(pdimgFile);
                let imgDimensions = await GetImageDimensions(fileresult.target.result);
                this.imgFileUpload.isValid = true;
                this.imgFileUpload.imageInfo = this.CreateImgUploadImgInfo(
                    pdimgFile.name,
                    fileresult.target.result,
                    Byte2KiloByte(pdimgFile.size),
                    imgDimensions.width,
                    imgDimensions.height,
                );
                this.pageInfo.isPageBusy = false;
            }
        },

        InitSignalR() {
            this.signalR.connection = new signalR.HubConnectionBuilder().withUrl("/progressHub").build();


            this.signalR.connection.start()
                .then(() => {
                    //�鐤�㙈Hub銝羓�GetConnectionID
                    this.signalR.connection.invoke("GetConnectionID")
                        .then(res => {
                            this.signalR.callerId = res;
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }).catch(err => {
                    console.error(err);
                });


            this.signalR.connection.on("AddProgress", (percentage) => {

                this.progressModal.value = percentage;
                this.progressModal.description = `${percentage}%`;
                // console.log(percentage)
            });
        },

        ProudctSubmit() {
            let formdata = new FormData();

            for (let key in this.inputData) {
                if (key === 'image' && this.pageInfo.mode && !this.imgFileUpload.isModify) {
                    continue;
                }
                formdata.append(key, this.inputData[key]);
            }

            formdata.append('signalid', this.signalR.callerId);



            let cfg = {
                method: this.pageInfo.mode ? 'put' : 'post',
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': GenCurrentAuthBarerFormat(),
                },
                data: formdata,
                url: this.pageInfo.mode ? this.urllist.productModify : this.urllist.productCreate,
            };
            //console.log(cfg);
            this.$bvModal.show(this.progressModal.id);
            axios(cfg)
                .then(res => {
                    // console.log(res);
                    if (res.data.status === 0) {

                        this.pageInfo.isModify = false;
                        window.location.href = "/Product/Index";
                    } else {
                        console.warn(res);
                        throw new UserException('Publishing error');
                    }

                }).catch(err => {
                    console.error(err);
                    let errorMsg = '';
                    this.$bvToast.toast(errorMsg, {
                        title: ``,
                        variant: "danger",
                        autoHideDelay: 1200,
                        appendToast: true
                    });
                }).finally(() => {
                    this.$bvModal.hide(this.progressModal.id);
                });
        },

        GetPageSelectors() {
            let author = this.getSelectorOptions(this.urllist.authorList);
            let publisher = this.getSelectorOptions(this.urllist.publisherList);
            let category = this.getSelectorOptions(this.urllist.categoryList);
            let language = this.getSelectorOptions(this.urllist.languageList);

            return Promise.all([author, publisher, category, language])
                .then(res => {
                    let [author, publisher, category, language] = res;
                    this.authorlist.options = author.data.result.map(x => { return { value: x.id, label: x.name } });
                    this.publisherlist.options = publisher.data.result.map(x => { return { value: x.id, label: x.name } });
                    this.languagelist.options = language.data.result.map(x => { return { value: x.id, label: x.name } });
                    this.mainCategorylist.options = category.data.result.map(x => { return { value: x.mainCategoryID, label: x.mainCategoryName } });
                    this.databuffer.category = category.data.result;
                }).catch(err => {
                    console.error(err);
                });
        },

        GetProdctDetail(url, productId) {
            let cfg = {
                method: 'get',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': GenCurrentAuthBarerFormat(),
                },
                url: `${url} / ${productId}`
            };

            return axios(cfg);
        },

        getSelectorOptions(url) {
            let cfg = {
                method: 'get',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': GenCurrentAuthBarerFormat(),
                },
                url: url
            };
            return axios(cfg);
        },

        MainCategoryChange(maincategoryid) {
            let category = this.databuffer.category.filter(x => x.mainCategoryID === maincategoryid)[0];
            this.subCategorylist.options = category.subCategories.map(x => { return { value: x.subCategoryID, label: x.subCategoryName } });
        },

        resetProgressModal() {
            this.progressModal.value = 0;
            this.progressModal.description = '';
        },

        async ImgFilesInput(files) {

            const imageType = /image.png|image.gif|image.jpeg|image.jpg/;

            this.imgFileUpload.isModify = true;
            if (!files || files.length === 0) {
                alert("瑼娍���滩�賜�箇征")
                this.imgFileUpload.isValid = false;
                this.$refs.imgFileInput.value = '';
                this.$refs.imgFileInput.files = null;
                this.imgFileUpload.imageInfo = this.CreateImgUploadImgInfo();
                this.inputData.image = null;
                return;
            }

            if (!files[0].type.match(imageType)) {
                alert("瑼娍���𧼮�讠�⊥��������閮徙ng��gif��jpg��jpeg")
                this.imgFileUpload.isValid = false;
                this.$refs.imgFileInput.value = '';
                this.$refs.imgFileInput.files = null;
                this.imgFileUpload.imageInfo = this.CreateImgUploadImgInfo();
                this.inputData.image = null;
                return;
            }

            if (files[0].size > fileMaxByteSize) {
                alert(`�豢���瑼娍��之撠讐��${Byte2KiloByte(files[0].size)
                    }KB` +
                    `\n頞��𤾸虾銝𠰴�喟�銝𢠃��${Byte2KiloByte(fileMaxByteSize)} KB`);
                this.imgFileUpload.isValid = false;
                this.$refs.imgFileInput.value = '';
                this.$refs.imgFileInput.files = null;
                this.imgFileUpload.imageInfo = this.CreateImgUploadImgInfo();
                this.inputData.image = null;
                return;
            }

            this.inputData.image = files[0];

            let fileresult = await FileReaderByDataURL(files[0]);
            let imgDimensions = await GetImageDimensions(fileresult.target.result);

            this.imgFileUpload.isValid = true;
            this.imgFileUpload.imageInfo = this.CreateImgUploadImgInfo(
                files[0].name,
                fileresult.target.result,
                Byte2KiloByte(files[0].size),
                imgDimensions.width,
                imgDimensions.height,
            );
        },

        ImgUploadZoneClick(e) {
            e.stopPropagation();
            e.preventDefault();


            this.$refs.imgFileInput.click();
        },

        ImgUploadZoneDragenter(e) {
            e.stopPropagation();
            e.preventDefault();

            this.imgFileUpload.dragEnterCounter++;
            this.imgFileUpload.isDragEnter = true;

        },

        ImgUploadZoneDragover(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        ImgUploadZoneDragleave(e) {
            this.imgFileUpload.dragEnterCounter--;


            if (this.imgFileUpload.dragEnterCounter === 0) {
                this.imgFileUpload.isDragEnter = false;
            }
        },

        ImgUploadZoneDrop(e) {
            e.stopPropagation();
            e.preventDefault();

            this.imgFileUpload.dragEnterCounter = 0;
            this.imgFileUpload.isDragEnter = false;
            this.$refs.imgFileInput.files = e.dataTransfer.files;
            this.ImgFilesInput(e.dataTransfer.files);
        },

        CreateImgUploadImgInfo(name = '', data = '', size = '', width = '', height = '') {
            return {
                name: name,
                data: data,
                size: size,
                width: width,
                height: height,
            };
        },
    }
});