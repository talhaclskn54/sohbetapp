const CACHE_NAME = 'sohbet-app-v1';
const assetsToCache = [
  './',
  './index.html',
  './gruplar.html',
  './mesaj.html',
  './grup-ayarlari.html',
  './manifest.json'
];

// 1. Kurulum ve Dosyaları Önbelleğe Alma
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// 2. İnternet ve Önbellek Yönetimi (Fetch)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// 3. Arka Planda Bildirim Geldiğinde Çalışacak Kısım (FCM)
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCoDVcOFPZkaCUr-ac1GsuAkxm8nNgzL3M",
  authDomain: "sohbet-arkadasim-b1402.firebaseapp.com",
  projectId: "sohbet-arkadasim-b1402",
  storageBucket: "sohbet-arkadasim-b1402.firebasestorage.app",
  messagingSenderId: "345189828948",
  appId: "1:345189828948:web:60b6d774230559956c60c1"
});

const messaging = firebase.messaging();

// Uygulama kapalıyken veya arondayken bildirim düştüğünde tetiklenir
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Arka plan mesajı alındı:', payload);
  
  const notificationTitle = payload.notification ? payload.notification.title : "Yeni Mesaj";
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : "Yeni bir mesajın var.",
    icon: './icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});