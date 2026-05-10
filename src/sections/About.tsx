import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import SectionHeader from '../components/SectionHeader'
import { contact } from '../data/contact'

export default function About() {
  const { t } = useI18n()
  const [imgFailed, setImgFailed] = useState(false)
  const showPhoto = Boolean(contact.avatarUrl) && !imgFailed

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader kicker={t.about.kicker} title={t.about.title} />

        <div className="grid md:grid-cols-5 gap-10 max-w-5xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="md:col-span-2"
          >
            <div className="relative mx-auto w-56 h-56 md:w-64 md:h-64">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent via-accent-cyan to-accent-pink animate-glow" />
              <div className="absolute inset-1 rounded-3xl bg-bg-card overflow-hidden flex items-center justify-center">
                {showPhoto ? (
                  <img
                    src={contact.avatarUrl}
                    alt={t.hero.name}
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-mono text-7xl font-bold gradient-text">
                    AM
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="md:col-span-3 space-y-4 text-ink-muted leading-relaxed"
          >
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {t.about.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-ink-dim mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
