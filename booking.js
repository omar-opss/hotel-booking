// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ✅ Firebase Config بتاعك
const firebaseConfig = {
  apiKey: "AIzaSyC8kMaKSz0rv5o3r3sef2Xdq6wm0uduoZE",
  authDomain: "hotel-booking-2a366.firebaseapp.com",
  databaseURL: "https://hotel-booking-2a366-default-rtdb.firebaseio.com",
  projectId: "hotel-booking-2a366",
  storageBucket: "hotel-booking-2a366.firebasestorage.app",
  messagingSenderId: "729616778436",
  appId: "1:729616778436:web:2704d110a75fd872013591",
  measurementId: "G-3ZNK1XXVFC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عناصر الصفحة
const bookingForm = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const messageFeedback = document.getElementById("messageFeedback");

// دالة لعرض الرسائل
function showMessage(message, isSuccess) {
  messageFeedback.textContent = message;
  messageFeedback.className = isSuccess ? "message success" : "message error";
}

// ربط الفورم
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // تعطيل الزرار مؤقتًا
  submitBtn.disabled = true;
  submitBtn.textContent = "⏳ جاري الحجز...";

  // القيم من الفورم
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const checkIn = document.getElementById("checkInDate").value;
  const checkOut = document.getElementById("checkOutDate").value;

  // Validation
  if (!name || !phone || !checkIn || !checkOut) {
    showMessage("⚠️ لازم تملأ كل البيانات", false);
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
    return;
  }

  try {
    // تخزين البيانات في Firestore
    await addDoc(collection(db, "bookings"), {
      guestName: name,
      guestPhone: phone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      createdAt: new Date()
    });

    showMessage("✅ تم تسجيل الحجز بنجاح!", true);
    bookingForm.reset();

    // تحويل لصفحة الشكر
    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 1500);

  } catch (error) {
    console.error("Error adding booking:", error);
    showMessage("❌ حصل خطأ أثناء الحجز. حاول تاني.", false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
  }
});
