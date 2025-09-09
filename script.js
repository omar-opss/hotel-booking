// ==============================
// 1. BURGER MENU
// ==============================
const burger = document.querySelector(".burger-menu");
const nav = document.querySelector(".main-nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("open");
  });
}

// ==============================
// 2. DARK MODE TOGGLE
// ==============================
const themeBtn = document.querySelector("#themeToggle");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeBtn.textContent = "🌙";
    }
  });

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
  }
}

// ==============================
// 3. LANGUAGE TOGGLE (AR / EN)
// ==============================
const langBtn = document.querySelector("#langToggle");

if (langBtn) {
  langBtn.addEventListener("click", () => {
    if (document.documentElement.lang === "ar") {
      document.documentElement.lang = "en";
      langBtn.textContent = "AR";
    } else {
      document.documentElement.lang = "ar";
      langBtn.textContent = "EN";
    }
  });
}

// ==============================
// 4. FORM VALIDATION
// ==============================
const bookingForm = document.querySelector("#bookingForm");
const feedback = document.querySelector("#messageFeedback");

if (bookingForm && feedback) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = bookingForm.querySelector("[name='name']").value.trim();
    const email = bookingForm.querySelector("[name='email']").value.trim();

    if (!name || !email) {
      feedback.textContent = "❌ من فضلك املأ كل الحقول";
      feedback.className = "error";
      return;
    }

    feedback.textContent = "✅ تم إرسال حجزك بنجاح!";
    feedback.className = "success";

    bookingForm.reset();
  });
}

// ==============================
// 5. DROPDOWN SETUP
// ==============================
function setupDropdown(dropdownId, labelSingular, labelPlural) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;

  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");
  const countSpan = menu.querySelector(".count");
  const increaseBtn = menu.querySelector(".increase");
  const decreaseBtn = menu.querySelector(".decrease");
  const applyBtn = menu.querySelector(".apply");

  let count = 1;

  toggle.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  increaseBtn.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;
  });

  decreaseBtn.addEventListener("click", () => {
    if (count > 1) {
      count--;
      countSpan.textContent = count;
    }
  });

  applyBtn.addEventListener("click", () => {
    toggle.textContent = count + " " + (count === 1 ? labelSingular : labelPlural);
    dropdown.classList.remove("open");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
}

// Guests
setupDropdown("guestsDropdown", "ضيف", "ضيوف");
// Rooms
setupDropdown("roomsDropdown", "غرفة", "غرف");
