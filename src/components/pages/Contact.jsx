import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@mayuglow.com', href: 'mailto:hello@mayuglow.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Address', value: 'Hyderabad, Telangana, India', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon - Sat, 9AM - 6PM IST', href: null },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 hero-mesh overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 text-center">
          <ScrollReveal>
            <SectionHeading
              label="Get in Touch"
              title="We'd Love to Hear From You"
              subtitle="Have a question about our products, need a custom order, or just want to say hello? We're here for you."
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact info cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info, i) => (
                <ScrollReveal key={info.label} delay={i * 0.08}>
                  <div className="glass-card rounded-2xl p-5 flex items-center gap-4 !transform-none hover:!transform-none">
                    <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
                      <info.icon size={20} className="text-sage-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-wider uppercase text-sage-400">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="text-sm font-medium text-sage-800 hover:text-sage-600 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-sage-800">{info.value}</span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              {/* Map placeholder */}
              <ScrollReveal delay={0.3}>
                <div className="glass-card rounded-2xl overflow-hidden aspect-[4/3] !transform-none hover:!transform-none">
                  <div className="w-full h-full bg-gradient-to-br from-sage-200 via-sage-100 to-cream-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={32} className="text-sage-400 mx-auto mb-2" />
                      <p className="text-sm text-sage-500">Hyderabad, India</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <ScrollReveal direction="right" className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-6 md:p-10 !transform-none hover:!transform-none">
                {submitted ? (
                  <div className="text-center py-16">
                    <CheckCircle size={48} className="text-sage-500 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl font-semibold text-sage-900 mb-2">Message Sent!</h3>
                    <p className="text-sage-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold text-sage-900 mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-sm text-sage-500 mb-8">
                      Fill out the form below and our team will respond within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-sage-500 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="input-premium"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-sage-500 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="input-premium"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-sage-500 mb-2">
                          Subject
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="input-premium"
                          required
                        >
                          <option value="">Select a topic</option>
                          <option value="order">Order Inquiry</option>
                          <option value="product">Product Question</option>
                          <option value="custom">Custom Order</option>
                          <option value="wholesale">Wholesale / Bulk</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-sage-500 mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="input-premium resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full group">
                        <Send size={16} />
                        <span>Send Message</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gradient-to-b from-cream-50 to-sage-50/30">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <ScrollReveal>
            <SectionHeading label="FAQ" title="Common Questions" align="center" />
          </ScrollReveal>

          <div className="space-y-4">
            {[
              { q: 'Are your soaps really 100% chemical-free?', a: 'Absolutely. We use only natural oils, butters, clays, and essential oils. No parabens, sulfates, artificial fragrances, or synthetic colors — ever.' },
              { q: 'How long does a bar last?', a: 'Depending on usage, a 100g bar typically lasts 3-4 weeks with daily use. Keep it dry between uses on a soap dish for maximum longevity.' },
              { q: 'Do you offer custom combo packs?', a: 'Yes! Contact us with your preferred flavors and quantities, and we\'ll create a custom pack just for you.' },
              { q: 'What is your return policy?', a: 'We offer a 7-day satisfaction guarantee. If you\'re not happy with your purchase, contact us for a full refund or exchange.' },
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <details className="glass-card rounded-2xl group !transform-none hover:!transform-none">
                  <summary className="p-5 md:p-6 cursor-pointer font-heading text-lg font-semibold text-sage-900 list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-sage-400 group-open:rotate-45 transition-transform text-xl ml-4 shrink-0">+</span>
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-sage-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
