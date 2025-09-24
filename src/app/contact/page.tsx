'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier zou je normaal de form data naar een API sturen
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-stroop-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 stroop-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-stroop-700 mb-6">
              Contact
            </h1>
            <p className="text-xl text-stroop-600 max-w-2xl mx-auto">
              Heb je vragen of wil je meer weten? Neem gerust contact met ons op! 
              We staan klaar om je te helpen.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-stroop-700 mb-8">
                Contact Informatie
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stroop-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stroop-700 mb-1">
                      Adres
                    </h3>
                    <p className="text-stroop-600">
                      Kurá Hulanda Village<br />
                      Willemstad, Curaçao
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stroop-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stroop-700 mb-1">
                      Openingstijden
                    </h3>
                    <p className="text-stroop-600">
                      Dinsdag - Zaterdag: 9:00 - 17:00<br />
                      Zondag en maandag gesloten
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stroop-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stroop-700 mb-1">
                      Telefoon
                    </h3>
                    <p className="text-stroop-600">
                      +599 9 XXX XXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stroop-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stroop-700 mb-1">
                      Email
                    </h3>
                    <p className="text-stroop-600">
                      info@houseofstroop.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-stroop-700 mb-4">
                  Volg ons
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-stroop-500 rounded-full flex items-center justify-center hover:bg-stroop-600 transition-colors duration-200">
                    <span className="text-white font-semibold">IG</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-stroop-500 rounded-full flex items-center justify-center hover:bg-stroop-600 transition-colors duration-200">
                    <span className="text-white font-semibold">FB</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-stroop-500 rounded-full flex items-center justify-center hover:bg-stroop-600 transition-colors duration-200">
                    <span className="text-white font-semibold">TT</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="animate-fade-in-right">
              <div className="bg-stroop-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-stroop-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stroop-700 mb-2">
                    Kaart Plaatshouder
                  </h3>
                  <p className="text-stroop-600">
                    Hier komt een interactieve kaart van Kurá Hulanda Village
                  </p>
                  <p className="text-sm text-stroop-500 mt-2">
                    Google Maps integratie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 stroop-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-stroop-700 mb-4">
              Stuur ons een bericht
            </h2>
            <p className="text-lg text-stroop-600">
              Heb je een vraag, suggestie of wil je een reservering maken? 
              Vul het formulier hieronder in en we nemen zo snel mogelijk contact met je op.
            </p>
          </div>

          <div className="animate-fade-in-up animation-delay-200">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-stroop-700 mb-2">
                  Bericht verzonden!
                </h3>
                <p className="text-stroop-600">
                  Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stroop-700 mb-2">
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stroop-200 rounded-lg focus:ring-2 focus:ring-stroop-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Jouw naam"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stroop-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stroop-200 rounded-lg focus:ring-2 focus:ring-stroop-500 focus:border-transparent transition-colors duration-200"
                      placeholder="jouw@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-stroop-700 mb-2">
                    Onderwerp *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stroop-200 rounded-lg focus:ring-2 focus:ring-stroop-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Kies een onderwerp</option>
                    <option value="algemeen">Algemene vraag</option>
                    <option value="reservering">Reservering</option>
                    <option value="catering">Catering</option>
                    <option value="workshop">Workshop informatie</option>
                    <option value="feedback">Feedback</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stroop-700 mb-2">
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-stroop-200 rounded-lg focus:ring-2 focus:ring-stroop-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Vertel ons wat je wilt weten..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-stroop-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-stroop-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Send className="w-5 h-5" />
                    <span>Verstuur bericht</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-stroop-700 mb-4">
              Veelgestelde Vragen
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Kunnen we reserveringen maken?",
                answer: "Ja, we accepteren reserveringen voor groepen van 6 personen of meer. Neem contact met ons op voor meer informatie."
              },
              {
                question: "Hebben jullie ook vegetarische opties?",
                answer: "Ja, onze stroopwafels zijn vegetarisch en we hebben verschillende koffie-opties zonder melk."
              },
              {
                question: "Kunnen we stroopwafels meenemen?",
                answer: "Absoluut! We hebben speciale verpakkingen zodat je onze stroopwafels ook thuis kunt genieten."
              },
              {
                question: "Wanneer komen de workshops beschikbaar?",
                answer: "We zijn bezig met het opzetten van stroopwafel workshops. Houd onze social media in de gaten voor updates!"
              }
            ].map((faq, index) => (
              <div className="animate-fade-in-up">
                <h3 className="text-lg font-semibold text-stroop-700 mb-2">
                  {faq.question}
                </h3>
                <p className="text-stroop-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
