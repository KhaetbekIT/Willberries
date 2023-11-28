window.addEventListener("DOMContentLoaded", () =>{
    const API = `https://wildberris-server-api.onrender.com`;

    const links = document.querySelectorAll(`a[data-field]`)

    const GetData = async (url = "") =>{
        url = API + url;
        return await fetch(url).then(response => response.json())
    }

    links.forEach(link =>{
        link.addEventListener("click", e =>{
            e.preventDefault();
            console.log("ok");
            GetData("/db").then(data =>{
                console.log(data)
            }).catch(error => console.error(error))
        })
    })
})