
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clipboard, PieChart, BarChart, LineChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart as RechartsChart, Pie, Cell, BarChart as RechartBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Food database with nutritional information
const foodDatabase = [
  {
    name: 'Apple',
    calories: 52,
    carbs: 14,
    protein: 0.3,
    fat: 0.2,
    fiber: 2.4,
    sugar: 10.3,
    category: 'Fruit',
    servingSize: '1 medium (182g)'
  },
  {
    name: 'Banana',
    calories: 89,
    carbs: 23,
    protein: 1.1,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    category: 'Fruit',
    servingSize: '1 medium (118g)'
  },
  {
    name: 'Chicken Breast',
    calories: 165,
    carbs: 0,
    protein: 31,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    category: 'Meat',
    servingSize: '100g (cooked)'
  },
  {
    name: 'Salmon',
    calories: 206,
    carbs: 0,
    protein: 22,
    fat: 13,
    fiber: 0,
    sugar: 0,
    category: 'Fish',
    servingSize: '100g (cooked)'
  },
  {
    name: 'Brown Rice',
    calories: 112,
    carbs: 24,
    protein: 2.3,
    fat: 0.8,
    fiber: 1.8,
    sugar: 0.4,
    category: 'Grain',
    servingSize: '100g (cooked)'
  },
  {
    name: 'Broccoli',
    calories: 31,
    carbs: 6,
    protein: 2.5,
    fat: 0.3,
    fiber: 2.4,
    sugar: 1.5,
    category: 'Vegetable',
    servingSize: '100g (raw)'
  },
  {
    name: 'Egg',
    calories: 72,
    carbs: 0.4,
    protein: 6.3,
    fat: 5,
    fiber: 0,
    sugar: 0.4,
    category: 'Dairy & Eggs',
    servingSize: '1 large (50g)'
  },
  {
    name: 'Avocado',
    calories: 160,
    carbs: 8.5,
    protein: 2,
    fat: 14.7,
    fiber: 6.7,
    sugar: 0.7,
    category: 'Fruit',
    servingSize: '100g (raw)'
  },
  {
    name: 'Quinoa',
    calories: 120,
    carbs: 21.3,
    protein: 4.4,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    category: 'Grain',
    servingSize: '100g (cooked)'
  },
  {
    name: 'Sweet Potato',
    calories: 86,
    carbs: 20.1,
    protein: 1.6,
    fat: 0.1,
    fiber: 3,
    sugar: 4.2,
    category: 'Vegetable',
    servingSize: '100g (baked)'
  }
];

const NutritionalAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<typeof foodDatabase[0] | null>(null);
  const [filteredFoods, setFilteredFoods] = useState<typeof foodDatabase>([]);
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredFoods([]);
      setShowResults(false);
      return;
    }
    
    const results = foodDatabase.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredFoods(results);
    setShowResults(true);
  };

  const handleSelectFood = (food: typeof foodDatabase[0]) => {
    setSelectedFood(food);
    setSearchTerm('');
    setShowResults(false);
  };

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const macroData = selectedFood ? [
    { name: 'Carbs', value: selectedFood.carbs, label: `${selectedFood.carbs}g` },
    { name: 'Protein', value: selectedFood.protein, label: `${selectedFood.protein}g` },
    { name: 'Fat', value: selectedFood.fat, label: `${selectedFood.fat}g` },
    { name: 'Fiber', value: selectedFood.fiber, label: `${selectedFood.fiber}g` }
  ] : [];

  return (
    <section id="nutritional-analysis" className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-4 text-sm font-medium text-nutriwise-700 bg-nutriwise-100 rounded-full border border-nutriwise-200"
          >
            Food Analysis
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Nutritional Analysis
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Get detailed insights into the nutritional composition of foods, including macronutrients, carbs, proteins, and fats.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex">
            <Input
              placeholder="Search food (e.g. Apple, Chicken, Rice)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="ml-2 bg-nutriwise-600 hover:bg-nutriwise-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {showResults && filteredFoods.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-2">
                <ul className="divide-y">
                  {filteredFoods.map((food, index) => (
                    <li key={index} className="py-2 px-3 hover:bg-muted cursor-pointer rounded" onClick={() => handleSelectFood(food)}>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{food.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{food.category}</span>
                        </div>
                        <span className="text-sm">{food.calories} kcal</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {showResults && filteredFoods.length === 0 && (
            <div className="mt-4 text-center p-4 border rounded-md">
              <p className="text-muted-foreground">No foods found matching "{searchTerm}"</p>
            </div>
          )}
        </motion.div>

        {selectedFood && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedFood.name}</span>
                  <span className="text-nutriwise-600">{selectedFood.calories} kcal</span>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {selectedFood.category} · {selectedFood.servingSize}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="macros">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="macros" className="text-xs sm:text-sm"><PieChart className="h-4 w-4 mr-1" /> Macronutrients</TabsTrigger>
                    <TabsTrigger value="detailed" className="text-xs sm:text-sm"><BarChart className="h-4 w-4 mr-1" /> Detailed View</TabsTrigger>
                    <TabsTrigger value="comparison" className="text-xs sm:text-sm"><LineChart className="h-4 w-4 mr-1" /> % Daily Value</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="macros" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}g`}
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="detailed" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Carbs', value: selectedFood.carbs },
                          { name: 'Protein', value: selectedFood.protein },
                          { name: 'Fat', value: selectedFood.fat },
                          { name: 'Fiber', value: selectedFood.fiber },
                          { name: 'Sugar', value: selectedFood.sugar }
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'grams', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="grams" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="comparison" className="h-80">
                    <div className="space-y-3">
                      <div className="text-center text-sm text-muted-foreground mb-4">
                        Percentage of recommended daily intake (based on 2,000 calorie diet)
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label>Calories</Label>
                            <span className="text-sm">{Math.round((selectedFood.calories / 2000) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-nutriwise-600" 
                              style={{ width: `${Math.min(100, Math.round((selectedFood.calories / 2000) * 100))}%` }} 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label>Carbs</Label>
                            <span className="text-sm">{Math.round((selectedFood.carbs / 300) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${Math.min(100, Math.round((selectedFood.carbs / 300) * 100))}%` }} 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label>Protein</Label>
                            <span className="text-sm">{Math.round((selectedFood.protein / 50) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500" 
                              style={{ width: `${Math.min(100, Math.round((selectedFood.protein / 50) * 100))}%` }} 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label>Fat</Label>
                            <span className="text-sm">{Math.round((selectedFood.fat / 65) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-500" 
                              style={{ width: `${Math.min(100, Math.round((selectedFood.fat / 65) * 100))}%` }} 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label>Fiber</Label>
                            <span className="text-sm">{Math.round((selectedFood.fiber / 25) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500" 
                              style={{ width: `${Math.min(100, Math.round((selectedFood.fiber / 25) * 100))}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NutritionalAnalysis;
