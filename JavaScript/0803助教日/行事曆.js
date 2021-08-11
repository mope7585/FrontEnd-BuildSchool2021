//今天
let today = new Date();
//年 (2021年)
let year = today.getFullYear();
//月 (起始0)
let month = today.getMonth();
//月份數字轉換英文
function calDate(monthnub) {
    let month = new Array(12);
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return month[monthnub];
}
//日 (起始1)
let date = today.getDate();
let currentIndex;
//Modal Btn
let inputBtn = document.getElementById('inputBtn');
inputBtn.addEventListener('click', () => {
    ModalInput();
})
// ----------------------------------------------------------------------------------------------------------
//初始化
function Init() {
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";
    document.getElementById('year-month').innerText = `${calDate(new Date(year, month, 1).getMonth())} - ${new Date(year, month, 1).getFullYear()}`
    //這個月第一天是星期幾 (index start 0)index[0] = Sun
    let firstDay = new Date(year, month, 1).getDay();
    //取得這個月有幾天
    let DateOfMonth = new Date(year, month + 1, 0).getDate();
    //取得這個月需要幾個rows
    let rows = Math.ceil((DateOfMonth + firstDay) / 7);
    //每個月 第一天起始為1
    let day = 1;

    for (let row = 0; row < rows; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < 7; col++) {
            let td = document.createElement('td')
            let nub = document.createElement('p')
            td.appendChild(nub);
            if (row == 0 && col < firstDay) {
                //上個月
            }
            else {
                //這個月
                if (day <= DateOfMonth) {
                    let dayofWeek = new Date(year, month, day).getDay();
                    if (dayofWeek == 0 || dayofWeek == 6) {
                        nub.classList.add('text-danger')
                        nub.innerText = day;
                    }
                    else {
                        nub.classList.add('text-dark')
                        nub.innerText = day;
                    }
                    if (JSON.parse(localStorage.getItem(`${year}-${((month + 1).toString()).padStart(2, '0')}-${(day.toString()).padStart(2, '0')}`) != null)) {
                        //今日有待辦事項
                        let ul = document.createElement('ul');
                        let inputItem = JSON.parse(localStorage.getItem(`${year}-${((month + 1).toString()).padStart(2, '0')}-${(day.toString()).padStart(2, '0')}`));
                        inputItem.forEach((item, index) => {
                            currentIndex = index;
                            let li = document.createElement('li');
                            let colorbox = document.createElement('span')
                            li.innerText = `${item.title}`;
                            li.style.backgroundColor = item.color;
                            colorbox.innerText = item.time;
                            li.appendChild(colorbox)
                            ul.appendChild(li);
                        })
                        td.appendChild(ul)
                    }
                    else {
                        //今日無待辦事項
                    }
                }
                day++
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // ----------------------------------------------------------------------------------------------------------
    //td 改變顏色       
    let tdArray = document.querySelectorAll('td')
    tdArray.forEach(td => {
        if (td.innerText != '') {
            td.addEventListener('click', (date) => {
                tdArray.forEach(item => {
                    item.classList.remove('blue')
                })
                let target;
                if (date.target.localName == 'li' || date.target.localName == 'ul' || date.target.localName == 'span') {
                    //如果有li或ul抓取父層td節點
                    target = date.target.offsetParent;
                    $('#InfoModal').modal('show')
                    document.getElementById('Info-date').value = `${year}-${((month + 1).toString()).padStart(2, '0')}-${(target.childNodes[0].textContent).toString().padStart(2, '0')}`;
                    let dateItem = localStorage.getItem(`${year}-${((month + 1).toString()).padStart(2, '0')}-${(target.childNodes[0].textContent).toString().padStart(2, '0')}`);
                    (JSON.parse(dateItem)).forEach(d => {
                        document.getElementById('Info-text-area').value = d.item;
                        document.getElementById('Info-color').value = d.color;
                        document.getElementById('Info-time').value = d.time;
                        document.getElementById('Info-title').value = d.title;
                        document.getElementById('Info-file').value = d.File;
                    })

                }
                else {
                    target = date.target;
                    $('#inputModal').modal('show')
                    document.getElementById('input-time').value = '09:00';
                    document.getElementById('input-date').value = `${year}-${((month + 1).toString()).padStart(2, '0')}-${(target.childNodes[0].textContent).toString().padStart(2, '0')}`;
                }
                td.classList.add('blue')

            })
        }
    })
    //顯示今天日期
    let pArray = document.querySelectorAll('p')
    pArray.forEach(p => {
        if (p.innerText == today.getDate() && month == today.getMonth() && year == year) {
            p.classList.add('bg-Orange', 'text-white')
        }
    })
}

// ----------------------------------------------------------------------------------------------------------
//上下個月切換
let monthBtn = document.querySelectorAll('i')
monthBtn[0].addEventListener('click', () => {
    lastMonth();
})
monthBtn[1].addEventListener('click', () => {
    nextMonth();
})
function nextMonth() {
    month++;
    Init()
}
function lastMonth() {
    month--;
    Init()
}

// ----------------------------------------------------------------------------------------------------------
//設定Modal 
//新增行程
function ModalInput() {
    let inputDate = document.getElementById('input-date').value;
    let inputTitle = document.getElementById('input-title').value;
    let inputTime = document.getElementById('input-time').value;
    let inputArea = document.getElementById('text-area').value;
    let inputFile = document.getElementById('input-file').value;
    let inputColor = document.getElementById('input-color').value;
    let inputArray = [];
    let inputObj = {
        'title': inputTitle,
        'color': inputColor,
        'date': inputDate,
        'item': inputArea,
        'time': inputTime,
        'File': inputFile
    }
    if (localStorage.getItem(inputDate) == null) {
        //今日無待辦事項
        inputArray.push(inputObj);
    }
    else {
        inputArray = JSON.parse(localStorage.getItem(inputDate));
        inputArray.push(inputObj);
    }
    localStorage.setItem(inputDate, JSON.stringify(inputArray));
    Init();
}

//修改行程
let infoBtn = document.getElementById('Info-edit');
infoBtn.addEventListener('click', () => {
    editInfoModal();
})
function editInfoModal() {
    let InfoDate = document.getElementById('Info-date').value;
    let InfoTitle = document.getElementById('Info-title').value;
    let InfoTime = document.getElementById('Info-time').value;
    let InfoFile = document.getElementById('Info-file').value;
    let InfoColor = document.getElementById('Info-color').value;
    let InfoItem = document.getElementById('Info-text-area').value;
    let InfoList = JSON.parse(localStorage.getItem(InfoDate));
    InfoList[currentIndex] = {
        'title': InfoTitle,
        'color': InfoColor,
        'date': InfoDate,
        'item': InfoItem,
        'time': InfoTime,
        'File': InfoFile
    };
    localStorage.setItem(InfoDate, JSON.stringify(InfoList))
    Init();
}

//刪除行程
let deleteBtn = document.getElementById('Info-delete');
deleteBtn.addEventListener('click', () => {
    deleteInfoModal();
})
function deleteInfoModal() {
    let InfoDate = document.getElementById('Info-date').value;
    let InfoList = JSON.parse(localStorage.getItem(InfoDate));
    InfoList.splice(currentIndex, 1);
    localStorage.setItem(InfoDate, JSON.stringify(InfoList));
    Init();
}
Init();
