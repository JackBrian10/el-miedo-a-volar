export type Locale = "en" | "es" | "ca";

export const translations = {
  en: {
    nav: {
      portfolio: "Portfolio",
      about: "About",
      commissions: "Commissions",
      contact: "Contact",
    },
    hero: {
      label: "Illustration",
      cta: "View My Work",
      scroll: "Scroll",
    },
    portfolio: {
      heading: "Portfolio",
      showMore: "Show More",
      showLess: "Show Less",
    },
    about: {
      heading: "About Me",
      body: "I've always had fear of flying, irrational fear. That fear has been with me all the time even though I fly due to my love for traveling. I carried the same fear when I thought of sharing my ideas to the world. Fear should not have the power to stop us from doing what we love, one step at a time.",
      instagram: "✨ @elmiedoavolar on Instagram",
      skills: ["Character Design", "Digital Illustration", "Painterly Style", "OC Art"],
    },
    commissions: {
      heading: "Commissions",
      subheading: "Bring your characters to life",
      badge: "● Commissions Open",
      includes: "Includes:",
      note: "50% upfront payment via PayPal after sketch approval",
      cta: "Request a Commission",
      slots: "Slots are limited. DM on Instagram or use the contact form below.",
      viewSample: "View sample ↗",
      tiers: [
        {
          name: "Full Illustration",
          price: "125€",
          note: "Negotiable bundle option",
          features: [
            "Full color",
            "Full background",
            "1 character (+10€/ extra character)",
            "Timing: 30 days (depending on complexity)",
            "Revisions: 2 (1 on sketch, 1 in color)",
          ],
        },
        {
          name: "Spot Illustration",
          price: "70€",
          note: null,
          features: [
            "Full color",
            "No background",
            "Character/items (+10€/ extra character)",
            "Timing: 30 days (depending on complexity)",
            "Revisions: 2 (1 on sketch, 1 in color)",
          ],
        },
      ],
    },
    contact: {
      heading: "Contact Me",
      subheading: "Have a project in mind? Let's create something magical together.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
      send: "Send Message",
    },
  },

  es: {
    nav: {
      portfolio: "Portafolio",
      about: "Sobre mí",
      commissions: "Encargos",
      contact: "Contacto",
    },
    hero: {
      label: "Ilustración",
      cta: "Ver mi trabajo",
      scroll: "Desplazar",
    },
    portfolio: {
      heading: "Portafolio",
      showMore: "Ver más",
      showLess: "Ver menos",
    },
    about: {
      heading: "Sobre mí",
      body: "Siempre he tenido miedo a volar, un miedo irracional. Ese miedo me ha acompañado siempre aunque vuelo por mi amor por viajar. Sentí el mismo miedo cuando pensé en compartir mis ideas con el mundo. El miedo no debería tener el poder de impedírnos hacer lo que amamos, un paso a la vez.",
      instagram: "✨ @elmiedoavolar en Instagram",
      skills: ["Diseño de personajes", "Ilustración digital", "Estilo pictórico", "Arte original"],
    },
    commissions: {
      heading: "Encargos",
      subheading: "Da vida a tus personajes",
      badge: "● Encargos abiertos",
      includes: "Incluye:",
      note: "50% de pago por adelantado vía PayPal tras aprobar el boceto",
      cta: "Solicitar un encargo",
      slots: "Los turnos son limitados. Escríbeme por Instagram o usa el formulario.",
      viewSample: "Ver muestra ↗",
      tiers: [
        {
          name: "Ilustración completa",
          price: "125€",
          note: "Opción de pack negociable",
          features: [
            "Color completo",
            "Fondo completo",
            "1 personaje (+10€/ personaje extra)",
            "Tiempo: 30 días (según complejidad)",
            "Revisiones: 2 (1 en boceto, 1 en color)",
          ],
        },
        {
          name: "Ilustración recortada",
          price: "70€",
          note: null,
          features: [
            "Color completo",
            "Sin fondo",
            "Personaje/objetos (+10€/ personaje extra)",
            "Tiempo: 30 días (según complejidad)",
            "Revisiones: 2 (1 en boceto, 1 en color)",
          ],
        },
      ],
    },
    contact: {
      heading: "Contáctame",
      subheading: "¿Tienes un proyecto en mente? Creemos algo mágico juntos.",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      message: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      send: "Enviar mensaje",
    },
  },

  ca: {
    nav: {
      portfolio: "Portafoli",
      about: "Sobre mi",
      commissions: "Encàrrecs",
      contact: "Contacte",
    },
    hero: {
      label: "Il·lustració",
      cta: "Veure el meu treball",
      scroll: "Desplaça",
    },
    portfolio: {
      heading: "Portafoli",
      showMore: "Veure més",
      showLess: "Veure menys",
    },
    about: {
      heading: "Sobre mi",
      body: "Sempre he tingut por de volar, una por irracional. Aquesta por m'ha acompanyat sempre tot i que volo per amor als viatges. Vaig sentir la mateixa por quan vaig pensar a compartir les meves idees amb el món. La por no hauria de tenir el poder d'impedir-nos fer el que estimem, un pas alhora.",
      instagram: "✨ @elmiedoavolar a Instagram",
      skills: ["Disseny de personatges", "Il·lustració digital", "Estil pictòric", "Art original"],
    },
    commissions: {
      heading: "Encàrrecs",
      subheading: "Dona vida als teus personatges",
      badge: "● Encàrrecs oberts",
      includes: "Inclou:",
      note: "50% de pagament per avançat via PayPal després d'aprovar l'esbós",
      cta: "Sol·licitar un encàrrec",
      slots: "Els torns són limitats. Escriu-me per Instagram o utilitza el formulari.",
      viewSample: "Veure mostra ↗",
      tiers: [
        {
          name: "Il·lustració completa",
          price: "125€",
          note: "Opció de pack negociable",
          features: [
            "Color complet",
            "Fons complet",
            "1 personatge (+10€/ personatge extra)",
            "Temps: 30 dies (segons complexitat)",
            "Revisions: 2 (1 a l'esbós, 1 en color)",
          ],
        },
        {
          name: "Il·lustració retallada",
          price: "70€",
          note: null,
          features: [
            "Color complet",
            "Sense fons",
            "Personatge/objectes (+10€/ personatge extra)",
            "Temps: 30 dies (segons complexitat)",
            "Revisions: 2 (1 a l'esbós, 1 en color)",
          ],
        },
      ],
    },
    contact: {
      heading: "Contacta'm",
      subheading: "Tens un projecte en ment? Creem alguna cosa màgica junts.",
      name: "Nom",
      namePlaceholder: "El teu nom",
      email: "Correu electrònic",
      emailPlaceholder: "el-teu@correu.com",
      message: "Missatge",
      messagePlaceholder: "Explica'm el teu projecte...",
      send: "Enviar missatge",
    },
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Translations = any;
