// Formspree's Free plan currently includes 50 submissions per month.
const WAITLIST_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const translations = {
  en: {
    title: "Find My Fork — Decide where to eat, together",
    description: "Plan dinner with your people: share your picks, find a spot everyone likes, and keep nearby coupons as a bonus.",
    formSetup: "The waitlist is not connected yet. Add your free Formspree form ID to start accepting sign-ups.",
    formSending: "Saving your spot…",
    formSuccess: "You're on the list. We'll let you know when it's time to plan together.",
    formError: "That didn't go through. Please try again in a moment.",
    formErrorLimit: "The waitlist is temporarily full. Please try again later.",
    languageLabel: "ES — switch to Spanish",
  },
  es: {
    title: "Find My Fork — Decidan juntos dónde comer",
    description: "Planeen la próxima comida juntos: compartan opciones, elijan un lugar para todos y aprovechen cupones cercanos.",
    formSetup: "La lista aún no está conectada. Agrega el ID de tu formulario gratuito de Formspree para recibir registros.",
    formSending: "Guardando tu lugar…",
    formSuccess: "Ya estás en la lista. Te avisaremos cuando llegue el momento de planear juntos.",
    formError: "No se pudo enviar. Inténtalo de nuevo en un momento.",
    formErrorLimit: "La lista está llena por ahora. Inténtalo de nuevo más tarde.",
    languageLabel: "EN — cambiar a inglés",
  },
};

const languageButton = document.querySelector("#language-toggle");
const form = document.querySelector("#waitlist-form");
const formMessage = document.querySelector("#form-message");
let language = "en";
let messageState = "formSetup";

function showFormMessage(state) {
  messageState = state;
  formMessage.textContent = translations[language][state];
  formMessage.classList.toggle("is-success", state === "formSuccess");
  formMessage.classList.toggle("is-error", state === "formError" || state === "formErrorLimit");
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.title = translations[language].title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", translations[language].description);

  document.querySelectorAll("[data-en][data-es]").forEach((element) => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll("[data-alt-en][data-alt-es]").forEach((image) => {
    image.alt = image.dataset[`alt${language === "en" ? "En" : "Es"}`];
  });
  document.querySelectorAll("[data-placeholder-en][data-placeholder-es]").forEach((input) => {
    input.placeholder = input.dataset[`placeholder${language === "en" ? "En" : "Es"}`];
  });

  languageButton.textContent = language === "en" ? "ES" : "EN";
  languageButton.setAttribute("aria-label", translations[language].languageLabel);
  languageButton.setAttribute("aria-pressed", String(language === "es"));
  showFormMessage(messageState);
}

languageButton.addEventListener("click", () => {
  setLanguage(language === "en" ? "es" : "en");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (WAITLIST_ENDPOINT.includes("YOUR_FORM_ID")) {
    showFormMessage("formSetup");
    return;
  }

  showFormMessage("formSending");
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (response.status === 429) {
      showFormMessage("formErrorLimit");
      return;
    }
    if (!response.ok) throw new Error("Waitlist request failed");
    form.reset();
    showFormMessage("formSuccess");
  } catch {
    showFormMessage("formError");
  } finally {
    submitButton.disabled = false;
  }
});

setLanguage("en");
