import { motion } from 'framer-motion'
import { FiArrowDown, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nContext'
import { contact } from '../data/contact'

export default function Hero() {
  const { t } = useI18n()
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-12">
      <div className="container-custom w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono text-accent-glow border border-accent/40 rounded-full bg-accent/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t.hero.greeting}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
          >
            <span className="gradient-text">{t.hero.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-3 text-xl md:text-2xl text-ink-muted font-light"
          >
            <span className="font-mono text-accent-cyan">&lt;</span> {t.hero.role}{' '}
            <span className="font-mono text-accent-cyan">/&gt;</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 text-base md:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#projects" className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#contact" className="btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-5 text-ink-muted"
          >
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="hover:text-accent-glow transition transform hover:-translate-y-1"
            >
              <FiMail className="w-5 h-5" />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-accent-glow transition transform hover:-translate-y-1"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent-glow transition transform hover:-translate-y-1"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 bottom-6 mx-auto w-fit text-ink-muted text-xs flex flex-col items-center gap-1 hover:text-accent-glow transition"
      >
        <span className="font-mono">{t.hero.scrollHint}</span>
        <FiArrowDown className="w-4 h-4" />
      </motion.a>
    </section>
  )
}
