import React from 'react';
import { motion } from 'framer-motion';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out',
    features: [
      'Up to 3 forms',
      '100 responses/month',
      'Basic templates',
      'Email notifications',
      'Export to CSV',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For growing businesses',
    features: [
      'Unlimited forms',
      'Unlimited responses',
      'All templates',
      'Advanced analytics',
      'Custom branding',
      'Integrations',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'White-label solution',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Team training',
    ],
  },
];

const Pricing: React.FC = () => {
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
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that's right for you
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`glass rounded-2xl p-8 relative ${
                tier.popular
                  ? 'border-2 border-primary-500 shadow-glow'
                  : ''
              }`}
              variants={itemVariants}
              whileHover={{ scale: tier.popular ? 1.08 : 1.05, y: -10 }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-400 mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold gradient-text">{tier.price}</span>
                <span className="text-gray-400 ml-2">/ {tier.period}</span>
              </div>

              {/* CTA Button */}
              <motion.button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 hover:shadow-glow'
                    : 'glass-hover border border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </motion.button>

              {/* Features list */}
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
