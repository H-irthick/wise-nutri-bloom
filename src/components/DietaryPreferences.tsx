
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Egg, Beef, Wheat, Peanut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const DietaryPreferences: React.FC = () => {
  const dietTypes = [
    {
      id: 'vegetarian',
      name: 'Vegetarian',
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      description: 'Plant-based diet excluding meat, fish, and poultry',
      foods: ['Vegetables', 'Fruits', 'Grains', 'Legumes', 'Nuts & Seeds', 'Dairy', 'Eggs (optional)'],
      tips: [
        'Ensure adequate protein through beans, lentils, tofu, and dairy',
        'Include iron-rich foods like spinach and fortified cereals',
        'Consider B12 supplements if avoiding dairy and eggs',
        'Focus on complete proteins by combining different plant proteins'
      ],
      benefits: [
        'Reduced risk of heart disease',
        'Lower blood pressure',
        'Better weight management',
        'Lower risk of certain cancers'
      ]
    },
    {
      id: 'vegan',
      name: 'Vegan',
      icon: <Leaf className="h-10 w-10 text-green-800" />,
      description: 'Plant-based diet excluding all animal products',
      foods: ['Vegetables', 'Fruits', 'Grains', 'Legumes', 'Nuts & Seeds', 'Plant-based milks', 'Meat alternatives'],
      tips: [
        'Supplement with vitamin B12',
        'Include calcium-rich foods like fortified plant milks',
        'Incorporate omega-3 sources like flaxseeds and walnuts',
        'Ensure adequate protein from legumes, tofu, and seitan'
      ],
      benefits: [
        'Lowest environmental impact',
        'May reduce risk of chronic diseases',
        'Can help manage weight',
        'Lower saturated fat intake'
      ]
    },
    {
      id: 'eggetarian',
      name: 'Eggetarian',
      icon: <Egg className="h-10 w-10 text-amber-400" />,
      description: 'Vegetarian diet that includes eggs but excludes meat',
      foods: ['Vegetables', 'Fruits', 'Grains', 'Legumes', 'Nuts & Seeds', 'Dairy', 'Eggs'],
      tips: [
        'Eggs provide complete protein and essential nutrients',
        'Consider organic or free-range eggs for ethical concerns',
        'Incorporate a variety of plant proteins alongside eggs',
        'Balance egg consumption with plenty of plant foods'
      ],
      benefits: [
        'Complete protein source from eggs',
        'Rich in vitamin B12 and D',
        'Good source of choline for brain health',
        'More flexible than strict vegetarian diets'
      ]
    },
    {
      id: 'non-vegetarian',
      name: 'Non-Vegetarian',
      icon: <Beef className="h-10 w-10 text-red-600" />,
      description: 'Diet that includes animal products including meat',
      foods: ['Meat', 'Poultry', 'Fish', 'Seafood', 'Dairy', 'Eggs', 'All plant foods'],
      tips: [
        'Focus on lean protein sources',
        'Include fatty fish rich in omega-3s',
        'Balance meals with plenty of vegetables',
        'Limit processed meats and red meat consumption'
      ],
      benefits: [
        'Complete proteins readily available',
        'Rich in iron, zinc, and B12',
        'No need for certain supplements',
        'Wide variety of food choices'
      ]
    }
  ];

  const restrictions = [
    {
      id: 'gluten-free',
      name: 'Gluten-Free',
      icon: <Wheat className="h-10 w-10 text-amber-700" />,
      description: 'Diet excluding gluten, a protein found in wheat, barley, and rye',
      foods: ['Rice', 'Corn', 'Quinoa', 'Buckwheat', 'Certified gluten-free oats', 'Fruits', 'Vegetables', 'Meat', 'Fish', 'Dairy'],
      avoid: ['Wheat', 'Barley', 'Rye', 'Triticale', 'Regular oats (due to cross-contamination)', 'Most breads, pastas, and baked goods', 'Many processed foods']
    },
    {
      id: 'dairy-free',
      name: 'Dairy-Free',
      icon: <span className="text-3xl">🥛</span>,
      description: 'Diet excluding milk and milk products',
      foods: ['Plant-based milks', 'Coconut yogurt', 'Vegan cheese alternatives', 'All fruits and vegetables', 'Grains', 'Meat', 'Fish'],
      avoid: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Ice cream', 'Many baked goods', 'Some processed foods']
    },
    {
      id: 'nut-free',
      name: 'Nut-Free',
      icon: <Peanut className="h-10 w-10 text-amber-800" />,
      description: 'Diet excluding all tree nuts and peanuts',
      foods: ['Fruits', 'Vegetables', 'Meat', 'Fish', 'Dairy', 'Grains', 'Seeds (if not cross-contaminated)'],
      avoid: ['Peanuts', 'Tree nuts (almonds, walnuts, cashews, etc.)', 'Nut butters', 'Marzipan', 'Many desserts', 'Some vegetarian protein sources']
    }
  ];

  return (
    <section id="dietary-preferences" className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-4 text-sm font-medium text-nutriwise-700 bg-nutriwise-100 rounded-full border border-nutriwise-200"
          >
            Dietary Options
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Dietary Preferences & Restrictions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Explore different dietary options and learn how to maintain proper nutrition with various preferences and restrictions.
          </motion.p>
        </div>

        <Tabs defaultValue="preferences" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="preferences">Dietary Preferences</TabsTrigger>
            <TabsTrigger value="restrictions">Dietary Restrictions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2"
            >
              {dietTypes.map((diet) => (
                <motion.div key={diet.id} variants={fadeInUp}>
                  <Card className="h-full overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="mb-2">{diet.icon}</div>
                      <CardTitle>{diet.name}</CardTitle>
                      <CardDescription>{diet.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Recommended Foods</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {diet.foods.map((food, i) => (
                            <li key={i}>{food}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Tips</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {diet.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="restrictions">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2"
            >
              {restrictions.map((restriction) => (
                <motion.div key={restriction.id} variants={fadeInUp}>
                  <Card className="h-full">
                    <CardHeader className="pb-4">
                      <div className="mb-2">{restriction.icon}</div>
                      <CardTitle>{restriction.name}</CardTitle>
                      <CardDescription>{restriction.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Safe Foods</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {restriction.foods.map((food, i) => (
                            <li key={i}>{food}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-red-600">Foods to Avoid</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {restriction.avoid.map((food, i) => (
                            <li key={i} className="text-gray-700">{food}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DietaryPreferences;
