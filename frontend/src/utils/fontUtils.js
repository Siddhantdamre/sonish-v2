export const FONT_OPTIONS = [
  { name: 'Inter (Default)', value: "'Inter', sans-serif" },
  { name: 'Playfair Display (Elegant)', value: "'Playfair Display', serif" },
  { name: 'Bodoni Moda (High-End)', value: "'Bodoni Moda', serif" },
  { name: 'Montserrat (Modern)', value: "'Montserrat', sans-serif" },
  { name: 'Cormorant Garamond (Sophisticated)', value: "'Cormorant Garamond', serif" },
  { name: 'Outfit (Minimalist)', value: "'Outfit', sans-serif" },
  { name: 'Prata (Editorial)', value: "'Prata', serif" },
  { name: 'Work Sans (Clean)', value: "'Work Sans', sans-serif" },
];

export const ensureFontLoaded = (fontValue) => {
  if (!fontValue) {
    return;
  }

  const fontName = fontValue.split(',')[0].replace(/'/g, '').trim();
  if (!fontName) {
    return;
  }

  const googleFontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`;

  const fontId = `dynamic-font-link-${fontName.toLowerCase().replace(/\s+/g, '-')}`;
  let link = document.getElementById(fontId);
  if (!link) {
    link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = googleFontUrl;
};
