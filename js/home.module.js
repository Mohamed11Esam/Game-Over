import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.changeActive(link);
      });
    });
    this.loading = document.querySelector(".loading");
    this.details = document.getElementById("details");
    this.gaems = document.getElementById("games");
    this.ui = new Ui();

    this.getGames("mmorpg");
  }

  async changeActive(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
    await this.getGames(link.getAttribute("data-category"));
  }

  async getGames(category) {
    this.loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bce63a6f92msh9a2518650a8cdbcp105489jsn90bd131527ae",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const res = await api.json();
    this.loading.classList.add("d-none");
    this.ui.displayGames(res);

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.gaems.classList.add("d-none");
        new Details(card.getAttribute("data-id"));
      });
    });
  }
}
