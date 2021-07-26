let url = 'https://raw.githubusercontent.com/jessy8130/FileStorage/main/Apple.json';
fetch(url)
.then(response => response.json())
.then(result => {
    let model = document.querySelector('.model');
    let finish = document.querySelector('.finish');
    let storage = document.querySelector('.storage');
    let h1Title = document.querySelector('h1');

    let keys = [];

    //Apple抓資料
    let phoneObject = result.iphone;
    let i12Object = result.iphone.i12pro;
    let i12maxObject = result.iphone.i12promax;
    let padObject =result.ipad;
    let watchObject =result.watch;

    let img = document.querySelector('.container .row .col-12 .item-img img');
    let hPrice = document.querySelector('header .header-bottom .container .row span span');
    let amountSpan = document.querySelector('.price .amount h2');

    // nav種類
    let itemChoose = phoneObject;
    initialComponent();
    priceSet(i12Object.model.url,i12Object.storage[0].price);

    let aIphone = document.querySelector('.main-menu :nth-of-type(1)');
    aIphone.addEventListener('click', function(){
        itemChoose = phoneObject;
        initialComponent();
        h1Title.innerText="購買 iPhone 12 Pro";
        priceSet(i12Object.model.url,i12Object.storage[0].price);
    });
    let aIpad = document.querySelector('.main-menu :nth-of-type(2)');
    aIpad.addEventListener('click', function(){
        itemChoose = padObject;
        initialComponent();
        h1Title.innerText="購買 iPad";
        priceSet(padObject.ipad.model.url, padObject.ipad.storage[0].price);

        
    });
    let aWatch = document.querySelector('.main-menu :nth-of-type(3)');
    aWatch.addEventListener('click', function(){
        itemChoose = watchObject;
        initialComponent();
        h1Title.innerText="購買 Apple Watch";
        priceSet(watchObject.watch.model.url,watchObject.watch.storage[0].price);
    });

    //價格初始化
    function priceSet(imgPath, pricePath){
        img.setAttribute('src', imgPath);
        hPrice.innerText =pricePath;
        amountSpan.innerText = pricePath;
    }

   
    //初始化欄位
    function initialComponent(){
        //清空原本畫面
        model.innerHTML ='';
        finish.innerHTML='';
        storage.innerHTML='';

//建立頁面欄位
        //model
        keys = Object.keys(itemChoose);
        
        if(keys.length == 1){
            model.classList.add('d-none');
        }
        else
        {
            model.classList.remove('d-none');
            let h2M = document.createElement('h2');
            h2M.innerText='選擇機型。';
            let aM = document.createElement('a');
            aM.innerText='哪一款機型最適合你？';
            aM.setAttribute("href","#");
            model.appendChild(h2M);      
            model.appendChild(aM);
            let btnGroupM = document.createElement('div');
            btnGroupM.classList.add('btn-group', 'row', 'd-grid', 'gap-2');
    
            
            let indexM = 0;
            for(colItem of keys)
            {  
                let div = document.createElement('div');
                div.classList.add('col-12');
    
                //input label
                let input = document.createElement('input');
                let label = document.createElement('label');
                input.setAttribute('type','radio');
                input.setAttribute('name',keys);
                input.setAttribute('id', keys[indexM]);
                label.setAttribute('for', keys[indexM]);
                label.classList.add('btn','justify-content-between','align-items-center');
                //label內容
                //label內容--型號
                let spanOutL = document.createElement('span');
                spanOutL.innerText= itemChoose[colItem].model.item;
                spanOutL.classList.add('text-start','fw-bold');
                let spanInnerL = document.createElement('span');
                spanInnerL.classList.add('desc');
                spanInnerL.innerText = itemChoose[colItem].model.desc;
                spanOutL.appendChild(document.createElement('br'));
                spanOutL.appendChild(spanInnerL);
                //label內容--價格
                let spanOutR = document.createElement('span');
                spanOutR.innerText = itemChoose[colItem].model.price;
                let spanInnerR = document.createElement('span');
                spanInnerR.innerText = '起';
                spanOutR.appendChild(spanInnerR);
    
                label.append(spanOutL,spanOutR);
                div.append(input,label);
                btnGroupM.append(div);
                model.append(btnGroupM);
    
                indexM++;
            }
        }

        //finish
        let h2F = document.createElement('h2');
        h2F.innerText='選擇外觀。';
        finish.appendChild(h2F);
        let btnGroupF = document.createElement('div');
        btnGroupF.classList.add('btn-group', 'row', 'w-100');

        let indexF =0;
        if(keys.length > 1)
        { 
            keys = keys[0];  
        }

        for(colItem of itemChoose[keys].appearance)
        {
            let div = document.createElement('div');
            div.classList.add('col-6','mb-3');

            //input label
            let input = document.createElement('input');
            let label = document.createElement('label');
            input.setAttribute('type','radio');
            input.setAttribute('name', 'appearance');
            input.setAttribute('id', itemChoose[keys].appearance[indexF].cEng);
            label.setAttribute('for', itemChoose[keys].appearance[indexF].cEng);
            label.classList.add('btn','flex-column');
            //label內容
            //label內容--圖
            let divImg = document.createElement('div');
            let img = document.createElement('img');
            img.setAttribute('src', itemChoose[keys].appearance[indexF].colorImg);

            divImg.classList.add('color');
            divImg.append(img);

            //label內容--文
            let spanInner = document.createElement('span');
            spanInner.classList.add('desc');
            spanInner.innerText = itemChoose[keys].appearance[indexF].color;

            label.append(divImg,spanInner);
            div.append(input,label);
            btnGroupF.append(div);
            finish.append(btnGroupF);

            indexF++;
        }


        //storage
        let h2S = document.createElement('h2');
        h2S.innerText='選擇儲存容量。';
        let aS = document.createElement('a');
        aS.setAttribute("href","#");
        aS.innerText='你需要多少儲存容量？';
        let btnGroupS = document.createElement('div');
        btnGroupS.classList.add('btn-group', 'row', 'w-100');
        storage.append(h2S,aS);

        let indexS =0;
        for(colItem of itemChoose[keys].storage){
            let div = document.createElement('div');
            div.classList.add('col-6','mb-3');

            //input label
            let input = document.createElement('input');
            let label = document.createElement('label');
            input.setAttribute('type','radio');
            input.setAttribute('name','storage');
            input.setAttribute('id', itemChoose[keys].storage[indexS].size);
            label.setAttribute('for', itemChoose[keys].storage[indexS].size);
            label.classList.add('btn','flex-column');

            let storageSpan = document.createElement('span');
            storageSpan.innerText = itemChoose[keys].storage[indexS].size;
            storageSpan.classList.add('fw-bold');
            let priceSpan = document.createElement('span');
            priceSpan.innerText = itemChoose[keys].storage[indexS].price;
            priceSpan.classList.add('desc');

            label.append(storageSpan,priceSpan);
            div.append(input,label);
            btnGroupS.append(div);
            storage.append(btnGroupS);

            indexS++;
        }

    
//程式操控
        //選擇機型
        let modelBtn = document.querySelectorAll('.model input');
        
        if(keys.length > 1){
        modelBtn[0].addEventListener('click', function(){
            itemChoose = i12Object;
            setModelItem();
        })
    
        modelBtn[1].addEventListener('click', function(){
            itemChoose = i12maxObject;
            setModelItem();
        })
        }
    
        function setModelItem(){
            img.setAttribute('src', itemChoose.model.url);
            hPrice.innerText = itemChoose.model.price;
            storageSpan.forEach((item,index)=>{
                storageSpan[index].innerText = itemChoose.storage[index].price;
            });
        }


        //選擇顏色
        let appearanceBtn = document.querySelectorAll('.finish input');
        appearanceBtn.forEach((colorRow,index)=>{
            appearanceBtn[index].addEventListener('click', function(){
                if(keys.length>1)
                {
                    img.setAttribute('src', itemChoose.appearance[index].itemImg);
                }
                else{
                    img.setAttribute('src', itemChoose[keys].appearance[index]. itemImg);
                }
            });

        })

        //選擇容量
        let storageBtn = document.querySelectorAll('.storage input');
        let storageSpan = document.querySelectorAll('.storage .btn-group label  span:last-child');

        storageBtn.forEach((storageRow,index)=>{
            storageBtn[index].addEventListener(
                'click', function(){
                    if(keys.length>1)
                    {
                        hPrice.innerText = itemChoose.storage[index].price;
                        amountSpan.innerText = 
                        itemChoose.storage[index].price;
                    }
                    else{
                        hPrice.innerText = itemChoose[keys].storage[index].price;
                        amountSpan.innerText = 
                        itemChoose[keys].storage[index].price;
                    }
                }
            );
        });
    }
})
.catch(ex =>{
    console.log(ex);
})

