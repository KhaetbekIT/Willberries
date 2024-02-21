import axios from "axios";
import { API } from "./http.url";

const Nav = async () => {
  const NavMenu = document.querySelector("nav .navigation");

  NavMenu.innerHTML = "";

  const set = new Set();

  await axios.get(API + "/goods").then((response) => {
    const data = response.data;

    data?.forEach((data) => {
      set.add(data?.gender);
      set.add(data?.category);
    });
  });

  set.forEach((nav) => {
    NavMenu.insertAdjacentHTML(
      "beforeend",
      `
        <li class="navigation-item">
            <a href="./goods.html?field=${nav}" class="navigation-link" data-field="${nav}">${nav}</a>
        </li>
      `,
    );
  });

  NavMenu.innerHTML += `<li class="navigation-item"> <a href="./goods.html" class="navigation-link">All</a> </li>`;
};

export default Nav;
