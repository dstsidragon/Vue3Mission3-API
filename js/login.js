

const vue = {
    data() {
        return {
            h1: "請先登入",
            footer: "2021~∞ - 六角學院",
            username:"",
            password:"",
        }
    },
    methods: {
        // 登入
        ClickBtnForm(e) {

            //信箱驗證
            const myreg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const adminInfo = {
                username: this.username,
                password: this.password
            }
            // console.log(adminInfo);

            if (username.value != "" && myreg.test(username.value) && password.value != "") {
                //送出登入帳號資料做驗證
                axios.post(`${api_url}/admin/signin`, adminInfo)
                    .then(
                        res => {
                            // console.log(res);
                            //如果成功就執行
                            if (res.data.success) {
                                alert(`${res.data.message}!!`);
                                const expired = res.data.expired;
                                const token = res.data.token;

                                // 存到cookies
                                document.cookie = `hexToken=${token}; expires=${new Date(expired)};username=${username.value}`;
                                document.cookie = `username=${(username.value).split("@")[0]}; expires=${new Date(expired)};`;

                                //跳轉畫面
                                window.location = "background.html";
                            } else {
                                alert(`${res.data.message}!!請檢查帳號密碼!`);
                                //密碼錯誤 清空密碼
                                this.password = "";
                            }
                        }
                    ).catch(err => {
                        console.dir(err)
                    })
            } else {
                alert("帳號密碼錯誤!");
                //帳號密碼錯誤 清空帳號密碼錯誤
                this.username = "";
                this.password = "";
            }

        },

    },
    created() {

    }

}
Vue.createApp(vue)
    .mount("#app");