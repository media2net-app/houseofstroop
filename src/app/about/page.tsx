import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { Heart, Coffee, Star, Users, MapPin, Clock } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: "Emma",
      role: "Eigenaresse & Stroopwafel Expert",
      description: "De drijvende kracht achter House of Stroop. Emma brengt haar passie voor authentieke smaken en warme gastvrijheid naar elke stroopwafel.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Max",
      role: "Koffie Specialist & Barista",
      description: "Onze koffie-expert die elke kop koffie tot perfectie brouwt. Max zorgt ervoor dat elke bezoeker de beste koffie ervaring krijgt.",
      image: "/api/placeholder/200/200"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Met Liefde Gemaakt",
      description: "Elke stroopwafel wordt met zorg en aandacht bereid, net zoals thuis."
    },
    {
      icon: Star,
      title: "Kwaliteit",
      description: "We gebruiken alleen de beste ingrediënten voor authentieke smaken."
    },
    {
      icon: Users,
      title: "Gastvrijheid",
      description: "Bij House of Stroop voel je je thuis, altijd welkom en verzorgd."
    },
    {
      icon: Coffee,
      title: "Passie",
      description: "Onze passie voor koffie en stroopwafels zie je in elk detail."
    }
  ];

  return (
    <main className="min-h-screen bg-stroop-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 stroop-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-stroop-700 mb-6">
              Over House of Stroop
            </h1>
            <p className="text-xl text-stroop-600 max-w-3xl mx-auto">
              Ontdek het verhaal achter onze passie voor authentieke stroopwafels 
              en perfecte koffie in het hart van Curaçao.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-stroop-700 mb-6">
                Ons Verhaal
              </h2>
              <div className="space-y-4 text-lg text-stroop-600">
                <p>
                  House of Stroop is geboren uit een droom om authentieke Nederlandse smaken 
                  naar het tropische paradijs van Curaçao te brengen. Wat begon als een 
                  passieproject is uitgegroeid tot een geliefde ontmoetingsplek voor 
                  locals en toeristen.
                </p>
                <p>
                  Onze stroopwafels worden nog steeds bereid volgens traditionele 
                  recepten, met dezelfde liefde en aandacht als generaties geleden. 
                  Elke hap is een reis naar de warme, gezellige sfeer van Nederland.
                </p>
                <p>
                  Gelegen in het prachtige Kurá Hulanda Village, bieden we niet alleen 
                  heerlijke stroopwafels, maar ook perfecte koffie en een warme, 
                  uitnodigende sfeer waar iedereen zich thuis voelt.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-stroop-200 rounded-2xl p-8 text-center">
                <div className="w-64 h-64 bg-stroop-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-stroop-600 text-center">
                    Afbeelding<br/>Plaatshouder<br/>House of Stroop
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-stroop-700 mb-2">
                  Kurá Hulanda Village
                </h3>
                <p className="text-stroop-600">
                  Onze prachtige locatie in het hart van Curaçao
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 stroop-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-stroop-700 mb-4">
              Onze Waarden
            </h2>
            <p className="text-lg text-stroop-600 max-w-2xl mx-auto">
              De principes die ons drijven en die je terugziet in elke stroopwafel en kop koffie.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-stroop-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-stroop-700 mb-3">
                  {value.title}
                </h3>
                <p className="text-stroop-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-stroop-700 mb-4">
              Ons Team
            </h2>
            <p className="text-lg text-stroop-600 max-w-2xl mx-auto">
              Maak kennis met de mensen achter House of Stroop. 
              Ons team staat voor kwaliteit, passie en gastvrijheid.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-48 h-48 bg-stroop-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-stroop-600 text-center">
                    Foto<br/>{member.name}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-stroop-700 mb-2">
                  {member.name}
                </h3>
                <p className="text-stroop-500 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-stroop-600 max-w-md mx-auto">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 bg-stroop-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl font-bold mb-6">Bezoek Ons</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-stroop-gold" />
                  <span>Kurá Hulanda Village, Curaçao</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-stroop-gold" />
                  <span>Dinsdag - Zaterdag: 9:00 - 17:00</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Speciale Diensten
              </h3>
              <ul className="space-y-2 text-stroop-100">
                <li>• Workshops (binnenkort beschikbaar)</li>
                <li>• Groepsreserveringen</li>
                <li>• Catering voor evenementen</li>
                <li>• Koffie & stroopwafel proeveringen</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
