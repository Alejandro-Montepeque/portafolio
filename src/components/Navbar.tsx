import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import LangToggle from './LangToggle'
import { contact } from '../data/contact'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'

const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact']

export default function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const offsets = sectionIds.map((id) => {
        const el = document.getElementById(id)
        if (!el) return { id, top: Infinity }
        const rect = el.getBoundingClientRect()
        return { id, top: Math.abs(rect.top - 100) }
      })
      offsets.sort((a, b) => a.top - b.top)
      if (offsets[0]) setActive(offsets[0].id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/70 backdrop-blur-lg border-b border-bg-border' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent-cyan grid place-items-center font-mono font-bold text-bg text-sm">
            AM
          </span>
          <span className="hidden sm:block font-mono text-sm text-ink-muted group-hover:text-ink transition">
            alejandro.dev
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`px-3 py-2 text-sm rounded-md transition ${
                active === l.id
                  ? 'text-accent-glow'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.cvUrl}
            download
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md border border-accent/40 text-ink hover:bg-accent/10 transition"
          >
            <FiDownload className="w-3.5 h-3.5" />
            CV
          </a>
          <LangToggle />
          <button
            className="md:hidden p-2 rounded-md text-ink hover:bg-bg-card"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-bg-border bg-bg/90 backdrop-blur-lg"
          >
            <div className="container-custom py-3 flex flex-col">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-ink-muted hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={contact.cvUrl}
                download
                className="mt-2 inline-flex items-center gap-2 py-2 text-sm font-semibold text-accent-glow"
              >
                <FiDownload className="w-3.5 h-3.5" />
                {t.nav.downloadCV}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
