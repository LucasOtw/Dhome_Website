// D'HOME Securite 56 - EmailJS Integration
//
// CONFIGURATION REQUISE :
// 1. Creer un compte sur https://www.emailjs.com/
// 2. Ajouter un service email (connecter l'adresse de Dominique)
// 3. Creer un template avec les variables : {{from_name}}, {{from_email}}, {{phone}}, {{request_type}}, {{message}}
// 4. Remplacer les valeurs ci-dessous par les vraies cles

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // A remplacer
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // A remplacer
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // A remplacer

document.addEventListener('DOMContentLoaded', () => {
  // Init EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const toast = document.getElementById('toast');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validation basique
    const name = form.querySelector('#from_name').value.trim();
    const email = form.querySelector('#from_email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const requestType = form.querySelector('#request_type').value;
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !phone || !requestType || !message) {
      showToast('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Veuillez entrer une adresse email valide.', 'error');
      return;
    }

    // Disable button
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Envoi en cours...
    `;

    try {
      if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      } else {
        // Mode demo : simuler un envoi
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Mode demo - EmailJS non configure. Donnees du formulaire :', {
          name, email, phone, requestType, message
        });
      }

      showToast('Message envoye avec succes ! Je vous repondrai rapidement.', 'success');
      form.reset();
    } catch (error) {
      console.error('Erreur EmailJS :', error);
      showToast('Une erreur est survenue. Veuillez reessayer ou appeler directement.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  function showToast(message, type) {
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast px-6 py-3 rounded-xl shadow-lg font-medium';

    if (type === 'success') {
      toast.classList.add('bg-green-600', 'text-white');
    } else {
      toast.classList.add('bg-red-600', 'text-white');
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
});
