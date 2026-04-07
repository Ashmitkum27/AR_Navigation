let target = { lat: 12.9716, lon: 77.5946 };

async function startNavigation() {

    let place = document.getElementById("destination").value;

    if (!place) {
        alert("Enter a location");
        return;
    }

    try {
        let res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
        let data = await res.json();

        if (data.length > 0) {
            target.lat = parseFloat(data[0].lat);
            target.lon = parseFloat(data[0].lon);

            document.getElementById("status").innerText =
                `Destination set: ${place}`;
        } else {
            alert("Location not found");
        }

    } catch (err) {
        console.error(err);
    }
}

function enableAR() {

    document.getElementById("arScene").style.display = "block";

    const arrow = document.querySelector("#arrow");

    // Always visible
    arrow.setAttribute("position", "0 1 -3");

    if (navigator.geolocation) {

        navigator.geolocation.watchPosition(position => {

            let userLat = position.coords.latitude;
            let userLon = position.coords.longitude;

            let dLat = target.lat - userLat;
            let dLon = target.lon - userLon;

            let angle = Math.atan2(dLon, dLat) * (180 / Math.PI);

            // Rotate clearly
            arrow.setAttribute("rotation", `0 ${angle} 0`);

            // Move left-right so it's visible
            arrow.setAttribute("position", {
                x: Math.sin(angle * Math.PI/180) * 1.5,
                y: 1,
                z: -3
            });

            let distance = Math.sqrt(dLat*dLat + dLon*dLon) * 111000;

            document.getElementById("status").innerText =
                `Direction: ${angle.toFixed(1)}° | Distance: ${Math.round(distance)}m`;

        }, () => {
            document.getElementById("status").innerText = "GPS not working";
        });
    }
}

function enableVR() {
    window.location.href = "vr.html";
}
