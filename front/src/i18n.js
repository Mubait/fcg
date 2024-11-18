import en from './locales/en.json'
import ru from './locales/ru.json'

import { createI18n } from 'vue-i18n'



const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    en: en,
    ru: ru
  }
})

export default i18n 