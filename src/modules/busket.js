const CounterFunc = () => {
  const goods = JSON.parse(localStorage.getItem("goods"));
  const total = document.querySelector(".card-table__total");
  total.textContent = goods.reduce((sum, goodItem) => {
    return sum + goodItem.price * goodItem.quantity;
  }, 0);
};

CounterFunc();
const Product = () => {
  const goods = JSON.parse(localStorage.getItem("goods"));
  const table = document.querySelector(".cart-table__goods");

  table.innerHTML = "";

  CounterFunc();

  const UpdateQuantity = (id, action) => {
    id = Number(id);
    let current = goods[id];
    const before = goods.slice(0, id),
      after = goods.slice(id + 1);
    current = { ...current, quantity: action };
    localStorage.setItem(
      "goods",
      JSON.stringify([].concat(before, current, after)),
    );
    CounterFunc();
    Product();
  };

  const DeleteItem = (id) => {
    const before = goods.slice(0, id),
      after = goods.slice(id + 1);
    localStorage.setItem("goods", JSON.stringify([].concat(before, after)));
    CounterFunc();
    Product();
  };

  goods.forEach((product, i) => {
    table.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${product.name}</td>
        <td >$${product.price}</td>
        <td><button data-quantity-dec="${i}">-</button></td>
        <td>${product.quantity}</td>
        <td><button data-quantity-inc="${i}">+</button></td>
        <td>${product.quantity * product.price}$</td>
        <td><button class="cart-btn-delete" data-delete="${i}">x</button></td>
      </tr>
    `,
    );
  });

  const incBtns = document.querySelectorAll("button[data-quantity-inc]");
  const decBtns = document.querySelectorAll("button[data-quantity-dec]");
  const deleteBtns = document.querySelectorAll("button[data-delete]");

  if (incBtns) {
    incBtns.forEach((btn) => {
      const current = btn;
      current.addEventListener("click", () => {
        const id = current.dataset.quantityInc;
        UpdateQuantity(id, goods[id].quantity + 1);
      });
    });
  }

  if (decBtns) {
    decBtns.forEach((btn) => {
      const current = btn;
      current.addEventListener("click", () => {
        const id = current.dataset.quantityDec;
        UpdateQuantity(id, goods[id].quantity - 1);
      });
    });
  }

  if (deleteBtns) {
    deleteBtns.forEach((btn) => {
      const current = btn;
      current.addEventListener("click", () => {
        DeleteItem(current.dataset.delete);
      });
    });
  }
};

const Busket = () => {
  const cartBtn = document.querySelector(".button-cart");
  const modalWindow = document.querySelector("#modal-cart");

  Product();
  CounterFunc();

  cartBtn.addEventListener("click", () => {
    modalWindow.classList.add("show");
    Product();
    CounterFunc();
  });

  modalWindow.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("show") ||
      e.target.className === "modal-close"
    ) {
      modalWindow.classList.remove("show");
      // CounterFunc();
    }
  });
};

export { Product, CounterFunc };
export default Busket;
