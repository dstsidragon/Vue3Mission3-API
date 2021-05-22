

const app = Vue.createApp({
    data() {
        return {
            //商品資料
            productData: [],
            // 商品資料筆數
            dataLength: 0,
            imageUrl: "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
            imageUrls: {
                url1: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80",
                url2: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                url3: "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1948&amp;q=80",
                url4: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80",
                url5: "https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1867&amp;q=80",
            },
            // 使用者名稱
            userName: document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //取得token
            token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            // 編輯資料索引
            rediData:{
                redi_index:null,
                id:"",
                title: "",
                description: "",
                content: "",
                category: null,
                unit: "",
                origin_price: null,
                price: null,
                is_enabled: 0,
                num: 1,
                imageUrl : "",
                imagesUrl: {
                   url1: "",
                   url2: "",
                   url3: "",
                   url4: "",
                   url5: ""}
                },
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
        getProduct() {
            axios.get(`${api_url}/api/${api_path}/admin/products`)
                .then(
                    res => {
                        // console.log(res);
                        // console.log(res.data.success);
                        if (res.data.success) {
                            this.productData = res.data.products;
                            // console.log(productData);
                            // 更新筆數
                            this.dataLength = this.productData.length;
                        } else {
                            alert(res.data.message);
                            // window.location="index.html";
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },

        //刪除單一資料
        delOneData(e) {
            const delId = e.target.dataset.id;
            // console.log(delId);
            axios.delete(`${api_url}/api/${api_path}/admin/product/${delId}`)
                .then(
                    res => {
                        // console.log(res);
                        if (res.data.success) {
                            alert(`${res.data.message}`);
                            this.getProduct();
                        } else {
                            alert(`${res.data.message}`);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )

        },
        //驗證
        chkPath() {
            this.api_path = API_Path.value;
            this.getProduct();
        },

        //啟用/未啟用事件
        productEnable(e) {
            const delId = e.target.dataset.id;
            axios.put(`${api_url}/api/${api_path}/admin/product/${delId}`, {
                "data": {
                    "category": `${e.target.dataset.category}`,
                    "is_enabled": e.target.dataset.is_enabled == 1 ? 0 : 1,
                    "origin_price": parseInt(e.target.dataset.origin_price),
                    "price": parseInt(e.target.dataset.price),
                    "title": `${e.target.dataset.title}`,
                    "unit": `${e.target.dataset.unit}`,

                    // "title": bg_add_title.value,
                    // "category": bg_add_category.value,
                    // "origin_price": parseInt(bg_add_origin_price.value),
                    // "price": parseInt(bg_add_price.value),
                    // "unit": bg_add_unit.value,
                    // "description": bg_add_description.value,
                    // "content": bg_add_content.value,
                    // "is_enabled": (bg_add_is_enabled.value == "on" ? "1" : "0"),
                    // "imageUrl": bg_add_image.value,
                    // "imagesUrl": [
                    //     bg_add_image1.value,
                    //     bg_add_image2.value,
                    //     bg_add_image3.value,
                    //     bg_add_image4.value,
                    //     bg_add_image5.value
                    // ]
                }
            })
                .then(
                    res => {
                        // console.log(res)
                        alert("已變更啟用狀態!");
                        this.getProduct();
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
        },

        //建立產品
         addPrductData() {
            const bg_add_title = document.getElementById("bg_add_title");
            const bg_add_description = document.getElementById("bg_add_description");
            const bg_add_content = document.getElementById("bg_add_content");
            const bg_add_category = document.getElementById("bg_add_category");
            const bg_add_unit = document.getElementById("bg_add_unit");
            const bg_add_origin_price = document.getElementById("bg_add_origin_price");
            const bg_add_price = document.getElementById("bg_add_price");
            const bg_add_image = document.getElementById("bg_add_image");
            const bg_add_image1 = document.getElementById("bg_add_image1");
            const bg_add_image2 = document.getElementById("bg_add_image2");
            const bg_add_image3 = document.getElementById("bg_add_image3");
            const bg_add_image4 = document.getElementById("bg_add_image4");
            const bg_add_image5 = document.getElementById("bg_add_image5");
            const bg_add_is_enabled = document.getElementById("bg_add_is_enabled");
            
            const product = {
                "data": {
                    "title": bg_add_title.value,
                    "category": bg_add_category.value,
                    "origin_price": parseInt(bg_add_origin_price.value),
                    "price": parseInt(bg_add_price.value),
                    "unit": bg_add_unit.value,
                    "description": bg_add_description.value,
                    "content": bg_add_content.value,
                    "is_enabled": (bg_add_is_enabled.checked  ? 1 :0),
                    "imageUrl": bg_add_image.value,
                    "imagesUrl": [
                        bg_add_image1.value,
                        bg_add_image2.value,
                        bg_add_image3.value,
                        bg_add_image4.value,
                        bg_add_image5.value
                    ]
                }
            };
            if (bg_add_title.value !== "" && bg_add_category.value !== ""
                && bg_add_unit.value !== "" && bg_add_origin_price.value !== ""
                && bg_add_price.value !== "") {
                //   console.log(API_Path)
                axios.post(`${api_url}/api/${api_path}/admin/product`, product)
                    .then(
                        res => {
                            alert(res.data.message);
                            // 刷新
                            this.getProduct();

                            // 關掉新增產品選單
                            
                            document.getElementById("addProduct").classList.remove("show")

                            // 清空資料
                            bg_add_title.value = "";
                            bg_add_category.value = "";
                            bg_add_origin_price.value = "";
                            bg_add_price.value = "";
                            bg_add_unit.value = "";
                            bg_add_description.value = "";
                            bg_add_content.value = "";
                            bg_add_is_enabled.checked="false";

                        }
                    )
                    .catch(
                        err => {
                            console.dir(err)
                        }
                    )

            } else {
                alert("標題、分類、單位、原價、售價為必填欄位!");
            }
        },
        // 取得編輯商品
        getReditOneData(e){
            // 取得待編輯商品索引
            const index = (e.target.id).split("_")[1];
            // 將索引傳至data
            this.rediData.redi_index = index;
            // 將資料傳至data
            const rediItem = this.productData[this.rediData.redi_index];

            this.rediData.title =rediItem.title;
            this.rediData.description =rediItem.description;
            this.rediData.id =rediItem.id;
            this.rediData.content =rediItem.content;
            this.rediData.category =rediItem.category;
            this.rediData.unit =rediItem.unit;
            this.rediData.origin_price =rediItem.origin_price;
            this.rediData.price =rediItem.price;
            this.rediData.is_enabled =parseInt(rediItem.is_enabled) ;
            this.rediData.imageUrl =rediItem.imageUrl;
            this.rediData.imagesUrl.url1 =rediItem.imagesUrl[0];
            this.rediData.imagesUrl.url2 =rediItem.imagesUrl[1];
            this.rediData.imagesUrl.url3 =rediItem.imagesUrl[2];
            this.rediData.imagesUrl.url4 =rediItem.imagesUrl[3];
            this.rediData.imagesUrl.url5 =rediItem.imagesUrl[4];
        },
        reditOneData(){
            const  reditNewData = {
                "data": {
                    category:this.rediData.category,
                  content:this.rediData.content,
                  description:this.rediData.description,
                  id:this.rediData.id,
                  is_enabled:parseInt(this.rediData.is_enabled),
                  origin_price:parseInt(this.rediData.origin_price),
                  price:parseInt(this.rediData.price),
                  title:this.rediData.title,
                  unit:this.rediData.unit,
                  num: 1,
                  imageUrl:this.rediData.imageUrl,
                  imagesUrl: [
                    this.rediData.imagesUrl.url1,
                    this.rediData.imagesUrl.url2,
                    this.rediData.imagesUrl.url3,
                    this.rediData.imagesUrl.url4,
                    this.rediData.imagesUrl.url5
                  ]
                }
              };
              console.log(reditNewData)
            axios.put(`${api_url}/api/${api_path}/admin/product/${this.rediData.id}`,reditNewData)
            .then(
                res=>{
                    console.log(res);
                    alert(res.data.message);
                    //刷新
                    this.getProduct();
                    // 關閉編輯視窗
                    $().ready(function() {
                        $(".btn-close").trigger("click");
                    })
                   
                }
            ).catch(err=>{
                console.log(err)
                // alert(err.data.message)
            })
        },

    },
    created() {
        // 使用token驗證
        axios.defaults.headers.common['Authorization'] = this.token;
        //取得商品資料
        this.getProduct();
    },
    mounted() {
    }
}).mount('#app');
