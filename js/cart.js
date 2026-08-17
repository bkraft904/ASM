(() => {
  'use strict';

  const CART_KEY = 'asm_cart_v1';
  const TEAM_EMAIL = 'team@aerosaintmotorsport.com';

  const getProducts = () => window.ASM_PRODUCTS || {};
  const rootPrefix = () => window.ASM_ROOT_PREFIX || '';
  const productImage = (p) => (p && p.image ? rootPrefix() + p.image : '');

  function getCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }

  function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  function addToCart(id, size, qty) {
    const products = getProducts();
    if (!products[id]) return;
    qty = Math.max(1, Math.floor(Number(qty)) || 1);
    size = size || null;
    const cart = getCart();
    const existing = cart.find((item) => item.id === id && item.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, size, qty });
    }
    setCart(cart);
    openCart();
  }

  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart);
  }

  function updateQty(index, qty) {
    const cart = getCart();
    if (!cart[index]) return;
    qty = Math.max(1, Math.floor(Number(qty)) || 1);
    cart[index].qty = qty;
    setCart(cart);
  }

  function cartCount(cart) {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function cartTotal(cart) {
    const products = getProducts();
    return cart.reduce((sum, item) => {
      const p = products[item.id];
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }

  function buildDrawer() {
    if (document.getElementById('cartDrawer')) return;
    const drawer = document.createElement('div');
    drawer.id = 'cartDrawer';
    drawer.className = 'cart-drawer';
    drawer.innerHTML = `
      <div class="cart-drawer-scrim" id="cartScrim"></div>
      <div class="cart-drawer-panel" role="dialog" aria-label="Shopping cart">
        <div class="cart-drawer-head">
          <h3>Your Cart</h3>
          <button id="cartClose" class="cart-close" aria-label="Close cart">&times;</button>
        </div>
        <div id="cartItems" class="cart-items"></div>
        <div class="cart-drawer-foot">
          <div class="cart-total-row"><span>Subtotal</span><span id="cartTotal">$0.00</span></div>
          <p class="cart-note">This sends an order inquiry by email — it isn't a completed purchase. We'll follow up to arrange payment and shipping.</p>
          <a href="#" id="cartCheckout" class="btn btn-primary cart-checkout-btn">Send Order Inquiry</a>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
    document.getElementById('cartScrim').addEventListener('click', closeCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
  }

  function renderCart() {
    const cart = getCart();
    const products = getProducts();
    const count = cartCount(cart);

    document.querySelectorAll('.cart-count').forEach((el) => {
      el.textContent = String(count);
      el.hidden = count === 0;
    });

    const itemsEl = document.getElementById('cartItems');
    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    } else {
      itemsEl.innerHTML = cart
        .map((item, i) => {
          const p = products[item.id] || {};
          const lineTotal = (p.price || 0) * item.qty;
          return `
            <div class="cart-item">
              <img src="${productImage(p)}" alt="${p.name || item.id}">
              <div class="cart-item-body">
                <h4>${p.name || item.id}</h4>
                ${item.size ? `<p class="cart-item-size">Size: ${item.size}</p>` : ''}
                <div class="cart-item-row">
                  <input type="number" min="1" value="${item.qty}" class="cart-qty" data-index="${i}" aria-label="Quantity">
                  <span class="cart-item-price">$${lineTotal.toFixed(2)}</span>
                  <button class="cart-remove" data-index="${i}" aria-label="Remove item">&times;</button>
                </div>
              </div>
            </div>`;
        })
        .join('');
    }

    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = '$' + cartTotal(cart).toFixed(2);

    const checkoutBtn = document.getElementById('cartCheckout');
    if (checkoutBtn) {
      if (cart.length === 0) {
        checkoutBtn.setAttribute('aria-disabled', 'true');
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.pointerEvents = 'none';
      } else {
        checkoutBtn.removeAttribute('aria-disabled');
        checkoutBtn.style.opacity = '';
        checkoutBtn.style.pointerEvents = '';
      }
      const lines = cart
        .map((item) => {
          const p = products[item.id] || {};
          const sizePart = item.size ? ` (Size: ${item.size})` : '';
          return `- ${p.name || item.id}${sizePart} x${item.qty} - $${((p.price || 0) * item.qty).toFixed(2)}`;
        })
        .join('\n');
      const body =
        `Hi ASM team,\n\nI'd like to order:\n\n${lines}\n\nSubtotal: $${cartTotal(cart).toFixed(2)}\n\n` +
        `Please follow up on payment and shipping.\n\nName:\nShipping address:\n`;
      checkoutBtn.href = `mailto:${TEAM_EMAIL}?subject=${encodeURIComponent('Merch Order Inquiry')}&body=${encodeURIComponent(body)}`;
    }
  }

  function openCart() {
    buildDrawer();
    renderCart();
    document.getElementById('cartDrawer').classList.add('open');
    document.body.classList.add('cart-open');
  }

  function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.classList.remove('open');
    document.body.classList.remove('cart-open');
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.cart-toggle')) {
      e.preventDefault();
      openCart();
    }
    const removeBtn = e.target.closest('.cart-remove');
    if (removeBtn) {
      removeFromCart(Number(removeBtn.dataset.index));
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('cart-qty')) {
      updateQty(Number(e.target.dataset.index), e.target.value);
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('product-add-form')) {
      e.preventDefault();
      const form = e.target;
      const id = form.dataset.productId;
      const sizeEl = form.querySelector('[name="size"]');
      const qtyEl = form.querySelector('[name="qty"]');
      addToCart(id, sizeEl ? sizeEl.value : null, qtyEl ? qtyEl.value : 1);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    buildDrawer();
    renderCart();
  });
  if (document.readyState !== 'loading') {
    buildDrawer();
    renderCart();
  }

  window.ASMCart = { addToCart, openCart, closeCart };
})();
