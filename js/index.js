

const vue = {
    data() {
        return {
            h1: "請先登入",
            footer: "2021~∞ - 六角學院",
        }
    },
    methods: {
        // 登入
        ClickBtnForm(e) {
            const username = document.getElementById("username");
            const password = document.getElementById("password");

            //信箱驗證
            const myreg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const adminInfo = {
                username: username.value,
                password: password.value
            }
            if (username.value != "" && myreg.test(username.value) && password.value != "") {
                axios.post(`${api_url}/admin/signin`, adminInfo)
                    .then(
                        res => {
                            // console.log(res);

                            if (res.data.success) {
                                alert(`${res.data.message}!!`);
                                const expired = res.data.expired;
                                const token = res.data.token;
                                // 存到cookies
                                document.cookie = `hexToken=${token}; expires=${new Date(expired)};username=${username.value}`;
                                document.cookie = `username=${(username.value).split("@")[0]}; expires=${new Date(expired)};`;

                                window.location = "product.html";
                            } else {
                                alert(`${res.data.message}!!請檢查帳號密碼!`);
                                password.value = "";
                            }
                        }
                    ).catch(err => {
                        console.dir(err)
                    })
            } else {
                alert("帳號密碼錯誤!");
                username.value = "";
                password.value = "";
            }

        },

    },
    created() {

    }

}
Vue.createApp(vue)
    .mount("#app");