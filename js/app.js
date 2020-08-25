//pop up

let gallery = document.querySelectorAll(".gallery img");

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");

    popupImage.src = img.src;

    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);

    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);

    document.addEventListener("click", function (e) {
      if (e.target.className == "close-button") {
        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();
      }
    });
  });
});

//global Variables
const navElements = document.querySelectorAll("section");
const navLists = document.getElementById("navbar-list");

//iterating the nav elements
navElements.forEach((el) => {
  const navEl = `<li class='menu--link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`;
  navLists.insertAdjacentHTML("beforeend", navEl);
});

//listenting to the click event in the navlist
navLists.addEventListener("click", (el) => {
  el.preventDefault();
  const parent = el.target.hasAttribute("data-link")
    ? el.target
    : el.target.parentElement;
  const elementToScroll = document.getElementById(parent.dataset.link);
  elementToScroll.scrollIntoView({ block: "end", behavior: "smooth" });
});

//using IntersectionObserver
const clbk = (data) => {
  data.forEach((en) => {
    const navListEl = document.querySelector(
      `.menu--link[data-link='${en.target.id}']`
    );
    const section = document.getElementById(en.target.id);

    if (en && en.isIntersecting) {
      navListEl.classList.add("active");
      section.classList.add("active");
    } else {
      if (navListEl.classList.contains("active")) {
        navListEl.classList.remove("active");
      }

      if (section.classList.contains("active")) {
        section.classList.remove("active");
      }
    }
  });
};

//the observer
const op = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};

//callback checks if navelement should be active
const os = new IntersectionObserver(clbk, op);
navElements.forEach((el) => {
  os.observe(document.getElementById(el.id));
});
