// script.js

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

    // حفظ في LocalStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeBtn.textContent = "🌙";
    }
  });

  // تحميل الثيم عند فتح الصفحة
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
  }
}

// ==============================
// 3. LANGUAGE TOGGLE (عربي / إنجليزي)
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
// 4. FORM VALIDATION (مثال لحجز)
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
/* ===========================
   HERO SEARCH BOX
=========================== */
.search-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  margin-top: 25px;
}

.search-box form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  align-items: end;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.search-field label {
  font-size: 14px;
  font-weight: 600;
  color: var(--dark-color);
}

.search-field input,
.search-field button {
  padding: 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  font-size: 14px;
  background: #fff;
  cursor: pointer;
}

/* Dropdown */
.dropdown {
  position: relative;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%; left: 0;
  width: 220px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  margin-top: 5px;
  padding: 10px;
  z-index: 10;
}
.dropdown-menu .counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.dropdown-menu .count {
  margin: 0 10px;
}
.dropdown-menu button {
  padding: 5px 10px;
}
.dropdown-menu .apply {
  width: 100%;
  margin-top: 10px;
  background: var(--primary-color);
  color: #fff;
  border: none;
}

// Dropdown function
function setupDropdown(dropdownId, labelSingular, labelPlural) {
  const dropdown = document.getElementById(dropdownId);
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

  // غلق عند الضغط خارج
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
