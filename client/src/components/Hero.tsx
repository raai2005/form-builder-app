import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '5rem', left: '2.5rem' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent-500/30 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{ bottom: '5rem', right: '2.5rem' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main heading */}
        <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" variants={itemVariants}>
          Build Beautiful Forms in{' '}
          <span className="gradient-text">Minutes</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Create stunning, professional forms with our intuitive drag-and-drop builder. 
          No coding required. Collect responses and analyze data in real-time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building Free
          </motion.button>
          <motion.button
            className="px-8 py-4 glass glass-hover rounded-full font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Stats or social proof */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          <motion.div className="text-center" variants={statsVariants}>
            <div className="text-3xl md:text-4xl font-bold gradient-text">50K+</div>
            <div className="text-gray-400 mt-2">Forms Created</div>
          </motion.div>
          <motion.div className="text-center" variants={statsVariants}>
            <div className="text-3xl md:text-4xl font-bold gradient-text">2M+</div>
            <div className="text-gray-400 mt-2">Responses</div>
          </motion.div>
          <motion.div className="text-center" variants={statsVariants}>
            <div className="text-3xl md:text-4xl font-bold gradient-text">98%</div>
            <div className="text-gray-400 mt-2">Satisfaction</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
