// Register event listener for the 'push' event.
self.addEventListener('push', function (event) {
    let message = JSON.parse(event.data.text());
    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        self.registration.showNotification(message.title, {
            body: message.body,
        })
    );
});

self.addEventListener('notificationclick', function (e) {
    e.notification.close();

    e.waitUntil(
        clients.openWindow("https://google.com")
    );

});