// ==============================
//  Firebase SDK imports
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// ==============================
// عناصر الصفحة
// ==============================
const bookingForm = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const messageFeedback = document.getElementById("messageFeedback");
const roomDetailsBox = document.getElementById("roomDetails");

// ==============================
// دالة عرض الرسائل
// ==============================
function showMessage(message, isSuccess) {
  messageFeedback.textContent = message;
  messageFeedback.className = isSuccess ? "message success" : "message error";
}

// ==============================
// قراءة بيانات الغرفة من الرابط
// ==============================
const params = new URLSearchParams(window.location.search);
const roomName = params.get("room") || "غير محددة";
const roomPrice = params.get("price") || "غير محدد";

if (roomDetailsBox) {
  roomDetailsBox.innerHTML = `
    <h2>🛏 الغرفة المختارة: ${roomName}</h2>
    <p>💰 السعر: ${roomPrice} ج.م / الليلة</p>
  `;
}

// ==============================
// دالة التحقق من التداخل
// ==============================
async function isRoomAvailable(roomName, checkIn, checkOut) {
  const bookingsRef = collection(db, "bookings");
  const snapshot = await getDocs(
    query(bookingsRef, where("roomName", "==", roomName))
  );

  const newCheckIn = new Date(checkIn);
  const newCheckOut = new Date(checkOut);

  let available = true;

  snapshot.forEach(doc => {
    const data = doc.data();
    const existingCheckIn = new Date(data.checkInDate);
    const existingCheckOut = new Date(data.checkOutDate);

    if (
      (newCheckIn < existingCheckOut) && 
      (newCheckOut > existingCheckIn)
    ) {
      available = false;
    }
  });

  return available;
}

// ==============================
// ربط الفورم
// ==============================
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "⏳ جاري الحجز...";

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const checkIn = document.getElementById("checkInDate").value;
  const checkOut = document.getElementById("checkOutDate").value;

  if (!name || !phone || !checkIn || !checkOut) {
    showMessage("⚠️ لازم تملأ كل البيانات", false);
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
    return;
  }

  if (new Date(checkIn) >= new Date(checkOut)) {
    showMessage("⚠️ تاريخ المغادرة لازم يكون بعد الوصول", false);
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
    return;
  }

  try {
    const available = await isRoomAvailable(roomName, checkIn, checkOut);

    if (!available) {
      showMessage("❌ الغرفة غير متاحة في هذه الفترة", false);
      submitBtn.disabled = false;
      submitBtn.textContent = "احجز الآن";
      return;
    }

    // ✅ إضافة الحجز في Firestore
    await addDoc(collection(db, "bookings"), {
      guestName: name,
      guestPhone: phone,
      roomName,
      roomPrice,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      createdAt: new Date()
    });

    showMessage("✅ تم تسجيل الحجز بنجاح!", true);
    bookingForm.reset();

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


// ================================
// Booking Form Script
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const messageBox = document.getElementById("messageFeedback");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const checkIn = document.getElementById("checkInDate").value;
    const checkOut = document.getElementById("checkOutDate").value;

    // Validation
    if (!name || !phone || !checkIn || !checkOut) {
      showMessage("❌ من فضلك املأ جميع الحقول", "error");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      showMessage("⚠️ تاريخ المغادرة يجب أن يكون بعد الوصول", "error");
      return;
    }

    // Success
    showMessage("✅ تم تسجيل الحجز بنجاح! سيتم تحويلك لصفحة التأكيد...", "success");

    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 2000);
  });

  function showMessage(msg, type) {
    messageBox.textContent = msg;
    messageBox.style.padding = "12px";
    messageBox.style.marginTop = "15px";
    messageBox.style.borderRadius = "8px";

    if (type === "success") {
      messageBox.style.background = "#e6f7e6";
      messageBox.style.color = "#2d7a2d";
      messageBox.style.border = "1px solid #2d7a2d";
    } else {
      messageBox.style.background = "#ffe6e6";
      messageBox.style.color = "#b30000";
      messageBox.style.border = "1px solid #b30000";
    }
  }
});
