(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const menuBackdrop = document.querySelector(".menu-backdrop");

  if (!menuButton || !navigation) return;

  const menuLabel = menuButton.querySelector(".menu-label");

  function setMenuState(open, returnFocus = false) {
    navigation.classList.toggle("is-open", open);
    menuBackdrop?.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");

    if (menuLabel) menuLabel.textContent = open ? "Close" : "Menu";
    if (!open && returnFocus) menuButton.focus();
  }

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    setMenuState(open);
  });

  menuBackdrop?.addEventListener("click", () => setMenuState(false));

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      setMenuState(false, true);
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 761px)");
  const resetForDesktop = (event) => {
    if (event.matches) setMenuState(false);
  };

  desktopQuery.addEventListener?.("change", resetForDesktop);

  const appointmentForm = document.querySelector("#appointment-form");

  if (appointmentForm) {
    const dateInput = appointmentForm.querySelector("#booking-date");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    if (dateInput) dateInput.min = localToday;

    appointmentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!appointmentForm.reportValidity()) return;

      const formData = new FormData(appointmentForm);
      const recipient = appointmentForm.dataset.bookingEmail;
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const company = String(formData.get("company") || "").trim();
      const date = String(formData.get("date") || "").trim();
      const time = String(formData.get("time") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const readableDate = date
        ? new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : "Not specified";

      const subject = `Consultation request - ${name}`;
      const body = [
        "Hello Jo,",
        "",
        "I would like to request a free 15-minute consultation with Codebreakers Consultancy.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Organisation: ${company || "Not provided"}`,
        `Preferred date: ${readableDate}`,
        `Preferred time: ${time}`,
        "",
        "What I would like to discuss:",
        message,
        "",
        "Please let me know whether this time is available.",
        "",
        "Kind regards,",
        name
      ].join("\n");

      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
})();
