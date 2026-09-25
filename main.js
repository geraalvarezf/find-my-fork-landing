const WAITLIST_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const translations = {
  en: {
    title: "Find My Fork — Good food finds its people",
    description: "Find nearby food spots, keep your favorites close, and make the next meal a plan with your people.",
    formSetup: "The waitlist is not connected yet. Connect a free form endpoint to start accepting sign-ups.",
    formSending: "Saving your spot…",
    formSuccess: "You're on the list. We'll be in touch when it's time.",
    formError: "That didn't go through. Please try again in a moment.",
    languageLabel: "ES — switch to Spanish",
  },
  es: {
    title: "Find My Fork — La buena comida se comparte",
    description: "Encuentra lugares cerca, guarda tus favoritos y arma el próximo plan con tu gente.",
    formSetup: "La lista aún no está conectada. Conecta un formulario gratuito para empezar a recibir registros.",
    formSending: "Guardando tu lugar…",
    formSuccess: "Ya estás en la lista. Te avisaremos cuando sea el momento.",
    formError: "No se pudo enviar. Inténtalo de nuevo en un momento.",
    languageLabel: "EN — cambiar a inglés",
  },
};

const languageButton = document.querySelector("#language-toggle");
const form = document.querySelector("#waitlist-form");
const formMessage = document.querySelector("#form-message");
let language = "en";

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

  languageButton.textContent = language === "en" ? "ES" : "EN";
  languageButton.setAttribute("aria-label", translations[language].languageLabel);
  languageButton.setAttribute("aria-pressed", String(language === "es"));
  formMessage.textContent = translations[language].formSetup;
}

languageButton.addEventListener("click", () => {
  setLanguage(language === "en" ? "es" : "en");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.classList.remove("is-success", "is-error");

  if (WAITLIST_ENDPOINT.includes("YOUR_FORM_ID")) {
    formMessage.textContent = translations[language].formSetup;
    return;
  }

  formMessage.textContent = translations[language].formSending;
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email: new FormData(form).get("email") }),
    });
    if (!response.ok) throw new Error("Waitlist request failed");
    form.reset();
    formMessage.textContent = translations[language].formSuccess;
    formMessage.classList.add("is-success");
  } catch {
    formMessage.textContent = translations[language].formError;
    formMessage.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
  }
});

setLanguage("en");
