import {
  useMemo,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import SectionHeader from '../components/SectionHeader'
import { contact } from '../data/contact'
import { buildContactSchema, formatZodErrors } from '../validation/contactSchema'
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMapPin,
  FiCheck,
  FiAlertCircle,
  FiPhone,
} from 'react-icons/fi'

type FormState = { name: string; email: string; message: string }
type FieldName = keyof FormState
type FormErrors = Partial<Record<FieldName, string>>
type Status = null | 'sending' | 'ok' | 'err'

const initialForm: FormState = { name: '', email: '', message: '' }

export default function Contact() {
  const { t } = useI18n()
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>(null)

  const schema = useMemo(
    () => buildContactSchema(t.contact.errors),
    [t.contact.errors]
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as FieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
    if (status === 'err') setStatus(null)
  }

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as FieldName
    const fieldSchema = schema.shape[name]
    if (!fieldSchema) return
    const result = fieldSchema.safeParse(form[name])
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.issues[0]?.message,
      }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = schema.safeParse(form)
    if (!result.success) {
      setErrors(formatZodErrors(result.error))
      setStatus('err')
      return
    }

    setErrors({})
    setStatus('sending')

    const data = result.data
    const subject = encodeURIComponent(`Contacto desde portafolio — ${data.name}`)
    const body = encodeURIComponent(
      `${data.message}\n\n— ${data.name} (${data.email})`
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`

    setTimeout(() => setStatus('ok'), 600)
  }

  const inputClass = (field: FieldName) =>
    `w-full px-4 py-3 rounded-lg bg-bg-soft border outline-none transition text-sm ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500'
        : 'border-bg-border focus:border-accent'
    }`

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          kicker={t.contact.kicker}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="md:col-span-2 space-y-3"
          >
            <p className="text-sm text-ink-muted mb-2">{t.contact.directLabel}</p>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-bg-border hover:border-accent/40 transition group"
            >
              <span className="w-10 h-10 rounded-lg grid place-items-center bg-accent/10 text-accent-glow">
                <FiMail />
              </span>
              <div className="min-w-0">
                <div className="text-xs text-ink-dim">Email</div>
                <div className="text-sm truncate group-hover:text-accent-glow">
                  {contact.email}
                </div>
              </div>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-bg-border hover:border-accent/40 transition group"
            >
              <span className="w-10 h-10 rounded-lg grid place-items-center bg-accent/10 text-accent-glow">
                <FiGithub />
              </span>
              <div className="min-w-0">
                <div className="text-xs text-ink-dim">GitHub</div>
                <div className="text-sm truncate group-hover:text-accent-glow">
                  {contact.github.replace('https://', '')}
                </div>
              </div>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-bg-border hover:border-accent/40 transition group"
            >
              <span className="w-10 h-10 rounded-lg grid place-items-center bg-accent/10 text-accent-glow">
                <FiLinkedin />
              </span>
              <div className="min-w-0">
                <div className="text-xs text-ink-dim">LinkedIn</div>
                <div className="text-sm truncate group-hover:text-accent-glow">
                  {contact.linkedin
                    .replace('https://www.', '')
                    .replace('https://', '')}
                </div>
              </div>
            </a>
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-bg-border hover:border-accent/40 transition group"
              >
                <span className="w-10 h-10 rounded-lg grid place-items-center bg-accent/10 text-accent-glow">
                  <FiPhone />
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-ink-dim">Phone</div>
                  <div className="text-sm truncate group-hover:text-accent-glow">
                    {contact.phone}
                  </div>
                </div>
              </a>
            )}
            {contact.location && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-bg-border">
                <span className="w-10 h-10 rounded-lg grid place-items-center bg-accent/10 text-accent-glow">
                  <FiMapPin />
                </span>
                <div>
                  <div className="text-xs text-ink-dim">Location</div>
                  <div className="text-sm">{contact.location}</div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="md:col-span-3 glass rounded-2xl p-6 md:p-8 space-y-4"
          >
            <Field
              id="name"
              label={t.contact.formName}
              error={errors.name}
            >
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={inputClass('name')}
                placeholder="Jane Doe"
              />
            </Field>

            <Field
              id="email"
              label={t.contact.formEmail}
              error={errors.email}
            >
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClass('email')}
                placeholder="jane@company.com"
              />
            </Field>

            <Field
              id="message"
              label={t.contact.formMessage}
              error={errors.message}
            >
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClass('message')} resize-none`}
                placeholder="..."
              />
            </Field>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary disabled:opacity-60"
              >
                <FiSend className="w-4 h-4" />
                {status === 'sending'
                  ? t.contact.formSending
                  : t.contact.formSubmit}
              </button>

              {status === 'ok' && (
                <span className="inline-flex items-center gap-2 text-xs text-green-400">
                  <FiCheck /> {t.contact.formSuccess}
                </span>
              )}
              {status === 'err' && (
                <span className="inline-flex items-center gap-2 text-xs text-red-400">
                  <FiAlertCircle /> {t.contact.formError}
                </span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

type FieldProps = {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs text-ink-muted mb-2 font-mono"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
        >
          <FiAlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
