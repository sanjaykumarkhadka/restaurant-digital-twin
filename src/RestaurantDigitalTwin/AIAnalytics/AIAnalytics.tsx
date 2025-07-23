import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import {
  ChefHat,
  Utensils,
  Clock,
  TrendingUp,
  Zap,
  MessageSquare,
  User,
  Users,
  BarChart2,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertCircle,
  Bookmark,
  ClipboardList,
  Rocket,
  ShoppingBasket,
  Star,
  Coffee,
  Wine,
  Salad,
  Pizza,
  Sandwich,
  Dessert
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for restaurant insights
const restaurantData = {
  predictiveAnalytics: [
    {
      customerId: "C10045",
      name: "Alex Johnson",
      visitFrequency: "weekly",
      lifetimeValue: 1250,
      preferences: ["Italian", "Vegetarian options", "Wine pairings"],
      predictedChurnRisk: 28,
      reasons: ["Last visit 3 weeks ago", "Negative review about service", "Competitor coupon used"],
      recommendedActions: ["Personalized offer", "Service recovery", "Loyalty bonus"]
    },
    {
      customerId: "C10072",
      name: "Maria Garcia",
      visitFrequency: "monthly",
      lifetimeValue: 850,
      preferences: ["Mexican", "Spicy dishes", "Margaritas"],
      predictedChurnRisk: 15,
      reasons: ["Regular but decreasing frequency"],
      recommendedActions: ["Seasonal menu preview", "Happy hour invitation"]
    },
    {
      customerId: "C10089",
      name: "Jamal Williams",
      visitFrequency: "daily",
      lifetimeValue: 3200,
      preferences: ["Burgers", "Craft beer", "Quick service"],
      predictedChurnRisk: 5,
      reasons: ["Highly engaged"],
      recommendedActions: ["VIP treatment", "Exclusive tasting invite"]
    }
  ],
  menuRecommendations: [
    {
      menuItem: "Truffle Pasta",
      performance: 92,
      popularityTrend: "up",
      profitMargin: 65,
      recommendations: [
        "Feature as weekly special",
        "Pair with Chardonnay promotion",
        "Add premium version with shrimp"
      ]
    },
    {
      menuItem: "Classic Burger",
      performance: 85,
      popularityTrend: "steady",
      profitMargin: 45,
      recommendations: [
        "Bundle with craft beer",
        "Create deluxe version",
        "Highlight as bestseller"
      ]
    },
    {
      menuItem: "Avocado Toast",
      performance: 42,
      popularityTrend: "down",
      profitMargin: 30,
      recommendations: [
        "Revamp presentation",
        "Adjust pricing",
        "Consider seasonal variation"
      ]
    }
  ],
  resourceUtilization: {
    kitchen: 78,
    dining: 65,
    bar: 55,
    delivery: 72,
    optimalUtilization: {
      kitchen: 85,
      dining: 75,
      bar: 70,
      delivery: 80
    }
  },
  automationReports: [
    {
      type: "daily",
      generated: "1 hour ago",
      recipients: ["Manager", "Head Chef"],
      highlights: ["Peak hours identified", "3 menu items low stock", "Staffing adjustments made"]
    },
    {
      type: "weekly",
      generated: "2 days ago",
      recipients: ["Owner", "Marketing"],
      highlights: ["Customer satisfaction 94%", "Top performing menu items", "Waste reduction 12%"]
    }
  ],
  nlpQueries: [
    {
      query: "Show busiest times last week",
      response: "Peak times: Friday 7-9pm (92% capacity), Saturday 8-10pm (95% capacity)"
    },
    {
      query: "What's the most profitable menu category?",
      response: "Most profitable category: Beverages (68% margin), followed by Pasta (52% margin)"
    }
  ],
  performanceRadarData: [
    {
      metric: "Service Speed",
      current: 75,
      target: 90
    },
    {
      metric: "Food Quality",
      current: 88,
      target: 95
    },
    {
      metric: "Cleanliness",
      current: 92,
      target: 95
    },
    {
      metric: "Value Perception",
      current: 78,
      target: 85
    },
    {
      metric: "Atmosphere",
      current: 85,
      target: 90
    }
  ],
  salesData: [
    { name: 'Mon', sales: 3200 },
    { name: 'Tue', sales: 2800 },
    { name: 'Wed', sales: 3500 },
    { name: 'Thu', sales: 4200 },
    { name: 'Fri', sales: 6800 },
    { name: 'Sat', sales: 7200 },
    { name: 'Sun', sales: 5800 }
  ],
  categorySales: [
    { name: 'Appetizers', value: 18 },
    { name: 'Mains', value: 45 },
    { name: 'Desserts', value: 12 },
    { name: 'Beverages', value: 25 }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
const CATEGORY_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AIAnalytics() {
  const [activeTab, setActiveTab] = useState('predictive');
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [query, setQuery] = useState('');
  const [queryHistory, setQueryHistory] = useState([]);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;
    
    // Simulate AI response
    const newEntry = {
      query,
      response: `AI response to "${query}". Sample data: Based on analysis, we recommend...`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setQueryHistory([newEntry, ...queryHistory]);
    setQuery('');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-amber-900/20 to-red-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header with animated AI icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <ChefHat className="h-10 w-10 text-amber-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 
              to-red-400 bg-clip-text text-transparent">
              Restaurant AI Cortex
            </h1>
            <p className="text-muted-foreground">
              Predictive analytics & intelligent automation for your digital twin
            </p>
          </div>
        </div>
        <Badge className="bg-amber-500/10 text-amber-500 px-4 py-1.5">
          <Zap className="h-4 w-4 mr-2" />
          Real-time Mode
        </Badge>
      </div>

      {/* Main tabs navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg">
          <TabsTrigger value="predictive" className="flex gap-2">
            <AlertCircle className="h-4 w-4" />
            Predictive
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex gap-2">
            <Utensils className="h-4 w-4" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex gap-2">
            <ShoppingBasket className="h-4 w-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex gap-2">
            <ClipboardList className="h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="ask" className="flex gap-2">
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </TabsTrigger>
        </TabsList>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-400" />
                Customer Churn Prediction
              </h3>
              
              <div className="space-y-4">
                {restaurantData.predictiveAnalytics.map((customer, index) => (
                  <Card key={index} className={`p-4 ${
                    customer.predictedChurnRisk > 20 
                      ? 'bg-red-500/10 border-red-500/30'
                      : customer.predictedChurnRisk > 10
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedCustomer(expandedCustomer === index ? null : index)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{customer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.visitFrequency} visitor • ${customer.lifetimeValue} LTV
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <Progress 
                            value={customer.predictedChurnRisk} 
                            className={`h-2 ${
                              customer.predictedChurnRisk > 20 
                                ? 'bg-red-500' 
                                : customer.predictedChurnRisk > 10
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`} 
                          />
                          <div className="text-xs text-right mt-1">
                            {customer.predictedChurnRisk}% churn risk
                          </div>
                        </div>
                        {expandedCustomer === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    
                    {expandedCustomer === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-3"
                      >
                        <div>
                          <h4 className="text-sm font-medium mb-1">Preferences:</h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {customer.preferences.map((pref, i) => (
                              <Badge key={i} variant="outline" className="flex items-center gap-1">
                                {pref === 'Italian' && <Pizza className="h-3 w-3" />}
                                {pref === 'Vegetarian options' && <Salad className="h-3 w-3" />}
                                {pref === 'Wine pairings' && <Wine className="h-3 w-3" />}
                                {pref === 'Mexican' && <Pepper className="h-3 w-3" />}
                                {pref === 'Spicy dishes' && <Flame className="h-3 w-3" />}
                                {pref === 'Margaritas' && <Cocktail className="h-3 w-3" />}
                                {pref === 'Burgers' && <Hamburger className="h-3 w-3" />}
                                {pref === 'Craft beer' && <Beer className="h-3 w-3" />}
                                {pref === 'Quick service' && <Zap className="h-3 w-3" />}
                                {pref}
                              </Badge>
                            ))}
                          </div>
                          <h4 className="text-sm font-medium mb-1">Risk Factors:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {customer.reasons.map((reason, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">AI Recommendations:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {customer.recommendedActions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Create Retention Plan
                        </Button>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
            
            <div className="space-y-6">
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400" />
                  Customer Experience
                </h3>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={restaurantData.performanceRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar 
                        name="Current" 
                        dataKey="current" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={0.4} 
                      />
                      <Radar 
                        name="Target" 
                        dataKey="target" 
                        stroke="#ec4899" 
                        fill="#ec4899" 
                        fillOpacity={0.4} 
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    Radar chart shows current vs target performance metrics.
                    Gaps indicate areas needing improvement.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-blue-400" />
                  Sales by Category
                </h3>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={restaurantData.categorySales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {restaurantData.categorySales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Menu Analytics Tab */}
        <TabsContent value="menu" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-amber-400" />
                Menu Performance
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={restaurantData.salesData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Best Day</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      Saturday
                    </span>
                  </div>
                  <div className="text-xl font-bold mt-2">
                    ${Math.max(...restaurantData.salesData.map(d => d.sales)).toLocaleString()}
                  </div>
                </Card>
                
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Weekly Avg</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      ${(restaurantData.salesData.reduce((a,b) => a + b.sales, 0) / 7).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    +12% vs last week
                  </div>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Worst Day</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      Tuesday
                    </span>
                  </div>
                  <div className="text-xl font-bold mt-2">
                    ${Math.min(...restaurantData.salesData.map(d => d.sales)).toLocaleString()}
                  </div>
                </Card>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-400" />
                Menu Recommendations
              </h3>
              
              <div className="space-y-4">
                {restaurantData.menuRecommendations.map((item, index) => (
                  <Card key={index} className={`p-4 ${
                    item.performance > 80 
                      ? 'bg-green-500/10 border-green-500/30'
                      : item.performance > 50
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{item.menuItem}</h4>
                      <Badge variant="outline" className={
                        item.popularityTrend === 'up' ? 'bg-green-500/10 text-green-500' :
                        item.popularityTrend === 'down' ? 'bg-red-500/10 text-red-500' :
                        'bg-blue-500/10 text-blue-500'
                      }>
                        {item.popularityTrend === 'up' ? '↑ Trending' :
                         item.popularityTrend === 'down' ? '↓ Declining' : '→ Steady'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Performance</div>
                        <div className="text-xl font-bold">{item.performance}/100</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Profit Margin</div>
                        <div className="text-xl font-bold">{item.profitMargin}%</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">AI Recommendations:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {item.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Optimize This Item
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Operations Optimization Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <ShoppingBasket className="h-5 w-5 text-blue-400" />
                Resource Utilization
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Kitchen', current: restaurantData.resourceUtilization.kitchen, optimal: restaurantData.resourceUtilization.optimalUtilization.kitchen },
                    { name: 'Dining', current: restaurantData.resourceUtilization.dining, optimal: restaurantData.resourceUtilization.optimalUtilization.dining },
                    { name: 'Bar', current: restaurantData.resourceUtilization.bar, optimal: restaurantData.resourceUtilization.optimalUtilization.bar },
                    { name: 'Delivery', current: restaurantData.resourceUtilization.delivery, optimal: restaurantData.resourceUtilization.optimalUtilization.delivery }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="current" name="Current Usage %" fill="#8884d8">
                      {[0, 1, 2, 3].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                    <Bar dataKey="optimal" name="Optimal Target %" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Kitchen</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {restaurantData.resourceUtilization.kitchen}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {restaurantData.resourceUtilization.optimalUtilization.kitchen}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={restaurantData.resourceUtilization.kitchen} 
                      className="h-2 bg-blue-500/30" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Dining</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {restaurantData.resourceUtilization.dining}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {restaurantData.resourceUtilization.optimalUtilization.dining}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={restaurantData.resourceUtilization.dining} 
                      className="h-2 bg-purple-500/30" 
                      indicatorClassName="bg-purple-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-pink-500/10 border-pink-500/30">
                  <h4 className="font-medium mb-2">Bar</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {restaurantData.resourceUtilization.bar}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {restaurantData.resourceUtilization.optimalUtilization.bar}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={restaurantData.resourceUtilization.bar} 
                      className="h-2 bg-pink-500/30" 
                      indicatorClassName="bg-pink-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Delivery</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {restaurantData.resourceUtilization.delivery}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {restaurantData.resourceUtilization.optimalUtilization.delivery}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={restaurantData.resourceUtilization.delivery} 
                      className="h-2 bg-green-500/30" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                </Card>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Optimization Suggestions
              </h3>
              
              <div className="space-y-4">
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Staff Scheduling</h4>
                  <p className="text-sm text-muted-foreground">
                    Shift 2 kitchen staff from Tuesday AM to Friday PM based on demand patterns.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Schedule
                  </Button>
                </Card>
                
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Inventory Order</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduce beef order by 15% and increase chicken by 20% based on sales trends.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Adjust Order
                  </Button>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Menu Engineering</h4>
                  <p className="text-sm text-muted-foreground">
                    Move high-margin items to top-right of menu and add visual highlights.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Preview Menu
                  </Button>
                </Card>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Automated Reporting Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {restaurantData.automationReports.map((report, index) => (
              <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {report.type} Report
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generated {report.generated}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {report.recipients.length} recipients
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {report.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>•</span>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button>
                    View Full Report
                  </Button>
                  <Button variant="outline">
                    Edit Recipients
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              Scheduled Automations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-green-500/10 border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Inventory Alerts</h4>
                  <Badge variant="secondary">Daily</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sent when stock levels fall below threshold
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
              
              <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Customer Feedback</h4>
                  <Badge variant="secondary">Weekly</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sent to management with satisfaction metrics
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
              
              <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Labor Cost Report</h4>
                  <Badge variant="secondary">Bi-weekly</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sent to owner with payroll analysis
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Natural Language Interface Tab */}
        <TabsContent value="ask" className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              Ask Restaurant AI
            </h3>
            
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Ask anything about your restaurant's operations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuerySubmit()}
              />
              <Button onClick={handleQuerySubmit}>
                Ask
              </Button>
            </div>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm text-muted-foreground">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuery("Show busiest times last week")}>
                  Show busiest times
                </Button>
                <Button variant="outline" size="sm" onClick={() => setQuery("Which menu items are underperforming?")}>
                  Underperforming items
                </Button>
                <Button variant="outline" size="sm" onClick={() => setQuery("Compare lunch vs dinner sales")}>
                  Lunch vs dinner
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="space-y-4 pr-4">
                {queryHistory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-500">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{item.query}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    )
}