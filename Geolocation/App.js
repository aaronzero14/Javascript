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


const sistemaOperativo = navigator.platform;
        const sistemaOperativoInfo = document.getElementById('sistema-operativo-info');
        sistemaOperativoInfo.textContent = `Sistema Operativo: ${sistemaOperativo}`;
   