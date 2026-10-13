/**
 * locations.js - Logic for the interactive location finder
 */

document.addEventListener('DOMContentLoaded', () => {
  const locationsData = [
    {
      id: 'downtown',
      name: 'Downtown Arena',
      address: 'Location details coming soon',
      hours: '11:00 AM - 2:00 AM',
      screens: '45+',
      seating: '350',
      parking: true,
      features: ['Stadium Seating', 'VIP Booths', 'Private Audio'],
      img: 'assets/images/Downtown Arena.png'
    },
    {
      id: 'riverside',
      name: 'Riverside Lounge',
      address: 'Location details coming soon',
      hours: '11:00 AM - 1:00 AM',
      screens: '30+',
      seating: '200',
      parking: false,
      features: ['Outdoor Patio', 'Fire Pits', 'Riverside Views'],
      img: 'assets/images/Riverside Lounge.png'
    },
    {
      id: 'midtown',
      name: 'Midtown Headquarters',
      address: 'Location details coming soon',
      hours: '11:00 AM - 2:00 AM',
      screens: '60+',
      seating: '500',
      parking: true,
      features: ['Flagship Location', 'Esports Arena', 'Arcade'],
      img: 'assets/images/Midtown Headquarters.png'
    },
    {
      id: 'northside',
      name: 'Northside Taproom',
      address: 'Location details coming soon',
      hours: '12:00 PM - 12:00 AM',
      screens: '20+',
      seating: '150',
      parking: true,
      features: ['Craft Beer Focus', 'Family Friendly', 'Dog Friendly Patio'],
      img: 'assets/images/Northside Taproom.png'
    },
    {
      id: 'westside',
      name: 'Westside Sports Hub',
      address: 'Location details coming soon',
      hours: '11:00 AM - 1:00 AM',
      screens: '35+',
      seating: '250',
      parking: true,
      features: ['Billiards', 'Darts', 'Local Drafts'],
      img: 'assets/images/Westside Sports Hub.png'
    },
    {
      id: 'eastside',
      name: 'Eastside Fieldhouse',
      address: 'Location details coming soon',
      hours: '12:00 PM - 2:00 AM',
      screens: '50+',
      seating: '400',
      parking: false,
      features: ['Live DJs', 'VIP Lounge', 'Rooftop Bar'],
      img: 'assets/images/Eastside Fieldhouse.png'
    },
    {
      id: 'southside',
      name: 'Southside Club',
      address: 'Location details coming soon',
      hours: '11:00 AM - 12:00 AM',
      screens: '25+',
      seating: '180',
      parking: true,
      features: ['Neighborhood Vibe', 'Trivia Nights', 'Covered Patio'],
      img: 'assets/images/Southside Club.png'
    },
    {
      id: 'harbor',
      name: 'Harbor Point View',
      address: 'Location details coming soon',
      hours: '10:00 AM - 1:00 AM',
      screens: '40+',
      seating: '300',
      parking: true,
      features: ['Waterfront', 'Boat Docking', 'Seafood Specials'],
      img: 'assets/images/Harbor Point View.png'
    },
    {
      id: 'valley',
      name: 'Valley View Tavern',
      address: 'Location details coming soon',
      hours: '12:00 PM - 1:00 AM',
      screens: '30+',
      seating: '220',
      parking: true,
      features: ['Scenic Views', 'Bourbon Bar', 'Live Acoustics'],
      img: 'assets/images/Valley View Tavern.png'
    }
  ];

  const searchInput = document.getElementById('location-search');
  const resultsContainer = document.getElementById('location-results');
  
  if(!resultsContainer) return;

  function renderLocations(data) {
    resultsContainer.innerHTML = '';
    
    if(data.length === 0) {
      resultsContainer.innerHTML = '<p class="text-secondary" style="grid-column: 1/-1;">No locations found matching your search.</p>';
      return;
    }

    data.forEach(loc => {
      const card = document.createElement('div');
      card.className = 'location-card';
      
      let featuresHtml = '';
      loc.features.forEach(f => {
        featuresHtml += `<span class="loc-feature-pill">${f}</span>`;
      });
      
      card.innerHTML = `
        <div class="loc-img">
          <img src="${loc.img}" alt="${loc.name}">
        </div>
        <div class="loc-info">
          <h3>${loc.name}</h3>
          <p class="text-secondary" style="margin-bottom: 0.5rem; font-size: 0.9rem;">📍 ${loc.address}</p>
          <p style="color: var(--accent-primary); font-size: 0.9rem; font-weight: 400; margin-bottom: 1.5rem;">🕒 ${loc.hours}</p>
          
          <div class="loc-stats">
            <div class="loc-stat-item">
              <span style="font-size: 1.5rem;">📺</span>
              <span style="font-weight: bold; margin-top: 5px;">${loc.screens}</span>
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Screens</span>
            </div>
            <div class="loc-stat-item">
              <span style="font-size: 1.5rem;">🪑</span>
              <span style="font-weight: bold; margin-top: 5px;">${loc.seating}</span>
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Seats</span>
            </div>
            <div class="loc-stat-item">
              <span style="font-size: 1.5rem;">🅿️</span>
              <span style="font-weight: bold; margin-top: 5px;">${loc.parking ? 'Yes' : 'No'}</span>
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Parking</span>
            </div>
          </div>
          
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            ${featuresHtml}
          </div>
          
          <div style="display: flex; gap: 1rem; margin-top: auto;">
            <button class="btn btn-primary" style="flex: 1; padding: 0.75rem; font-size: 1rem;" data-popup="reservation-popup" onclick="window.openRes('${loc.name}')">Reserve</button>
            <button class="btn btn-outline" style="flex: 1; padding: 0.75rem; font-size: 1rem;" onclick="alert('Directions coming soon!')">Directions</button>
          </div>
        </div>
      `;
      
      resultsContainer.appendChild(card);
    });
  }

  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = locationsData.filter(loc => 
        loc.name.toLowerCase().includes(term) || loc.id.toLowerCase().includes(term)
      );
      renderLocations(filtered);
    });
  }

  // Initial render
  renderLocations(locationsData);
});

window.openRes = function(locName) {
  const popup = document.getElementById('reservation-popup');
  if(popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Optional: Pre-select location in form
  }
};
