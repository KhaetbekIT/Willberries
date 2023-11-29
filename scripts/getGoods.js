window.addEventListener("DOMContentLoaded", () =>{
    const API = `https://wildberris-server-api.onrender.com`;

    const links = document.querySelectorAll(`a.navigation-link`)

    const goodsList = document.querySelector(".long-goods-list")

    const GetData = async (url = "", value, category,) =>{
        url = API + url;
        await fetch(url).then(response => response.json()).then(data =>{

            const array = category ? data?.db.filter(item => item?.gender?.toLowerCase() === value?.toLowerCase() || item?.category?.toLowerCase() === value?.toLowerCase()) : data?.db;

            localStorage.setItem("goods", JSON.stringify(array))

            if(JSON.parse(localStorage.getItem("goods")).length > 0){
                window.location.replace("/goods.html");
            }
        })
    }

    links.forEach(link =>{
        link.addEventListener("click", e =>{
            e.preventDefault();
            const linkText = e.target.textContent;
            const linkField = e.target.dataset.field;
            GetData("/db", linkText, linkField)
        })
    })

    if(goodsList){
        const renderData = JSON.parse(localStorage.getItem("goods")) ?? [];
        goodsList.innerHTML = ""
        renderData.forEach(({img, label, name,price, description}) =>{
            goodsList.insertAdjacentHTML("beforeend", `
                <div class="col-lg-3 col-sm-6">
                    <div class="goods-card">
                        ${label !== "" ? `<span class="label">${label}</span>` : ""}
                        <!-- /.label --><img src="${img}" alt="image: ${name}" class="goods-image">
                        <h3 class="goods-title">${name}</h3>
                        <!-- /.goods-title -->
                        <p class="goods-description">${description}</p>
                        <!-- /.goods-description -->
                        <!-- /.goods-price -->
                        <button class="button goods-card-btn add-to-cart" data-id="007">
                            <span class="button-price">$${price}</span>
                        </button>
                    </div>
                </div>
            `)
        })
    }
})