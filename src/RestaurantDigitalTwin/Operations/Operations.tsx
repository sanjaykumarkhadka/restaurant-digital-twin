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
  Activity,
  Clock,
  TrendingUp,
  AlertTriangle,
  Zap,
  Brain,
  Table,
  Timer,
  Users,
  BarChart2,
  Target,
  History,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  Filter,
  Search,
  RefreshCcw,
  ChefHat,
  Coffee,
  Utensils,
  Gauge,
  Maximize,
  Minimize,
  LineChart as LineChartIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock operations data
const operationsData = {
  overview: {
    tableTurnover: 4.2,
    avgServiceTime: '22:30',
    peakCapacity: 92,
    efficiency: 88
  },
  peakHours: {
    current: [
      { hour: '12:00', customers: 85, tables: 28 },
      { hour: '13:00', customers: 92, tables: 30 },
      { hour: '19:00', customers: 95, tables: 31 },
      { hour: '20:00', customers: 88, tables: 29 }
    ],
    historical: [
      { day: 'Mon', peak: 85 },
      { day: 'Tue', peak: 78 },
      { day: 'Wed', peak: 82 },
      { day: 'Thu', peak: 88 },
      { day: 'Fri', peak: 95 },
      { day: 'Sat', peak: 98 },
      { day: 'Sun', peak: 90 }
    ]
  },
  serviceMetrics: {
    speed: {
      orderToKitchen: '2:30',
      kitchenToTable: '18:45',
      tableToPayment: '5:15'
    },
    accuracy: {
      orderAccuracy: 98.5,
      foodQuality: 4.8,
      customerSatisfaction: 4.7
    },
    trends: [
      { month: 'Jan', speed: 24, accuracy: 97 },
      { month: 'Feb', speed: 22, accuracy: 98 },
      { month: 'Mar', speed: 21, accuracy: 98.5 }
    ]
  },
  capacityUtilization: {
    current: 78,
    sections: [
      { name: 'Main Hall', capacity: 85, current: 75 },
      { name: 'Terrace', capacity: 45, current: 38 },
      { name: 'Private Room', capacity: 20, current: 15 }
    ],
    forecast: [
      { time: '17:00', expected: 45 },
      { time: '18:00', expected: 75 },
      { time: '19:00', expected: 95 },
      { time: '20:00', expected: 85 }
    ]
  },
  historicalTrends: {
    monthly: [
      { month: 'Jan', customers: 4500, revenue: 158000 },
      { month: 'Feb', customers: 4800, revenue: 168000 },
      { month: 'Mar', customers: 5200, revenue: 182000 }
    ],
    yearOverYear: {
      growth: 12.5,
      improvement: 15.8
    }
  },
  predictiveAnalytics: [
    {
      type: 'staffing',
      title: 'Staff Optimization',
      description: 'Increase staff by 2 servers between 19:00-21:00',
      impact: 'Reduce wait time by 25%',
      confidence: 92
    },
    {
      type: 'capacity',
      title: 'Peak Hour Alert',
      description: 'Expected 95% capacity utilization tonight',
      impact: 'Prepare for high volume',
      confidence: 88
    }
  ]
};

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function Operations() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');
  const [showPredictions, setShowPredictions] = useState(true);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-indigo-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Operations Hub Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 
            to-purple-400 bg-clip-text text-transparent">
            Operations
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-indigo-500/10 text-indigo-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Operations Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Performance Monitoring
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Operations Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <Table className="h-5 w-5 text-indigo-500" />
            </div>
            <Badge variant="outline">Turnover</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Table Turnover Rate</h3>
            <div className="text-2xl font-bold">{operationsData.overview.tableTurnover}/hr</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Timer className="h-5 w-5 text-purple-500" />
            </div>
            <Badge variant="outline">Service</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Avg Service Time</h3>
            <div className="text-2xl font-bold">{operationsData.overview.avgServiceTime}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Maximize className="h-5 w-5 text-blue-500" />
            </div>
            <Badge variant="outline">Capacity</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Peak Capacity</h3>
            <div className="text-2xl font-bold">{operationsData.overview.peakCapacity}%</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Gauge className="h-5 w-5 text-green-500" />
            </div>
            <Badge variant="outline">Efficiency</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Overall Efficiency</h3>
            <div className="text-2xl font-bold">{operationsData.overview.efficiency}%</div>
          </div>
        </Card>
      </div>

      {/* Service Speed & Capacity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Metrics Chart */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-blue-400" />
            Service Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={operationsData.serviceMetrics.trends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="speed"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Capacity Distribution */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-400" />
            Section Capacity
          </h3>
          <div className="space-y-6">
            {operationsData.capacityUtilization.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{section.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {section.current}/{section.capacity}
                  </span>
                </div>
                <Progress 
                  value={(section.current / section.capacity) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Peak Hours & Service Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours Analysis */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-orange-400" />
            Peak Hours Analysis
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={operationsData.peakHours.current}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="customers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Card className="p-4 bg-purple-500/10">
              <div className="text-lg font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Peak Occupancy</div>
            </Card>
            <Card className="p-4 bg-blue-500/10">
              <div className="text-lg font-bold">19:00</div>
              <div className="text-sm text-muted-foreground">Peak Time</div>
            </Card>
            <Card className="p-4 bg-green-500/10">
              <div className="text-lg font-bold">31</div>
              <div className="text-sm text-muted-foreground">Tables Active</div>
            </Card>
          </div>
        </Card>

        {/* Service Metrics */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-400" />
            Service Metrics
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(operationsData.serviceMetrics.speed).map(([key, value], index) => (
                <Card key={index} className="p-4 bg-white/5">
                  <div className="text-lg font-bold">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </Card>
              ))}
            </div>
            <div className="space-y-4">
              {Object.entries(operationsData.serviceMetrics.accuracy).map(([key, value], index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                  <Progress value={Number(value) * 20} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* AI Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {operationsData.predictiveAnalytics.map((prediction, index) => (
          <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">{prediction.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{prediction.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={
                prediction.type === 'staffing' 
                  ? 'bg-blue-500/10'
                  : 'bg-purple-500/10'
              }>
                {prediction.impact}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {prediction.confidence}% Confidence
                </span>
                <Button variant="outline" size="sm">Take Action</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button className="rounded-full shadow-lg gap-2">
          <Settings className="h-4 w-4" />
          Configure
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
            className="absolute h-1 w-1 bg-indigo-400 rounded-full"
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
