const yearToUpdate = document.querySelector("#copyright-year");

function getDate() { return new Date(); }

function calculateYear() {
    let year = getDate().getFullYear();
    yearToUpdate.innerText = year;
}

// if("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("./service-worker.js")
// }

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then((registration) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  };


calculateYear()