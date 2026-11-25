// Info dialog event
const dialog = document.getElementById("infoDialog");
document
  .getElementById("infoBtn")
  .addEventListener("click", () => dialog.showModal());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

// Token request form
const form = document.getElementById("signup");
const email = document.getElementById("email");
const status = document.getElementById("status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const address = email.value.trim();
  if (address.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
    status.textContent = "Enter a valid email address.";
    email.focus();
  } else {
    status.textContent = "Email requests are currently unavailable. You can join using the TestFlight link above.";
  }
  status.className = "status error";
});
