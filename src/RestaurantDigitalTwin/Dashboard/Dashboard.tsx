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
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  Utensils,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Bell,
  AlertTriangle,
  Zap,
  ChefHat,
  Coffee,
  ShoppingBag,
  Percent,
  Star,
  Activity,
  Calendar,
  BarChart2,
  PieChart as PieIcon,
  Brain,
  MessageSquare,
  Table as TableIcon,
  UserCheck,
  Trash2,
  Plus,
  Search,
  Filter,
  Settings,
  HelpCircle
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
import { Link } from 'react-router-dom';

// Mock data
const restaurantData = {
  currentStats: {
    revenue: 12450.75,
    customers: 89,
    orders: 142,
    avgOrderValue: 87.68,
    occupancyRate: 78,
    tableTurnoverRate: 4.2
  },
  hourlyData: [
    { hour: '10:00', customers: 12, revenue: 450, orders: 15 },
    { hour: '11:00', customers: 18, revenue: 720, orders: 22 },
    { hour: '12:00', customers: 45, revenue: 2250, orders: 38 },
    { hour: '13:00', customers: 52, revenue: 2860, orders: 45 },
    { hour: '14:00', customers: 32, revenue: 1480, orders: 28 },
    { hour: '15:00', customers: 28, revenue: 980, orders: 20 }
  ],
  menuPerformance: [
    { name: 'Signature Burger', orders: 45, revenue: 1350, rating: 4.8 },
    { name: 'Truffle Pasta', orders: 38, revenue: 1140, rating: 4.9 },
    { name: 'Seafood Platter', orders: 25, revenue: 1250, rating: 4.7 },
    { name: 'Vegan Bowl', orders: 32, revenue: 640, rating: 4.6 }
  ],
  staffMetrics: {
    present: 12,
    absent: 2,
    efficiency: 92,
    topPerformers: [
      { name: 'John Doe', orders: 45, rating: 4.9 },
      { name: 'Sarah Smith', orders: 42, rating: 4.8 }
    ]
  },
  tables: [
    { id: 'T1', status: 'occupied', duration: '45m', orders: 3 },
    { id: 'T2', status: 'available', duration: '0m', orders: 0 },
    { id: 'T3', status: 'reserved', duration: '0m', orders: 0 },
    { id: 'T4', status: 'occupied', duration: '15m', orders: 1 }
  ],
  aiInsights: [
    {
      type: 'prediction',
      title: 'Peak Hour Alert',
      description: 'Expecting 40% more customers between 19:00-21:00',
      impact: 'high',
      action: 'Consider additional staff'
    },
    {
      type: 'optimization',
      title: 'Menu Suggestion',
      description: 'Truffle Pasta demand increasing. Stock ingredients.',
      impact: 'medium',
      action: 'Update inventory'
    }
  ],
  alerts: [
    {
      type: 'inventory',
      title: 'Low Stock Alert',
      description: 'Premium beef running low (15% remaining)',
      urgency: 'high'
    },
    {
      type: 'service',
      title: 'Table Wait Time',
      description: 'Table 7 waiting for order - 12 minutes',
      urgency: 'medium'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');
  const [showAIInsights, setShowAIInsights] = useState(true);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-orange-900/20 to-red-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 
            to-red-400 bg-clip-text text-transparent">
            Restaurant Digital Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-orange-500/10 text-orange-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Live Monitoring
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue"
          value={`$${restaurantData.currentStats.revenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5 text-green-500" />}
          trend="+12.5%"
          trendUp={true}
        />
        <MetricCard
          title="Customers"
          value={restaurantData.currentStats.customers.toString()}
          icon={<Users className="h-5 w-5 text-blue-500" />}
          trend="+8.2%"
          trendUp={true}
        />
        <MetricCard
          title="Orders"
          value={restaurantData.currentStats.orders.toString()}
          icon={<ShoppingBag className="h-5 w-5 text-purple-500" />}
          trend="+15.3%"
          trendUp={true}
        />
        <MetricCard
          title="Occupancy"
          value={`${restaurantData.currentStats.occupancyRate}%`}
          icon={<TableIcon className="h-5 w-5 text-orange-500" />}
          trend="+5.7%"
          trendUp={true}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trends */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-400" />
              Revenue & Orders Flow
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Hourly</Button>
              <Button variant="outline" size="sm">Daily</Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={restaurantData.hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stackId="2"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* AI Insights & Alerts */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI Insights
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {restaurantData.aiInsights.map((insight, index) => (
                <Card key={index} className={`p-4 ${
                  insight.impact === 'high' 
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-orange-500/10 border-orange-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === 'prediction' ? (
                      <TrendingUp className="h-4 w-4 text-orange-400" />
                    ) : (
                      <Zap className="h-4 w-4 text-purple-400" />
                    )}
                    <span className="font-semibold">{insight.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Impact: {insight.impact}
                    </Badge>
                    <Button variant="ghost" size="sm">Take Action</Button>
                  </div>
                </Card>
              ))}

              {restaurantData.alerts.map((alert, index) => (
                <Card key={index} className={`p-4 ${
                  alert.urgency === 'high'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.urgency === 'high' ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                    <span className="font-semibold">{alert.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Menu Performance & Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Performance */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-yellow-400" />
            Top Performing Items
          </h3>
          <div className="space-y-4">
            {restaurantData.menuPerformance.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 
                  to-red-400 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="bg-green-500/10">
                      ${item.revenue}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ShoppingBag className="h-4 w-4" />
                      {item.orders} orders
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                      <Star className="h-4 w-4" />
                      {item.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Staff Performance */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Staff Overview
            </h3>
            <Badge variant="outline" className="bg-green-500/10">
              {restaurantData.staffMetrics.present} Active
            </Badge>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">
                  {restaurantData.staffMetrics.efficiency}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Staff Efficiency
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">
                  {restaurantData.staffMetrics.present}/{restaurantData.staffMetrics.present + restaurantData.staffMetrics.absent}
                </div>
                <div className="text-sm text-muted-foreground">
                  Attendance
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Top Performers</h4>
              <div className="space-y-3">
                {restaurantData.staffMetrics.topPerformers.map((staff, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{staff.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{staff.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {staff.orders} orders • {staff.rating} rating
                      </div>
                    </div>
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Table Management */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <TableIcon className="h-5 w-5 text-indigo-400" />
          Live Table Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {restaurantData.tables.map((table) => (
            <Card key={table.id} className={`p-4 ${
              table.status === 'occupied' 
                ? 'bg-red-500/10 border-red-500/30'
                : table.status === 'reserved'
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-green-500/10 border-green-500/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Table {table.id}</span>
                <Badge variant="outline">{table.status}</Badge>
              </div>
              {table.status === 'occupied' && (
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration: {table.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Orders: {table.orders}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
      <Link to="/agentic-ai">
          <Button className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Agentic AI
          </Button>
        </Link>
        <Link to="/log-monitor">
          <Button className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Log Monitor
          </Button>
        </Link>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-orange-400 rounded-full"
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
