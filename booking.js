// booking.js

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, and } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ✅ ضع بيانات مشروعك من Firebase Console هنا
const firebaseConfig = {
  apiKey: "AIzaSy...YOUR_KEY...",   // ← حط الـ API Key بتاعك
  authDomain: "hotel-booking-2a365.firebaseapp.com",
  projectId: "hotel-booking-2a365",
  storageBucket: "hotel-booking-2a365.appspot.com",
  messagingSenderId: "226710233933",
  appId: "1:226710233933:web:d8c2b4f7b1f952f8f0211c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عناصر الواجهة
const bookingForm = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const messageFeedback = document.getElementById("messageFeedback");

// دالة لعرض الرسائل
function showMessage(message, isSuccess) {
  messageFeedback.textContent = message;
  messageFeedback.className = isSuccess ? 'message success' : 'message error';
}

// التحقق من التداخل
async function isRoomAvailable(roomId, checkIn, checkOut) {
  const bookingsRef = collection(db, "bookings");
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const q1 = query(bookingsRef, and(
      where("roomId", "==", roomId),
      where("checkInDate", ">=", checkInDate),
      where("checkInDate", "<", checkOutDate)
  ));

  const q2 = query(bookingsRef, and(
      where("roomId", "==", roomId),
      where("checkOutDate", ">", checkInDate),
      where("checkOutDate", "<=", checkOutDate)
  ));

  const q3 = query(bookingsRef, and(
      where("roomId", "==", roomId),
      where("checkInDate", "<=", checkInDate),
      where("checkOutDate", ">=", checkOutDate)
  ));

  const [snapshot1, snapshot2, snapshot3] = await Promise.all([getDocs(q1), getDocs(q2), getDocs(q3)]);

  return snapshot1.empty && snapshot2.empty && snapshot3.empty;
}

// معالجة الفورم
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "⏳ جاري الحجز...";
  showMessage("", true);

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const checkIn = document.getElementById("checkInDate").value;
  const checkOut = document.getElementById("checkOutDate").value;

  // مبدئيًا خليها غرفة ثابتة
  const roomId = "standard_room_101";

  // Validation
  if (!name || !phone || !checkIn || !checkOut) {
    showMessage("⚠️ لازم تملأ كل البيانات.", false);
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
    return;
  }

  if (new Date(checkIn) >= new Date(checkOut)) {
    showMessage("⚠️ تاريخ المغادرة لازم يكون بعد الوصول.", false);
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
    return;
  }

  try {
    const isAvailable = await isRoomAvailable(roomId, checkIn, checkOut);

    if (!isAvailable) {
      showMessage("❌ الغرفة محجوزة بالفعل في هذه الفترة.", false);
      return;
    }

    await addDoc(collection(db, "bookings"), {
      guestName: name,
      guestPhone: phone,
      roomId: roomId,
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      bookingStatus: "confirmed",
      createdAt: new Date()
    });

    showMessage("✅ تم الحجز بنجاح! سنتواصل معك قريبًا.", true);
    bookingForm.reset();

  } catch (error) {
    console.error("خطأ أثناء الحجز:", error);
    showMessage("⚠️ حصل خطأ أثناء الحجز. حاول مرة أخرى.", false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
  }
});
