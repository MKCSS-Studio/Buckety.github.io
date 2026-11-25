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
const button = form.querySelector(".get-token-btn");

// status msg under signup
function setStatus(msg, type = "") {
  status.textContent = msg;
  status.className = "status " + type;
}

// get token btn event
form.addEventListener("submit", async (e) => {
  // stop page reload
  e.preventDefault();
  // check email
  const value = email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    setStatus("Enter a valid email address.", "error");
    email.focus();
    return;
  }
  // preparing to save
  button.disabled = true;
  setStatus("Saving…");

  try {
    // connect to backend >_>
    await new Promise((r) => setTimeout(r, 600)); // fake delay

    //success
    setStatus("Check your inbox for your TestFlight token.", "ok");
    form.reset();
  } catch (err) {
    // error
    setStatus("Something went wrong. Try again in a moment.", "error");
  } finally {
    button.disabled = false;
  }
});
