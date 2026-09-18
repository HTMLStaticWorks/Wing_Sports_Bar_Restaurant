document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p class="text-secondary">Your cart is empty.</p><a href="menu.html" class="btn btn-primary" style="margin-top: 1rem;">Back to Menu</a>';
      return;
    }

    let html = '<div class="cart-grid" style="display: grid; gap: 1rem;">';
    let total = 0;

    cart.forEach((item, index) => {
      // Basic price extraction assuming format like "$14.99" or "$14.99 (8pc)"
      const priceMatch = item.price.match(/\$(\d+\.\d+)/);
      if (priceMatch) {
        total += parseFloat(priceMatch[1]);
      }

      html += `
        <div class="cart-item" style="display: flex; gap: 1rem; align-items: center; background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <img src="${item.img}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-sm);">
          <div style="flex: 1;">
            <h3 style="margin: 0; font-size: 1.2rem;">${item.name}</h3>
            <p style="margin: 0.5rem 0 0; font-size: 0.9rem; color: var(--text-secondary);">${item.desc}</p>
          </div>
          <div style="font-weight: bold; color: var(--accent-primary); font-size: 1.2rem; white-space: nowrap;">
            ${item.price}
          </div>
          <button class="btn btn-outline remove-btn" data-index="${index}" style="padding: 0.5rem 1rem;">Remove</button>
        </div>
      `;
    });

    html += `
      <div class="cart-summary" style="margin-top: 2rem; text-align: right; background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h2 style="margin-bottom: 1.5rem;">Total: $${total.toFixed(2)}</h2>
        <div class="cart-buttons">
          <button class="btn btn-outline" id="clear-cart-btn" style="margin-right: 1rem;">Clear Cart</button>
          <button class="btn btn-primary" onclick="alert('Proceeding to checkout...')">Checkout <span class="icon-right">→</span></button>
        </div>
      </div>
    `;
    html += '</div>';

    cartContainer.innerHTML = html;

    // Attach event listeners for remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    // Clear cart
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        renderCart();
      });
    }
  }

  renderCart();
});
