
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Scale, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [dietRecommendation, setDietRecommendation] = useState<string[]>([]);
  const { toast } = useToast();

  const calculateBMI = () => {
    if (!height || !weight || !age) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const heightInMeters = Number(height) / 100;
    const weightInKg = Number(weight);
    const ageNum = Number(age);

    if (heightInMeters <= 0 || weightInKg <= 0 || ageNum <= 0) {
      toast({
        title: "Invalid Values",
        description: "Please enter positive values for height, weight, and age.",
        variant: "destructive",
      });
      return;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setBmiResult(parseFloat(bmi.toFixed(1)));

    // Determine BMI category
    let category = '';
    let recommendations: string[] = [];

    if (bmi < 18.5) {
      category = 'Underweight';
      recommendations = [
        'Focus on nutrient-dense foods to gain weight healthily',
        'Eat more frequently throughout the day (5-6 smaller meals)',
        'Include healthy fats like avocados, nuts, and olive oil',
        'Add protein-rich foods to each meal',
        'Consider smoothies with fruits, protein, and healthy fats'
      ];
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      recommendations = [
        'Maintain a balanced diet with plenty of fruits and vegetables',
        'Include whole grains and lean proteins',
        'Stay hydrated with water throughout the day',
        'Limit processed foods and added sugars',
        'Continue regular physical activity'
      ];
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      recommendations = [
        'Focus on portion control and mindful eating',
        'Increase vegetable intake to feel fuller with fewer calories',
        'Choose lean proteins and reduce saturated fats',
        'Limit refined carbohydrates and added sugars',
        'Combine diet changes with regular physical activity'
      ];
    } else {
      category = 'Obesity';
      recommendations = [
        'Consult with a healthcare provider for personalized advice',
        'Focus on whole, unprocessed foods',
        'Control portions and consider keeping a food journal',
        'Gradually increase physical activity',
        'Set realistic, sustainable goals for weight loss'
      ];
    }

    // Add activity-based recommendations
    switch (activityLevel) {
      case 'sedentary':
        recommendations.push('Try to incorporate more movement into your daily routine');
        recommendations.push('Start with short walks and gradually increase duration');
        break;
      case 'lightly-active':
        recommendations.push('Aim to increase intensity of current activities');
        recommendations.push('Consider adding strength training 2 times per week');
        break;
      case 'moderately-active':
        recommendations.push('Maintain current activity level while focusing on nutrition');
        recommendations.push('Consider adding variety to your exercise routine');
        break;
      case 'very-active':
        recommendations.push('Ensure adequate protein intake for muscle recovery');
        recommendations.push('Focus on quality of nutrition to support high activity levels');
        break;
      case 'extra-active':
        recommendations.push('Consider working with a sports nutritionist for optimal performance');
        recommendations.push('Focus on recovery nutrition and adequate calorie intake');
        break;
    }

    setBmiCategory(category);
    setDietRecommendation(recommendations);
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setGender('male');
    setActivityLevel('sedentary');
    setBmiResult(null);
    setBmiCategory('');
    setDietRecommendation([]);
  };

  const getBmiCategoryColor = () => {
    if (bmiCategory === 'Underweight') return 'text-blue-600';
    if (bmiCategory === 'Normal weight') return 'text-green-600';
    if (bmiCategory === 'Overweight') return 'text-orange-600';
    if (bmiCategory === 'Obesity') return 'text-red-600';
    return '';
  };

  return (
    <section id="bmi-calculator" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-4 text-sm font-medium text-nutriwise-700 bg-nutriwise-100 rounded-full border border-nutriwise-200"
          >
            Body Mass Index
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            BMI Calculator
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Calculate your Body Mass Index and get personalized diet recommendations based on your results and activity level.
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
                <CardTitle className="flex items-center text-xl">
                  <Scale className="mr-2 h-5 w-5 text-nutriwise-600" />
                  Calculate Your BMI
                </CardTitle>
                <CardDescription>
                  Enter your details to calculate your BMI and receive tailored dietary advice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g. 170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g. 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g. 30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
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
                  </div>
                  
                  <div className="space-y-2 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="activity">Activity Level</Label>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger id="activity">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                        <SelectItem value="lightly-active">Lightly active (light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderately-active">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="very-active">Very active (hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="extra-active">Extra active (very hard exercise & physical job)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetCalculator}>Reset</Button>
                <Button className="bg-nutriwise-600 hover:bg-nutriwise-700" onClick={calculateBMI}>Calculate BMI</Button>
              </CardFooter>
            </Card>
          </motion.div>

          {bmiResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your BMI Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
                    <div className="text-4xl font-bold mb-2">{bmiResult}</div>
                    <div className={`text-lg font-medium ${getBmiCategoryColor()}`}>
                      {bmiCategory}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Personalized Diet Recommendations</h3>
                    <ul className="space-y-2">
                      {dietRecommendation.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-nutriwise-100 text-nutriwise-700 h-5 w-5 flex items-center justify-center rounded-full text-xs mr-2 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                    <p className="text-amber-800">
                      <strong>Note:</strong> BMI is a screening tool but does not diagnose body fatness or health. 
                      For personalized health advice, please consult with a healthcare professional.
                    </p>
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

export default BMICalculator;
