window.addEventListener("DOMContentLoaded", ()=>{
    const Carts = () =>{
        const cartButton = document.querySelector("button.button-cart")

        const modalCart = document.querySelector("#modal-cart")

        cartButton.addEventListener("click", ()=>{
            modalCart.classList.add("d-flex")
        })

        modalCart.addEventListener("click", e =>{
           if(
               e.target.classList.contains("modal-close") ||
               e.target.classList.contains("overlay")
           ){
               modalCart.classList.remove("d-flex")
           }
        })
    }

    Carts();
});