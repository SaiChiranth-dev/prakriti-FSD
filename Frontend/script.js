
const factoryForm = document.getElementById('factoryForm');
const detailsBox = document.getElementById('factoryDetails');
const charCount = document.getElementById('charCount');
const fileInput = document.getElementById('blueprintFile');
const fileStatus = document.getElementById('fileStatus');
const formMessage = document.getElementById('formMessage');

// Character counter
detailsBox.addEventListener('input', () => {
  charCount.textContent = `${detailsBox.value.length} character${detailsBox.value.length === 1 ? '' : 's'}`;
});

// File selection
fileInput.addEventListener('change', () => {
  if (!fileInput.files.length) {
    fileStatus.textContent = 'No file attached';
    return;
  }

  const file = fileInput.files[0];

  const size = file.size < 1024 * 1024
    ? `${Math.max(1, Math.round(file.size / 1024))} KB`
    : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

  fileStatus.textContent = `${file.name} (${size})`;
});

// Reset form
factoryForm.addEventListener('reset', () => {
  window.setTimeout(() => {
    charCount.textContent = '0 characters';
    fileStatus.textContent = 'No file attached';
    formMessage.className = 'form-message';
    formMessage.textContent = '';
  }, 0);
});

// Submit form
factoryForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const details = detailsBox.value.trim();

  if (!details) {
    formMessage.className = 'form-message visible error';
    formMessage.textContent =
      'Please describe your factory, machinery or production process before submitting.';

    detailsBox.focus();
    return;
  }

  const company =
    document.getElementById('companyName').value.trim() || 'Your factory';

  formMessage.className = 'form-message visible success';

  formMessage.textContent =
    `${company}: your details are ready in this demo. No data or files have been uploaded. Connect a secure backend and validated emissions calculator to generate a real assessment.`;

  document.getElementById('assessment').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// Sustainable alternatives buttons
document.querySelectorAll('.small-action').forEach((button) => {
  button.addEventListener('click', () => {
    const topic = button.dataset.topic;
    const message = document.getElementById('alternativeMessage');

    message.textContent =
      `${topic}: this is a starting point for research. The best option depends on your factory's process, energy needs, location and costs.`;
  });
});

// Navigation buttons
document.querySelectorAll('.scheme-nav-item').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.scheme-nav-item').forEach((item) => {
      item.classList.remove('active');
    });

    link.classList.add('active');
  });
});
