import { motion } from 'framer-motion'
import { storyMoments, type StoryMoment } from '../data/memories'
import SecretOrb from './SecretOrb'

export default function StoryScroll() {
  return (
    <section
      id="story"
      className="bg-cream py-20 md:py-32"
      aria-label="Our story"
    >
      <div className="max-w-xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <p className="section-label mb-4">The year</p>
          <h2 className="section-title">How we got here.</h2>
        </motion.div>

        <div className="relative">
          {storyMoments.map((moment, i) => (
            <StoryCard
              key={moment.id}
              moment={moment}
              index={i}
              isLast={i === storyMoments.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryCard({
  moment,
  index,
  isLast,
}: {
  moment: StoryMoment
  index: number
  isLast: boolean
}) {
  return (
    <div className="relative flex">
      {/* Timeline spine */}
      <div className="flex flex-col items-center mr-7 flex-shrink-0" aria-hidden="true">
        <motion.div
          className="w-2 h-2 rounded-full bg-gold mt-[0.6rem] flex-shrink-0 relative z-10 shadow-[0_0_0_4px_rgba(184,149,122,0.12)]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 * index }}
        />
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(184,149,122,0.35), rgba(184,149,122,0.05))' }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className="pb-14 flex-1 min-w-0"
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.7, delay: 0.07 * (index % 4) }}
      >
        <p className="text-[9px] tracking-[0.35em] uppercase text-gold mb-2">
          {moment.date}
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-light leading-snug mb-3">
          {moment.title}
        </h3>
        <p className="text-charcoal-muted text-[1rem] leading-[1.9] font-light">
          {moment.text}
        </p>

        {/* Inline secret orb for story moments that carry one */}
        {moment.secretId && (
          <div className="mt-4 flex items-center gap-2">
            <SecretOrb secretId={moment.secretId} />
            <span className="text-[10px] text-charcoal-light/40 tracking-wide font-light select-none">
              something here…
            </span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
