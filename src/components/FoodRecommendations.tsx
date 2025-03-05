
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  category: string;
  nutrients: string[];
  benefits: string;
  imageUrl: string;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Avocado',
    category: 'fruits',
    nutrients: ['Healthy Fats', 'Fiber', 'Vitamin E'],
    benefits: 'Supports heart health and provides essential fatty acids',
    imageUrl: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Salmon',
    category: 'proteins',
    nutrients: ['Omega-3', 'Protein', 'Vitamin D'],
    benefits: 'Reduces inflammation and supports brain health',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Quinoa',
    category: 'grains',
    nutrients: ['Complete Protein', 'Fiber', 'Magnesium'],
    benefits: 'Provides all essential amino acids and supports digestion',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8d7?w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Spinach',
    category: 'vegetables',
    nutrients: ['Iron', 'Vitamin K', 'Antioxidants'],
    benefits: 'Supports bone health and provides essential nutrients',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Blueberries',
    category: 'fruits',
    nutrients: ['Antioxidants', 'Vitamin C', 'Fiber'],
    benefits: 'Protects against oxidative stress and inflammation',
    imageUrl: 'https://images.unsplash.com/photo-1566400628146-34609d34295d?w=500&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Greek Yogurt',
    category: 'dairy',
    nutrients: ['Protein', 'Probiotics', 'Calcium'],
    benefits: 'Supports gut health and provides high-quality protein',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=500&auto=format&fit=crop'
  },
];

const FoodRecommendations: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="foods" className="py-20 md:py-28 bg-gradient-to-b from-white to-nutriwise-50/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-nutriwise-700 bg-nutriwise-100 rounded-full border border-nutriwise-200">
              Nutritional Insights
            </span>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover Nutrient-Rich Foods
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our curated selection of foods that offer exceptional nutritional benefits for your health goals.
          </motion.p>
        </div>

        <Tabs defaultValue="all" className="w-full max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="fruits">Fruits</TabsTrigger>
              <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
              <TabsTrigger value="proteins">Proteins</TabsTrigger>
              <TabsTrigger value="grains">Grains</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {foodItems.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </motion.div>
          </TabsContent>
          
          {['fruits', 'vegetables', 'proteins', 'grains', 'dairy'].map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {foodItems
                  .filter((food) => food.category === category)
                  .map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-center mt-12">
          <Button className="bg-nutriwise-600 hover:bg-nutriwise-700 text-white">
            View All Foods
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const FoodCard: React.FC<{ food: FoodItem }> = ({ food }) => {
  return (
    <motion.div variants={{ 
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={food.imageUrl} 
            alt={food.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{food.name}</CardTitle>
            <Badge variant="outline" className="capitalize bg-nutriwise-50 text-nutriwise-700 border-nutriwise-200">
              {food.category}
            </Badge>
          </div>
          <CardDescription>{food.benefits}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {food.nutrients.map((nutrient, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                {nutrient}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full text-nutriwise-700 hover:text-nutriwise-800 hover:bg-nutriwise-50">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FoodRecommendations;
