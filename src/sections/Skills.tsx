import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FiServer, FiLayout, FiCpu, FiCloud, FiTool, FiDatabase } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nContext'
import SectionHeader from '../components/SectionHeader'
import SkillIcon from '../components/SkillIcon'
import { skills, type SkillCategory } from '../data/skills'

const categoryIcon: Record<SkillCategory, IconType> = {
  frontend: FiLayout,
  backend: FiServer,
  databases: FiDatabase,
  ai: FiCpu,
  devops: FiCloud,
  tools: FiTool,
}

export default function Skills() {
  const { t } = useI18n()
  const cats = Object.keys(skills) as SkillCategory[]

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          kicker={t.skills.kicker}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cats.map((cat, idx) => {
            const Icon = categoryIcon[cat]
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: idx * 0.06 }}
                className="glass glow-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/30 to-accent-cyan/20 grid place-items-center text-accent-glow">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-semibold">
                    {t.skills.categories[cat]}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills[cat].map((s) => (
                    <motion.span
                      key={s.key}
                      whileHover={{ y: -2 }}
                      className="skill-chip"
                    >
                      <SkillIcon
                        skillKey={s.key}
                        name={s.name}
                        color={s.color}
                        className="w-4 h-4"
                      />
                      {s.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
