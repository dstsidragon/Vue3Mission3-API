

const app = Vue.createApp({
    data() {
        return {
            //商品資料
            productData: [],
            // 商品資料筆數
            dataLength: 0,
            // 使用者名稱
            userName: "訪客",
            //登入/登出鈕
            login_status: false,
            //取得token
            token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            // 編輯資料索引
            rediData: {
                redi_index: null,
                id: "",
                title: "",
                description: "",
                content: "",
                category: null,
                unit: "",
                origin_price: null,
                price: null,
                is_enabled: 0,
                num: 1,
                imageUrl: "",
                imagesUrl: {
                    url1: "",
                    url2: "",
                    url3: "",
                    url4: "",
                    url5: ""
                }
            },
            //新增產品
            addProduct: {
                bg_add_title: "",
                bg_add_description: "",
                //分類
                bg_add_content: "",
                bg_add_category: "",
                bg_add_unit: "",
                bg_add_origin_price: "",
                bg_add_price: "",
                bg_add_is_enabled: false,
                imageUrl: "https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300",
                imageUrls: {
                    url1: "https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300",
                    url2: "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173",
                    url3: "https://tse3.mm.bing.net/th?id=OIP._jO8Zpb6mfLi_BDgmY5QGgHaNK&pid=Api&P=0&w=300&h=300",
                    url4: "https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300",
                    url5: "https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300",
                },
            }
        }
    },
    methods: {
        // 登出
        signOutAdmin(e) {
            axios.post(`${api_url}/logout`)
                .then(
                    res => {
                        // console.log(res);
                        //如果成功就執行
                        if (res.data.success) {
                            alert(res.data.message);

                            //刪除cookie
                            this.deleteAllCookies();
                            //跳轉頁面
                            window.location = "login.html";
                        } else {
                            alert("未知的錯誤!");

                            //跳轉頁面
                            window.location = "login.html";
                        }
                    }
                )
        },
        //刪除cookie
         deleteAllCookies() {
            let cookies = document.cookie.split(";");
        
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
        
        //判斷使用者值
        chkUserName() {
            // 如果有取到值 ，代表已登入
            if (document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "") {
                this.userName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                // 登入狀態
                this.login_status =  true;
            }else{
                this.userName = "訪客";
                // 登入狀態
                this.login_status =  false;
            }
        },
        //取得商品列表
        getProduct() {
            axios.get(`${api_url}/api/${api_path}/admin/products`)
                .then(
                    res => {
                        // console.log(res);
                        // console.log(res.data.success);

                        //如果成功就執行
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

                        //如果成功就執行
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
                data: {
                    category: `${e.target.dataset.category}`,
                    is_enabled: e.target.dataset.is_enabled == 1 ? 0 : 1,
                    origin_price: parseInt(e.target.dataset.origin_price),
                    price: parseInt(e.target.dataset.price),
                    title: `${e.target.dataset.title}`,
                    unit: `${e.target.dataset.unit}`,


                }
            })
                .then(
                    res => {
                        // console.log(res)
                        //如果成功就執行
                        if (res.data.success) {
                            alert("已變更啟用狀態!");
                            this.getProduct();
                        }
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
        },

        //建立產品
        addPrductData() {

            //新增的產品資料
            const product = {
                data: {
                    title: this.addProduct.bg_add_title,
                    category: this.addProduct.bg_add_category,
                    origin_price: parseInt(this.addProduct.bg_add_origin_price),
                    price: parseInt(this.addProduct.bg_add_price),
                    unit: this.addProduct.bg_add_unit,
                    description: this.addProduct.bg_add_description,
                    content: this.addProduct.bg_add_content,
                    is_enabled: (this.addProduct.bg_add_is_enabled),
                    imageUrl: this.addProduct.imageUrl,
                    imagesUrl: [
                        this.addProduct.imageUrls.url1,
                        this.addProduct.imageUrls.url2,
                        this.addProduct.imageUrls.url3,
                        this.addProduct.imageUrls.url4,
                        this.addProduct.imageUrls.url5,
                    ]
                }
            };
            // console.log(product);
            //判斷是否都不為空值
            if (this.addProduct.bg_add_title !== "" && this.addProduct.bg_add_category !== ""
                && this.addProduct.bg_add_unit !== "" && this.addProduct.bg_add_origin_price !== ""
                && this.addProduct.bg_add_price !== "") {
                //   console.log(API_Path)

                //送至伺服器
                axios.post(`${api_url}/api/${api_path}/admin/product`, product)
                    .then(
                        res => {

                            alert(res.data.message);
                            //如果成功就執行
                            if (res.data.success) {
                                // 刷新
                                this.getProduct();

                                // 關掉新增產品選單

                                document.getElementById("addProduct").classList.remove("show")

                                // 清空資料
                                this.addProduct.bg_add_title = "";
                                this.addProduct.bg_add_category = "";
                                this.addProduct.bg_add_origin_price = "";
                                this.addProduct.bg_add_price = "";
                                this.addProduct.bg_add_unit = "";
                                this.addProduct.bg_add_description = "";
                                this.addProduct.bg_add_content = "";
                                this.addProduct.bg_add_is_enabled = false;

                            }

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
        getReditOneData(e) {
            // 取得待編輯商品索引
            const index = (e.target.id).split("_")[1];
            // 將索引傳至data
            this.rediData.redi_index = index;
            // 將資料傳至data
            const rediItem = this.productData[this.rediData.redi_index];
            this.rediData.title = rediItem.title;
            this.rediData.description = rediItem.description;
            this.rediData.id = rediItem.id;
            this.rediData.content = rediItem.content;
            this.rediData.category = rediItem.category;
            this.rediData.unit = rediItem.unit;
            this.rediData.origin_price = rediItem.origin_price;
            this.rediData.price = rediItem.price;
            this.rediData.is_enabled = parseInt(rediItem.is_enabled);
            this.rediData.imageUrl = rediItem.imageUrl;
            this.rediData.imagesUrl.url1 = rediItem.imagesUrl[0];
            this.rediData.imagesUrl.url2 = rediItem.imagesUrl[1];
            this.rediData.imagesUrl.url3 = rediItem.imagesUrl[2];
            this.rediData.imagesUrl.url4 = rediItem.imagesUrl[3];
            this.rediData.imagesUrl.url5 = rediItem.imagesUrl[4];
        },
        //編輯商品
        reditOneData() {
            const reditNewData = {
                data: {
                    category: this.rediData.category,
                    content: this.rediData.content,
                    description: this.rediData.description,
                    id: this.rediData.id,
                    is_enabled: parseInt(this.rediData.is_enabled),
                    origin_price: parseInt(this.rediData.origin_price),
                    price: parseInt(this.rediData.price),
                    title: this.rediData.title,
                    unit: this.rediData.unit,
                    num: 1,
                    imageUrl: this.rediData.imageUrl,
                    imagesUrl: [
                        this.rediData.imagesUrl.url1,
                        this.rediData.imagesUrl.url2,
                        this.rediData.imagesUrl.url3,
                        this.rediData.imagesUrl.url4,
                        this.rediData.imagesUrl.url5
                    ]
                }
            };
            //   console.log(reditNewData)
            //編輯資料
            axios.put(`${api_url}/api/${api_path}/admin/product/${this.rediData.id}`, reditNewData)
                .then(
                    res => {
                        // console.log(res);
                        alert(res.data.message);
                        //如果成功就執行
                        if (res.data.success) {
                            //刷新
                            this.getProduct();
                            // 關閉編輯視窗
                            $().ready(function () {
                                $(".btn-close").trigger("click");
                            })
                        }


                    }
                ).catch(err => {
                    console.log(err)
                    // alert(err.data.message)
                })
        },

    },
    created() {
        // 使用token驗證
        axios.defaults.headers.common['Authorization'] = this.token;
        //判斷使用者值
        this.chkUserName();
        //取得商品資料
        this.getProduct();
    },
    mounted() {
    }
}).mount('#app');
