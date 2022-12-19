const yearToUpdate = document.querySelector("#copyright-year");

function getDate() { return new Date(); }

function calculateYear() {
    let year = getDate().getFullYear();
    yearToUpdate.innerText = year;
}

if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
}

calculateYear()