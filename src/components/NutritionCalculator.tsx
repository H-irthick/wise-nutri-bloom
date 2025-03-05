
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, Activity, Apple, Target } from 'lucide-react';

const NutritionCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calories');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [calculationResult, setCalculationResult] = useState<number | null>(null);

  const calculateCalories = () => {
    let bmr = 0;
    const weightNum = Number(weight);
    const heightNum = Number(height);
    const ageNum = Number(age);

    // BMR calculation using Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Activity multiplier
    let activityMultiplier = 1.2; // Sedentary
    if (activityLevel === 'light') {
      activityMultiplier = 1.375;
    } else if (activityLevel === 'moderate') {
      activityMultiplier = 1.55;
    } else if (activityLevel === 'active') {
      activityMultiplier = 1.725;
    } else if (activityLevel === 'very-active') {
      activityMultiplier = 1.9;
    }

    const result = Math.round(bmr * activityMultiplier);
    setCalculationResult(result);
  };

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
    <section id="calculator" className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-nutriwise-700 bg-nutriwise-100 rounded-full border border-nutriwise-200">
              Personalized Calculations
            </span>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Calculate Your Nutritional Needs
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Use our advanced calculators to determine your daily caloric needs, macronutrient ratios, and more.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-8">
              <TabsTrigger value="calories" className="gap-2">
                <Calculator className="h-4 w-4" />
                <span>Calories</span>
              </TabsTrigger>
              <TabsTrigger value="macros" className="gap-2">
                <Apple className="h-4 w-4" />
                <span>Macros</span>
              </TabsTrigger>
              <TabsTrigger value="targets" className="gap-2">
                <Target className="h-4 w-4" />
                <span>Targets</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Calorie Calculator</CardTitle>
                  <CardDescription>
                    Calculate your daily caloric needs based on your personal profile and activity level.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    variants={containerVariants}
                    className="grid gap-6 md:grid-cols-2"
                  >
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Years"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Kg"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="Cm"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="activity">Activity Level</Label>
                        <span className="text-sm text-muted-foreground capitalize">
                          {activityLevel.replace('-', ' ')}
                        </span>
                      </div>
                      <Select value={activityLevel} onValueChange={setActivityLevel}>
                        <SelectTrigger id="activity">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                          <SelectItem value="light">Light (exercise 1-3 times/week)</SelectItem>
                          <SelectItem value="moderate">Moderate (exercise 3-5 times/week)</SelectItem>
                          <SelectItem value="active">Active (exercise 6-7 times/week)</SelectItem>
                          <SelectItem value="very-active">Very Active (intense exercise daily)</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </motion.div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-6">
                  <Button 
                    className="w-full bg-nutriwise-600 hover:bg-nutriwise-700 text-white" 
                    onClick={calculateCalories}
                  >
                    Calculate Calories
                  </Button>
                  
                  {calculationResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full p-4 rounded-lg bg-nutriwise-50 border border-nutriwise-200 text-center"
                    >
                      <span className="text-sm text-nutriwise-700 font-medium">Estimated Daily Calories</span>
                      <p className="text-3xl font-bold text-nutriwise-800 mt-1">{calculationResult} kcal</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        This is an estimate based on the Mifflin-St Jeor Equation
                      </p>
                    </motion.div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="macros">
              <Card>
                <CardHeader>
                  <CardTitle>Macronutrient Calculator</CardTitle>
                  <CardDescription>
                    Calculate your ideal protein, carbs and fat intake based on your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-10">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">This feature is coming soon!</p>
                    <Button variant="outline" className="mt-4">Get Notified</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="targets">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Targets</CardTitle>
                  <CardDescription>
                    Set your personalized nutrition targets for optimal health.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-10">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">This feature is coming soon!</p>
                    <Button variant="outline" className="mt-4">Get Notified</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default NutritionCalculator;
