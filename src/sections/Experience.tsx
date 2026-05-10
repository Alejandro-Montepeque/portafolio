import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import SectionHeader from '../components/SectionHeader'
import { FiBriefcase, FiBookOpen } from 'react-icons/fi'

export default function Experience() {
  const { t } = useI18n()
  const items = t.experience.items

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          kicker={t.experience.kicker}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-cyan to-transparent" />

          <div className="space-y-10">
            {items.map((it, idx) => {
              const isLeft = idx % 2 === 0
              const isEdu = it.type === 'edu'
              const Icon = isEdu ? FiBookOpen : FiBriefcase
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: idx * 0.08 }}
                  className={`relative flex md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <span
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-bg ${
                      isEdu
                        ? 'bg-accent-cyan shadow-[0_0_18px_rgba(34,211,238,0.6)]'
                        : 'bg-accent shadow-[0_0_18px_rgba(168,85,247,0.6)]'
                    }`}
                  />

                  <div className={`pl-12 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="glass rounded-xl p-5 hover:border-accent/40 transition">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon
                          className={`w-4 h-4 ${
                            isEdu ? 'text-accent-cyan' : 'text-accent-glow'
                          }`}
                        />
                        <span
                          className={`text-xs font-mono ${
                            isEdu ? 'text-accent-cyan' : 'text-accent-glow'
                          }`}
                        >
                          {it.year}
                        </span>
                      </div>
                      <h3 className="font-semibold text-ink">{it.role}</h3>
                      <div className="text-sm text-ink-muted mb-2">{it.place}</div>
                      {Array.isArray(it.bullets) ? (
                        <ul className="text-sm text-ink-muted leading-relaxed space-y-1.5 list-disc pl-4 marker:text-accent/60">
                          {it.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-ink-muted leading-relaxed">
                          {it.desc}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
