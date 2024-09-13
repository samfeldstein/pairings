// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const registration = await navigator.serviceWorker.register(
  "/service-worker.js",
  {
    scope: "/",
  }
);

if ("serviceWorker" in navigator) {
  try {
    registration;
    if (registration.installing) {
      console.log("Service worker installing");
    } else if (registration.waiting) {
      console.log("Service worker installed");
    } else if (registration.active) {
      console.log("Service worker active");
    }
  } catch (error) {
    console.error(`Registration failed with ${error}`);
  }
}
