import React from 'react';
import { motion } from 'framer-motion';

interface Template {
  title: string;
  category: string;
  description: string;
  icon: string;
}

const templates: Template[] = [
  {
    title: 'Contact Form',
    category: 'Business',
    description: 'Simple contact form for customer inquiries',
    icon: '📧',
  },
  {
    title: 'Customer Feedback',
    category: 'Survey',
    description: 'Gather valuable customer feedback and ratings',
    icon: '⭐',
  },
  {
    title: 'Event Registration',
    category: 'Registration',
    description: 'Collect attendee information for events',
    icon: '🎟️',
  },
  {
    title: 'Job Application',
    category: 'HR',
    description: 'Professional application form for hiring',
    icon: '💼',
  },
  {
    title: 'Order Form',
    category: 'E-commerce',
    description: 'Simple product order and checkout form',
    icon: '🛒',
  },
  {
    title: 'Survey Template',
    category: 'Research',
    description: 'Comprehensive survey with multiple question types',
    icon: '📋',
  },
];

const Templates: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Start with a <span className="gradient-text">Template</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pre-designed templates to get you started instantly
          </p>
        </motion.div>

        {/* Templates grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {templates.map((template, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-glow-pink cursor-pointer group"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{template.icon}</div>
                <span className="px-3 py-1 bg-primary-600/30 rounded-full text-xs font-semibold">
                  {template.category}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                {template.title}
              </h3>
              <p className="text-gray-300 mb-4">{template.description}</p>

              <motion.button
                className="w-full py-2 glass-hover rounded-lg font-medium text-sm border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Use Template
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;
