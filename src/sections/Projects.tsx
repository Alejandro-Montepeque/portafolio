import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import SectionHeader from '../components/SectionHeader'
import { projects } from '../data/projects'
import { FiGithub, FiExternalLink, FiClock } from 'react-icons/fi'

export default function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          kicker={t.projects.kicker}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden bg-bg-card border border-bg-border hover:border-accent/40 transition-all duration-300"
            >
              {/* Top gradient accent */}
              <div className="h-40 relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(34,211,238,0.4) 50%, rgba(236,72,153,0.4))',
                  }}
                />
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-5xl font-mono font-bold text-bg/60">
                    0{p.id}
                  </span>
                </div>
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg/80 backdrop-blur-sm text-[11px] font-medium text-accent-glow border border-accent/30">
                  <FiClock className="w-3 h-3" />
                  {t.projects.comingSoon}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-glow transition">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-muted mb-4 leading-relaxed">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent-glow"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <button
                    disabled={!p.github}
                    className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <FiGithub className="w-4 h-4" />
                    {t.projects.viewCode}
                  </button>
                  <button
                    disabled={!p.demo}
                    className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    {t.projects.viewDemo}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
