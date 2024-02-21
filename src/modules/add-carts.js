import axios from "axios";
import { API } from "./http.url";
import { AddCart } from "./cart";
import { Product } from "./busket";

const AddCarts = () => {
  const products = document.querySelectorAll("button[data-id]");

  if (products && products.length !== 0) {
    products.forEach((product) => {
      const currentProduct = product;

      currentProduct.addEventListener("click", async () => {
        await axios
          .get(API + `/goods/${currentProduct.dataset.id}`)
          .then((response) => {
            const data = response.data;

            AddCart(data);
          });
      });
    });

    Product();
  }
};
export { AddCarts };
