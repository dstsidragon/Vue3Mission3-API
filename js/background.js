const app = Vue.createApp({
    data() {
        return {
            //商品資料
            productData:[],
            // 商品資料筆數
            dataLength:0,
            imageUrl:"https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
            imageUrls:{
                url1:"https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80",
                url2:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                url3:"https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1948&amp;q=80",
                url4:"https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80",
                url5:"https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1867&amp;q=80",
            },
            // 使用者名稱
            userName:document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //取得token
         token :document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        }
    },
    methods: {
        // 登出
        signOutAdmin(e) {
            axios.post(`${api_url}/logout`)
                .then(
                    res => {
                        // console.log(res);
                        if (res.data.success) {
                            alert(res.data.message);
                            window.location = "index.html";
                        } else {
                            alert("未知的錯誤!");
                            window.location = "product.html";
                        }
                    }
                )
        },
        //取得商品列表
 getProduct  (){
    axios.get(`${api_url}/api/${api_path}/admin/products`)
    .then(
        res=>{
            // console.log(res);
            // console.log(res.data.success);
            if(res.data.success){
            this.productData = res.data.products;
            // console.log(productData);
            this.render();
        }else{
            alert(res.data.message);
            // window.location="index.html";
        }
        }
    ).catch(
        err=>{
            console.log(err);
        }
    )
},

//呈現資料在畫面
 render (){
    const productList = document.getElementById("productList");
    let str ="";
    this.dataLength=this.productData.length;

    this.productData.forEach((item,i) => {
        str += `
        <tr class="row ">
        
        <td  class="col-3 d-none d-md-table-cell d-flex align-items-center"><img width="100%"  src="${item.imageUrl}" alt=""></td>
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
    //賦予事件
    this.addEvent();
},

//動態賦予事件
 addEvent (){
    this.productData.forEach((item,i) => {
        // 刪除事件
        document.getElementById(`del_${item.id}`).addEventListener("click",this.delOneData,false);
        //啟用/未啟用
        document.getElementById(`myonoffswitch_${item.id}`).addEventListener("click",this.productEnable,false);
    })
    
},

//刪除單一資料
 delOneData(e){
    const delId=e.target.dataset.id;
    // console.log(delId);
    axios.delete(`${api_url}/api/${api_path}/admin/product/${delId}`)
    .then(
        res=>{
            // console.log(res);
            if(res.data.success){
                alert(`${res.data.message}`);
                this.getProduct();
    }else{
        alert(`${res.data.message}`);
    }
        }
    ).catch(
        err=>{
            console.log(err)
        }
    )
    
},
//驗證
 chkPath (){
    api_path = API_Path.value;
    this.getProduct();
},

//啟用/未啟用事件
 productEnable (e){
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
            alert(`${res.data.message}`);
            this.getProduct();
        }
    ).catch(
        err=>{
            console.log(err)
        }
    )
},




//建立產品

 addPrductData  (){
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
    const product = {
        "data": {
          "title": bg_add_title.value, 
          "category": bg_add_category.value,
          "origin_price":bg_add_origin_price.value,
          "price": bg_add_price.value,
          "unit": bg_add_unit.value,
          "description": bg_add_description.value,
          "content": bg_add_content.value,
          "is_enabled": (bg_add_is_enabled.value=="on"?"1":"0"),
          "imageUrl" :bg_add_image.value,
          "imagesUrl": [
            bg_add_image1.value,
            bg_add_image2.value,
            bg_add_image3.value,
            bg_add_image4.value,
            bg_add_image5.value
          ]
        }
      };
    if(bg_add_title.value!==""&&bg_add_category.value!==""
    &&bg_add_unit.value!==""&&bg_add_origin_price.value!==""
    &&bg_add_price.value!==""){
        //   console.log(product)
        axios.post(`${api_url}/api/${API_Path}/admin/product`, {
            "data": {
              "title": "[賣]動物園造型衣服3", 
              "category": "衣服2",
              "origin_price": 100,
              "price": 300,
              "unit": "個",
              "description": "Sit down please 名設計師設計",
              "content": "這是內容",
              "is_enabled": 1,
              "imageUrl" : "主圖網址",
              "imagesUrl": [
                "圖片網址一",
                "圖片網址二",
                "圖片網址三",
                "圖片網址四",
                "圖片網址五"
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
},










    },
    created() { 
         //取得token
        //  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
         axios.defaults.headers.common['Authorization'] = this.token;
        
        //取得商品資料
    this.getProduct();
    },
    mounted(){
        
    }
}).mount('#app');

