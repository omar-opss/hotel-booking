// booking.js (النسخة المحترفة)

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, and } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// الخطوة 1: الأمان - استخدام متغيرات البيئة (Environment Variables)
// هذه البيانات يجب أن تكون في ملف .env.local ولا تكتب هنا مباشرة
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // مثال
  authDomain: "hotel-booking-2a365.firebaseapp.com",
  projectId: "hotel-booking-2a365",
  storageBucket: "hotel-booking-2a365.appspot.com",
  messagingSenderId: "226710233933",
  appId: "1:226710233933:web:d8c2b4f7b1f952f8f0211c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عناصر الواجهة للتحكم فيها
const bookingForm = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const messageFeedback = document.getElementById("messageFeedback");

// دالة لعرض الرسائل للمستخدم
function showMessage(message, isSuccess) {
  messageFeedback.textContent = message;
  messageFeedback.className = isSuccess ? 'message success' : 'message error';
}

// دالة للتحقق من تداخل الحجوزات (المنطق الاحترافي للفنادق)
async function isRoomAvailable(roomId, checkIn, checkOut) {
    const bookingsRef = collection(db, "bookings");
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Query 1: هل فيه حجز لنفس الغرفة هيبدأ خلال الفترة بتاعتي؟
    const q1 = query(bookingsRef, and(
        where("roomId", "==", roomId),
        where("checkInDate", ">=", checkInDate),
        where("checkInDate", "<", checkOutDate)
    ));
    
    // Query 2: هل فيه حجز لنفس الغرفة هينتهي خلال الفترة بتاعتي؟
    const q2 = query(bookingsRef, and(
        where("roomId", "==", roomId),
        where("checkOutDate", ">", checkInDate),
        where("checkOutDate", "<=", checkOutDate)
    ));

    // Query 3: هل فيه حجز لنفس الغرفة أنا بالكامل جواه؟
    const q3 = query(bookingsRef, and(
        where("roomId", "==", roomId),
        where("checkInDate", "<=", checkInDate),
        where("checkOutDate", ">=", checkOutDate)
    ));

    const [snapshot1, snapshot2, snapshot3] = await Promise.all([getDocs(q1), getDocs(q2), getDocs(q3)]);

    // لو أي استعلام رجع بنتيجة، تبقى الغرفة غير متاحة
    return snapshot1.empty && snapshot2.empty && snapshot3.empty;
}

// ربط الدالة مع الفورم في الصفحة
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // تفعيل حالة التحميل
  submitBtn.disabled = true;
  submitBtn.textContent = "جاري الحجز...";
  showMessage("", true); // إخفاء أي رسالة قديمة

  // الحصول على البيانات من الفورم
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const checkIn = document.getElementById("checkInDate").value; // اسم مقترح
  const checkOut = document.getElementById("checkOutDate").value; // اسم مقترح
  const roomId = "standard_room_101"; // كمثال، المفروض يجي من اختيار المستخدم

  // التحقق من البيانات (Validation)
  if (!name || !phone || !checkIn || !checkOut) {
    showMessage("⚠️ لازم تملأ كل البيانات.", false);
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
    return;
  }
  
  if (new Date(checkIn) >= new Date(checkOut)) {
    showMessage("⚠️ تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول.", false);
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
    return;
  }

  try {
    const isAvailable = await isRoomAvailable(roomId, checkIn, checkOut);

    if (!isAvailable) {
      showMessage("❌ الغرفة محجوزة في هذه الفترة، برجاء اختيار تواريخ أخرى.", false);
      return;
    }

    // إضافة الحجز لقاعدة البيانات
    await addDoc(collection(db, "bookings"), {
      guestName: name,
      guestPhone: phone,
      roomId: roomId,
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      bookingStatus: "confirmed",
      createdAt: new Date()
    });

    showMessage("✅ تم الحجز بنجاح! سيتم التواصل معك للتأكيد.", true);
    bookingForm.reset(); // تفريغ الفورم بعد النجاح

  } catch (error) {
    console.error("خطأ أثناء الحجز:", error);
    showMessage("⚠️ حصل خطأ أثناء الحجز. حاول تاني.", false);
  } finally {
    // إيقاف حالة التحميل سواء نجح الحجز أو فشل
    submitBtn.disabled = false;
    submitBtn.textContent = "احجز الآن";
  }
});
