export default function SectionHeading({ label, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : align === 'right' ? 'text-right ml-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${alignClass}`}>
      {label && (
        <span
          className={`inline-block text-xs font-medium tracking-[0.25em] uppercase mb-4 ${
            light ? 'text-gold-400' : 'text-sage-500'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 ${
          light ? 'text-white' : 'text-sage-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${light ? 'text-white/70' : 'text-sage-600'}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-px w-16 bg-gradient-to-r from-sage-500 to-gold-500 ${
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        }`}
      />
    </div>
  )
}
