import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🎨',
    title: 'Drag & Drop Builder',
    description: 'Intuitive interface to create forms effortlessly. Just drag, drop, and customize.',
  },
  {
    icon: '🧠',
    title: 'Smart Logic & Branching',
    description: 'Create dynamic forms that adapt based on user responses with conditional logic.',
  },
  {
    icon: '✨',
    title: 'Beautiful Templates',
    description: 'Start with professionally designed templates or build from scratch.',
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Track responses, visualize data, and export insights instantly.',
  },
  {
    icon: '🔗',
    title: 'Seamless Integrations',
    description: 'Connect with your favorite tools like Slack, Google Sheets, and more.',
  },
  {
    icon: '📱',
    title: 'Mobile Responsive',
    description: 'Forms that look perfect on any device, automatically optimized.',
  },
];

const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Create{' '}
            <span className="gradient-text">Amazing Forms</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powerful features that make form building a breeze
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass glass-hover rounded-2xl p-8 transition-all duration-300 hover:shadow-glow"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
