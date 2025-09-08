/* ===============================================
   SCRIPT.JS - النسخة الاحترافية بعد التحسين
   =============================================== */

/* ---------- 1. BURGER MENU ---------- */
const burger = document.querySelector(".burger");
const mainNav = document.querySelector(".main-nav");

if (burger && mainNav) {
  burger.addEventListener("click", () => {
    mainNav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });
}

/* ---------- 2. BOOKING FORM ---------- */
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("messageFeedback");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // اجمع البيانات
    const name = bookingForm.querySelector("[name='name']").value.trim();
    const email = bookingForm.querySelector("[name='email']").value.trim();
    const date = bookingForm.querySelector("[name='date']").value.trim();
    const room = bookingForm.querySelector("[name='room']").value.trim();

    // تحقق من البيانات
    if (!name || !email || !date || !room) {
      showMessage("من فضلك املأ كل الحقول", "error", bookingMessage);
      return;
    }

    // هنا ممكن تضيف إرسال البيانات لفايربيز أو سيرفر
    showMessage("تم إرسال طلب الحجز بنجاح ✅", "success", bookingMessage);
    bookingForm.reset();
  });
}

/* ---------- 3. CONTACT FORM ---------- */
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactFeedback");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactForm.querySelector("[name='name']").value.trim();
    const email = contactForm.querySelector("[name='email']").value.trim();
    const message = contactForm.querySelector("[name='message']").value.trim();

    if (!name || !email || !message) {
      showMessage("من فضلك املأ كل الحقول", "error", contactMessage);
      return;
    }

    showMessage("تم إرسال رسالتك بنجاح ✅", "success", contactMessage);
    contactForm.reset();
  });
}

/* ---------- 4. DARK/LIGHT MODE ---------- */
const themeSwitch = document.getElementById("themeSwitch");

if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeSwitch.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}

/* ---------- 5. LANGUAGE SWITCH ---------- */
const langSwitch = document.getElementById("langSwitch");
const langElements = document.querySelectorAll(".lang");
let currentLang = "ar";

if (langSwitch) {
  langSwitch.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    langSwitch.textContent = currentLang === "ar" ? "EN" : "AR";

    langElements.forEach(el => {
      const newText = el.getAttribute(`data-${currentLang}`);
      if (newText) el.textContent = newText;
    });

    // تغيير اتجاه الصفحة
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
