const UI = {
  showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  setLoading(buttonEl, isLoading, text = 'Processing...') {
    if (!buttonEl) return;
    if (isLoading) {
      buttonEl.dataset.originalText = buttonEl.innerHTML;
      buttonEl.disabled = true;
      buttonEl.innerHTML = `<span class="spinner">⏳</span> ${text}`;
    } else {
      buttonEl.disabled = false;
      if (buttonEl.dataset.originalText) {
        buttonEl.innerHTML = buttonEl.dataset.originalText;
      }
    }
  }
};
