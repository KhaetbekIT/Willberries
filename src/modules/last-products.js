import axios from "axios";
import { API } from "./http.url";
import { Render } from "./cart";
import { AddCarts } from "./add-carts";

const LastProducts = async () => {
  const container = document.querySelector(".short-goods");

  await axios.get(API + "/goods").then((response) => {
    container.innerHTML = "";
    const data = response.data;
    data.slice(data.length - 4).forEach((product) => {
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

    AddCarts();
  });
};

export default LastProducts;
