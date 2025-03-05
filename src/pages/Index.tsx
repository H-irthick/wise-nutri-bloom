
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import NutritionCalculator from '@/components/NutritionCalculator';
import FoodRecommendations from '@/components/FoodRecommendations';
import ChatBot from '@/components/ChatBot';
import DietaryPreferences from '@/components/DietaryPreferences';
import NutritionalAnalysis from '@/components/NutritionalAnalysis';
import BMICalculator from '@/components/BMICalculator';
import MealPlanner from '@/components/MealPlanner';
import { pageVariants } from '@/lib/animations';

const Index: React.FC = () => {
  // Smooth scroll to section when clicking on navigation links
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    // Handle initial load with hash in URL
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Hero />
        <NutritionCalculator />
        <DietaryPreferences />
        <NutritionalAnalysis />
        <BMICalculator />
        <MealPlanner />
        <FoodRecommendations />
        
        {/* About Section */}
        <section id="about" className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-nutriwise-700 bg-nutriwise-100 rounded-full border border-nutriwise-200">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Making Nutrition <span className="text-nutriwise-600">Simple</span> & Accessible
                </h2>
                <p className="text-muted-foreground mb-6">
                  At NutriWise, we believe that good nutrition should be accessible to everyone. Our team of nutrition experts and developers have created a platform that simplifies nutritional information and makes it easy to understand.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Evidence-based nutritional recommendations',
                    'Personalized approach to dietary needs',
                    'Simple, actionable insights for everyday decisions',
                    'Continuously updated based on latest research'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 mr-2 text-nutriwise-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800&auto=format&fit=crop"
                    alt="Fresh vegetables and fruits"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-xl shadow-lg max-w-[250px] glass">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-nutriwise-100 p-2 rounded-full">
                      <svg
                        className="h-6 w-6 text-nutriwise-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Our Commitment</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We're committed to providing accurate, science-based nutritional guidance that helps you make healthier choices every day.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-nutriwise-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H100V100H0V0ZM50 50C77.6142 50 100 38.8071 100 25C100 11.1929 77.6142 0 50 0C22.3858 0 0 11.1929 0 25C0 38.8071 22.3858 50 50 50Z"
                fill="white"
              />
            </svg>
          </div>
          
          <div className="container relative z-10 px-4 md:px-6 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Start Your Nutritional Journey Today
              </motion.h2>
              
              <motion.p
                className="text-lg opacity-90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join thousands of users who are making better nutritional choices with NutriWise. Our platform is designed to make healthy eating simple and enjoyable.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-l-lg w-full max-w-xs focus:outline-none text-gray-800"
                />
                <button className="bg-white text-nutriwise-600 px-4 py-3 rounded-r-lg font-medium hover:bg-gray-100 transition-colors">
                  Get Started
                </button>
              </motion.div>
              
              <motion.p
                className="text-sm opacity-70 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Join now and get access to premium features for free
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* ChatBot component is fixed and visible on all pages */}
        <ChatBot />
      </motion.div>
    </Layout>
  );
};

export default Index;
