import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Choose Your Starting Point',
    description: 'Select from our beautiful templates or start with a blank canvas.',
  },
  {
    number: '02',
    title: 'Customize & Build',
    description: 'Add fields, customize design, and configure logic with our drag-and-drop builder.',
  },
  {
    number: '03',
    title: 'Share Your Form',
    description: 'Get a shareable link, embed on your website, or share via email.',
  },
  {
    number: '04',
    title: 'Collect & Analyze',
    description: 'Gather responses in real-time and gain insights with powerful analytics.',
  },
];

const HowItWorks: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create professional forms in four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 transform -translate-y-1/2"></div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {steps.map((step, index) => (
              <motion.div key={index} className="text-center" variants={itemVariants}>
                {/* Step number with gradient circle */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 shadow-glow mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-2xl font-bold">{step.number}</span>
                </motion.div>

                {/* Step content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
