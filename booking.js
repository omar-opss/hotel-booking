// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase Config - عرفها مرة واحدة بس
const firebaseConfig = {
  apiKey: "AIzaSyC0bNklkS3nVsOa3rseF2xdqGwm0wbzdzE",
  authDomain: "hotel-booking-2a365.firebaseapp.com",
  projectId: "hotel-booking-2a365",
  storageBucket: "hotel-booking-2a365.appspot.com",
  messagingSenderId: "226710233933",
  appId: "1:226710233933:web:d8c2b4f7b1f952f8f0211c",
  measurementId: "G-8K8K1XKV4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// دالة لحجز غرفة
async function bookRoom(name, phone, date, time) {
  try {
    // التحقق هل الميعاد محجوز قبل كده
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("date", "==", date), where("time", "==", time));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("❌ الميعاد محجوز بالفعل، اختار ميعاد تاني.");
      return false;
    }

    // إضافة الحجز لقاعدة البيانات
    await addDoc(bookingsRef, {
      name: name,
      phone: phone,
      date: date,
      time: time,
      createdAt: new Date()
    });

    alert("✅ تم الحجز بنجاح!");
    return true;
  } catch (error) {
    console.error("خطأ أثناء الحجز:", error);
    alert("⚠️ حصل خطأ أثناء الحجز. حاول تاني.");
    return false;
  }
}

// ربط الدالة مع الفورم في الصفحة
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !phone || !date || !time) {
    alert("⚠️ لازم تملأ كل البيانات.");
    return;
  }

  await bookRoom(name, phone, date, time);
});