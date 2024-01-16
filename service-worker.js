// Register event listener for the 'push' event.
self.addEventListener('push', function (event) {
    let message = JSON.parse(event.data.text());
    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        // Show a notification with title 'ServiceWorker Cookbook' and body 'Alea iacta est'.
        self.registration.showNotification(message.title, {
            body: message.body,
        })
    );
});