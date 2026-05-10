import { motion } from 'framer-motion'

type Props = {
  kicker?: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ kicker, title, subtitle }: Props) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="inline-block px-3 py-1 mb-4 text-xs font-mono text-accent-glow border border-accent/40 rounded-full bg-accent/5"
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.05 }}
        className="text-3xl md:text-5xl font-bold tracking-tight"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-ink-muted max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
