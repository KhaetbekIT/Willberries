window.addEventListener("DOMContentLoaded", ()=>{
    const Search = () =>{
        const blockSearch = document.querySelector(".search-block");
        const inputSearch = blockSearch.querySelector("input.form-control")
        const buttonSearch = blockSearch.querySelector("button#button-addon2")

        inputSearch.addEventListener("input", (e)=>{
            console.log(e.target.value)
        })

        buttonSearch.addEventListener("click", ()=>{
            console.log(inputSearch.value)
        })
    }

    Search();
})