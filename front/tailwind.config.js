import defaultTheme from 'tailwindcss/defaultTheme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgIntro': "url('/1.introPg/intro.jpg')",
        'bgAuth': "url('/2.regPg/regPg.jpg')",
        'bgRegNick': "url('/3.regNicknamePg/bgPgRegNick1.jpg')",
        'bgMain': "url('/4.mainPg/mainPg.jpg')",
        'bgCards': "url('/4.2.cardsPg/cardsBg.jpg')",
        'bgQpgame': "url('/5.1.qpgamePg/qpgamebg.jpg')",
      },
      fontFamily: {
        sans: ["Norse Cyrillic", defaultTheme.fontFamily.sans],
				stalinist: ["Stalinist One"],
			},
      keyframes: {
        fromBlurToRC: {  
          "0%": { 'transform': 'translateX(0)', 'filter': 'blur(100px)', 'opacity': '0.1' },
          "100%": { 'transform': 'translateX(50%)', 'filter': 'blur(0)' },
        },
        fromBlur: {  
          "0%": { 'filter': 'blur(100px)', 'opacity': '0.1' },
          "100%": { 'filter': 'blur(0)', 'opacity': '1' },
        },
      },
      animation: {
        fromBlurToRC: "fromBlurToRC 2s ease-out forwards",
        fromBlur: "fromBlur 2s ease-out forwards"
      },
      content: {
        
      },
      height: {
        '1/9': '11.1%',
      },
      width: {
        '1/9': '11.1%',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
  ],
}

