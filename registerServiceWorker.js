export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.info("Service workers are not supported in this browser.");
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.info("StreamList service worker registered:", registration.scope);
      })
      .catch((error) => {
        console.error("StreamList service worker registration failed:", error);
      });
  });
}
