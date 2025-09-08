// rooms.js

// 1. استيراد وإعداد Firebase (نفس الإعداد الموجود في booking.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // <--- استبدل بمفتاحك
  authDomain: "hotel-booking-2a365.firebaseapp.com",
  projectId: "hotel-booking-2a365",
  storageBucket: "hotel-booking-2a365.appspot.com",
  messagingSenderId: "226710233933",
  appId: "1:226710233933:web:d8c2b4f7b1f952f8f0211c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. استهداف حاوية عرض الغرف في ملف HTML
const roomsContainer = document.getElementById('rooms-container');

// 3. دالة لجلب وعرض الغرف
async function displayRooms() {
  try {
    const roomsCollection = collection(db, 'rooms');
    const querySnapshot = await getDocs(roomsCollection);

    // تفريغ الحاوية من رسالة "جاري التحميل"
    roomsContainer.innerHTML = '';

    if (querySnapshot.empty) {
      roomsContainer.innerHTML = '<p>لا توجد غرف متاحة حاليًا.</p>';
      return;
    }

    // 4. المرور على كل غرفة وتجهيز كود الـ HTML الخاص بها
    querySnapshot.forEach(doc => {
      const room = doc.data();
      const roomId = doc.id; // هذا هو الـ ID الفريد للغرفة من Firestore

      const roomCardHTML = `
        <div class="room-card">
          <div class="room-media" style="background-image: url('${room.imageUrl}')"></div>
          <div class="room-body">
            <h3>${room.name}</h3>
            <p>${room.description}</p>
            <div class="price">
              <strong>${room.price} EGP</strong> / ليلة
            </div>
            <div class="room-actions">
                <a href="booking.html?roomId=${roomId}" class="btn btn-primary full">احجز الآن</a>
            </div>
          </div>
        </div>
      `;
      
      // إضافة بطاقة الغرفة للحاوية
      roomsContainer.innerHTML += roomCardHTML;
    });

  } catch (error) {
    console.error("خطأ في جلب الغرف:", error);
    roomsContainer.innerHTML = '<p>حدث خطأ أثناء تحميل الغرف. يرجى المحاولة مرة أخرى.</p>';
  }
}

// 6. استدعاء الدالة عند تحميل الصفحة
displayRooms();
