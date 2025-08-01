// 🌍 Global Map Initialization
const map = L.map('map').setView([17.4375, 78.4483], 13); // Default: Hyderabad
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markersLayer = L.layerGroup().addTo(map); // Layer group to manage markers

// 🚑 Handle Health Resource Search
document.getElementById('resourceForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = document.getElementById('location').value;
  const type = document.getElementById('type').value;

  try {
    const res = await fetch(`http://localhost:5000/api/resources?location=${encodeURIComponent(location)}&type=${encodeURIComponent(type)}`);
    const data = await res.json();

    const resultDiv = document.getElementById('resourceResults');
    resultDiv.innerHTML = '';

    if (data.length === 0) {
      resultDiv.innerHTML = '<div class="alert alert-warning">No resources found for the given location and type.</div>';
      return;
    }

    // 🧾 Display results
    let list = '<ul class="list-group">';
    data.forEach(resource => {
      list += `<li class="list-group-item text-dark">
        <strong>${resource.name}</strong> (${resource.type})<br>
        ${resource.location} | ☎️ ${resource.contact}
      </li>`;
    });
    list += '</ul>';
    resultDiv.innerHTML = list;

    // 📍 Update map markers
    markersLayer.clearLayers(); // Remove old markers
    map.setView([data[0].lat, data[0].lng], 13); // Focus on first result

    data.forEach(resource => {
      if (resource.lat && resource.lng) {
        const marker = L.marker([resource.lat, resource.lng])
          .bindPopup(`<b>${resource.name}</b><br>${resource.location}`);
        markersLayer.addLayer(marker);
      }
    });

  } catch (error) {
    console.error(error);
    document.getElementById('resourceResults').innerHTML = '<div class="alert alert-danger">Unable to fetch resources.</div>';
  }
});

// 🩸 Handle Blood Donor Search
document.getElementById('donorForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const bloodGroup = e.target.bloodGroup.value;
  const city = e.target.city.value;

  try {
    const res = await fetch(`http://localhost:5000/api/donors?blood_group=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`);
    const data = await res.json();

    const resultsDiv = document.getElementById('donorResults');
    resultsDiv.innerHTML = '';

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p class="text-warning">No donors found for the given blood group and location.</p>';
    } else {
      data.forEach(donor => {
        resultsDiv.innerHTML += `
          <div class="border-bottom py-2">
            <strong>${donor.name}</strong> - ${donor.bloodGroup} <br>
            📍 ${donor.location} | ☎️ ${donor.phone}
          </div>
        `;
      });
    }
  } catch (err) {
    console.error(err);
    document.getElementById('donorResults').innerHTML = '<p class="text-danger">Unable to fetch donor information.</p>';
  }
  
}); 