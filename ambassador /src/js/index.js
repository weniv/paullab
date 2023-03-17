const topBtn = document.querySelector(".top-btn");
const $footer = document.querySelector(".footer");

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

function activeScrollTopBtn(htmlScrollTop) {
  if (htmlScrollTop > 100) {
    topBtn.classList.add("active");
  } else {
    topBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", function () {
  const htmlScrollTop = document.querySelector("html").scrollTop;
  activeScrollTopBtn(htmlScrollTop);
});
