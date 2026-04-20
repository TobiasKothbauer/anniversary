import { motion } from 'framer-motion'

interface ChapterDividerProps {
  id?: string
  number: string
  title: string
  dark?: boolean
}

export default function ChapterDivider({ id, number, title, dark = false }: ChapterDividerProps) {
  const bg   = dark ? 'bg-charcoal' : 'bg-cream'
  const line = dark ? 'bg-gold/25'  : 'bg-gold-light'
  const dot  = dark ? 'bg-gold/50'  : 'bg-gold'
  const num  = dark ? 'text-cream'  : 'text-charcoal'
  const sub  = dark ? 'text-gold/60': 'text-charcoal-light'

  return (
    <div id={id} className={`${bg} py-14 flex items-center justify-center overflow-hidden`}>
      <motion.div
        className="flex items-center gap-6 w-full max-w-xs mx-auto px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
      >
        <motion.div
          className={`h-px flex-1 ${line}`}
          initial={{ scaleX: 0, originX: 'right' }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        />

        <div className="text-center flex-shrink-0 space-y-1">
          <p className={`text-[9px] tracking-[0.4em] uppercase ${sub}`}>Chapter</p>
          <p className={`font-serif text-2xl font-light ${num}`}>{number}</p>
          <p className={`text-[10px] tracking-[0.25em] uppercase ${sub}`}>{title}</p>
          <div className="flex items-center justify-center gap-1.5 pt-1" aria-hidden="true">
            <div className={`w-1 h-1 rounded-full ${dot} opacity-40`} />
            <div className={`w-1.5 h-1.5 rounded-full ${dot} opacity-70`} />
            <div className={`w-1 h-1 rounded-full ${dot} opacity-40`} />
          </div>
        </div>

        <motion.div
          className={`h-px flex-1 ${line}`}
          initial={{ scaleX: 0, originX: 'left' }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        />
      </motion.div>
    </div>
  )
}
