document.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
        getLocation()
            .then(showLocation)
            .catch(handleLocationError);
    } else {
        handleLocationError("Geolocalización no es compatible en este navegador.");
    }
});

function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function showLocation(position) {
    const { latitude, longitude } = position.coords;
    displayMessage(`Ubicación: ${latitude}, ${longitude}`);
    return fetchIp();
}

function fetchIp() {
    return fetch("https://api.ipify.org?format=json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayMessage(`Dirección IP: ${data.ip}`);
        })
        .catch(error => {
            handleLocationError(`Error al obtener la dirección IP: ${error.message}`);
        });
}

function displayMessage(message) {
    const locationDiv = document.getElementById("location");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    locationDiv.appendChild(messageDiv);
}

function handleLocationError(errorMessage) {
    console.error(errorMessage);
    const locationDiv = document.getElementById("location");
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Error al obtener la ubicación.";
    locationDiv.appendChild(errorDiv);
}


const userAgent = navigator.userAgent;
const sistemaOperativoInfo = document.getElementById('sistema_operativo_info');

let sistemaOperativoNombre = 'Desconocido';

if (userAgent.match(/Win/i)) {
    sistemaOperativoNombre = 'Windows';
} else if (userAgent.match(/Mac/i)) {
    sistemaOperativoNombre = 'macOS';
} else if (userAgent.match(/Linux/i)) {
    sistemaOperativoNombre = 'Linux';
} else if (userAgent.match(/Android/i)) {
    sistemaOperativoNombre = 'Android';
} else if (userAgent.match(/iOS/i)) {
    sistemaOperativoNombre = 'iOS';
}

sistemaOperativoInfo.textContent = `Sistema Operativo: ${sistemaOperativoNombre}`;

   