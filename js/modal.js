import { apiClient } from "./apiClient.js";

const detailModal = document.getElementById('detail-modal');
const orderModal = document.getElementById('order-modal');

if (detailModal && orderModal) {
  const detailCloseBtn = detailModal.querySelector('[data-modal-close]');
  const modalTitle = detailModal.querySelector('.modal-title');
  const modalPrice = detailModal.querySelector('.modal-price');
  const modalDescription = detailModal.querySelector('.modal-description');
  const modalImg = detailModal.querySelector('.modal-product-img');
  const modalBuyBtn = detailModal.querySelector('.modal-buy-btn');
  const quantityInput = detailModal.querySelector('.modal-quantity-input');

  const orderCloseBtn = orderModal.querySelector('[data-modal-close]');
  const orderForm = orderModal.querySelector('.order-form');

  let currentBouquetData = null;

  function updateScrollLock() {
    const isAnyModalOpen = detailModal.classList.contains('is-open') || orderModal.classList.contains('is-open');
    if (isAnyModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  function openDetailModal(productData) {
    currentBouquetData = productData;
    if (modalTitle) modalTitle.textContent = productData.title;
    if (modalPrice) modalPrice.textContent = productData.price;
    if (modalDescription) modalDescription.textContent = productData.description;
    
    if (modalImg) {
      modalImg.src = productData.imgSrc;
      modalImg.alt = productData.imgAlt;
    }
    
    if (quantityInput) {
      quantityInput.value = 1;
    }

    detailModal.classList.add('is-open');
    updateScrollLock();
  }

  function closeAllModals() {
    detailModal.classList.remove('is-open');
    orderModal.classList.remove('is-open');
    updateScrollLock();
  }

  function handleCardClick(card) {
    const imgEl = card.querySelector('img');
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    const imgAlt = imgEl ? imgEl.getAttribute('alt') : 'Product Image';

    const title = card.querySelector('.bestsellers-item-title, .catalogue-item-title')?.textContent.trim() || 'Beautiful Bouquet';
    const price = card.querySelector('.bestsellers-item-price, .catalogue-item-price')?.textContent.trim() || '$0.00';
    const description = card.querySelector('.bestsellers-item-text, .catalogue-item-text')?.textContent.trim() || 
                        'A wonderful arrangement of fresh seasonal flowers created with love and care.';

    openDetailModal({ title, price, description, imgSrc, imgAlt });
  }

  const bestsellersList = document.querySelector('.bestsellers-list');
  if (bestsellersList) {
    bestsellersList.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      const card = e.target.closest('.bestsellers-item');
      if (card) {
        handleCardClick(card);
      }
    });
  }

  const catalogueList = document.querySelector('.catalogue-list.bouquets');
  if (catalogueList) {
    catalogueList.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      const card = e.target.closest('li');
      if (card) {
        handleCardClick(card);
      }
    });
  }

  if (modalBuyBtn) {
    modalBuyBtn.addEventListener('click', () => {
      detailModal.classList.remove('is-open');
      orderModal.classList.add('is-open');
      updateScrollLock();
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameInput = orderForm.querySelector('.order-form-inputName');
      const phoneInput = orderForm.querySelector('.order-form-inputPhone');
      const addressInput = orderForm.querySelector('.order-form-inputAddress');
      const messageInput = orderForm.querySelector('.order-form-textarea');
      
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const address = addressInput ? addressInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      
      const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;
      const priceStr = currentBouquetData?.price?.replace('$', '') || '0';
      const totalPrice = parseFloat(priceStr) * quantity;
      
      const orderData = {
        name,
        phone,
        address: address || null,
        message: message || null,
        bouquetTitle: currentBouquetData?.title || null,
        quantity,
        totalPrice: totalPrice || null,
      };
      
      const submitBtn = orderForm.querySelector('.order-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      
      try {
        await apiClient.post('/orders', orderData);
        
        alert(`Thank you for your order, ${name}! Our manager will contact you shortly to confirm.`);
        
        orderForm.reset();
        closeAllModals();
      } catch (error) {
        console.error('Order submission failed:', error);
        alert('Sorry, something went wrong. Please try again later.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Go to Checkout';
        }
      }
    });
  }

  if (detailCloseBtn) {
    detailCloseBtn.addEventListener('click', () => {
      detailModal.classList.remove('is-open');
      updateScrollLock();
    });
  }
  if (orderCloseBtn) {
    orderCloseBtn.addEventListener('click', () => {
      orderModal.classList.remove('is-open');
      updateScrollLock();
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      detailModal.classList.remove('is-open');
      updateScrollLock();
    }
    if (e.target === orderModal) {
      orderModal.classList.remove('is-open');
      updateScrollLock();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}
