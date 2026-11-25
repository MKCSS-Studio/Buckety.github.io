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
const button = form.querySelector('button[type="submit"]');
const signupDialog = document.getElementById("signupDialog");

function setStatus(message, type = "") {
  status.textContent = message;
  status.className = type ? `status ${type}` : "status";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (button.disabled) return;

  const address = email.value.trim();
  if (address.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
    setStatus("Enter a valid email address.", "error");
    email.focus();
    return;
  }

  const submission = new FormData(form);
  submission.set("email", address);
  button.disabled = true;
  setStatus("Sending your request…");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: submission,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok || (await response.json())?.success !== true) {
      throw new Error("Static Forms did not accept the request.");
    }
  } catch {
    setStatus("We couldn’t confirm your request. Please try again.", "error");
    return;
  } finally {
    button.disabled = false;
  }

  form.reset();
  setStatus("Request received.", "ok");
  signupDialog.showModal();
});
