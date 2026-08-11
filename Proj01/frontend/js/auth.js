document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.toggle-password');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = document.getElementById('password');
      if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.textContent = '🔒 Hide';
      } else {
        input.type = 'password';
        toggleBtn.textContent = '👁️ Show';
      }
    });
  }

  const signupPassInput = document.getElementById('signup-password');
  const meterFill = document.querySelector('.password-meter-fill');
  if (signupPassInput && meterFill) {
    signupPassInput.addEventListener('input', (e) => {
      const val = e.target.value;
      let score = 0;
      if (val.length >= 6) score += 25;
      if (val.length >= 10) score += 25;
      if (/[A-Z]/.test(val)) score += 25;
      if (/[0-9!@#$%^&*]/.test(val)) score += 25;

      meterFill.style.width = `${score}%`;
      if (score <= 25) meterFill.style.backgroundColor = 'var(--danger)';
      else if (score <= 75) meterFill.style.backgroundColor = 'var(--warning)';
      else meterFill.style.backgroundColor = 'var(--success)';
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = signupForm.querySelector('button[type="submit"]');

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (!name || !email || !password) {
        UI.showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        UI.showToast('Passwords do not match.', 'error');
        return;
      }

      if (password.length < 6) {
        UI.showToast('Password must be at least 6 characters long.', 'error');
        return;
      }

      try {
        UI.setLoading(submitBtn, true, 'Creating Account...');
        const response = await API.signup({ name, email, password });
        
        if (response.token) {
          API.setToken(response.token);
        }

        UI.showToast('Registration successful! Redirecting to profile...', 'success');
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1200);
      } catch (error) {
        UI.showToast(error.message || 'Registration failed. Try again.', 'error');
      } finally {
        UI.setLoading(submitBtn, false);
      }
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = loginForm.querySelector('button[type="submit"]');

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!email || !password) {
        UI.showToast('Please enter both email and password.', 'error');
        return;
      }

      try {
        UI.setLoading(submitBtn, true, 'Signing In...');
        const response = await API.login({ email, password });
        
        if (response.token) {
          API.setToken(response.token);
        }

        UI.showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1200);
      } catch (error) {
        UI.showToast(error.message || 'Invalid login credentials.', 'error');
      } finally {
        UI.setLoading(submitBtn, false);
      }
    });
  }
});
