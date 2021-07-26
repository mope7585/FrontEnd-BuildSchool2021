const url = 'https://mope7585.github.io/FrontEnd-BuildSchool2021/JavaScript/0713%E5%8A%9F%E8%AA%B2%E6%97%A5/Apple.json'
window.onload = () => {
    //利用fetch語法
    fetch(url)
    .then(response => response.json())
    //取出apple資料
    .then(appleObject => {
        //取出apple所有產品 iPhone、iPad、Mac key項目
        let appleKey = Object.keys(appleObject)
        let appleItem = [];
        //選取Main-Components
        let Components = document.querySelector('.main-Components');
        appleKey.forEach((item) => {
            //取出三個項目裡的各別內容，並push至appleItem空陣列裡
            appleItem.push(appleObject[item]);
        });
        // ------------------------------------------------------------------------------------------------------------------
        //設定nav三個btn 事件
        let navItem = document.querySelectorAll('nav ul li a');
        //設定nav iphone
        navItem[0].addEventListener('click',()=>{
            clean();
            iPhone(); 
        });
        //設定nav iPad
        navItem[1].addEventListener('click',()=>{
            clean();
            iPad(); 
        })
        //設定nav Mac
        navItem[2].addEventListener('click',()=>{
            clean();
            Mac();
        })
    // ------------------------------------------------------------------------------------------------------------------
        //iPhone function
        function iPhone(){
            let iPhoneObject = appleItem[0];
            img.setAttribute('src',iPhoneObject.iPhone12.baseImgUrl);
            let iPhoneKeys = Object.keys(iPhoneObject);
            let modelFit = [];
            let modelSize = [];
            let modelImg = [];
            let OutWardArray = [];
            let modelIphone = iPhoneKeys;
            //建立modelIphone
            iPhoneKeys.forEach(iPhoneKey => {
                //建立modelFit
                modelFit.push(iPhoneObject[iPhoneKey].spec[0].fit);
                //建立modelSize
                modelSize.push(iPhoneObject[iPhoneKey].size);
                //建立modelImg
                modelImg.push(iPhoneObject[iPhoneKey].baseImgUrl);
                //建立OutWardArray
                OutWardArray.push(iPhoneObject[iPhoneKey].OutWard);
            });
            console.log(OutWardArray)
            OutWardArray[0].forEach((item,index)=>{
                // console.log(item)
            })
            
            Color(OutWardArray[0])
            // Color(OutWardArray[1])
            clean();
            Model(modelFit,modelSize,modelIphone,modelImg,OutWardArray);
        }

        //iPad function
        function iPad(){
            let iPadObject = appleItem[1];
            console.log(iPadObject)
            Color();
            Memory();
        }
        //Mac functuion
        function Mac(){
            let MacObject = appleItem[2]
            console.log(MacObject)
            Color();
            Memory();
        }
        // ------------------------------------------------------------------------------------------------------------------
        //選擇機型(Model) function
        //選取model-Row
        let modelRow = document.querySelector('.modelRow')
        function Model(modelFit,modelSize,modelIphone,modelImg,OutWardArray){
            modelIphone.forEach((iPhone,index)=>{
                //建立formCheck 並append至model-Row
                let formCheck = document.createElement('div');
                formCheck.classList.add('form-check','w-100');
                modelRow.append(formCheck);
                //建立input 並append至formCheck
                let input = document.createElement('input');
                input.classList.add('form-check-input','opacity-0')
                input.setAttribute('type','radio');
                input.setAttribute('name','model');
                input.setAttribute('id',iPhone[index]);
                formCheck.append(input);
                //建立label 並append至formCheck
                let label = document.createElement('label');
                label.classList.add('form-check-label','d-flex','justify-content-between');
                label.setAttribute('for',iPhone[index]);
                formCheck.append(label);
                //建立 label-text 並append至label
                let labelText = document.createElement('div');
                labelText.classList.add('label-text');
                label.append(labelText);
                //建立 label span 並append至label-text
                let labelSpan = document.createElement('span');
                labelSpan.innerText = modelSize[index];
                labelText.append(labelSpan);
                //建立 label p 並append至label-text
                let labelP = document.createElement('p');
                labelP.innerText = iPhone;
                labelText.append(labelP);
                //建立 label-fit 並append至label
                let labelFit = document.createElement('div');
                labelFit.classList.add('fit');
                label.append(labelFit);
                //建立 fit-span 並append至 label-fit
                let fitSpan = document.createElement('span');
                labelFit.append(fitSpan);
                fitSpan.innerText = `${modelFit[index]} 起`;
                formCheck.addEventListener('click',()=>{
                    img.setAttribute('src',modelImg[index]);
                    // Color(OutWardArray[index]);
                })
            })
        }
        
        //選擇顏色(Color) function
        function Color(OutWardArray){
        OutWardArray.forEach((item,index) =>{
            //選取rowColor
            let rowColor = document.querySelector('.rowColor');
            //建立formCheck 並append至rowColor
            let formCheck = document.createElement('div');
            formCheck.classList.add('form-check','col-6','d-flex','m-auto','justify-content-center');
            rowColor.appendChild(formCheck);
            //建立input 並append至formCheck 
            let input = document.createElement('input');
            input.classList.add('form-check-input','opacity-0');
            input.setAttribute('type','radio');
            input.setAttribute('name','Color');
            input.setAttribute('id',item.color);
            formCheck.append(input);
            //建立label 並append至formcheck
            let label = document.createElement('label');
            label.setAttribute('for',item.color);
            formCheck.append(label);
            //建立Card 並append至label
            let Card = document.createElement('div');
            Card.classList.add('Card','d-flex','flex-column');
            label.append(Card);
            //建立Color img 並append至Card
            let Colorimg = document.createElement('img');
            Colorimg.classList.add('card-img-top','w-50','m-auto');
            Colorimg.setAttribute('src',item.colorValue);
            Card.append(Colorimg);
            //建立cardBody 並append至Card
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            Card.append(cardBody);
            //建立 cardBody-P 並append至 cardBody
            let CardP = document.createElement('p');
            CardP.classList.add('card-text')
            CardP.innerText = item.color;
            cardBody.append(CardP);
        })
        }   

        //選擇容量(Memory) function
        function Memory(){

        }
        //清空main-Componens function
        function clean(){
            //modelRow內容清空
            modelRow.innerHTML = "";
        }
        iPhone();
    })
    // ------------------------------------------------------------------------------------------------------------------
    //通用區
    //抓取img(左) 節點
    let img = document.querySelector('.main-Picture img');
    img.classList.add('w-100');
    
}