import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  Users,
  UserPlus,
  UserMinus,
  Heart,
  Star,
  Clock,
  Calendar,
  TrendingUp,
  MessageSquare,
  Gift,
  Award,
  Table,
  Coffee,
  Zap,
  Brain,
  Bell,
  Search,
  Filter,
  Settings,
  Download,
  BarChart2,
  ThumbsUp,
  Timer,
  Repeat,
  AlertTriangle,
  Crown
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock customer data
const customerData = {
  currentStats: {
    totalCustomers: 1250,
    activeNow: 45,
    loyalCustomers: 380,
    avgSatisfaction: 4.7,
    repeatRate: 68,
    avgSpend: 850.50
  },
  flowMetrics: {
    walkIns: 89,
    walkOuts: 75,
    reservations: 32,
    waitlist: 8,
    peakHours: [
      { hour: '12:00', count: 45 },
      { hour: '13:00', count: 62 },
      { hour: '14:00', count: 38 },
      { hour: '19:00', count: 55 },
      { hour: '20:00', count: 68 },
      { hour: '21:00', count: 42 }
    ]
  },
  loyaltyProgram: {
    tiers: [
      { name: 'Bronze', customers: 450, benefits: ['5% Discount', 'Free Dessert'] },
      { name: 'Silver', customers: 280, benefits: ['10% Discount', 'Priority Seating'] },
      { name: 'Gold', customers: 150, benefits: ['15% Discount', 'VIP Events'] },
      { name: 'Platinum', customers: 50, benefits: ['20% Discount', 'Personal Chef'] }
    ],
    recentRewards: [
      { customer: 'Emma Wilson', reward: 'Free Birthday Dinner', date: '2024-03-20' },
      { customer: 'James Chen', reward: 'VIP Table Upgrade', date: '2024-03-19' }
    ]
  },
  preferences: [
    { category: 'Cuisine', data: [
      { name: 'Italian', value: 35 },
      { name: 'Asian', value: 25 },
      { name: 'Mexican', value: 20 },
      { name: 'Mediterranean', value: 15 }
    ]},
    { category: 'Dietary', data: [
      { name: 'Vegetarian', value: 30 },
      { name: 'Vegan', value: 15 },
      { name: 'Gluten-Free', value: 20 },
      { name: 'Regular', value: 35 }
    ]}
  ],
  feedback: {
    recent: [
      {
        id: 1,
        customer: 'Sarah Johnson',
        rating: 5,
        comment: 'Exceptional service and amazing food!',
        date: '2024-03-20',
        response: true
      },
      {
        id: 2,
        customer: 'Michael Chang',
        rating: 4,
        comment: 'Great atmosphere, slightly long wait',
        date: '2024-03-19',
        response: false
      }
    ],
    sentimentAnalysis: {
      positive: 75,
      neutral: 18,
      negative: 7
    }
  },
  frequentCustomers: [
    {
      name: 'David Miller',
      visits: 45,
      totalSpent: 3850,
      lastVisit: '2024-03-18',
      preferences: ['Table 12', 'Red Wine', 'Steak'],
      loyaltyTier: 'Platinum'
    },
    {
      name: 'Lisa Chen',
      visits: 38,
      totalSpent: 3200,
      lastVisit: '2024-03-20',
      preferences: ['Window Seat', 'Vegetarian', 'Green Tea'],
      loyaltyTier: 'Gold'
    }
  ],
  aiInsights: [
    {
      type: 'trend',
      title: 'Customer Behavior Pattern',
      description: 'Regular customers prefer window seating during dinner',
      action: 'Optimize seating arrangements',
      confidence: 89
    },
    {
      type: 'alert',
      title: 'Retention Opportunity',
      description: '15 silver tier customers close to gold upgrade',
      action: 'Send personalized promotions',
      confidence: 92
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Customers() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');

  return (
    <div className="relative p-6 space-y-6 rounded-3xl 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50">

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-300 bg-clip-text text-transparent">
            Customer Nexus
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Real-time customer intelligence hub
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Active Customers"
          value={customerData.currentStats.activeNow}
          icon={<Users className="h-6 w-6 text-blue-400" />}
          trend="+12% vs last hour"
          trendUp={true}
        />
        <MetricCard
          title="Loyalty Members"
          value={customerData.currentStats.loyalCustomers}
          icon={<Crown className="h-6 w-6 text-purple-400" />}
          trend="+5% vs last month"
          trendUp={true}
        />
        <MetricCard
          title="Customer Satisfaction"
          value={`${customerData.currentStats.avgSatisfaction}/5.0`}
          icon={<Star className="h-6 w-6 text-yellow-400" />}
          trend="+0.2 vs last week"
          trendUp={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Flow Chart */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Customer Flow Analytics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={customerData.flowMetrics.peakHours}>
              <defs>
                <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#flowGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Customer Preferences */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-400" />
            Customer Preferences
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={customerData.preferences[0].data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar
                name="Preferences"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Loyalty Program Stats */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Loyalty Program
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {customerData.loyaltyProgram.tiers.map((tier, index) => (
                <Card key={index} className={`p-4 bg-gradient-to-br 
                  ${index === 3 ? 'from-yellow-500/20 to-orange-500/20' :
                    index === 2 ? 'from-gray-400/20 to-gray-500/20' :
                    index === 1 ? 'from-yellow-700/20 to-yellow-800/20' :
                    'from-orange-700/20 to-orange-800/20'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{tier.name}</span>
                    <Badge variant="outline">{tier.customers}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Gift className="h-3 w-3" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Feedback */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-400" />
            Customer Feedback
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {customerData.feedback.recent.map((feedback) => (
                <Card key={feedback.id} className="p-4 bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>{feedback.customer[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{feedback.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {feedback.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{feedback.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feedback.comment}
                  </p>
                  {!feedback.response && (
                    <Button variant="outline" size="sm" className="mt-2">
                      Respond
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          AI Customer Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerData.aiInsights.map((insight, index) => (
            <Card key={index} className="p-4 bg-gradient-to-br from-purple-500/10 
              to-blue-500/10 border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                {insight.type === 'trend' ? (
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                )}
                <span className="font-medium">{insight.title}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {insight.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-purple-500/10">
                  {insight.confidence}% Confidence
                </Badge>
                <Button variant="outline" size="sm">
                  Take Action
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button className="rounded-full shadow-lg gap-2">
          <UserPlus className="h-4 w-4" />
          Add Customer
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, trendUp }) {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <Badge variant="outline" className={`${
          trendUp ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend}
        </Badge>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </Card>
  );
}
