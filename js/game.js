console.log("game.js loaded ✅");

// déclaration des variables initiales

let p1_name = document.getElementById("p1_name");
let p2_name = document.getElementById("p2_name");
let p1_pv = document.getElementById("p1_pv");
let p2_pv = document.getElementById("p2_pv");

// fonction d'initialisation de l'interface

function init() {
  console.log("function init loaded");
  if (
    p1_name.value &&
    p2_name.value &&
    p1_pv.value >= 1 &&
    p2_pv.value >= 1 &&
    p1_pv.value == p2_pv.value
  ) {
    document.getElementById("btn_init").classList.remove("is-disabled");
    document.getElementById("btn_init").removeAttribute("disabled", "");
  } else {
    document.getElementById("btn_init").classList.add("is-disabled");
    document.getElementById("btn_init").setAttribute("disabled", "");
  }
}

//fonction en cas de changement dans les inputs
p1_name.addEventListener("change", init());
p2_name.addEventListener("change", init());
p1_pv.addEventListener("change", init());
p2_pv.addEventListener("change", init());

//declaration des variables des boutons d'attaques
let sword = document.getElementById("btn_sword");
let spear = document.getElementById("btn_spear");
let punch = document.getElementById("btn_punch");
let meow = document.getElementById("btn_meow");
let griffes = document.getElementById("btn_griffes");
let croc = document.getElementById("btn_croc");
let heal1 = document.getElementById("btn_healing1");
let heal2 = document.getElementById("btn_healing2");

//fonction du clique sur Lancer le jeu qui initialise tout les variables du jeu
document.getElementById("btn_init").addEventListener("click", function none() {
  console.log("Click réussi !");
  if (
    p1_name.value &&
    p2_name.value &&
    p1_pv.value >= 1 &&
    p2_pv.value >= 1 &&
    p1_pv.value == p2_pv.value
  ) {
    console.log("function start loaded");
    document.getElementById("init").style.display = "none";
    document.getElementById("player1_name").innerHTML = p1_name.value;
    document.getElementById("player2_name").innerHTML = p2_name.value;
    document.getElementById("player1_pv").classList.remove("is-pattern");
    document.getElementById("player1_pv").max = p1_pv.value;
    document.getElementById("player2_pv").max = p2_pv.value;
    document.getElementById("player1_pv").value =
      document.getElementById("player1_pv").max;
    document.getElementById("player2_pv").value =
      document.getElementById("player2_pv").max;
    document.getElementById("player2_pv").classList.remove("is-pattern");
    document.getElementById("pv-p1").innerHTML = p1_pv.value;
    document.getElementById("pv-p2").innerHTML = p2_pv.value;
    launchMusic();
    meow.classList.add("is-disabled");
    meow.setAttribute("disabled", "");
    griffes.classList.add("is-disabled");
    griffes.setAttribute("disabled", "");
    croc.classList.add("is-disabled");
    croc.setAttribute("disabled", "");
    heal2.classList.add("is-disabled");
    heal2.setAttribute("disabled", "");
  }
});

//declaration des variables des pv des joueurs
let player1_pv = document.getElementById("player1_pv");
let player2_pv = document.getElementById("player2_pv");

//fonction de tour par tour
function player1_attack() {
  sword.classList.add("is-disabled");
  sword.setAttribute("disabled", "");
  spear.classList.add("is-disabled");
  spear.setAttribute("disabled", "");
  punch.classList.add("is-disabled");
  heal1.setAttribute("disabled", "");
  heal1.classList.add("is-disabled");
  punch.setAttribute("disabled", "");
  meow.classList.remove("is-disabled");
  meow.removeAttribute("disabled", "");
  griffes.classList.remove("is-disabled");
  griffes.removeAttribute("disabled", "");
  croc.classList.remove("is-disabled");
  croc.removeAttribute("disabled", "");
  heal2.classList.remove("is-disabled");
  heal2.removeAttribute("disabled", "");
}

function player2_attack() {
  sword.classList.remove("is-disabled");
  sword.removeAttribute("disabled", "");
  spear.classList.remove("is-disabled");
  spear.removeAttribute("disabled", "");
  punch.classList.remove("is-disabled");
  punch.removeAttribute("disabled", "");
  heal1.classList.remove("is-disabled");
  heal1.removeAttribute("disabled", "");
  meow.classList.add("is-disabled");
  meow.setAttribute("disabled", "");
  griffes.classList.add("is-disabled");
  griffes.setAttribute("disabled", "");
  croc.classList.add("is-disabled");
  croc.setAttribute("disabled", "");
  heal2.classList.add("is-disabled");
  heal2.setAttribute("disabled", "");
}

// fonction de l'attaque Sword
sword.addEventListener("click", function () {
  console.log("Attaque Epée !");
  attack(2, "sword");
  document.getElementById("player2_pv").value =
    document.getElementById("player2_pv").value - 10;
  document.getElementById("pv-p2").innerHTML = player2_pv.value;
  player1_attack();
  damage(2, 10);
  if (player2_pv.value <= 0) {
    victory(1);
    $("#sound-victory")[0].play();
    $("#sound-theme")[0].pause();
  }
});

//fonction de l'attaque Spear
spear.addEventListener("click", function () {
  console.log("Attaque Lance !");
  attack(2, "spear");
  document.getElementById("player2_pv").value =
    document.getElementById("player2_pv").value - 15;
  document.getElementById("pv-p2").innerHTML = player2_pv.value;
  player1_attack();
  damage(2, 15);
  if (player2_pv.value <= 0) {
    victory(1);
    $("#sound-victory")[0].play();
    $("#sound-theme")[0].pause();
  }
});

//fonction de l'attaque Punch
punch.addEventListener("click", function () {
  console.log("Attaque Poing !");
  attack(2, "punch");
  document.getElementById("player2_pv").value =
    document.getElementById("player2_pv").value - 5;
  document.getElementById("pv-p2").innerHTML = player2_pv.value;
  player1_attack();
  damage(2, 5);
  if (player2_pv.value <= 0) {
    victory(1);
    $("#sound-victory")[0].play();
    $("#sound-theme")[0].pause();
  }
});

//fonction du Heal du joueur 1
heal1.addEventListener("click", function () {
  console.log("Heal Player 1 !");
  player1_attack();
  attack(1, "healing");
  let diff1 = 100 - player1_pv.value;
  if (player1_pv.value + 20 <= 100) {
    player1_pv.value =player1_pv.value + 20;
    document.getElementById("pv-p1").innerHTML = player1_pv.value;
    healing_player(1, 20);
  } else {
    player1_pv.value = player1_pv.value + diff1;
    document.getElementById("pv-p1").innerHTML = player1_pv.value;
    healing_player(1, diff1);
  }
});

//fonction de l'attaque Meow
meow.addEventListener("click", function () {
  console.log("Attaque Miaouuuuuu !");
  attack(1, "meoww");
  document.getElementById("player1_pv").value =
    document.getElementById("player1_pv").value - 5;
  document.getElementById("pv-p1").innerHTML = player1_pv.value;
  player2_attack();
  damage(1, 5);
  if (player1_pv.value <= 0) {
    victory(2);
    $("#sound-victory")[0].play();
    $("#sound-theme")[0].pause();
  }
});

//focntion de l'attaque Claw
griffes.addEventListener("click", function () {
  console.log("Attaque Griffes !");
  attack(1, "claw");
  document.getElementById("player1_pv").value =
    document.getElementById("player1_pv").value - 20;
  document.getElementById("pv-p1").innerHTML = player1_pv.value;
  player2_attack();
  damage(1, 20);
  if (player1_pv.value <= 0) {
    victory(2);
    $("#sound-victory")[0].play();
    $("#sound-theme")[0].pause();
  }
});

//fonction de l'attaque Croc
croc.addEventListener("click", function () {
  console.log("Attaque Croc !");
  attack(1, "croccroc");
  document.getElementById("player1_pv").value =
    document.getElementById("player1_pv").value - 30;
  document.getElementById("pv-p1").innerHTML = player1_pv.value;
  player2_attack();
  damage(1, 30);
  if (player1_pv.value <= 0) {
    victory(2);
    $("#sound-victory")[0].play();
    $("#sound-theme")[0].pause();
  }
});


//fonction du Heal du joueur 2
heal2.addEventListener("click", function () {
  console.log("Heal Player 2 !");
  player2_attack();
  attack(2, "healing");
  let diff2 = 100 - player2_pv.value;
  if (player2_pv.value + 20 <= 100) {
    player2_pv.value = player2_pv.value + 20;
    document.getElementById("pv-p2").innerHTML = player2_pv.value;
    healing_player(2, 20);
  } else {
    player2_pv.value = player2_pv.value + diff2;
    document.getElementById("pv-p2").innerHTML = player2_pv.value;
    healing_player(2, diff2);
  }
});
