import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'

export type TimelineItem = {
  year: string
  role: string
  place: string
  bullets?: string[]
  desc?: string
}

type Variant = 'accent' | 'cyan'

type Props = {
  items: TimelineItem[]
  icon: IconType
  variant?: Variant
}

const variantClasses: Record<
  Variant,
  { dot: string; line: string; iconColor: string; yearColor: string }
> = {
  accent: {
    dot: 'bg-accent shadow-[0_0_18px_rgba(168,85,247,0.6)]',
    line: 'from-accent via-accent-cyan to-transparent',
    iconColor: 'text-accent-glow',
    yearColor: 'text-accent-glow',
  },
  cyan: {
    dot: 'bg-accent-cyan shadow-[0_0_18px_rgba(34,211,238,0.6)]',
    line: 'from-accent-cyan via-accent to-transparent',
    iconColor: 'text-accent-cyan',
    yearColor: 'text-accent-cyan',
  },
}

export default function Timeline({ items, icon: Icon, variant = 'accent' }: Props) {
  const v = variantClasses[variant]

  return (
    <div className="relative max-w-3xl mx-auto">
      <div
        className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b ${v.line}`}
      />

      <div className="space-y-10">
        {items.map((it, idx) => {
          const isLeft = idx % 2 === 0
          return (
            <motion.div
              key={`${it.year}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: idx * 0.08 }}
              className={`relative flex md:items-center ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <span
                className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-bg ${v.dot}`}
              />

              <div
                className={`pl-12 md:pl-0 md:w-1/2 ${
                  isLeft ? 'md:pr-10' : 'md:pl-10'
                }`}
              >
                <div className="glass rounded-xl p-5 hover:border-accent/40 transition">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${v.iconColor}`} />
                    <span className={`text-xs font-mono ${v.yearColor}`}>
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
                    <p className="text-sm text-ink-muted leading-relaxed">{it.desc}</p>
                  )}
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
