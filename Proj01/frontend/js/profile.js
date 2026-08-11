document.addEventListener('DOMContentLoaded', async () => {
  const profileContainer = document.getElementById('profile-content');
  const editModal = document.getElementById('edit-profile-modal');
  const editForm = document.getElementById('edit-profile-form');
  const openEditBtn = document.getElementById('open-edit-modal-btn');
  const closeEditBtn = document.getElementById('close-modal-btn');
  const logoutBtn = document.getElementById('logout-btn');

  async function loadProfile() {
    try {
      const response = await API.getProfile();
      const user = response.user;

      document.getElementById('user-name').textContent = user.name;
      document.getElementById('user-email').textContent = user.email;
      document.getElementById('user-role').textContent = user.role || 'user';
      document.getElementById('user-bio').textContent = user.bio || 'No bio provided yet.';
      document.getElementById('user-created').textContent = new Date(user.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      document.getElementById('edit-name').value = user.name;
      document.getElementById('edit-email').value = user.email;
      document.getElementById('edit-bio').value = user.bio || '';
    } catch (error) {
      UI.showToast('Session expired or unauthorized. Please log in.', 'error');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    }
  }

  await loadProfile();

  if (openEditBtn && editModal) {
    openEditBtn.addEventListener('click', () => {
      editModal.classList.add('active');
    });
  }

  if (closeEditBtn && editModal) {
    closeEditBtn.addEventListener('click', () => {
      editModal.classList.remove('active');
    });
  }

  if (editModal) {
    editModal.addEventListener('click', (e) => {
      if (e.target === editModal) {
        editModal.classList.remove('active');
      }
    });
  }

  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = editForm.querySelector('button[type="submit"]');

      const name = document.getElementById('edit-name').value.trim();
      const email = document.getElementById('edit-email').value.trim();
      const bio = document.getElementById('edit-bio').value.trim();
      const password = document.getElementById('edit-password').value;

      const payload = { name, email, bio };
      if (password) {
        payload.password = password;
      }

      try {
        UI.setLoading(submitBtn, true, 'Saving Changes...');
        const response = await API.updateProfile(payload);

        UI.showToast(response.message || 'Profile updated successfully!', 'success');
        editModal.classList.remove('active');
        await loadProfile();
      } catch (error) {
        UI.showToast(error.message || 'Failed to update profile.', 'error');
      } finally {
        UI.setLoading(submitBtn, false);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await API.logout();
        UI.showToast('Logged out successfully!', 'info');
      } catch (error) {
        console.error('Logout error:', error.message);
      } finally {
        API.setToken(null);
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }
    });
  }
});
