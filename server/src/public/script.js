const getById = (id) => document.getElementById(id);

const password        = getById("password");
const confirmPassword = getById("confirm-password");
const form            = getById("form");
const container       = getById("container");
const loader          = getById("loader");
const button          = getById("button");
const error           = getById("error");
const success         = getById("success");

const passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

error.style.display    = "none";
success.style.display  = "none";
container.style.display = "none";
loader.style.display   = "block";

let token, userId;

// ── Helpers ───────────────────────────────────────────────────────────────────
const displayError = (errorMessage) => {
  success.style.display = "none";
  error.innerText       = errorMessage;
  error.style.display   = "block";
};

const displaySuccess = (successMessage) => {
  error.style.display    = "none";
  success.innerText      = successMessage;
  success.style.display  = "block";
};

// ── Show / hide password ──────────────────────────────────────────────────────
document.querySelectorAll(".toggle-eye").forEach((eye) => {
  eye.addEventListener("click", () => {
    const input  = getById(eye.dataset.target);
    const hidden = input.type === "password";
    input.type   = hidden ? "text" : "password";
    eye.classList.toggle("active", hidden);
  });
});

// ── Password strength ─────────────────────────────────────────────────────────
password.addEventListener("input", () => {
  const val = password.value;
  const bar = getById("strength-bar");
  const lbl = getById("strength-label");

  if (!val) { bar.style.width = "0%"; lbl.textContent = ""; return; }

  let score = 0;
  if (val.length >= 8)          score++;
  if (val.length >= 12)         score++;
  if (/[A-Z]/.test(val))        score++;
  if (/[0-9]/.test(val))        score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { w: "20%",  c: "#ef4444", t: "Muy débil"  },
    { w: "40%",  c: "#f97316", t: "Débil"       },
    { w: "60%",  c: "#eab308", t: "Regular"     },
    { w: "80%",  c: "#84cc16", t: "Fuerte"      },
    { w: "100%", c: "#22c55e", t: "Muy fuerte"  },
  ];

  const lv             = levels[Math.min(score, 4)];
  bar.style.width      = lv.w;
  bar.style.background = lv.c;
  lbl.textContent      = lv.t;
  lbl.style.color      = lv.c;
});

// ── 1. Verificar token al cargar ──────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  token  = params.token;
  userId = params.userId;

  if (!token || !userId) {
    loader.innerText = "Enlace inválido o incompleto.";
    return;
  }

  try {
    const res  = await fetch("/auth/verify-pass-reset-token", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ token, userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      loader.innerText = data.error || "Token inválido o expirado.";
      return;
    }

    loader.style.display    = "none";
    container.style.display = "block";

  } catch (err) {
    console.error("Error al verificar token:", err);
    loader.innerText = "Error de red. Intenta de nuevo.";
  }
});

// ── 2. Submit ─────────────────────────────────────────────────────────────────
const handleSubmit = async (evt) => {
  evt.preventDefault();

  if (!password.value.trim()) {
    return displayError("Password is missing!");
  }

  if (!passRegex.test(password.value)) {
    return displayError(
      "Password is too simple, use alpha numeric with special characters!"
    );
  }

  if (password.value !== confirmPassword.value) {
    return displayError("Password do not match!");
  }

  button.disabled  = true;
  button.innerHTML = `<span class="btn-spinner"></span>Please wait...`;

  const res = await fetch("/auth/update-password", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ token, userId, password: password.value }),
  });

  button.disabled  = false;
  button.innerText = "Reset Password";

  if (!res.ok) {
    const { error } = await res.json();
    return displayError(error);
  }

  displaySuccess("Your password is reset successfully!");

  password.value        = "";
  confirmPassword.value = "";

  getById("strength-bar").style.width  = "0%";
  getById("strength-label").textContent = "";

  // Mostrar pantalla de éxito tras un momento
  setTimeout(() => {
    form.style.display                      = "none";
    getById("success-screen").style.display = "block";
  }, 1500);
};

form.addEventListener("submit", handleSubmit);