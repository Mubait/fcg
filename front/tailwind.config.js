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
        'bgRegNick': "url('/3.regNicknamePg/regPgNickname.jpg')",
      },
      fontFamily: {
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
        
      }
    },
  },
  plugins: [],
}

