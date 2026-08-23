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

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (siteTranslations[lang] && siteTranslations[lang][key]) {
      el.textContent = siteTranslations[lang][key];
    }
  });
  localStorage.setItem('selectedLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLang') || 'English';
  const dropdownIds = ['globalLang', 'lang'];

  dropdownIds.forEach(id => {
    const selectEl = document.getElementById(id);
    if (selectEl) {
      selectEl.value = savedLang;
      selectEl.addEventListener('change', (e) => {
        const chosenLang = e.target.value;
        applyTranslations(chosenLang);
        dropdownIds.forEach(otherId => {
          const otherEl = document.getElementById(otherId);
          if (otherEl) otherEl.value = chosenLang;
        });
      });
    }
  });

  applyTranslations(savedLang);
});
