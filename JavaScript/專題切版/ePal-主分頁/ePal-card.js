let VoiceBtn = document.querySelector('.user-Voice')
let spanOdd = document.querySelectorAll('.voice-Left span:nth-child(odd)')
let spanEven = document.querySelectorAll('.voice-Left span:nth-child(even)')
console.log(spanEven[0])
spanOdd.forEach(item => {
    VoiceBtn.addEventListener('click', () => {
        setInterval(() => {
            item.classList.toggle('w-15')
            item.classList.toggle('w-10')
        }, 400)
    })
})
spanEven.forEach(item => {
        VoiceBtn.addEventListener('click', () => {
            setInterval(() => {
                item.classList.toggle('w-10')
                item.classList.toggle('w-15')
            }, 400)
        })
    })
    // sideBar
var left = document.querySelector(".left");
let navBar = document.querySelector('.top_navbar');
navBar.addEventListener("click", function() {
    document.querySelector("body").classList.toggle("active");
    left.classList.toggle('turn-right');
})


var w = window.innerWidth;
let button = document.getElementById('group-Btn')
let list = document.querySelector('.filter-Game-Group')

if (w > 375) {
    button.classList.toggle('d-none');
} else {
    list.classList.add('d-none');
    button.addEventListener('click', () => {
        list.classList.toggle('d-none')
        list.classList.toggle('d-flex');
    })
}