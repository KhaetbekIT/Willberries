window.addEventListener("DOMContentLoaded", ()=>{
    const Search = () =>{
        const blockSearch = document.querySelector(".search-block");
        const inputSearch = blockSearch.querySelector("input.form-control")
        const buttonSearch = blockSearch.querySelector("button#button-addon2")
        const goodsList = document.querySelector(".long-goods-list")

        const RenderCategory = (selector, value) =>{
             if(window.location.pathname !== '/goods.html') {
                window.location.replace("/goods.html")
            }

            if(selector){
                selector.innerHTML = ""
                const array = JSON.parse(localStorage.getItem("goods")).filter(item => item.name.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase()));

                array.forEach(({img, label, name,price, description}) =>{
                    selector.insertAdjacentHTML("beforeend", `
                        <div class="col-lg-3 col-sm-6">
                            <div class="goods-card">
                                ${label !== "" ? `<span class="label">${label}</span>` : ""}
                                <img src="${img}" alt="image: ${name}" class="goods-image">
                                <h3 class="goods-title">${name}</h3>
                                
                                <p class="goods-description">${description}</p>
                                
                                <button class="button goods-card-btn add-to-cart" data-id="007">
                                    <span class="button-price">$${price}</span>
                                </button>
                            </div>
                        </div>
                    `)
                })
            }
        }

        inputSearch.addEventListener("input", (e)=>{
            RenderCategory(goodsList, e.target.value)
        })

        buttonSearch.addEventListener("click", ()=>{
            RenderCategory(goodsList, inputSearch.value)
        })
    }

    Search();
})