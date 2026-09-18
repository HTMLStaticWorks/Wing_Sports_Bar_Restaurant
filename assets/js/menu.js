/**
 * menu.js - Logic for the interactive menu explorer
 */

document.addEventListener('DOMContentLoaded', () => {
  window.addToCart = function(itemStr) {
    const item = JSON.parse(decodeURIComponent(itemStr));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
  };

  const menuData = [
    { id: 1, category: 'wings', name: 'Classic Bone-In Wings', desc: 'Jumbo wings, double fried for maximum crunch. Tossed in your choice of sauce.', price: '$14.99 (8pc)', img: 'assets/images/Classic Bone-In Wings.png' },
    { id: 2, category: 'wings', name: 'The Game-Day Box', desc: '24 wings, 3 sauces, large fries, and dips. Perfect for the table.', price: '$39.99', img: 'assets/images/The Game-Day Box.png' },
    { id: 3, category: 'boneless', name: 'Firecracker Boneless', desc: 'Premium breast meat bites, tossed in sweet chili heat.', price: '$13.99 (10pc)', img: 'assets/images/Firecracker Boneless.png' },
    { id: 4, category: 'boneless', name: 'Naked Tenders', desc: 'Grilled chicken tenders with sauce on the side.', price: '$12.99', img: 'assets/images/Naked Tenders.png' },
    { id: 5, category: 'starters', name: 'Stadium Nachos', desc: 'Tortilla chips, queso, jalapeños, pico de gallo, and sour cream.', price: '$11.99', img: 'assets/images/Stadium Nachos.png' },
    { id: 6, category: 'starters', name: 'Onion Ring Tower', desc: 'Thick-cut onion rings with spicy ranch dip.', price: '$8.99', img: 'assets/images/Onion Ring Tower.png' },
    { id: 7, category: 'burgers', name: 'The Linebacker Burger', desc: 'Double smash patty, american cheese, bacon, and house sauce.', price: '$15.99', img: 'assets/images/The Linebacker Burger.png' },
    { id: 13, category: 'burgers', name: 'Classic Cheeseburger', desc: 'Smashed patty with American cheese, lettuce, tomato, pickles.', price: '$12.99', img: 'assets/images/Classic Cheeseburger.png' },
    { id: 8, category: 'loaded_fries', name: 'Truffle Parm Fries', desc: 'Crispy fries tossed in truffle oil and parmesan cheese.', price: '$9.99', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600' },
    { id: 14, category: 'loaded_fries', name: 'Bacon Queso Fries', desc: 'Crispy fries smothered in house queso and crispy bacon bits.', price: '$10.99', img: 'assets/images/Bacon Queso Fries.png' },
    { id: 9, category: 'sandwiches', name: 'Buffalo Chicken Sandwich', desc: 'Crispy chicken breast tossed in buffalo sauce, lettuce, and tomato.', price: '$14.99', img: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&q=80&w=600' },
    { id: 15, category: 'sandwiches', name: 'Grilled Chicken Club', desc: 'Grilled chicken, bacon, lettuce, tomato, mayo on toasted sourdough.', price: '$13.99', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600' },
    { id: 10, category: 'salads', name: 'Grilled Chicken Caesar', desc: 'Romaine, grilled chicken, parmesan, croutons, caesar dressing.', price: '$12.99', img: 'assets/images/Grilled Chicken Caesar.png' },
    { id: 16, category: 'salads', name: 'Buffalo Chicken Salad', desc: 'Crispy buffalo chicken over mixed greens with bleu cheese dressing.', price: '$13.99', img: 'assets/images/Buffalo Chicken Salad.png' },
    { id: 11, category: 'desserts', name: 'Churros with Chocolate', desc: 'Warm churros dusted with cinnamon sugar, served with chocolate dip.', price: '$7.99', img: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&q=80&w=600' },
    { id: 17, category: 'desserts', name: 'Brownie Sundae', desc: 'Warm fudge brownie topped with vanilla bean ice cream.', price: '$8.99', img: 'assets/images/Brownie Sundae.png' },
    { id: 12, category: 'drinks', name: 'Draft Beer Pitcher', desc: 'Choice of domestic or craft beer on tap.', price: '$18.00', img: 'assets/images/Draft Beer Pitcher.png' },
    { id: 18, category: 'drinks', name: 'Signature Margarita', desc: 'Premium tequila, fresh lime, agave, and a salt rim.', price: '$10.00', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600' }
  ];

  const categoryBtns = document.querySelectorAll('.menu-cat-btn');
  const menuGrid = document.getElementById('menu-grid');
  
  if(!menuGrid || categoryBtns.length === 0) return;

  function renderMenu(category) {
    menuGrid.innerHTML = '';
    
    // Filter data
    let filteredData = menuData;
    if(category !== 'all') {
      filteredData = menuData.filter(item => item.category === category);
    }
    
    if(filteredData.length === 0) {
      menuGrid.innerHTML = '<p class="text-secondary">No items found for this category.</p>';
      return;
    }

    filteredData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-item-card';
      card.innerHTML = `
        <div class="menu-item-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <div class="menu-item-info">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <h3 style="font-size: 1.25rem; margin: 0; color: var(--text-primary);">${item.name}</h3>
            <span style="font-weight: bold; color: var(--accent-primary);">${item.price}</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0 0 1rem 0;">${item.desc}</p>
          <button class="btn btn-outline" style="width: 100%; margin-top: auto; padding: 0.5rem; font-size: 0.9rem;" onclick="addToCart('${encodeURIComponent(JSON.stringify(item))}')">ADD TO CART</button>
        </div>
      `;
      // Stagger animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      menuGrid.appendChild(card);
      
      // Trigger animation slightly later
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    });
  }

  // Event listeners for category buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Render specific category
      renderMenu(btn.getAttribute('data-cat'));
    });
  });

  // Initial render (All)
  renderMenu('all');
});
