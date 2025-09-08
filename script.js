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
