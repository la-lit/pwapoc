
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('pwabuilder-sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker 12-4-2015 registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker 12-4-2015 registration failed: ', err);
  });
} else {
  console.log("No ServiceWorker for you :(");
}
