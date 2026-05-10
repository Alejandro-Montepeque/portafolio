import { useI18n } from '../i18n/I18nContext'

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useI18n()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className={`relative inline-flex items-center h-9 w-[70px] rounded-full border border-bg-border bg-bg-soft hover:border-accent/60 transition ${className}`}
    >
      <span
        className={`absolute top-1 left-1 h-7 w-8 rounded-full bg-gradient-to-br from-accent to-accent-cyan transition-all duration-300 ${
          lang === 'en' ? 'translate-x-[28px]' : ''
        }`}
      />
      <span
        className={`relative z-10 flex-1 text-center text-xs font-bold ${
          lang === 'es' ? 'text-bg' : 'text-ink-muted'
        }`}
      >
        ES
      </span>
      <span
        className={`relative z-10 flex-1 text-center text-xs font-bold ${
          lang === 'en' ? 'text-bg' : 'text-ink-muted'
        }`}
      >
        EN
      </span>
    </button>
  )
}
