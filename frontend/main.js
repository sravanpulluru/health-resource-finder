// 🌍 Initialize Global Map
const map = L.map('map').setView([17.4375, 78.4483], 13); // Default: Hyderabad

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markersLayer = L.layerGroup().addTo(map); // For clearing & managing markers

// 📍 Utility: Add marker
function addMapMarker(lat, lng, name, location) {
  const marker = L.marker([lat, lng]).bindPopup(`<b>${name}</b><br>${location}`);
  markersLayer.addLayer(marker);
}

// 📢 Utility: Show alert message
function showAlert(containerId, message, type = 'warning') {
  document.getElementById(containerId).innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

// 🚑 Handle Health Resource Search
document.getElementById('resourceForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = document.getElementById('location').value.trim();
  const type = document.getElementById('type').value;
  const resultDiv = document.getElementById('resourceResults');
  
  resultDiv.innerHTML = '<div class="text-info">🔄 Searching for resources...</div>';
  markersLayer.clearLayers();

  try {
    const res = await fetch(`http://localhost:5000/api/resources?location=${encodeURIComponent(location)}&type=${encodeURIComponent(type)}`);
    const data = await res.json();

    resultDiv.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      showAlert('resourceResults', 'No resources found for the given location and type.');
      return;
    }

    // 🧾 Display list
    let list = '<ul class="list-group">';
    data.forEach(resource => {
      list += `<li class="list-group-item text-dark">
        <strong>${resource.name}</strong> (${resource.type})<br>
        ${resource.location} | ☎️ ${resource.contact}
      </li>`;
    });
    list += '</ul>';
    resultDiv.innerHTML = list;

    // 🗺️ Add markers
    map.setView([data[0].lat, data[0].lng], 13);
    data.forEach(r => r.lat && r.lng && addMapMarker(r.lat, r.lng, r.name, r.location));

  } catch (error) {
    console.error(error);
    showAlert('resourceResults', 'Unable to fetch resources. Please try again later.', 'danger');
  }
});

document.getElementById('donorForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const bloodGroup = e.target.bloodGroup.value.trim();
  const city = e.target.city.value.trim();
  const resultsDiv = document.getElementById('donorResults');

  resultsDiv.innerHTML = '<div class="text-info">🔄 Searching for donors...</div>';

  try {
    const res = await fetch(`/api/donors?bloodGroup=${encodeURIComponent(bloodGroup)}&location=${encodeURIComponent(city)}`);
    const data = await res.json();

    resultsDiv.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      showAlert('donorResults', 'No donors found for the given blood group and location.');
      return;
    }

    data.forEach(donor => {
      resultsDiv.innerHTML += `
        <div class="border-bottom py-2 text-white">
          <strong>${donor.name}</strong> - ${donor.bloodGroup} <br>
          📍 ${donor.location} | ☎️ ${donor.contact}
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
    showAlert('donorResults', 'Unable to fetch donor information. Please try again later.', 'danger');
  }
});


// 📍 Optional: Center map using user geolocation if available
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    map.setView([latitude, longitude], 13);
  });
}
