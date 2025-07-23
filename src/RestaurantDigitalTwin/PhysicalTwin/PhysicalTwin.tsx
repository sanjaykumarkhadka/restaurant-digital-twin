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
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  Zap,
  Leaf,
  Thermometer,
  Wind,
  Droplets,
  Trash2,
  AlertTriangle,
  Activity,
  Brain,
  BarChart2,
  Settings,
  RefreshCcw,
  Sun,
  Cloud,
  Timer,
  Power,
  Lightbulb,
  Fan,
  Gauge,
  PieChart as PieIcon,
  Wifi,
  Smartphone,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Battery,
  Recycle,
  Factory
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock IoT data
const iotData = {
  energy: {
    current: {
      consumption: 45.8, // kWh
      solar: 12.5,
      grid: 33.3,
      trend: 'decreasing'
    },
    historical: [
      { hour: '08:00', consumption: 35, solar: 8, grid: 27 },
      { hour: '12:00', consumption: 48, solar: 15, grid: 33 },
      { hour: '16:00', consumption: 42, solar: 12, grid: 30 },
      { hour: '20:00', consumption: 52, solar: 5, grid: 47 }
    ],
    devices: [
      { name: 'HVAC', consumption: 18.5, status: 'optimal' },
      { name: 'Kitchen Equipment', consumption: 15.2, status: 'high' },
      { name: 'Lighting', consumption: 8.4, status: 'optimal' },
      { name: 'Refrigeration', consumption: 12.8, status: 'warning' }
    ]
  },
  environment: {
    temperature: {
      dining: 22.5,
      kitchen: 24.8,
      storage: 18.5
    },
    humidity: {
      dining: 45,
      kitchen: 52,
      storage: 40
    },
    airQuality: {
      co2: 650,
      tvoc: 420,
      pm25: 12
    }
  },
  waste: {
    management: {
      organic: { amount: 45.5, recycled: 85 },
      plastic: { amount: 12.8, recycled: 78 },
      paper: { amount: 18.2, recycled: 92 },
      glass: { amount: 8.5, recycled: 95 }
    },
    trends: [
      { week: 'W1', amount: 82, recycled: 72 },
      { week: 'W2', amount: 78, recycled: 75 },
      { week: 'W3', amount: 85, recycled: 78 },
      { week: 'W4', amount: 75, recycled: 80 }
    ]
  },
  resourceOptimization: {
    water: {
      daily: 2450, // liters
      recycled: 850,
      savings: 15.5
    },
    gas: {
      daily: 85, // cubic meters
      efficiency: 92,
      savings: 8.5
    }
  },
  sustainability: {
    carbonFootprint: {
      current: 285.5, // kg CO2
      reduction: 12.5,
      target: 250
    },
    greenMetrics: {
      renewable: 28,
      recycling: 82,
      efficiency: 88
    }
  },
  aiInsights: [
    {
      type: 'energy',
      title: 'Energy Optimization',
      description: 'HVAC efficiency can be improved by 15%',
      impact: 'Save 450 kWh/month',
      confidence: 92
    },
    {
      type: 'waste',
      title: 'Waste Reduction',
      description: 'Organic waste trending higher than usual',
      impact: 'Potential 25% reduction',
      confidence: 88
    }
  ]
};

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function PhysicalTwin() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('day');
  const [showAIInsights, setShowAIInsights] = useState(true);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-green-900/20 to-teal-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* IoT Hub Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 
            to-teal-400 bg-clip-text text-transparent">
            Physical Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-green-500/10 text-green-500">
              <Brain className="h-4 w-4 mr-2" />
              AI IoT Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Sensor Monitoring
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Last Hour</SelectItem>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Energy & Environment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            <Badge variant="outline" className={
              iotData.energy.current.trend === 'decreasing' 
                ? 'text-green-500'
                : 'text-red-500'
            }>
              {iotData.energy.current.trend}
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Energy Usage</h3>
            <div className="text-2xl font-bold">{iotData.energy.current.consumption} kWh</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Droplets className="h-5 w-5 text-blue-500" />
            </div>
            <Badge variant="outline">Usage</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Water Consumption</h3>
            <div className="text-2xl font-bold">{iotData.resourceOptimization.water.daily}L</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Leaf className="h-5 w-5 text-green-500" />
            </div>
            <Badge variant="outline">CO2</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Carbon Footprint</h3>
            <div className="text-2xl font-bold">{iotData.sustainability.carbonFootprint.current}kg</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Recycle className="h-5 w-5 text-purple-500" />
            </div>
            <Badge variant="outline">Recycling</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Waste Recycled</h3>
            <div className="text-2xl font-bold">{iotData.sustainability.greenMetrics.recycling}%</div>
          </div>
        </Card>
      </div>

      {/* Energy Consumption & Environmental Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Usage Chart */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-400" />
            Energy Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={iotData.energy.historical}>
              <defs>
                <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="solar"
                stroke="#10b981"
                fill="url(#solarGradient)"
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="grid"
                stroke="#3b82f6"
                fill="url(#gridGradient)"
                stackId="1"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Environmental Metrics */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-400" />
            Environmental Controls
          </h3>
          <div className="space-y-6">
            {Object.entries(iotData.environment.temperature).map(([zone, temp], index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="capitalize">{zone}</span>
                  <div className="flex items-center gap-2">
                    <span>{temp}°C</span>
                    <span className="text-sm text-muted-foreground">
                      {iotData.environment.humidity[zone]}% RH
                    </span>
                  </div>
                </div>
                <Progress 
                  value={((temp - 15) / 15) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Waste Management & Resource Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Management */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-orange-400" />
            Waste Analytics
          </h3>
          <div className="space-y-6">
            {Object.entries(iotData.waste.management).map(([type, data], index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="capitalize">{type}</span>
                  <div className="flex items-center gap-2">
                    <span>{data.amount}kg</span>
                    <Badge variant="outline" className="bg-green-500/10">
                      {data.recycled}% recycled
                    </Badge>
                  </div>
                </div>
                <Progress value={data.recycled} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Resource Optimization */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-400" />
            Resource Efficiency
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-blue-500/10">
                <div className="text-lg font-bold">
                  {iotData.resourceOptimization.water.recycled}L
                </div>
                <div className="text-sm text-muted-foreground">Water Recycled</div>
                <Badge className="mt-2 bg-green-500/10">
                  {iotData.resourceOptimization.water.savings}% saved
                </Badge>
              </Card>
              <Card className="p-4 bg-yellow-500/10">
                <div className="text-lg font-bold">
                  {iotData.resourceOptimization.gas.efficiency}%
                </div>
                <div className="text-sm text-muted-foreground">Gas Efficiency</div>
                <Badge className="mt-2 bg-green-500/10">
                  {iotData.resourceOptimization.gas.savings}% saved
                </Badge>
              </Card>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Sustainability Score</span>
                <Badge variant="outline">
                  {iotData.sustainability.greenMetrics.efficiency}%
                </Badge>
              </div>
              <Progress 
                value={iotData.sustainability.greenMetrics.efficiency} 
                className="h-2"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {iotData.aiInsights.map((insight, index) => (
          <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">{insight.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{insight.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={
                insight.type === 'energy' 
                  ? 'bg-yellow-500/10'
                  : 'bg-red-500/10'
              }>
                {insight.impact}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {insight.confidence}% Confidence
                </span>
                <Button variant="outline" size="sm">Optimize</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button className="rounded-full shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          Add Sensor
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-green-400 rounded-full"
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
