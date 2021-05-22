const app = Vue.createApp({
    data() {
        return {
            //產品資料
            productData: [],
            //登入者名稱
            loginName: document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //資料筆數
            dataLength : 0,
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
                        if (res.data.success) {
                            this.productData = res.data.products;

                            // 渲染
                            this.render();
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

        //呈現資料在畫面
        render() {
            //將資料筆數更新
            this.dataLength= this.productData.length;
            
            const productList = document.getElementById("productList");
            let str = "";
            this.productData.forEach((item, i) => {
                str += `
            <tr class="row ">
        
        <td  class="col-3  d-none d-md-table-cell d-flex align-items-center"><img width="100%"  src="${item.imageUrl}" alt=""></td>
          <td class="col-2 d-flex align-items-center">${item.title}</td>
          <td  class="col-2 d-flex align-items-center">
            ${item.origin_price}
          </td>
          <td class="col-2 col-md-1 d-flex align-items-center">
            ${item.price}
          </td>
          <td  class="col-3 col-md-2  d-flex align-items-center">
          <input class="carNum" type="number" value="1"  id="productNum_${item.id}">
          </td>
          <td class="col-3 col-md-2 d-flex align-items-center">
            <button type="button" id="car_${item.id}"   class="btn btn-sm btn-outline-info move deleteBtn" data-action="remove" data-id="${item.id}"> 加入購物車 </button>
          </td>
        </tr>
      `;
            });
            productList.innerHTML = str;

            //動態賦予事件
            this.addEvent();
        },

        //加入購物車
        addCart() {
            console.log(1)
            alert("先不要點啦~ 我還沒做，晚點補上QQ")
            // 刷新畫面
            this.render();
        },
        //動態賦予事件
        addEvent() {
            this.productData.forEach((item, i) => {
                // 刪除事件
                document.getElementById(`car_${item.id}`).addEventListener("click", this.addCart, false);
            })
        }

    },
    created() {

        //取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        // 取得商品
        this.getProduct();
    }
}).mount("#app");