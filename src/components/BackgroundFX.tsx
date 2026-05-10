import { motion } from 'framer-motion'

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-fade" />
      <motion.div
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)',
          filter: 'blur(45px)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80" />
    </div>
  )
}
