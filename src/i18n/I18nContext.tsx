import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations } from './translations'

export type Lang = 'es' | 'en'

type I18nValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: (typeof translations)[Lang]
}

const I18nContext = createContext<I18nValue | null>(null)

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  const saved = window.localStorage.getItem('lang')
  if (saved === 'es' || saved === 'en') return saved
  const browser = (navigator.language || 'es').toLowerCase()
  return browser.startsWith('en') ? 'en' : 'es'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', lang)
      document.documentElement.lang = lang
    }
  }, [lang])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((l) => (l === 'es' ? 'en' : 'es')),
      t: translations[lang],
    }),
    [lang]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
