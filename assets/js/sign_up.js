function replace_str(str) {
    str = str.replace(/'|"/g, '`');
    return str;
}

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}

function getRadiovalue(name) {
    var formObj = document.getElementsByName(name);
    var result = [];
    var j = 0;
    for (var i = 0; i < formObj.length; i++) {
        if (formObj[i].checked) {
            str = formObj[i].value;
            if (formObj[i].value == '97') {
                other = document.getElementsByName(name + '_other')[0];
                if (other.value.length == 0) {
                    result[0] = 1;
                    return result;
                } else {
                    str = str + '(' + replace_str(other.value) + ')';
                }
            }
            result[0] = 2;
            result[1] = str;
            j++;
            break;
        }
    }
    if (j == 0) {
        result[0] = 0;
    }
    return result;
}

function getCheckvalue(name) {
    //result[0] = 0->no checked 1->其他未填 2-> OK
    var fields = document.getElementsByName(name + '[]');
    var j = 0;
    var fstr = '';
    var result = [];
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].checked) {
            if (fstr > '') {
                fstr = fstr + ',';
            }
            var get_str = fields[i].value;
            // var get_str = fields[i].parentNode.innerText;
            if (get_str == '其他：') {
                var other = document.getElementsByName(name + '_other')[0];
                if (other.value.length == 0) {
                    result[0] = 1;
                    // return result;
                } else {
                    fstr = fstr + get_str + '(' + replace_str(other.value) + ')';
                }
            } else {
                fstr = fstr + get_str;
            }
            j = j + 1;
        }
    }
    if (j == 0) {
        result[0] = 0;
        return result;
    }
    if (result.length != 0)
        return result;
    result[0] = 2;
    result[1] = fstr;
    return result;
}

function check_ans() {
    var $pro = $.Deferred();
    var data = [];
    var check = true;
    var temp = [];
    var err = '';
    var q = '';
    var check_array = ['event', 'name', 'mobile', 'email', 'corp', 'title', 'Q1', 'Q2', 'Q3', 'Privacy',
        'recaptcha_response'
    ];

    $.each(check_array,
        function (index, val) {
            switch (val) {
                case 'recaptcha_response': {
                    temp = document.getElementsByName("g-recaptcha-response");
                    if (temp[0].value == undefined || temp[0].value == '') {
                        err = val;
                        q = val;
                        return false;
                    } else {
                        data[val] = temp[0].value;
                    }
                    break;
                }
                case 'title':
                case 'name':
                case 'mobile':
                case 'corp':
                case 'email': {
                    //name
                    temp = $("input[name=" + val + "]")[0].value;
                    if (temp == '') {
                        err = val;
                        q = val;
                        return false;
                    } else {
                        if (val == 'email' && !
                            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                            .test(temp)) {
                            err = 'email_wrong';
                            q = val;
                            return false;
                        }
                        if (val == 'mobile' && !/09\d{8}$/.test(temp)) {
                            err = 'mobile_wrong';
                            q = val;
                            return false;
                        }
                        data[val] = replace_str(temp);
                    }
                    break;
                }
                case 'event':
                case 'Q1':
                case 'Q2':
                case 'Q3': {
                    var temp1 = '';
                    temp = document.getElementsByName(val);
                    for (i = 0; i < temp.length; i++) {
                        if (temp[i].checked) {
                            temp1 = temp[i].value;
                        }
                    }
                    if (val != 'Q3' && temp1 == '') {
                        err = val;
                        q = val;
                        return false;
                    }
                    if (val == 'Q3' && temp1 == '') {
                        temp1 = '否';
                    }
                    data[val] = temp1;
                    // console.log(data[val]);
                    break;
                }
                case 'Privacy': {
                    if (!$('#chk')[0].checked) {
                        err = val;
                        q = val;
                        return false;
                    }
                    break;
                }
            }
        });

    if (err) {
        // q = goto , err = alert
        $pro.reject(q, err);
        return $pro.promise();
    }

    //console.log(data);
    $pro.resolve(data);
    return $pro.promise();
}

var flag = true;

function final() {
    check_ans().then(function (data) {
        console.log(data);
        // return false;
        var _tk_uuid_frck = localStorage.getItem('_tk_uuid_frck');
        var from = "";
        var fromdata = getUrlVars()["from"];
        if (fromdata) {
            fromarray = fromdata.split('#');
            from = fromarray[0];
        }

        if (from === undefined) {
            from = '';
        }
        var eventid = data['event'];
        if (flag) {
            flag = false;
            $.ajax({
                url: "https://www.gvm.com.tw/newevent/record_v2",
                type: "POST",
                dataType: "json",
                data: {
                    "eventid": eventid,
                    "content": [{
                        "name": data['name'],
                        "Q1": data['Q1'],
                        "mobile": data['mobile'],
                        "email": data['email'],
                        "Q2": data['Q2'],
                        "corp": data['corp'],
                        "title": data['title'],
                        "Q3": data['Q3'],
                        "from": from,
                        "str1": _tk_uuid_frck,
                    }],
                    "recaptcha_response": data['recaptcha_response'],

                    "limit_ins": 0
                },
                success: function (pdata) {
                    if (pdata.status) {
                        var dt = new Date();
                        var dt_string = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt
                            .getDate();
                        gvm_tracking.tracking_anchor = '2024CathaySummit';
                        gvm_tracking.reg_title = '2024 國泰永續金融暨氣候變遷高峰論壇';
                        gvm_tracking.reg_id = pdata.insert_id;
                        gvm_tracking.name = data['name'];
                        gvm_tracking.mobile = data['mobile'];
                        gvm_tracking.email = data['email'];
                        gvm_tracking.corp = data['corp'];
                        gvm_tracking.title = data['title'];
                        gvm_tracking.from = from;
                        gvm_tracking.reg_day = dt_string;
                        gvm_tracking.dp_code = 'gvm';
                        gvm_tracking.tracking_url = encodeURIComponent(location.href);
                        gvm_tracking.tracking_referrer = encodeURIComponent(document.referrer);
                        gvm_tracking.send();
                        var show_id = 2;
                        if (eventid == 477) {
                            show_id = 1;
                        }
                        btn_anm(show_id);
                        // location.href = pdata.next_url;
                    } else {
                        if (pdata.errcode == 'duplicate') {
                            alert('請勿重複報名，感謝您！');
                        } else {
                            alert(pdata.errmsg);
                        }
                        return false;
                    }
                    grecaptcha.reset();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                }
            });
            flag = true;
        }
    }, function (input_name, type) {
        var err = '';
        switch (type) {
            case 'recaptcha_response': {
                err = '請勾選[我不是機器人]。';
                break;
            }
            case 'name': {
                err = '請填寫姓名！';
                break;
            }
            case 'Q1': {
                err = '請選擇是否需要申請董監事進修時數！';
                break;
            }
            case 'mobile': {
                err = '請填寫手機！';
                break;
            }
            case 'email': {
                err = '請填寫電子信箱！';
                break;
            }
            case 'corp': {
                err = '請填寫公司/學校名稱！';
                break;
            }
            case 'title': {
                err = '請填寫部門職稱/學校科系！';
                break;
            }
            case 'email_wrong': {
                err = '請填寫正確E-mail！';
                break;
            }
            case 'mobile_wrong': {
                err = '請填寫正確手機格式！';
                break;
            }
            case 'Privacy': {
                err = '請勾選我已詳細閱讀並同意遠見天下文化事業群與國泰集團個資保護聲明之隱私權政策及個資保護聲明內容所有條款。';
                // $('#checkbox')[0].focus();
                break;
            }
        }
        alert(err);
        if (input_name != 'Privacy') {
            $("input[name='" + input_name + "']").focus();
        }
        return;
    });
}

function get_cookies_array() {

    var cookies = {};

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }

    return cookies;

}

function fb_send(event_name) {
    fbq('track', event_name);
    send_fb_capi({
        'external_id': get_cookies_array()['user_cookie'],
        'event_source_url': location.href,
        "channel": "event",
        "event_name": event_name,
        "fbp": get_cookies_array()['_fbp'],
        "event_id": '2024CathaySummit_' + get_cookies_array()['user_cookie'],
    });
}

function send_fb_capi(post_array) {
    var send_array = {};
    $.each([
            'external_id',
            'event_source_url',
            'channel',
            'event_name',
            'event_id',
            'fbp',
            'value',
            'currency',
            'contents',
            'content_type',
        ],
        function (index, val) {
            if (val != undefined && val != '') {
                send_array[val] = post_array[val];
            }
        }
    );

    var get_fbc = getUrlVars()["fbclid"];
    send_array['fbc'] = (get_fbc === undefined) ? '' : get_fbc;

    $.ajax({
        'url': 'https://tracking.gvm.com.tw/tracking_send_fbcapi.php',
        'type': 'POST',
        'dataType': "json",
        'xhrFields': {
            withCredentials: true
        },
        'data': send_array,
        success: function (data) {

        }
    });
}