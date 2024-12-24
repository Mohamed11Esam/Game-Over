import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
    });
    this.loading = document.querySelector(".loading");
    this.getDetails(id);
  }

  async getDetails(id) {
    this.loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bce63a6f92msh9a2518650a8cdbcp105489jsn90bd131527ae",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const res = await api.json();
    this.loading.classList.add("d-none");
    new Ui().desplayDetails(res);
  }
}
