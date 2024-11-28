let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let simbit=document.getElementById('sumbit');
let mood='create';
let tmp;
console.log(title,price,taxes,ads,discount,total,count,category,sumbit);
function getTotal(){
    if(price.value!=' '){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='green'
    } else{
        total.innerHTML=' ';
        total.style.background='#5f0c0c'
    }
}
let datapro=[];
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product);
}
else{
    datapro=[];
}
sumbit.onclick=function(){
    getTotal();
    let newdata={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value!=''&&price.value!=''&&category.value!=''&&newdata.count<100){
        if(mood=='create'){
            if(newdata.count>1){
                for(let i=0;i<newdata.count;i++){
                    datapro.push(newdata);
                }
        }else{
                datapro.push(newdata);
        }
        }else{
            datapro[tmp]=newdata;
            mood='create';
            sumbit.innerHTML='Create';
            count.style.display='block';
        }
        cleardata();
    }

    
    localStorage.setItem("product",JSON.stringify(datapro));
    showdata();
}
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
function showdata(){
    getTotal();
    let table='';
    for(let i=0;i<datapro.length;i++){
        table+=` <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].count}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="update(${i})" id="update">update</button></td>
                    <td><button onclick=deletedata(${i}) id="delete">delete</button></td>
                </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteall');
    if(datapro.length>0){
        btndelete.innerHTML=`<button onclick=deleteall() id="delete">delete all(${datapro.length})</button>`
    }else{
        btndelete.innerHTML='';
    }
}
showdata();
function deletedata(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showdata();

}
function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
function update(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal();
    count.style.display='none'
    category.value=datapro[i].category;
    sumbit.innerHTML='Update'
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
let searchMood='title';
function getsearchMood(id){
    let search=document.getElementById('search')
    if(id=='searchtitle'){
        searchMood='title';
    }
    else{
        searchMood='category';
    }
    search.placeholder='Search By '+searchMood;
    search.focus();
    search.value='';
    showdata();
}
function searchData(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
    if(searchMood=='title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table+=` <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick=deletedata(${i}) id="delete">delete</button></td>
            </tr>`
            }
        
    }else{ 
            if(datapro[i].category.includes(value.toLowerCase())){
                table+=` <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick=deletedata(${i}) id="delete">delete</button></td>
            </tr>`
            }
        }
    }
    
    document.getElementById('tbody').innerHTML=table;
}