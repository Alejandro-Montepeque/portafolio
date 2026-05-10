import { FiBriefcase } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nContext'
import SectionHeader from '../components/SectionHeader'
import Timeline from '../components/Timeline'

export default function Experience() {
  const { t } = useI18n()

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          kicker={t.experience.kicker}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />
        <Timeline items={t.experience.items} icon={FiBriefcase} variant="accent" />
      </div>
    </section>
  )
}
