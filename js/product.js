
const user = document.getElementById('user');
const signOut = document.getElementById('signOut');
let productData ;
const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
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
    axios.get(`${api_url}/api/${api_path}/products`)
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
          <td  class="col-1 d-flex align-items-center">
          <input class="carNum" type="number" value="1"  id="productNum_${item.id}">
          </td>
          <td class="col-2 d-flex align-items-center">
            <button type="button" id="car_${item.id}"  class="btn btn-sm btn-outline-info move deleteBtn" data-action="remove" data-id="${item.id}"> 加入購物車 </button>
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
    // 購物車事件
    productData.forEach((item,i) => {
        document.getElementById(`car_${item.id}`).addEventListener("click",addCart,false);
    })
};

//加入購物車
const addCart= (e)=>{
   alert("先不要點啦~ 我還沒做，晚點補上QQ")
    // 刷新畫面
    render();
};



// 初始化
function init(){
    getProduct();

};
init();
