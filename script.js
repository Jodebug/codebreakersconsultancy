const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const menuBackdrop = document.querySelector(".menu-backdrop");

if (menuButton && navigation) {
  const setMenuState = (open) => {
    navigation.classList.toggle("is-open", open);
    menuBackdrop?.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    const label = menuButton.querySelector(".menu-label");
    if (label) label.textContent = open ? "Close" : "Menu";
    if (open) navigation.querySelector("a")?.focus();
  };

  menuButton.addEventListener("click", () => {
    setMenuState(!navigation.classList.contains("is-open"));
  });

  menuBackdrop?.addEventListener("click", () => setMenuState(false));

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      setMenuState(false);
      menuButton.focus();
    }
  });
}
