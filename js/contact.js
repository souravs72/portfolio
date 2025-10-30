document.addEventListener("DOMContentLoaded", async () => {
  try {
    const contactSection = document.querySelector("section#contact");
    if (!contactSection) return;

    const response = await fetch("contact.html", { cache: "no-cache" });
    if (!response.ok) throw new Error("Failed to load contact.html");

    const html = await response.text();
    // If the partial contains the <section>, extract its innerHTML; otherwise, insert as-is
    const temp = document.createElement("div");
    temp.innerHTML = html.trim();
    const sectionEl = temp.querySelector("section.contact") || temp;
    contactSection.innerHTML = sectionEl.innerHTML;

    // Re-run reveal for dynamically added content if ScrollReveal is present
    if (typeof ScrollReveal !== "undefined") {
      ScrollReveal().reveal(".contact form", {
        origin: "bottom",
        distance: "80px",
        duration: 2000,
        delay: 200,
      });
    }

    // Optional: lightweight client-side validation
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        const name = document.getElementById("name");
        const email = document.getElementById("email_id");
        const message = document.getElementById("message");
        if (!name?.value || !email?.value || !message?.value) {
          e.preventDefault();
          alert("Please fill in your name, email, and message.");
        }
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Contact section load error:", err);
  }
});
