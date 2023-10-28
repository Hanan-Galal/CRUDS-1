// get total
// create product
// save localStorage
// clear inputs
// read
// count
// delete
// update
// search
// clean data

// ########################
let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let count=document.getElementById("count")
let total=document.getElementById("total")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let mood="create";
let temp;


// get total
function getTotal(){
    if(price.value!=""){
        let result=(+price.value + +taxes.value+ +ads.value )-(+discount.value ) 
        total.innerHTML=result;
        total.style.background="green";
    }
    else{
        total.style.background= 'red';
        total.innerHTML="";
    }
}
// ###################
// create product
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}
else{
    dataPro=[]
}
submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        total:total.innerHTML,
        category:category.value.toLowerCase()
    }
if(title.value!="" && price.value !="" && newPro.count<100 &&category.value!=""){
    if(mood ==="create"){
        // count
        if (newPro.count>1){
        for(let i=0; i<newPro.count;i++){
                dataPro.push(newPro);
        }
        
    }
        else{
        dataPro.push(newPro);
    }
    }
    else{
        dataPro[temp]=newPro;
        mood="create";
        count.style.display='block';
        submit.innerHTML="create";

    }
    clearData()
}

    // save localStorage
    localStorage.setItem('product',JSON.stringify(dataPro))
    showData()
    // clearData()
}


// clear inputs
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";

}

// read
function showData(){
    getTotal()
    let table='';
    for(let i=0;i<dataPro.length;i++){
        table+=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})" >delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length>0)
    {
        btnDelete.innerHTML=`
        <button onclick="deleteAll()" >delete All (${dataPro.length})</button>
        `;
    }
    else{
        btnDelete.innerHTML='';
    }

}

showData()

// delete

function deleteData(i){
        dataPro.splice(i,1);
        localStorage.product=JSON.stringify(dataPro)
        showData()
}
// delete ALL
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0)
    showData()
    
}

// updateData func
function updateData(i){
    title.value =dataPro[i].title;
    price.value =dataPro[i].price;
    taxes.value =dataPro[i].taxes;
    ads.value =dataPro[i].ads;
    discount.value =dataPro[i].discount;
    getTotal()
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='update';
    mood="update";
    temp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}
// search

let searchMood="title";
function searchBy(id){
    let search=document.getElementById('search')
    if(id =="searchTitle")
    {
        searchMood="title";
        search.placeholder='searchBy Title';
        
        
    }
    else{
        searchMood="category";
        search.placeholder='searchBy category';
    }
    search.focus()
    // console.log(searchMood)
}
function searchData(value){
    let table='';
    console.log(value)
    for(let i=0;i<dataPro.length;i++){
        if( searchMood =="title" ){
        
            if(dataPro[i].title.includes(value.toLowerCase())){
                console.log( i)
                    table+=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})" >delete</button></td>
            </tr>
                `
        }
    
    }
    else{
        
        for(let i=0; i<dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i}</td>  
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})" >delete</button></td>
            </tr>
                `;
            }
        }
    }
}
    document.getElementById('tbody').innerHTML=table;
}