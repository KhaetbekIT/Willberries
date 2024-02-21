import axios from "axios";
import { API } from "./http.url";
import { Render } from "./cart";

const Search = () => {
  const input = document.querySelector("#input-search");
  const button = document.querySelector("#button-addon2");
  const container = document.querySelector(".long-goods-list");

  button.addEventListener("click", async () => {
    container.innerHTML = "";

    await axios.get(`${API}/goods?q=${input.value}`).then((response) => {
      const data = response.data;
      data.forEach((product) => {
        Render(
          container,
          product.id,
          product.label,
          product.img,
          product.name,
          product.description,
          product.price,
        );
      });
    });
  });
};

export default Search;
