import { useI18n } from '../i18n/I18nContext'
import { FiHeart } from 'react-icons/fi'
import { SiReact, SiTailwindcss, SiVite } from 'react-icons/si'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-bg-border py-8 mt-12">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-ink-muted text-center sm:text-left">
          © {year} Alejandro Montepeque. {t.footer.rights}
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <span>{t.footer.built}</span>
          <FiHeart className="w-3.5 h-3.5 text-accent-pink" />
          <span>{t.footer.and}</span>
          <SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />
          <SiVite className="w-3.5 h-3.5 text-[#646CFF]" />
          <SiTailwindcss className="w-3.5 h-3.5 text-[#06B6D4]" />
        </div>
      </div>
    </footer>
  )
}
