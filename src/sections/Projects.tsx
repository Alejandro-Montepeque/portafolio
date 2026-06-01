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
              {/* Top preview: image when available, otherwise gradient + number */}
              <div className="h-40 relative overflow-hidden">
                {p.image ? (
                  <>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/30 to-transparent" />
                  </>
                ) : (
                  <>
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
                  </>
                )}
                {p.live ? (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 backdrop-blur-sm text-[11px] font-medium text-emerald-300 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t.projects.live}
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg/80 backdrop-blur-sm text-[11px] font-medium text-accent-glow border border-accent/30">
                    <FiClock className="w-3 h-3" />
                    {t.projects.comingSoon}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-glow transition">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-muted mb-4 leading-relaxed">{p.desc}</p>

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
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ink-muted hover:text-accent-glow transition"
                    >
                      <FiGithub className="w-4 h-4" />
                      {t.projects.viewCode}
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-1.5 text-ink-muted opacity-40 cursor-not-allowed"
                    >
                      <FiGithub className="w-4 h-4" />
                      {t.projects.viewCode}
                    </button>
                  )}
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ink-muted hover:text-accent-glow transition"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      {t.projects.viewDemo}
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-1.5 text-ink-muted opacity-40 cursor-not-allowed"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      {t.projects.viewDemo}
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
