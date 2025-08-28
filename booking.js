// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config بتاعك
const firebaseConfig = {
  apiKey: "AIzaSyC8kMaKSz0rv5o3r3sef2Xdq6wm0uduoZE",
  authDomain: "hotel-booking-2a366.firebaseapp.com",
  projectId: "hotel-booking-2a366",
  storageBucket: "hotel-booking-2a366.firebasestorage.app",
  messagingSenderId: "729616778436",
  appId: "1:729616778436:web:2704d110a75fd872013591",
  measurementId: "G-3ZNK1XXVFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// لما الفورم يتبعت
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // نجمع البيانات من الفورم
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    try {
      // نضيف البيانات في Firebase Firestore
      await addDoc(collection(db, "bookings"), {
        name: name,
        phone: phone,
        date: date,
        time: time,
        createdAt: new Date()
      });

      // رسالة شكر بعد الحجز
      alert("✅ تم حجزك بنجاح! شكراً لاستخدامك خدمتنا.");

      // نفرغ الفورم
      form.reset();
    } catch (error) {
      console.error("Error adding booking: ", error);
      alert("❌ حصل خطأ أثناء الحجز، حاول تاني.");
    }
  });
});
// =============================
// Firebase Config
// =============================
const firebaseConfig = {
  apiKey: "ضع_الـ_apiKey_بتاعك",
  authDomain: "ضع_الـ_authDomain",
  projectId: "ضع_الـ_projectId",
  storageBucket: "ضع_الـ_storageBucket",
  messagingSenderId: "ضع_الـ_messagingSenderId",
  appId: "ضع_الـ_appId"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// =============================
// Booking Form Submit
// =============================
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // القيم من الفورم
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;

  try {
    // حفظ في Firestore
    await db.collection("bookings").add({
      name,
      phone,
      email,
      checkin,
      checkout,
      guests,
      createdAt: new Date()
    });

    // بعد الحفظ يروح لصفحة Thank You
    window.location.href = "thankyou.html";

  } catch (error) {
    console.error("Error saving booking: ", error);
    alert("⚠️ حصل خطأ.. حاول تاني");
  }
});