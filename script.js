let target = {
    lat: 12.9716,
    lon: 77.5946
};

function startNavigation() {
    document.getElementById("status").innerText = "Navigation Started...";
}

function enableAR() {

    document.getElementById("arScene").style.display = "block";
    document.getElementById("status").innerText = "AR Mode Enabled";

    const arrow = document.querySelector("#arrow");

    // Always visible (for laptop/demo)
    arrow.setAttribute("position", {
        x: 0,
        y: 1,
        z: -3
    });

    // Try GPS (will work better on mobile)
    if (navigator.geolocation) {

        navigator.geolocation.watchPosition(position => {

            let userLat = position.coords.latitude;
            let userLon = position.coords.longitude;

            let dLat = target.lat - userLat;
            let dLon = target.lon - userLon;

            // Controlled movement (not too far)
            arrow.setAttribute("position", {
                x: dLon * 10,
                y: 1,
                z: -3 + (dLat * 10)
            });

            document.getElementById("status").innerText =
                `Navigating... Lat: ${userLat.toFixed(4)} Lon: ${userLon.toFixed(4)}`;

        }, () => {
            console.log("GPS not available");
        });
    }
}

function enableVR() {
    window.location.href = "vr.html";
}