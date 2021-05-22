

const btnForm = document.getElementById("btn-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");






// 登入
const ClickBtnForm = (e)=>{ 
e.preventDefault();
    //信箱驗證
    const myreg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const adminInfo = {
        username:username.value,
        password:password.value
    }
    if(username.value!=""&&myreg.test(username.value)&&password.value!=""){
        axios.post(`${api_url}/admin/signin`,adminInfo)
    .then(
        res=>{
            // console.log(res);
        
            if(res.data.success){
                alert(`${res.data.message}!!`);
                const expired =res.data.expired;
                const token=res.data.token;
                // 存到cookies
                document.cookie = `hexToken=${token}; expires=${new Date(expired)};username=${username.value}`;
                document.cookie = `username=${(username.value).split("@")[0]}; expires=${new Date(expired)};`;
                
                window.location="product.html";
            }else{
                alert(`${res.data.message}!!請檢查帳號密碼!`);
                password.value= "";
            }
        }
    ).catch(err=>{
        console.dir(err)
    })
    }
    
};




// 監聽事件

// 表單按鈕點擊
btnForm.addEventListener("click",ClickBtnForm,false);

