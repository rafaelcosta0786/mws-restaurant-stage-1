// Register service worker */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js', { scope: "/" })
      .then(reg => {
        console.log(`SW Successful: ${reg.scope}`);
      })
      .catch(err => {
        console.log(`SW Failed: ${err}`);
      });
  });
} else {
  console.log('SW Failed: Not Supported')
}