//價錢三位一點
function CurrencyFormat(num) {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
Vue.filter('CurrencyString', function (num = "") {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
});

//日期時間格式化
function DateFormat(value, format) {
    return moment(value).format(format || 'YYYY/MM/DD');
}
//日期格式化
Vue.filter('DateString', function (value, format) {
    return moment(value).format(format || 'YYYY/MM/DD')
});

//超過指定內容長度以...取代
function StringContentFormat(content, maxlength = 1) {
    if (maxlength <= 0 || content.length <= maxlength) {
        return content;
    }
    else {
        return content.substring(0, maxlength - 1) + '...';
    }
}


//取得圖片的解析度
function GetImageDimensions(imageData) {
    return new Promise((resovle, reject) => {
        let img = new Image();
        img.onload = () => {
            resovle({ width: img.width, height: img.height })
        }
        img.src = imageData;
    });
}

//取得Quill Instance
function GetQuillInstance(selector) {

    let toolbaroptions = [
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
    ];

    return new Quill(selector, {
        modules: {
            toolbar: toolbaroptions,
        },
        theme: 'snow'
    });
}

//取得URL的Blob資源
function GetBlobResourceFromURL(url) {
    return axios({
        method: 'get',
        url: url,
        responseType: 'blob'
    })
        .then(res => {
            return res.data;
        })
}

//檔案讀取
function FileReaderByDataURL(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (result) => {
            resolve(result);
        }
        reader.readAsDataURL(file);
    })
}

function Byte2KiloByte(byte) {
    return Math.floor(byte / 1024);
}