let todayDate, currentDate, currentCalendarData, schedules;
const daytoDoBoxResizeObs = new ResizeObserver(daytoDoBoxResizeAction);
const monuthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
];
const dayOfWeek = 7;

function dateInfo(year, month, date, day, toDoList) {
    this.year = year,
        this.month = month,
        this.date = date,
        this.day = day,
        this.toDoList = toDoList
}

dateInfo.prototype.toDateObj = function () {
    return new Date(this.year, this.month, this.date);
};

function WriteSchedulesFile(schedules) {
    localStorage.setItem("schedules", JSON.stringify(schedules));
}

function ReadSchedulesFile() {
    let raw = localStorage.getItem("schedules");
// console.log(raw);
    if (raw !== null) {
        return JSON.parse(raw);
    }
    else {
        return [];
    }
}
// TEST DATA
// schedules = [
//     {
//         id: "1",
//         year: 2021,
//         month: 3,
//         date: 20,
//         hour: 1,
//         minute: 2,
//         title: "04200102",
//         description: "----"
//     },
//     {
//         id: "2",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 10,
//         minute: 20,
//         title: "789333333312312313213212389413613219812319813",
//         description: "----"

//     },
//     {
//         id: "3",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 5,
//         minute: 2,
//         title: "789333333312312313213212389413613219812319813",
//         description: "----"

//     },
//     {
//         id: "4",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 3,
//         minute: 12,
//         title: "1",
//         description: "----"

//     },
//     {
//         id: "5",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 1,
//         minute: 2,
//         title: "2",
//         description: "----"

//     },
//     {
//         id: "6",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 0,
//         minute: 2,
//         title: "3",
//         description: "----"

//     },
//     {
//         id: "7",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 21,
//         minute: 30,
//         title: "4",
//         description: "----"

//     },
//     {
//         id: "8",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 11,
//         minute: 22,
//         title: "5",
//         description: "----"

//     },
//     {
//         id: "9",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 23,
//         minute: 2,
//         title: "6",
//         description: "----"

//     },
//     {
//         id: "10",
//         year: 2021,
//         month: 3,
//         date: 21,
//         hour: 14,
//         minute: 2,
//         title: "7",
//         description: "----"

//     },
//     {
//         id: "11",
//         year: 2021,
//         month: 4,
//         date: 20,
//         hour: 1,
//         minute: 2,
//         title: "101112555555555",
//         description: "----"

//     },
//     {
//         id: "12",
//         year: 2021,
//         month: 3,
//         date: 24,
//         hour: 1,
//         minute: 2,
//         title: "101112555555555",
//         description: "----"

//     },
//     {
//         id: "13",
//         year: 2021,
//         month: 4,
//         date: 1,
//         hour: 1,
//         minute: 2,
//         title: "101112555555555",
//         description: "----"

//     }
// ];

window.onload = function () {

    todayDate = new Date();
    // todayDate = new Date(2021,4,1);
    let temp = new Date();
    currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth());
    // currentDate = new Date(temp.getFullYear(), temp.getMonth());
    // WriteSchedulesFile(schedules);
    schedules = ReadSchedulesFile();
    // console.log(schedules);
    // currentCalendarData = CreateCalendarData(temp, schedules);
    currentCalendarData = CreateCalendarData(todayDate, schedules);
    ApplyCalendarDays(currentCalendarData, true);
    // console.log(currentDate);
    // console.log(todayDate);
    // console.log(currentCalendarData);

    // register btnPrev click event
    document.querySelector(".calendar-btnPrev").addEventListener("click", function () { IncreaseCalendar(false) });

    // register btnNext click event
    document.querySelector(".calendar-btnNext").addEventListener("click", function () { IncreaseCalendar(true) });

    // 
    document.querySelector(".addToDo").addEventListener("click", function () { InitAddToDoModal(); });

    let toDoListModal = document.querySelector("#toDoListModal");
    toDoListModal.addEventListener("hidden.bs.modal", function () {
        ClearToDoListModal();
    })


};

// #region toDoListModal
function ClearToDoListModal() {
    let toDoListModal = document.querySelector("#toDoListModal");
    toDoListModal.querySelector("#toDoListModalLabel").innerText = "";
    toDoListModal.querySelector(".modal-body").innerHTML = "";
}

function InitToDOListModal(toDoList) {
    let toDoListModal = document.querySelector("#toDoListModal");
    toDoListModal.querySelector("#toDoListModalLabel").innerText = CreateDateString(toDoList[0].year, toDoList[0].month + 1, toDoList[0].date);
    toDoListModal.addEventListener("hidden.bs.modal", function () {
        ClearToDoListModal();
    });

    let modalBody = toDoListModal.querySelector(".modal-body");

    toDoList.forEach((scheduleItem) => {
        modalBody.appendChild(CreateToDoItemOnList(scheduleItem, (event) => {
            OnClickToDoItemOfList(event, scheduleItem);
        }));
    });
}
// #endregion


// #region toDoModal

function ClearToDoModal() {
    let toDoModal = document.querySelector("#toDoModal");
    toDoModal.querySelector("#toDoModalLabel").innerText = "";

    document.querySelectorAll(".form-control").forEach((el) => {
        el.value = "";
        el.removeAttribute("readonly");
    });

    let modalfooter = toDoModal.querySelector(".modal-footer");
    modalfooter.innerHTML = "";
}

function InitAddToDoModal(date) {

    date = date || todayDate;

    let toDoModal = document.querySelector("#toDoModal");

    toDoModal.addEventListener("hidden.bs.modal", function () {
        ClearToDoModal();
    });

    toDoModal.querySelector("#toDoModalLabel").innerText = "Create Event";

    let initContent = [
        "",
        CreateDateString(date.getFullYear(), date.getMonth() + 1, date.getDate()),
        CreateTimeString(date.getHours(), date.getMinutes()),
        ""
    ];
    let inputs = toDoModal.querySelectorAll(".form-control")
    inputs.forEach((el, index) => {
        el.value = initContent[index];
    });

    let modalfooter = toDoModal.querySelector(".modal-footer");
    modalfooter.innerHTML = "";

    let addbtnattrib = [{ key: "data-bs-dismiss", value: "modal" }];
    let addbtn = CreateDOMElement(
        "button",
        ["iconBtn", "modal-addBtn"],
        addbtnattrib
    );

    addbtn.innerHTML = '<i class="far fa-plus-square"></i>';
    addbtn.addEventListener("click", () => {
        let values = [];
        inputs.forEach((item, index) => {

            values.push(item.value);
        });


        AddToDo(...values);
    });
    modalfooter.appendChild(addbtn);

}

function InitEditToDoModal(toDoItem, backModalId) {

    // console.log(toDoItem);
    backModalId = backModalId || "";
    let toDoModal = document.querySelector("#toDoModal");
    toDoModal.querySelector("#toDoModalLabel").innerText = "Edit Event";
    toDoModal.addEventListener("hidden.bs.modal", function () {
        ClearToDoModal();
    });

    let initContent = [
        toDoItem.title,
        CreateDateString(toDoItem.year, toDoItem.month + 1, toDoItem.date),
        CreateTimeString(toDoItem.hour, toDoItem.minute),
        toDoItem.description
    ];
    toDoModal.querySelectorAll(".form-control").forEach((el, index) => {
        el.value = initContent[index];
        el.setAttribute("readonly", "");
    });
    // console.log(backModalId);
    let modalfooter = toDoModal.querySelector(".modal-footer");
    modalfooter.innerHTML = "";
    let delbtnattrib = [
        // { key: "data-bs-target", value: "#toDoListModal" },
        { key: "data-bs-dismiss", value: "modal" }, //modal
        { key: "data-bs-target", value: `${backModalId}` }
    ];
    let delbtn = CreateDOMElement(
        "button",
        ["iconBtn", "modal-delBtn"],
        delbtnattrib
    );
    delbtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    delbtn.addEventListener("click", () => { DeleteToDo(toDoItem) });
    modalfooter.appendChild(delbtn);

    let editbtn = CreateDOMElement(
        "button",
        ["iconBtn", "modal-editBtn"]
    );

    editbtn.innerHTML = '<i class="far fa-edit"></i>';
    editbtn.addEventListener("click", () => { EditToDoModal(toDoItem, backModalId); });
    modalfooter.appendChild(editbtn);


}

function EditToDoModal(toDoItem, backModalId) {

    let toDoModal = document.querySelector("#toDoModal");
    let inputs = toDoModal.querySelectorAll(".form-control")
    inputs.forEach((el, index) => {
        el.removeAttribute("readonly");
    });


    let modalfooter = toDoModal.querySelector(".modal-footer");
    let editBtn = modalfooter.querySelector(".modal-editBtn");
    editBtn.classList.remove("btn-info", "modal-editBtn");

    let savebtnattrib = [
        { key: "data-bs-dismiss", value: "modal" },
        { key: "data-bs-target", value: `${backModalId}` }
    ];
    let savebtn = CreateDOMElement(
        "button",
        ["iconBtn", "modal-savebtn"],
        savebtnattrib
    );
    savebtn.innerHTML = '<i class="far fa-save"></i>';
    savebtn.addEventListener("click", () => {
        let values = [];
        inputs.forEach((item, index) => {

            values.push(item.value);
        });

        SaveToDo(toDoItem, ...values);
    });
    editBtn.parentNode.replaceChild(savebtn, editBtn);
}

//#endregion

// function AddToDo(titleInput, dataInput, timeInput, descriptInput) {
function AddToDo(titleInput, dateInput, timeInput, descriptInput) {

    let toDoBoxes = document.querySelectorAll(".calendar-days .dayInfo-toDoBox");
    let date = dateInput.split("-");
    let time = timeInput.split(":");

    let newItem = {
        id: _uuid(),
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10) - 1,
        date: parseInt(date[2], 10),
        hour: parseInt(time[0], 10),
        minute: parseInt(time[1], 10),
        title: titleInput,
        description: descriptInput
    };

    schedules.push(newItem);
    WriteSchedulesFile(schedules);

    let dateindex = currentCalendarData.dates.findIndex((dateInfo) => {
        return dateInfo.year === newItem.year && dateInfo.month === newItem.month && dateInfo.date === newItem.date;
    });

    if (dateindex >= 0) {
        currentCalendarData.dates[dateindex].toDoList.push(newItem);
        currentCalendarData.dates[dateindex].toDoList.sort(CompareScheduleOfDay);
        CreateDayInfotoDoItems(toDoBoxes[dateindex], currentCalendarData.dates[dateindex].toDoList);
    }
}

function SaveToDo(origin, titleInput, dateInput, timeInput, descriptInput) {
    // console.log(origin.id);
    // console.log(titleInput);
    // console.log(dateInput);
    // console.log(timeInput);
    // console.log(descriptInput);

    let toDoBoxes = document.querySelectorAll(".calendar-days .dayInfo-toDoBox");
    let date = dateInput.split("-");
    let time = timeInput.split(":");
    let newItem = {
        id: origin.id,
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10) - 1,
        date: parseInt(date[2], 10),
        hour: parseInt(time[0], 10),
        minute: parseInt(time[1], 10),
        title: titleInput,
        description: descriptInput
    };
    let isdateOfChange = origin.year !== newItem.year || origin.month !== newItem.month || origin.date !== newItem.date;


    // get index of origin date in dates
    let originDateIndex = currentCalendarData.dates.findIndex((dateInfo) => {
        return dateInfo.year === origin.year && dateInfo.month === origin.month && dateInfo.date === origin.date;
    });

    // get index of origin ToDoItem in toDoList
    let originToDoIndex = currentCalendarData.dates[originDateIndex].toDoList.indexOf(origin);

  // get index of new date in dates
    let newDateIndex = currentCalendarData.dates.findIndex((dateInfo) => {
        return dateInfo.year === newItem.year && dateInfo.month === newItem.month && dateInfo.date === newItem.date;
    });

    // get index of origin scheduleItem in schedules
    let scheduleIndex = schedules.findIndex(item => item.id === newItem.id);

    if (scheduleIndex >= 0) {
        schedules.splice(scheduleIndex, 1, newItem);
        WriteSchedulesFile(schedules);
    }

    //if origin date == new date , replace origin item
    if (!isdateOfChange && originDateIndex >= 0 && originToDoIndex >= 0) {
        currentCalendarData.dates[originDateIndex].toDoList.splice(originToDoIndex, 1, newItem);
        currentCalendarData.dates[originDateIndex].toDoList.sort(CompareScheduleOfDay);
    }

    //if origin date != new date , remove origin item,then add newItem to correspond location.  
    if (isdateOfChange && originDateIndex >= 0 && originToDoIndex >= 0 && newDateIndex >= 0) {
        currentCalendarData.dates[originDateIndex].toDoList.splice(originToDoIndex, 1);
        currentCalendarData.dates[newDateIndex].toDoList.push(newItem);
        currentCalendarData.dates[newDateIndex].toDoList.sort(CompareScheduleOfDay);
        CreateDayInfotoDoItems(toDoBoxes[newDateIndex], currentCalendarData.dates[newDateIndex].toDoList);
    }
    CreateDayInfotoDoItems(toDoBoxes[originDateIndex], currentCalendarData.dates[originDateIndex].toDoList);

}

function DeleteToDo(toDoItem) {
    let toDoBoxes = document.querySelectorAll(".calendar-days .dayInfo-toDoBox");
    let dateindex = currentCalendarData.dates.findIndex((dateInfo) => {
        return dateInfo.year === toDoItem.year && dateInfo.month === toDoItem.month && dateInfo.date === toDoItem.date;
    });

    let toDoIndex = currentCalendarData.dates[dateindex].toDoList.indexOf(toDoItem);
    currentCalendarData.dates[dateindex].toDoList.splice(toDoIndex, 1);
    CreateDayInfotoDoItems(toDoBoxes[dateindex], currentCalendarData.dates[dateindex].toDoList);


    let scheduleIndex = schedules.findIndex(item => item.id === toDoItem.id);

    if (scheduleIndex >= 0) {
        schedules.splice(scheduleIndex, 1);
        WriteSchedulesFile(schedules);
    }
}

// true : increase Calendar
// false : decrease Calendar
function IncreaseCalendar(increase) {
    currentDate.setMonth(currentDate.getMonth() + (increase ? 1 : -1));
    currentCalendarData = CreateCalendarData(currentDate, schedules);
    ApplyCalendarDays(currentCalendarData, increase);
}


// Create dates of month ,according to year and month
function CreateDates(year, month) {
    // get the first day of the month
    let startDate = new Date(year, month);
    // get the last day of the month
    let endDate = new Date(year, month + 1, 0);
    // get the day of week at the first day
    let startDayOfWeek = startDate.getDay();

    let dayCount = startDayOfWeek + endDate.getDate() - startDate.getDate() + 1;

    let count = Math.floor(dayCount / dayOfWeek);
    count = dayCount % dayOfWeek === 0 ? count : count + 1;
    let loopCount = count * dayOfWeek;

    let dates = [];
    startDate.setDate(startDate.getDate() - startDayOfWeek);

    // generate dates
    for (let i = 0; i < loopCount; i++) {
        if (i !== 0) {
            startDate.setDate(startDate.getDate() + 1);
        }
        dates.push(new Date(startDate));
    }
    return dates;
}

// Create CalendarData: 
// title : { year , month },
// dates : [datesInfo] 
function CreateCalendarData(srcdate, schedules) {

    let srcYear = srcdate.getFullYear();
    let srcMonuth = srcdate.getMonth();

    let dates = CreateDates(srcYear, srcMonuth);
    let datesInfo = [];

    dates.forEach((item) => {
        let year = item.getFullYear();
        let month = item.getMonth();
        let date = item.getDate();
        let day = item.getDay();
        let todo = schedules.filter(schedule => schedule.year === year && schedule.month === month && schedule.date === date)
            .sort(CompareScheduleOfDay);
        datesInfo.push(new dateInfo(year, month, date, day, todo));
    });

    return {
        title: { year: srcYear, month: srcMonuth },
        dates: datesInfo,
    }
}

// Apply calendarData to DOM tree
function ApplyCalendarDays(calendarData, isIncrease) {
    let calendar = document.querySelector(".calendar");

    calendar.querySelector(".calendar-date :first-child").innerText = calendarData.title.year;
    calendar.querySelector(".calendar-date :last-child").innerText = monuthNames[calendarData.title.month];

    let calendardaysWrap = document.querySelector(".calendar-daysWrap");

    let existCalendarDays = calendardaysWrap.querySelector(".calendar-days");

    let calendarDays = CreateCalendardays(calendarData);
    calendarDays.style.opacity = 0;
    calendardaysWrap.appendChild(calendarDays);
    AddDaysToDoItem(calendarDays);

    // calendarDays is not exist, add new calendardays
    // calendarDays is exist,=> add new calendardays ,then remove previous calendarDays
    if (existCalendarDays === null) {
        calendarDays.style.opacity = 1;
    } else {
        if (isIncrease) {
            existCalendarDays.style.cssText =
                "opacity:0; transform:translate(-100%,0); transition: .2s;";
            calendarDays.style.cssText = "opacity:1; transform:translate(100%,0);";
        } else {
            existCalendarDays.style.cssText =
                "opacity:0; transform:translate(100%,0); transition: .2s;";
            calendarDays.style.cssText = "opacity:1; transform:translate(-100%,0);";
        }

        setTimeout(() => {
            calendarDays.style.cssText = "opacity:1; transform:translate(0,0);";
            let calendardaysWrap = document.querySelector(".calendar-daysWrap");
            let calendarArray = calendardaysWrap.querySelectorAll(".calendar-days");
            if (calendarArray.length > 1) {
                calendardaysWrap.removeChild(calendarArray[0]);
            }
        }, 50);
    }
}

// Create DOM of Calendardays
function CreateCalendardays(calendarData) {
    let calendarDays = document.createElement("div");
    calendarDays.classList.add("calendar-days");

    let tpldayInfo = document.querySelector("#tpl-dayInfo");

    calendarData.dates.forEach((item, index) => {
        let clonedayInfo = tpldayInfo.content.cloneNode(true);
        let dayinfo = clonedayInfo.querySelector(".dayInfo");
        // let daytitle = clonedayInfo.querySelector(".dayTitle");

        let istodayDate = YMD_Equal(item.toDateObj(), todayDate);
        dayinfo.addEventListener("click", function () {
            InitAddToDoModal(new Date(item.year, item.month, item.date));
        });
        dayinfo.querySelector(".dayInfo-title").innerText = `${monuthNames[item.month]} ${item.date}`;
        if (istodayDate) {
            dayinfo.classList.add("currentDay");
        }

        if (YM_Equal(item.toDateObj(), new Date(calendarData.title.year, calendarData.title.month))) {
            dayinfo.querySelector(".dayInfo-label>span").innerText = item.date;

            switch (item.day) {
                case 6:
                    // item.day = 6 : saturday
                    dayinfo.classList.add("saturday");
                    break;

                case 0:
                    // item.day = 0 : sunday
                    dayinfo.classList.add("sunday");
                    break;
            }

            if (istodayDate) {
                dayinfo.classList.add("intarget");
            }
        } else {
            dayinfo.querySelector("span").innerText = `${monuthNames[item.month]
                } ${item.date}`;
            dayinfo.classList.add("outtarget");
        }

        calendarDays.appendChild(clonedayInfo);
    });

    return calendarDays;
}

// 
function AddDaysToDoItem(target) {

    // clear previous resizeobserve
    daytoDoBoxResizeObs.disconnect();

    let toDoBoxes = target.querySelectorAll(".dayInfo-toDoBox");

    toDoBoxes.forEach((toDoBox) => {
        // register resize event for each toDoBox 
        daytoDoBoxResizeObs.observe(toDoBox);
    });
}

// when size of dayToDoBox is changed
function daytoDoBoxResizeAction(entries) {
    // console.log(entries);
    entries.forEach((entry, index) => {
        let toDoList = currentCalendarData.dates[index].toDoList;
        CreateDayInfotoDoItems(entry.target, toDoList);
    });
}


// Create todooitem of dayinfo  by todolist and size of entry 
function CreateDayInfotoDoItems(target, toDoList) {
    let targetHeight = target.clientHeight;
    let totaltoDoListHeight, toDoItem;
    const toDoItemHeight = 22;
    const moreInfoHeight = 22;
    target.innerHTML = "";
    if (toDoList.length !== 0) {

        // height = resizeEntry.contentBoxSize[0].blockSize;
        // assume the height of each toDoItem is 22px
        totaltoDoListHeight = toDoList.length * toDoItemHeight;
        // clear exist toDoItem

        // 
        if (totaltoDoListHeight <= targetHeight) {

            toDoList.forEach((scheduleItem) => {
                toDoItem = CreateToDoItemOnCalendar(scheduleItem, (event) => {
                    OnClickToDoItemOfCalendar(event, scheduleItem);
                });
                target.appendChild(toDoItem);
            });
        }
        else {

            targetHeight -= moreInfoHeight;
            let index = 0;
            // create todoItem until the space is used up
            while ((targetHeight -= toDoItemHeight) > 0) {
                let scheduleItem = toDoList[index];
                toDoItem = CreateToDoItemOnCalendar(scheduleItem, (event) => {
                    OnClickToDoItemOfCalendar(event, scheduleItem);
                });
                target.appendChild(toDoItem);
                index++
            }

            // if space is not enough space, use the text of button to indicate
            let classList = ["dayInfo-toDoItemMore"];
            let attrib = [
                { key: "data-bs-toggle", value: "modal" },
                { key: "data-bs-target", value: "#toDoListModal" }
            ];
            let content = `${toDoList.length - index} more `;
            let remain = CreateDOMElement("button", classList, attrib, content);
            remain.addEventListener("click", () => { InitToDOListModal(toDoList); });
            target.appendChild(remain);
        }
    }
}

function OnClickToDoItemOfCalendar(event, scheduleItem) {
    event.stopPropagation();
    InitEditToDoModal(scheduleItem);
}

function OnClickToDoItemOfList(event, scheduleItem) {
    event.stopPropagation();
    InitEditToDoModal(scheduleItem, "#toDoListModal");
}

// Create ToDoItemOnList by object of ScheduleItem 
function CreateToDoItemOnList(scheduleItem, clickevent) {
    let btn = CreateDOMElement(
        "button",
        ["dayInfo-toDoItem"],
        [
            { key: "data-bs-toggle", value: "modal" },
            { key: "data-bs-target", value: "#toDoModal" },
            { key: "data-bs-dismiss", value: "modal" }
        ]
    );
    if (typeof clickevent === "function") {
        btn.addEventListener("click", clickevent);
    }

    let span = document.createElement("span");
    span.innerText = `${CreateTimeString(scheduleItem.hour, scheduleItem.minute)}`;
    btn.appendChild(span);
    span = document.createElement("span");
    span.innerText = `${scheduleItem.title}`;
    btn.appendChild(span);
    return btn;
}


// Create ToDoItemOnCalendar by object of ScheduleItem 
function CreateToDoItemOnCalendar(scheduleItem, clickevent) {

    let btn = CreateDOMElement(
        "button",
        ["dayInfo-toDoItem"],
        []
    );
    if (typeof clickevent === "function") {
        btn.addEventListener("click", clickevent);
    }

    let span = document.createElement("span");
    span.innerText = `${CreateTimeString(scheduleItem.hour, scheduleItem.minute)}`;
    btn.appendChild(span);
    span = document.createElement("span");
    span.innerText = `${scheduleItem.title}`;
    btn.appendChild(span);

    return btn;
}

//CreateDOMElement by parameter
// tag : string of tag
// classList : CSS Classes
// attributes : HTML tag attributes
// content : innerText content
function CreateDOMElement(tag = "div", classList = [], attributes = [], content = "") {
    let element = document.createElement(tag);

    element.innerText = content;

    if (classList.length !== 0) {
        element.classList.add(...classList);
    }

    for (let i = 0; i < attributes.length; i++) {
        element.setAttribute(attributes[i].key, attributes[i].value);
    }

    return element;
}

// Create UUID
// reference : pdf file of calendar  from TA
function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function CompareScheduleOfDay(a, b) {
    let tmpA = a.hour * 100 + a.minute;
    let tmpB = b.hour * 100 + b.minute;
    return tmpA - tmpB;
}
// compare YMD
function YMD_Equal(dateA, dateB) {
    // debugger;
    if (!YM_Equal(dateA, dateB)) {
        return false;
    }
    if (dateA.getDate() !== dateB.getDate()) {
        return false;
    }
    if (dateA.getDay() !== dateB.getDay()) {
        return false;
    }
    return true;
}

// compare YM
function YM_Equal(dateA, dateB) {
    if (dateA.getFullYear() !== dateB.getFullYear()) {
        return false;
    }
    if (dateA.getMonth() !== dateB.getMonth()) {
        return false;
    }

    return true;
}



function CreateDateString(year, month, date) {
    return `${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
}

function CreateTimeString(hour, minute) {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}


function StringCutOff(input, maxLength) {
    if (input.length < maxLength) {
        return input
    }
    else {
        return input.substring(0, maxLength - 3) + "...";
    }
}