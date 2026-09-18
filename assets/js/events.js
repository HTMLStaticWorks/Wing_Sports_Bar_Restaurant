/**
 * events.js - Logic for the interactive event calendar
 */

document.addEventListener('DOMContentLoaded', () => {
  const eventData = [
    { id: 1, type: 'football', title: 'Sunday Football Watch Party', date: 'Oct 15, 2026', time: '1:00 PM', desc: 'All screens on the biggest games. Half-price pitchers and $10 wing baskets all day.', img: 'assets/images/Sunday Football Watch Party.png' },
    { id: 2, type: 'basketball', title: 'Rivalry Night: Courtside', date: 'Oct 18, 2026', time: '7:30 PM', desc: 'The biggest basketball rivalry of the season. Guaranteed seating with advance reservation.', img: 'assets/images/Rivalry Night Courtside.png' },
    { id: 3, type: 'trivia', title: 'Sports Trivia Tuesday', date: 'Oct 20, 2026', time: '8:00 PM', desc: 'Test your sports knowledge. Top team wins a $100 gift card. $5 draft beers.', img: 'assets/images/Sports Trivia Tuesday.png' },
    { id: 4, type: 'championship', title: 'The Ultimate Final', date: 'Oct 24, 2026', time: '6:00 PM', desc: 'Championship night! Special game-day menu, giveaways, and the best atmosphere in town.', img: 'assets/images/The Ultimate Final.png' },
    { id: 5, type: 'challenge', title: 'Inferno Wing Challenge', date: 'Oct 27, 2026', time: '7:00 PM', desc: '12 Ghost Pepper wings. 10 minutes. Will you make the Wall of Flame?', img: 'assets/images/Inferno Wing Challenge.png' },
    { id: 6, type: 'fan', title: 'Local Fan Club Gathering', date: 'Oct 30, 2026', time: '5:00 PM', desc: 'Official watch party for our local heroes. Wear your jersey for 10% off your bill.', img: 'assets/images/Local Fan Club Gathering.png' },
    { id: 7, type: 'football', title: 'Monday Night Football', date: 'Nov 02, 2026', time: '8:15 PM', desc: 'Start your week right. Massive screens, massive flavor.', img: 'assets/images/Monday Night Football.png' },
    { id: 8, type: 'basketball', title: 'Friday Night Hoops', date: 'Nov 06, 2026', time: '8:00 PM', desc: 'Back-to-back games all night. Perfect for group outings.', img: 'assets/images/Friday Night Hoops.png' },
    { id: 9, type: 'fan', title: 'UFC Fight Night Main Event', date: 'Nov 14, 2026', time: '9:00 PM', desc: 'The biggest fights of the year shown on our 150" main screens. No cover charge before 8 PM.', img: 'assets/images/UFC Fight Night Main Event.png' }
  ];

  const filterBtns = document.querySelectorAll('.event-filter-btn');
  const eventList = document.getElementById('event-list');
  
  if(!eventList || filterBtns.length === 0) return;

  function renderEvents(type) {
    eventList.innerHTML = '';
    
    let filteredData = eventData;
    if(type !== 'all') {
      filteredData = eventData.filter(event => event.type === type);
    }
    
    if(filteredData.length === 0) {
      eventList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;"><p class="text-secondary">No upcoming events found for this category.</p></div>';
      return;
    }

    filteredData.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <div class="event-img">
          <img src="${event.img}" alt="${event.title}" loading="lazy">
          <div class="event-date-badge">
            <div style="font-size: 0.8rem; text-transform: uppercase;">${event.date.split(' ')[0]}</div>
            <div style="font-family: var(--font-heading); font-size: 1.5rem;">${event.date.split(' ')[1].replace(',', '')}</div>
          </div>
        </div>
        <div class="event-info">
          <div style="display: flex; gap: 10px; margin-bottom: 0.5rem; align-items: center;">
            <span class="event-type-pill">${event.type.toUpperCase()}</span>
            <span style="color: var(--accent-primary); font-size: 0.9rem; font-weight: bold;">🕒 ${event.time}</span>
          </div>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary);">${event.title}</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${event.desc}</p>
          <button class="btn btn-outline" style="width: 100%; padding: 0.75rem; margin-top: auto;" data-popup="booking-popup" onclick="openBookingPopup('${event.title}')">Reserve Spot</button>
        </div>
      `;
      // Stagger animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      eventList.appendChild(card);
      
      setTimeout(() => {
        card.style.transition = 'all 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    });
    
    // Re-bind popup triggers
    initPopupsLocal(eventList);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEvents(btn.getAttribute('data-type'));
    });
  });

  // Initial render
  renderEvents('all');
});

// Expose to window for the onclick handler
window.openBookingPopup = function(eventName) {
  const popup = document.getElementById('booking-popup');
  if(popup) {
    // Optionally pre-fill a field with the eventName
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

function initPopupsLocal(container) {
  const triggers = container.querySelectorAll('[data-popup]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      // handled by inline onclick in this specific case, but keeping logic
    });
  });
}
