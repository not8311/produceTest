const url = "https://hexschool.github.io/js-filter-data/data.json";
const productsList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const search = document.querySelector(".search");
const change = document.querySelector("#js-select");
const sortAdvanced = document.querySelector(".js-sort-advanced");
let data = [];

// console.log(sortAdvanced);

// 連接API
function getData(){
    productsList.innerHTML = `<tr><td colspan="7" class="text-center p-3">資料載入中...</td></tr>`;
    axios.get(url)
        .then(function(response){
            data = response.data.filter((item)=>{
                if(item.作物名稱 !== null && item.作物名稱 !== ""){
                    return item;
                }
            })
            renderData(data);
        })
        
}
getData();


// 參數想要的資料渲染出來
function renderData(showData){
    let str = "";
    showData.forEach((item)=>{
        str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td><td>${item.上價}</td><td>${item.中價}</td><td>${item.下價}</td><td>${item.平均價}</td><td>${item.交易量}</td></tr>`;
    })
    productsList.innerHTML = str;
}

// 篩選種類
buttonGroup.addEventListener("click",(e)=>{
    if(e.target.nodeName === "BUTTON"){
        let type = e.target.getAttribute("data-type");
        let filter = [];
        if(type === "N04"){
            filter = data.filter((item)=>{
                return item.種類代碼 === "N04"
            })
            renderData(filter);
        }else if(type === "N05"){
            filter = data.filter((item)=>{
                return item.種類代碼 === "N05"
            })
            renderData(filter);
        }else if(type === "N06"){
            filter = data.filter((item)=>{
                return item.種類代碼 === "N06"
            })
            renderData(filter);
        }
    }
})

// 搜尋功能
search.addEventListener("click",(e)=>{
    if(e.target.nodeName === "BUTTON"){
        let txt = document.getElementById("crop");
        if(txt.value.trim() == ""){
            alert("請輸入作物名稱");
            return;
        }
        let filterData = [];
        filterData = data.filter((item)=>{
            return item.作物名稱.match(txt.value);
        })
        if(filterData.length == 0){
            productsList.innerHTML = `<tr><td colspan="7" class="text-center p-3">查詢不到交易資料QQ</td></tr>`;
            return;
        }else{
            renderData(filterData);
        }
    }
})

// 排序篩選
change.addEventListener("change",(e)=>{
    switch(e.target.value){
        case "依上價排序":
            selectChange("上價");
            break;
        case "依中價排序":
            selectChange("中價");
            break;
        case "依下價排序":
            selectChange("下價");
            break;
        case "依平均價排序":
            selectChange("平均價");
            break;
        case "依交易量排序":
            selectChange("交易量");
            break;
    }
    function selectChange(value){
        data.sort((a,b)=> a[value] - b[value]);
        renderData(data);
    }
})

// 資料排序I按鈕
sortAdvanced.addEventListener("click",(e)=>{
    if(e.target.nodeName === "I"){
        let sortPrice = e.target.getAttribute("data-price");
        let sortCaret = e.target.getAttribute("data-sort");
        if(sortCaret === "up"){
            data.sort((a,b) => {
                return b[sortPrice] - a[sortPrice];
            })
            renderData(data);
        }else if (sortCaret === "down"){
            data.sort((a,b) => {
                return a[sortPrice] - b[sortPrice];
            })
            renderData(data);
        }
    }
})
