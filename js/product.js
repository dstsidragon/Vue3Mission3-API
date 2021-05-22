const app = Vue.createApp({
    data() {
        return {
            //產品資料
            productData: [],
            // 使用者名稱
            userName: document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //取得token
            token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //資料筆數
            dataLength: 0,
        }
    },
    methods: {
        // 登出
        signOutAdmin: (e) => {

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
            axios.get(`${api_url}/api/${api_path}/products`)
                .then(
                    res => {
                        console.log(res);
                        if (res.data.success) {
                            this.productData = res.data.products;

                            //將資料筆數更新
                            this.dataLength = this.productData.length;
                        } else {
                            alert('驗證錯誤，請重新登入!');
                            window.location = "index.html";
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

        // 取得商品
        this.getProduct();
    }
}).mount("#app");