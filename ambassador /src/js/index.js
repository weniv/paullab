const topBtn = document.querySelector(".top-btn");
const footer = document.querySelector(".footer");
const banner = document.querySelector(".banner");
const bannerList = document.querySelectorAll(".banner-list li");
const bannerBtnList = document.querySelector(".banner-btn-list");
const bannerBtnItems = document.querySelectorAll(".banner-btn");

const setTransformValue = (value) => {
  bannerList.forEach((item) => {
    item.setAttribute("style", `transform: translateX(${value});`);
  });
};

const prevSide = () => {
  const activedBanner = document.querySelector(".banner-list li.active");
  const activedBtn = document.querySelector(".banner-btn.active");

  const dataId = parseInt(activedBanner.getAttribute("data-id"), 0);
  const prevBanner = bannerList[dataId - 1];
  const prevBtn = bannerBtnItems[dataId - 1];
  const lastValue = bannerList.length - 1;

  if (activedBanner) {
    activedBanner.classList.remove("active");
    activedBtn.classList.remove("active");

    if (prevBanner) {
      const translateValue = `-${100 * (dataId - 1)}%`;

      prevBanner.classList.add("active");
      prevBtn.classList.add("active");

      setTransformValue(translateValue);
    } else {
      const translateValue = `-${100 * lastValue}%`;

      bannerList[lastValue].classList.add("active");
      bannerBtnItems[lastValue].classList.add("active");

      setTransformValue(translateValue);
    }
  } else {
    const translateValue = `-${100 * lastValue}%`;

    bannerList[lastValue].classList.add("active");
    bannerBtnItems[lastValue].classList.add("active");
    setTransformValue(translateValue);
  }
};

const nextSide = () => {
  const activedBanner = document.querySelector(".banner-list li.active");
  const activedBtn = document.querySelector(".banner-btn.active");

  const dataId = parseInt(activedBanner.getAttribute("data-id"), 0);
  const nextBanner = bannerList[dataId + 1];
  const nextBtn = bannerBtnItems[dataId + 1];

  if (activedBanner) {
    activedBanner.classList.remove("active");
    activedBtn.classList.remove("active");

    if (nextBanner) {
      const translateValue = `-${100 * (dataId + 1)}%`;

      nextBanner.classList.add("active");
      nextBtn.classList.add("active");

      setTransformValue(translateValue);
    } else {
      bannerList[0].classList.add("active");
      bannerBtnItems[0].classList.add("active");
      setTransformValue(0);
    }
  } else {
    bannerList[0].classList.add("active");
    bannerBtnItems[0].classList.add("active");
    setTransformValue(0);
  }
};

bannerBtnList.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    const activedBtn = document.querySelector(".banner-btn.active");
    const bannerBtn = e.target;
    const dataId = parseInt(bannerBtn.getAttribute("data-id"), 0);
    const translateValue = `-${100 * dataId}%`;

    if (!bannerBtn.classList.contains("active")) {
      activedBtn.classList.remove("active");
      bannerBtn.classList.add("active");

      setTransformValue(translateValue);
    }
  }
});

let bannerSlide = setInterval(() => {
  nextSide();
}, 4000);

banner.addEventListener("mouseover", () => {
  clearInterval(bannerSlide);
});

banner.addEventListener("mouseout", () => {
  bannerSlide = setInterval(() => {
    nextSide();
  }, 3000);
});

let startPoint = 0;
let endPoint = 0;

banner.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX;
});

banner.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    prevSide();
  } else if (startPoint > endPoint) {
    nextSide();
  }
});

const activeScrollTopBtn = (htmlScrollTop) => {
  if (htmlScrollTop > 100) {
    topBtn.classList.add("active");
  } else {
    topBtn.classList.remove("active");
  }
};

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", function () {
  const htmlScrollTop = document.querySelector("html").scrollTop;
  activeScrollTopBtn(htmlScrollTop);
});
