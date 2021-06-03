const app = Vue.createApp({
    data() {
        return {
            //產品資料
            productData: [],
            // 使用者名稱
            userName: "訪客",
            //登入/登出鈕
            login_status: false,
            //取得token
            token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //資料筆數
            dataLength: 0,
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
            axios.get(`${api_url}/api/${api_path}/products`)
                .then(
                    res => {
                        // console.log(res);
                        //如果成功就執行
                        if (res.data.success) {
                            this.productData = res.data.products;

                            //將資料筆數更新
                            this.dataLength = this.productData.length;
                        } else {
                            alert('驗證錯誤，請重新登入!');

                            //跳轉頁面
                            window.location = "login.html";
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },
        //加入購物車
        addCart() {
            alert("先不要點啦~ 我還沒做，晚點補上QQ");
        },

    },
    created() {
        // 使用token驗證
        axios.defaults.headers.common['Authorization'] = this.token;
        //判斷使用者值
        this.chkUserName();
        // 取得商品
        this.getProduct();
    }
}).mount("#app");