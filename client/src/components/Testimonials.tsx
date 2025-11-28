import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc',
    content: 'This form builder transformed how we collect customer feedback. The analytics are incredibly insightful!',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'DesignHub',
    content: 'The drag-and-drop interface is so intuitive. We built our entire onboarding flow in just hours.',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    name: 'Emma Williams',
    role: 'HR Manager',
    company: 'GrowthCo',
    content: 'Best form builder we have used. The conditional logic feature is a game-changer for our recruitment process.',
    rating: 5,
    avatar: '👩‍🎓',
  },
];

const Testimonials: React.FC = () => {
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
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See what our customers have to say
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-8 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Star rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Testimonial content */}
              <p className="text-gray-200 mb-6 italic">"{testimonial.content}"</p>

              {/* Author info */}
              <div className="flex items-center">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
