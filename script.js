let budget = 2000;
let pricelist = 100;

function weightedRandom(items, weights) {
  let totalWeight = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * totalWeight;
  let accumulatedWeight = 0;

  for (let i = 0; i < items.length; i++) {
    accumulatedWeight += weights[i];
    if (rand < accumulatedWeight) return i;
  }

  return items.length - 1;
}

async function phoenix() {
  let item = [
    "assets/item1.png",
    "assets/item2.png",
    "assets/item3.png",
    "assets/item4.png",
    "assets/item5.png",
  ];
  let labelitem = [1, 2, 3, 4, 5];
  let idlist = ["A", "B", "C"];
  let Vrm = [[], [], []];
  let Vlabel = [[], [], []];

  let attmp = Math.floor(Math.random() * (15 - 5 + 1)) + 5;

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function switcher() {
    for (let m = 0; m < 3; m++) {
      let pointer = idlist[m];
      for (let g = 0; g < 3; g++) {
        let element = document.getElementById(pointer + (g + 1));
        if (element) {
          element.querySelector("img").src = Vrm[m][g];
        }
      }
    }
  }

  function calculate() {
    let line = 0;
    let total = 0;

    for (let s = 0; s < 3; s++) {
      if (Vlabel[s][0] === Vlabel[s][1] && Vlabel[s][1] === Vlabel[s][2]) {
        line += 1;
      }
      if (Vlabel[0][s] === Vlabel[1][s] && Vlabel[1][s] === Vlabel[2][s]) {
        line += 1;
      }
    }

    total = line * 1000;
    budget += total;
    document.getElementById("saldo").innerText = "Rp" + budget;
    document.getElementById("prize-multiplier").innerText = "x" + line;
    document.getElementById("total-prize").innerText = "Rp" + total;
  }

  for (let i = 0; i < attmp; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        let itemrand = weightedRandom([0, 1, 2, 3, 4], [5, 15, 20, 25, 35]);
        Vrm[j][k] = item[itemrand];
        Vlabel[j][k] = labelitem[itemrand];
      }
      switcher();
      await delay(100);
    }
  }
  calculate();
}

function clicker() {
  if (budget < pricelist) {
    alert("duitmu ga cukup");
  } else {
    budget -= pricelist;
    document.getElementById("saldo").innerText = "Rp" + budget;
    phoenix();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("start").addEventListener("click", clicker);
});
