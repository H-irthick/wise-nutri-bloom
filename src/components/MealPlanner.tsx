
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Utensils, Heart, Brain, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MealPlan {
  title: string;
  description: string;
  meals: {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  }[];
  tips: string[];
}

// Sample meal plans data
const mealPlansData: Record<string, Record<string, MealPlan>> = {
  // Weight loss plans
  'weight-loss': {
    'vegetarian': {
      title: 'Vegetarian Weight Loss Plan',
      description: 'A balanced vegetarian meal plan designed for sustainable weight loss.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Greek yogurt with berries and a tablespoon of honey',
          lunch: 'Quinoa salad with mixed vegetables and feta cheese',
          dinner: 'Lentil soup with a side of steamed vegetables',
          snack: 'Apple slices with almond butter'
        },
        {
          day: 'Tuesday',
          breakfast: 'Vegetable omelette with whole grain toast',
          lunch: 'Spinach and chickpea curry with brown rice',
          dinner: 'Stuffed bell peppers with quinoa and black beans',
          snack: 'Carrot sticks with hummus'
        },
        {
          day: 'Wednesday',
          breakfast: 'Overnight oats with chia seeds and berries',
          lunch: 'Mediterranean vegetable wrap with tzatziki',
          dinner: 'Vegetable stir-fry with tofu and brown rice',
          snack: 'Mixed nuts and dried fruits (small portion)'
        }
      ],
      tips: [
        'Focus on protein at every meal to maintain muscle mass while losing weight',
        'Choose complex carbohydrates over simple carbs',
        'Use herbs and spices to add flavor without extra calories',
        'Stay hydrated by drinking at least 8 glasses of water daily'
      ]
    },
    'vegan': {
      title: 'Vegan Weight Loss Plan',
      description: 'A plant-based meal plan to help you lose weight healthily.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Smoothie with spinach, banana, berries and plant-based protein powder',
          lunch: 'Buddha bowl with roasted vegetables, quinoa and tahini dressing',
          dinner: 'Lentil and vegetable soup with a side salad',
          snack: 'Rice cakes with avocado'
        },
        {
          day: 'Tuesday',
          breakfast: 'Tofu scramble with vegetables and whole grain toast',
          lunch: 'Chickpea and vegetable salad with lemon-tahini dressing',
          dinner: 'Zucchini noodles with marinara sauce and nutritional yeast',
          snack: 'Edamame beans'
        },
        {
          day: 'Wednesday',
          breakfast: 'Chia seed pudding made with almond milk and topped with fruits',
          lunch: 'Sweet potato and black bean wrap',
          dinner: 'Cauliflower and chickpea curry with brown rice',
          snack: 'Apple slices with peanut butter'
        }
      ],
      tips: [
        'Include a source of plant-based protein in every meal',
        'Consider B12 supplements which are essential for vegans',
        'Incorporate a variety of colorful vegetables for essential nutrients',
        'Watch portion sizes of calorie-dense foods like nuts and seeds'
      ]
    },
    'non-vegetarian': {
      title: 'Non-Vegetarian Weight Loss Plan',
      description: 'A protein-rich meal plan with lean meats for effective weight loss.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Egg white omelette with vegetables and whole grain toast',
          lunch: 'Grilled chicken salad with mixed greens and olive oil dressing',
          dinner: 'Baked salmon with steamed broccoli and quinoa',
          snack: 'Greek yogurt with berries'
        },
        {
          day: 'Tuesday',
          breakfast: 'Protein smoothie with whey protein, banana, and almond milk',
          lunch: 'Turkey and vegetable wrap with whole grain tortilla',
          dinner: 'Lean beef stir-fry with vegetables and brown rice',
          snack: 'Hard-boiled egg with cherry tomatoes'
        },
        {
          day: 'Wednesday',
          breakfast: 'Cottage cheese with fruit and a sprinkle of nuts',
          lunch: 'Tuna salad with mixed greens and light dressing',
          dinner: 'Grilled shrimp with zucchini noodles and tomato sauce',
          snack: 'Sliced turkey breast with cucumber'
        }
      ],
      tips: [
        'Choose lean protein sources like chicken breast, fish, and lean cuts of beef',
        'Control portion sizes, especially for protein and carbohydrates',
        'Include vegetables in every meal for fiber and nutrients',
        'Limit added oils and opt for grilling or baking instead of frying'
      ]
    }
  },
  // Heart health plans
  'heart-health': {
    'vegetarian': {
      title: 'Heart-Healthy Vegetarian Plan',
      description: 'A vegetarian meal plan designed to support cardiovascular health.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Steel-cut oatmeal with berries, flaxseeds and a drizzle of honey',
          lunch: 'Mediterranean salad with chickpeas, olives, tomatoes and feta',
          dinner: 'Eggplant and lentil stew with a side of quinoa',
          snack: 'Handful of unsalted almonds'
        },
        {
          day: 'Tuesday',
          breakfast: 'Whole grain toast with avocado and a boiled egg',
          lunch: 'Vegetable soup with a whole grain roll',
          dinner: 'Portobello mushroom "steak" with roasted sweet potatoes and steamed greens',
          snack: 'Orange slices with a small piece of dark chocolate'
        },
        {
          day: 'Wednesday',
          breakfast: 'Yogurt parfait with low-fat yogurt, granola and berries',
          lunch: 'Spinach and bean burrito with salsa',
          dinner: 'Vegetable curry with brown rice',
          snack: 'Celery sticks with hummus'
        }
      ],
      tips: [
        'Include heart-healthy fats like olive oil, avocados, and nuts',
        'Choose whole grains over refined carbohydrates',
        'Limit sodium by using herbs and spices for flavor',
        'Include sources of omega-3 fatty acids like flaxseeds and walnuts'
      ]
    },
    'vegan': {
      title: 'Heart-Healthy Vegan Plan',
      description: 'A plant-based meal plan focused on cardiovascular health optimization.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Overnight oats with chia seeds, almond milk and berries',
          lunch: 'Kale and quinoa salad with lemon-tahini dressing',
          dinner: 'Bean and vegetable chili with avocado slices',
          snack: 'Walnuts and dried cranberries'
        },
        {
          day: 'Tuesday',
          breakfast: 'Whole grain toast with almond butter and banana slices',
          lunch: 'Lentil soup with whole grain bread',
          dinner: 'Stuffed bell peppers with quinoa, black beans and vegetables',
          snack: 'Apple slices with cinnamon'
        },
        {
          day: 'Wednesday',
          breakfast: 'Green smoothie with spinach, banana, berries and flaxseeds',
          lunch: 'Chickpea and vegetable wrap with tahini sauce',
          dinner: 'Tofu and vegetable stir-fry with brown rice',
          snack: 'Roasted chickpeas with spices'
        }
      ],
      tips: [
        'Incorporate plant-based sources of omega-3s like flaxseeds, chia seeds, and walnuts',
        'Choose whole food sources of plant protein',
        'Include plenty of fiber-rich foods for heart health',
        'Consider supplementing with vitamin B12'
      ]
    },
    'non-vegetarian': {
      title: 'Heart-Healthy Non-Vegetarian Plan',
      description: 'A balanced meal plan with lean proteins to support heart health.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Oatmeal with berries and a tablespoon of ground flaxseeds',
          lunch: 'Grilled chicken salad with olive oil and vinegar dressing',
          dinner: 'Baked salmon with quinoa and steamed vegetables',
          snack: 'Handful of unsalted almonds'
        },
        {
          day: 'Tuesday',
          breakfast: 'Whole grain toast with avocado and a poached egg',
          lunch: 'Turkey and vegetable soup with a whole grain roll',
          dinner: 'Lean beef stir-fry with vegetables and brown rice (small portion)',
          snack: 'Greek yogurt with berries'
        },
        {
          day: 'Wednesday',
          breakfast: 'Greek yogurt parfait with fruits and a sprinkle of nuts',
          lunch: 'Tuna salad (made with olive oil) on whole grain bread',
          dinner: 'Grilled fish with roasted vegetables and quinoa',
          snack: 'Carrot sticks with hummus'
        }
      ],
      tips: [
        'Choose fatty fish like salmon at least twice a week for omega-3s',
        'Limit red meat to once a week and choose lean cuts',
        'Choose skinless poultry and trim visible fat from meat',
        'Avoid processed meats high in sodium and preservatives'
      ]
    }
  },
  // Diabetes management plans
  'diabetes': {
    'vegetarian': {
      title: 'Diabetes-Friendly Vegetarian Plan',
      description: 'A vegetarian meal plan designed to help manage blood sugar levels.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Greek yogurt with a small amount of berries and chopped nuts',
          lunch: 'Chickpea and vegetable salad with olive oil dressing',
          dinner: 'Lentil curry with cauliflower rice',
          snack: 'Celery sticks with almond butter'
        },
        {
          day: 'Tuesday',
          breakfast: 'Vegetable omelette with a slice of whole grain toast',
          lunch: 'Bean soup with a side salad',
          dinner: 'Stir-fried tofu with non-starchy vegetables',
          snack: 'Small handful of mixed nuts'
        },
        {
          day: 'Wednesday',
          breakfast: 'Chia seed pudding made with unsweetened almond milk',
          lunch: 'Quinoa bowl with roasted vegetables and feta cheese',
          dinner: 'Stuffed bell peppers with cottage cheese and vegetables',
          snack: 'Hard-boiled egg'
        }
      ],
      tips: [
        'Focus on low glycemic index foods to help manage blood sugar',
        'Control portion sizes, especially for carbohydrates',
        'Distribute carbohydrate intake evenly throughout the day',
        'Include protein and healthy fats with carbs to slow absorption'
      ]
    },
    'vegan': {
      title: 'Diabetes-Friendly Vegan Plan',
      description: 'A plant-based approach to managing diabetes through diet.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Tofu scramble with spinach and nutritional yeast',
          lunch: 'Lentil and vegetable soup',
          dinner: 'Tempeh stir-fry with low-carb vegetables',
          snack: 'Cucumber slices with guacamole'
        },
        {
          day: 'Tuesday',
          breakfast: 'Chia seed pudding with unsweetened plant milk and cinnamon',
          lunch: 'Chickpea salad with olive oil dressing',
          dinner: 'Zucchini noodles with lentil bolognese',
          snack: 'Small handful of walnuts'
        },
        {
          day: 'Wednesday',
          breakfast: 'Green smoothie with plant protein, spinach, and avocado (no added sugar)',
          lunch: 'Mexican-style cauliflower rice bowl with beans and guacamole',
          dinner: 'Tofu and vegetable curry with minimal rice',
          snack: 'Olives'
        }
      ],
      tips: [
        'Choose low glycemic index carbohydrates like beans and lentils',
        'Be careful with fruit intake and choose lower-sugar options',
        'Read labels carefully as many vegan products can be high in carbs',
        'Include plenty of fiber to help manage blood sugar'
      ]
    },
    'non-vegetarian': {
      title: 'Diabetes-Friendly Non-Vegetarian Plan',
      description: 'A protein-focused meal plan to help manage diabetes.',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Scrambled eggs with spinach',
          lunch: 'Grilled chicken salad with olive oil dressing',
          dinner: 'Baked fish with roasted non-starchy vegetables',
          snack: 'Small piece of cheese with cucumber slices'
        },
        {
          day: 'Tuesday',
          breakfast: 'Greek yogurt with a sprinkle of nuts and cinnamon',
          lunch: 'Turkey lettuce wraps with avocado',
          dinner: 'Beef and vegetable stir-fry (minimal sauce)',
          snack: 'Hard-boiled egg'
        },
        {
          day: 'Wednesday',
          breakfast: 'Protein smoothie with unsweetened almond milk and berries',
          lunch: 'Tuna salad on a bed of greens',
          dinner: 'Roast chicken with cauliflower mash and greens',
          snack: 'Beef jerky (no added sugar)'
        }
      ],
      tips: [
        'Focus on protein and healthy fats to help maintain stable blood sugar',
        'Limit carbohydrates and choose low glycemic index options',
        'Be cautious with sauces and marinades that may contain hidden sugars',
        'Include regular meals and snacks to prevent blood sugar fluctuations'
      ]
    }
  }
};

const MealPlanner: React.FC = () => {
  const [dietaryPreference, setDietaryPreference] = useState('vegetarian');
  const [healthGoal, setHealthGoal] = useState('weight-loss');
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const { toast } = useToast();

  const generateMealPlan = () => {
    // Getting the selected meal plan from our data
    if (mealPlansData[healthGoal] && mealPlansData[healthGoal][dietaryPreference]) {
      setSelectedPlan(mealPlansData[healthGoal][dietaryPreference]);
      toast({
        title: "Meal Plan Generated",
        description: `Your ${dietaryPreference} plan for ${healthGoal.replace('-', ' ')} is ready!`,
      });
    } else {
      setSelectedPlan(null);
      toast({
        title: "Plan Unavailable",
        description: "This specific combination is not available yet. Please try a different selection.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="meal-planner" className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-4 text-sm font-medium text-nutriwise-700 bg-nutriwise-100 rounded-full border border-nutriwise-200"
          >
            Personalized Nutrition
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Personalized Meal Plans
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Generate customized meal plans based on your dietary preferences, health goals, and specific requirements.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-nutriwise-600" />
                  Create Your Meal Plan
                </CardTitle>
                <CardDescription>
                  Select your preferences to generate a customized meal plan tailored to your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dietary-preference">Dietary Preference</Label>
                    <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                      <SelectTrigger id="dietary-preference">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="health-goal">Health Goal</Label>
                    <Select value={healthGoal} onValueChange={setHealthGoal}>
                      <SelectTrigger id="health-goal">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="heart-health">Heart Health</SelectItem>
                        <SelectItem value="diabetes">Diabetes Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-nutriwise-600 hover:bg-nutriwise-700" onClick={generateMealPlan}>
                  <Calendar className="mr-2 h-4 w-4" /> Generate Meal Plan
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{selectedPlan.title}</CardTitle>
                  <CardDescription>{selectedPlan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={selectedPlan.meals[0].day.toLowerCase()}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      {selectedPlan.meals.map((meal, index) => (
                        <TabsTrigger key={index} value={meal.day.toLowerCase()}>
                          {meal.day}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {selectedPlan.meals.map((meal, index) => (
                      <TabsContent key={index} value={meal.day.toLowerCase()}>
                        <div className="space-y-6">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="p-4 rounded-lg bg-muted/50 border">
                              <div className="flex items-center mb-2">
                                <span className="bg-nutriwise-100 p-1.5 rounded-full mr-2">
                                  <Utensils className="h-4 w-4 text-nutriwise-600" />
                                </span>
                                <h3 className="font-medium">Breakfast</h3>
                              </div>
                              <p className="text-sm">{meal.breakfast}</p>
                            </div>
                            
                            <div className="p-4 rounded-lg bg-muted/50 border">
                              <div className="flex items-center mb-2">
                                <span className="bg-nutriwise-100 p-1.5 rounded-full mr-2">
                                  <Utensils className="h-4 w-4 text-nutriwise-600" />
                                </span>
                                <h3 className="font-medium">Lunch</h3>
                              </div>
                              <p className="text-sm">{meal.lunch}</p>
                            </div>
                            
                            <div className="p-4 rounded-lg bg-muted/50 border">
                              <div className="flex items-center mb-2">
                                <span className="bg-nutriwise-100 p-1.5 rounded-full mr-2">
                                  <Utensils className="h-4 w-4 text-nutriwise-600" />
                                </span>
                                <h3 className="font-medium">Dinner</h3>
                              </div>
                              <p className="text-sm">{meal.dinner}</p>
                            </div>
                            
                            <div className="p-4 rounded-lg bg-muted/50 border">
                              <div className="flex items-center mb-2">
                                <span className="bg-nutriwise-100 p-1.5 rounded-full mr-2">
                                  <Utensils className="h-4 w-4 text-nutriwise-600" />
                                </span>
                                <h3 className="font-medium">Snack</h3>
                              </div>
                              <p className="text-sm">{meal.snack}</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                  
                  <div className="mt-6 p-4 rounded-lg bg-nutriwise-50 border border-nutriwise-200">
                    <div className="flex items-center mb-3">
                      <span className="bg-nutriwise-100 p-1.5 rounded-full mr-2">
                        <Brain className="h-4 w-4 text-nutriwise-600" />
                      </span>
                      <h3 className="font-medium">Dietary Tips & Recommendations</h3>
                    </div>
                    <ul className="space-y-2">
                      {selectedPlan.tips.map((tip, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-nutriwise-600 mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MealPlanner;
