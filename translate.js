(function () {
  // 1. Original static dictionary for custom components
  const siteTranslations = {
    English: {
      navHome: "Home",
      navReport: "Citizen Portal",
      heroTitle: "Say it in your language. Get it heard.",
      heroSub: "JantaSetu lets people report local civic problems through voice or text in their own language.",
      btnReport: "Report a problem",
      btnTrack: "Track Complaint",
      reportBanner: "Report an issue"
    },
    Hindi: {
      navHome: "होम",
      navReport: "नागरिक पोर्टल",
      heroTitle: "अपनी भाषा में कहें। अपनी आवाज़ पहुँचाएँ।",
      heroSub: "जनतासेतु लोगों को अपनी भाषा में वॉयस या टेक्स्ट के माध्यम से स्थानीय नागरिक समस्याओं की रिपोर्ट करने देता है।",
      btnReport: "समस्या दर्ज करें",
      btnTrack: "शिकायत ट्रैक करें",
      reportBanner: "एक समस्या दर्ज करें"
    },
    Santali: {
      navHome: "ᱚᱲᱟᱜ",
      navReport: "ᱱᱟᱜᱽᱨᱤᱠ ᱯᱳᱨᱴᱟᱞ",
      heroTitle: "ᱟᱯᱟᱱᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱨᱤᱯᱳᱨᱴ ᱢᱮ। ᱟᱸᱡᱳᱢ ᱦᱚᱪᱚᱭ ᱢᱮ।",
      heroSub: "ᱡᱚᱱᱛᱟᱥᱮᱛᱩ ᱦᱚᱲ ᱟᱠᱚᱣᱟᱜ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱠᱷᱚᱵᱚᱨ ᱮᱢ ᱨᱮᱱᱟᱜ ᱫᱟᱣ ᱮ ᱮᱢᱟᱠᱚᱣᱟ।",
      btnReport: "ᱚᱵᱷᱤᱡᱳᱜᱽ ᱚᱞ ᱢᱮ",
      btnTrack: "ᱴᱨᱮᱠ ᱚᱵᱷᱤᱡᱳᱜᱽ",
      reportBanner: "ᱢᱤᱫ ᱚᱵᱷᱤᱡᱳᱜᱽ ᱚᱞ ᱢᱮ"
    },
    Bhojpuri: {
      navHome: "होम",
      navReport: "नागरिक पोर्टल",
      heroTitle: "अपनी भाषा में बोलीं। अपना आवाज पहुँचाईं।",
      heroSub: "जनतासेतु लोगन के आपन भाषा में आवाज भा लिख के स्थानीय समस्या के रिपोर्ट करे के सुविधा देवेला।",
      btnReport: "शिकायत दर्ज करीं",
      btnTrack: "शिकायत ट्रैक करीं",
      reportBanner: "शिकायत दर्ज करीं"
    }
  };

  // 2. Helper function to apply static manual translations
  window.applyTranslations = function (lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (siteTranslations[lang] && siteTranslations[lang][key]) {
        el.textContent = siteTranslations[lang][key];
      }
    });
    localStorage.setItem('selectedLang', lang);
  };

  // 3. Inject clean custom CSS for Google Translate widget
  const style = document.createElement("style");
  style.innerHTML = `
    body { top: 0px !important; position: static !important; }
    .goog-te-banner-frame.skiptranslate, iframe.skiptranslate, #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
    .goog-logo-link, .goog-te-gadget span, .goog-te-gadget-icon { display: none !important; }
    .goog-te-gadget { color: transparent !important; font-size: 0 !important; line-height: 0 !important; }
    .goog-te-combo {
      display: inline-block !important;
      font-family: inherit !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      color: #1a1a1a !important;
      background: #f7f7f5 !important;
      border: 1px solid #e2e2de !important;
      border-radius: 8px !important;
      padding: 6px 10px !important;
      cursor: pointer !important;
      outline: none !important;
      margin: 0 !important;
    }
    .goog-te-combo:hover { border-color: #2d6a4f !important; }
  `;
  document.head.appendChild(style);

  // 4. Dom ready initializations
  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'English';
    const dropdownIds = ['globalLang', 'lang'];

    // Sync manual dropdown listeners
    dropdownIds.forEach(id => {
      const selectEl = document.getElementById(id);
      if (selectEl) {
        selectEl.value = savedLang;
        selectEl.addEventListener('change', (e) => {
          const chosenLang = e.target.value;
          window.applyTranslations(chosenLang);
          dropdownIds.forEach(otherId => {
            const otherEl = document.getElementById(otherId);
            if (otherEl) otherEl.value = chosenLang;
          });
        });
      }
    });

    // Apply manual translations for data-i18n tags
    window.applyTranslations(savedLang);

    // Auto-inject Google Translate widget into nav bar
    const nav = document.querySelector("header.top nav") || document.querySelector("nav");
    if (nav && !document.getElementById("google_translate_element")) {
      const translateDiv = document.createElement("div");
      translateDiv.id = "google_translate_element";
      translateDiv.style.display = "inline-block";
      translateDiv.style.marginLeft = "10px";
      nav.appendChild(translateDiv);

      window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,sat,bho,en",
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false
          },
          "google_translate_element"
        );
      };

      const gtScript = document.createElement("script");
      gtScript.type = "text/javascript";
      gtScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(gtScript);
    }
  });
})();
