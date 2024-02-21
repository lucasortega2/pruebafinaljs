const header = document.querySelector("header");
const buttonMenu = document.querySelector(".nav-ul");
const panelBtn = document.querySelector(".panel-btn");
window.addEventListener("scroll", (e) => {
  if (header.offsetTop >= 150) {
    header.classList.add("header2");
  } else {
    header.classList.remove("header2");
  }
});
document.addEventListener("click", (e) => {
  if (e.target.closest(".panel-btn")) {
    buttonMenu.classList.toggle("is-active");
    panelBtn.classList.toggle("is-active");
  }
});
