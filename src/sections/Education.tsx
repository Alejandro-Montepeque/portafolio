import { FiBookOpen } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nContext'
import SectionHeader from '../components/SectionHeader'
import Timeline from '../components/Timeline'

export default function Education() {
  const { t } = useI18n()

  return (
    <section id="education" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          kicker={t.education.kicker}
          title={t.education.title}
          subtitle={t.education.subtitle}
        />
        <Timeline items={t.education.items} icon={FiBookOpen} variant="cyan" />
      </div>
    </section>
  )
}
