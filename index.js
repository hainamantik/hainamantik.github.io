// Register a Service Worker.
navigator.serviceWorker.register('service-worker.js');

navigator.serviceWorker.ready
.then(function(registration) {
  // Use the PushManager to get the user's subscription to the push service.
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
    // If a subscription was found, return it.
    if (subscription) {
      return subscription;
    }

    // Get the server's public key
    // const response = await fetch('./vapidPublicKey');
    const vapidPublicKey = `BG1ISzy6ESisGacOgXVtwBERomtyTU6G8YEIrUsbgc_zl0ALkqRghjODwB_cNQGZd7y9HUla6gBUEzIszNE6aTc`;
    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
    // urlBase64ToUint8Array() is defined in /tools.js
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
    // send notifications that don't have a visible effect for the user).
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
  });
}).then(function(subscription) {
  document.getElementById("result").innerHTML = JSON.stringify(subscription);
  console.log(JSON.stringify(subscription))
});