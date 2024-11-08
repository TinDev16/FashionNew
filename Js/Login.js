const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

window.addEventListener("load", () => {
  if (window.location.search.includes("signup")) {
    container.classList.add("sign-up-mode");  // Mở form đăng ký
  } else if (window.location.search.includes("signin")) {
    container.classList.remove("sign-up-mode");  // Mở form đăng nhập
  }
});

function redirectToIndex(mode) {
  if (mode === 'signin') {
    window.location.href = "./index_logged.html";
  } else if (mode === 'signup') {
    window.location.href = "Login.html?signin";
  }
}

