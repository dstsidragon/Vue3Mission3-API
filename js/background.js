
const user = document.getElementById('user');
const signOut = document.getElementById('signOut');
const chkVerification = document.getElementById("chkVerification");
let productData ;
const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
const btnVerification = document.getElementById("btn-verification");
const API_Path =document.getElementById("API_Path");
//取得token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
axios.defaults.headers.common['Authorization'] = token;
// 讀取使用者名稱
const userName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
user.innerHTML = userName;


// 登出
const signOutAdmin =(e)=>{
    axios.post(`${api_url}/logout`)
    .then(
        res=>{
            // console.log(res);
            if(res.data.success){
                alert(res.data.message);
                window.location="index.html";
            }else{
                alert("未知的錯誤!");
                window.location="product.html";
            }
        }
    )
};
signOut.addEventListener("click",signOutAdmin,false);


//取得商品列表
const getProduct = ()=>{
    axios.get(`${api_url}/api/${api_path}/admin/products`)
    .then(
        res=>{
            // console.log(res);
            // console.log(res.data.success);
            if(res.data.success){
            productData = res.data.products;
            // console.log(productData);
            render();
        }else{
            alert('驗證錯誤，請重新登入!');
            console.log(btnVerification);
            btnVerification.innerHTML="未驗證";
            // window.location="index.html";
        }
        }
    ).catch(
        err=>{
            console.log(err);
        }
    )
};

//呈現資料在畫面
const render = ()=>{
    let str ="";
    let dataLength=productData.length;

    productData.forEach((item,i) => {
        str += `
        <tr class="row ">
        
        <td  class="col-3 d-flex align-items-center"><img width="100%"  src="${item.imageUrl}" alt=""></td>
          <td class="col-2 d-flex align-items-center">${item.title}</td>
          <td  class="col-2 d-flex align-items-center">
            ${item.origin_price}
          </td>
          <td class="col-2 d-flex align-items-center">
            ${item.price}
          </td>
          <td  class="col-2 d-flex align-items-center">
          <div class="onoffswitch">
    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch_${item.id}" tabindex="0" ${item.is_enabled==1?"checked":""} data-is_enabled="${item.is_enabled}" data-id="${item.id}" data-title="${item.title}" data-category="${item.category}" data-unit="${item.unit}" data-origin_price="${item.origin_price}" data-price="${item.price}">
    <label class="onoffswitch-label" for="myonoffswitch_${item.id}"></label>
</div>
          </td>
          <td class="col-1 d-flex align-items-center">
            <button type="button" id="del_${item.id}" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>
      `;
    });
    productList.innerHTML = str;
    productCount.innerHTML = dataLength;
    //賦予事件
    addEvent();
};

//動態賦予事件
const addEvent = ()=>{
    productData.forEach((item,i) => {
        // 刪除事件
        document.getElementById(`del_${item.id}`).addEventListener("click",delOneData,false);
        //啟用/未啟用
        document.getElementById(`myonoffswitch_${item.id}`).addEventListener("click",productEnable,false);
    })
    
};

//刪除單一資料
const delOneData= (e)=>{
    const delId=e.target.dataset.id;
    axios.delete(`${api_url}/api/${api_path}/admin/product/${delId}`)
    .then(
        res=>{
            // console.log(res);
            if(res.data.success){
                alert(`${res.data.message}`);
                getProduct();
    }else{
        alert('錯誤，請檢查產品編號!')
    }
        }
    ).catch(
        err=>{
            console.log(err)
        }
    )
    
};
//驗證
const chkPath = ()=>{
    api_path = API_Path.value;
    console.log(api_path);
    getProduct();
};
chkVerification.addEventListener("click",chkPath,false);

//啟用/未啟用事件
const productEnable = (e)=>{
    const delId=e.target.dataset.id;
    axios.put(`${api_url}/api/${api_path}/admin/product/${delId}`, {
        "data": {
            "category": `${e.target.dataset.category}`,
            "is_enabled": `${e.target.dataset.is_enabled==1?"0":"1"}`,
            "origin_price": parseInt(e.target.dataset.origin_price),
            "price":parseInt(e.target.dataset.price),
            "title": `${e.target.dataset.title}`,
            "unit": `${e.target.dataset.unit}`,
          }
      })
    .then(
        res=>{
            // console.log(res)
            getProduct();
        }
    )
};




//建立產品
const bg_image  = document.getElementById("bg_image");
const bg_image1  = document.getElementById("bg_image1");
const bg_image2  = document.getElementById("bg_image2");
const bg_image3  = document.getElementById("bg_image3");
const bg_image4  = document.getElementById("bg_image4");
const bg_image5  = document.getElementById("bg_image5");
const bg_add_title  = document.getElementById("bg_add_title");
const bg_add_description  = document.getElementById("bg_add_description");
const bg_add_content  = document.getElementById("bg_add_content");
const bg_add_category  = document.getElementById("bg_add_category");
const bg_add_unit  = document.getElementById("bg_add_unit");
const bg_add_origin_price  = document.getElementById("bg_add_origin_price");
const bg_add_price  = document.getElementById("bg_add_price");
const bg_add_image  = document.getElementById("bg_add_image");
const bg_add_image1  = document.getElementById("bg_add_image1");
const bg_add_image2  = document.getElementById("bg_add_image2");
const bg_add_image3  = document.getElementById("bg_add_image3");
const bg_add_image4  = document.getElementById("bg_add_image4");
const bg_add_image5  = document.getElementById("bg_add_image5");
const bg_add_is_enabled  = document.getElementById("bg_add_is_enabled");
const bg_add_send  = document.getElementById("bg_add_send");


const addPrductData = ()=>{
    if(bg_add_title.value!==""&&bg_add_category.value!==""
    &&bg_add_unit.value!==""&&bg_add_origin_price.value!==""
    &&bg_add_price.value!==""){
        console.log(1);
        
        axios.post(`${api_url}/api/${API_Path}/admin/product`, {
            "data": {
              "title": bg_add_title.value, 
              "category": bg_add_category.value,
              "origin_price":bg_add_origin_price.value,
              "price": bg_add_price.value,
              "unit": bg_add_unit.value,
              "description": bg_add_description.value,
              "content": bg_add_content.value,
              "is_enabled": bg_add_is_enabled.value,
              "imageUrl" :bg_add_image.value,
              "imagesUrl": [
                bg_add_image1.value,
                bg_add_image2.value,
                bg_add_image3.value,
                bg_add_image4.value,
                bg_add_image5.value
              ]
            }
          })
        .then(
            res=>{
                console.log(res)
            }
        )
        .catch(
            err=>{
                console.dir(err)
            }
        )

    }else{
        alert("標題、分類、單位、原價、售價為必填欄位!");
    }
};
bg_add_send.addEventListener("click",addPrductData,false);

//改變圖片
const chgImage = ()=>{bg_image.src = bg_add_image.value};
bg_add_image.addEventListener("change",chgImage,false);
const chgImage1 = ()=>{bg_image1.src = bg_add_image1.value};
bg_add_image1.addEventListener("change",chgImage1,false);
const chgImage2 = ()=>{bg_image2.src = bg_add_image2.value};
bg_add_image2.addEventListener("change",chgImage2,false);
const chgImage3 = ()=>{bg_image3.src = bg_add_image3.value};
bg_add_image3.addEventListener("change",chgImage3,false);
const chgImage4 = ()=>{bg_image4.src = bg_add_image4.value};
bg_add_image4.addEventListener("change",chgImage4,false);
const chgImage5 = ()=>{bg_image5.src = bg_add_image5.value};
bg_add_image5.addEventListener("change",chgImage5,false);


// 初始化
function init(){
    getProduct();

};
init();
