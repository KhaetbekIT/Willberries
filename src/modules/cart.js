import axios from "axios";
import { API } from "./http.url";
import { AddCarts } from "./add-carts";

const Render = (container, id, label, img, title, description, price) => {
  container.insertAdjacentHTML(
    "beforeend",
    `
        <div class="col-lg-3 col-sm-6">
            <div class="goods-card">
              ${label && label !== "" ? `<span class="label">${label}</span>` : ""}
              <!-- /.label -->
              <img
                src="${img}"
                alt="image: ${title}"
                class="goods-image"
              />
              <h3 class="goods-title">${title}</h3>
              <!-- /.goods-title -->
              <p class="goods-description">${description}</p>
              <!-- /.goods-description -->
              <!-- /.goods-price -->
              <button class="button goods-card-btn add-to-cart" data-id="${id}">
                <span class="button-price">$${price}</span>
              </button>
            </div>
            <!-- /.goods-card -->
        </div>
        <!-- /.col-3 -->
      `,
  );
};

const AddCart = (product) => {
  const goods = JSON.parse(localStorage.getItem("goods"));

  if (!goods) {
    localStorage.setItem("goods", JSON.stringify([]));
  }

  if (product) {
    goods.push({ ...product, quantity: 1, price: Number(product?.price) });
    localStorage.setItem("goods", JSON.stringify(goods));
  }
};

const Cart = () => {
  const container = document.querySelector(".long-goods-list");

  container.innerHTML = "";

  const URL = (key) => {
    const params = window.location.search;
    const urlSearchParams = new URLSearchParams(params);
    const field = urlSearchParams.get("field");

    if (key === "gender" && (field === "Womens" || field === "Mens")) {
      return field ? API + `/goods?${key}=${field}` : API + "/goods";
    }
    return field ? API + `/goods?${key}=${field}` : API + "/goods";
  };

  AddCart();

  const GetProducts = async () => {
    await axios.get(URL("category")).then((response) => {
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

    await axios.get(URL("gender")).then((response) => {
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

    AddCarts();
  };

  GetProducts();
};

export { Render, AddCart };
export default Cart;
