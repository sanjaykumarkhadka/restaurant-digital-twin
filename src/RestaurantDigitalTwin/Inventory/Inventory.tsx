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
  Package,
  Utensils,
  AlertTriangle,
  Zap,
  Brain,
  Activity,
  ShoppingCart,
  Trash2,
  Plus,
  FileText,
  BarChart2,
  Search,
  Filter,
  Settings,
  RefreshCcw,
  Edit,
  Archive,
  Leaf,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Scale,
  ThermometerSun,
  Timer,
  Coffee,
  Pizza,
  ChefHat
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

// Mock inventory data
const inventoryData = {
  overview: {
    totalItems: 248,
    lowStock: 12,
    expiringItems: 8,
    totalValue: 24580.50
  },
  stockLevels: {
    categories: [
      { name: 'Proteins', current: 85, target: 100, value: 8450 },
      { name: 'Produce', current: 65, target: 80, value: 3250 },
      { name: 'Dairy', current: 75, target: 90, value: 4200 },
      { name: 'Dry Goods', current: 90, target: 100, value: 5680 }
    ],
    trends: [
      { date: '2024-01', usage: 8500, waste: 420 },
      { date: '2024-02', usage: 9200, waste: 380 },
      { date: '2024-03', usage: 8800, waste: 350 }
    ]
  },
  menu: {
    categories: [
      { name: 'Main Course', items: 24, revenue: 12450 },
      { name: 'Appetizers', items: 12, revenue: 5680 },
      { name: 'Desserts', items: 8, revenue: 3450 },
      { name: 'Beverages', items: 15, revenue: 4250 }
    ],
    topPerformers: [
      {
        name: 'Grilled Salmon',
        cost: 12.50,
        price: 28.99,
        margin: 56.8,
        sales: 450
      },
      {
        name: 'Truffle Pasta',
        cost: 8.75,
        price: 24.99,
        margin: 64.2,
        sales: 380
      }
    ],
    engineering: {
      highProfit: 12,
      lowProfit: 5,
      needsAttention: 8
    }
  },
  waste: {
    monthly: {
      amount: 1250.80,
      percentage: 4.8,
      trend: 'decreasing'
    },
    topWasted: [
      { item: 'Fresh Herbs', amount: 180.50, reason: 'Spoilage' },
      { item: 'Fish Fillets', amount: 245.80, reason: 'Over-ordering' }
    ]
  },
  suppliers: {
    active: 15,
    onTime: 92,
    quality: 4.8,
    spending: {
      current: 18450.75,
      previous: 17850.50
    }
  },
  aiInsights: [
    {
      type: 'optimization',
      title: 'Order Optimization',
      description: 'Reduce produce order by 15% to minimize waste',
      impact: 'Save $450/month',
      confidence: 92
    },
    {
      type: 'alert',
      title: 'Stock Alert',
      description: 'Premium beef inventory low, order needed within 48h',
      impact: 'Potential menu limitation',
      confidence: 95
    }
  ]
};

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function Inventory() {
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAIInsights, setShowAIInsights] = useState(true);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-yellow-900/20 to-orange-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Inventory Hub Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 
            to-orange-400 bg-clip-text text-transparent">
            Inventory
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-yellow-500/10 text-yellow-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Inventory Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Stock Monitoring
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Inventory Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Package className="h-5 w-5 text-yellow-500" />
            </div>
            <Badge variant="outline">Total</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Total Items</h3>
            <div className="text-2xl font-bold">{inventoryData.overview.totalItems}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <Badge variant="outline">Alert</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Low Stock Items</h3>
            <div className="text-2xl font-bold">{inventoryData.overview.lowStock}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Timer className="h-5 w-5 text-orange-500" />
            </div>
            <Badge variant="outline">Expiring</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Expiring Soon</h3>
            <div className="text-2xl font-bold">{inventoryData.overview.expiringItems}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <Badge variant="outline">Value</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Total Value</h3>
            <div className="text-2xl font-bold">
              ${inventoryData.overview.totalValue.toLocaleString()}
            </div>
          </div>
        </Card>
      </div>

      {/* Stock Levels & Menu Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Level Chart */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-400" />
            Stock Level Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={inventoryData.stockLevels.trends}>
              <defs>
                <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#3b82f6"
                fill="url(#usageGradient)"
              />
              <Area
                type="monotone"
                dataKey="waste"
                stroke="#ef4444"
                fill="url(#wasteGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Pizza className="h-5 w-5 text-orange-400" />
            Menu Categories
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={inventoryData.menu.categories}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="revenue"
              >
                {inventoryData.menu.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {inventoryData.menu.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span>{category.name}</span>
                </div>
                <span className="text-muted-foreground">{category.items} items</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Menu Engineering & Waste Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Engineering */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-purple-400" />
            Menu Performance
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-green-500/10">
                <div className="text-lg font-bold">
                  {inventoryData.menu.engineering.highProfit}
                </div>
                <div className="text-sm text-muted-foreground">High Profit</div>
              </Card>
              <Card className="p-4 bg-yellow-500/10">
                <div className="text-lg font-bold">
                  {inventoryData.menu.engineering.needsAttention}
                </div>
                <div className="text-sm text-muted-foreground">Needs Review</div>
              </Card>
              <Card className="p-4 bg-red-500/10">
                <div className="text-lg font-bold">
                  {inventoryData.menu.engineering.lowProfit}
                </div>
                <div className="text-sm text-muted-foreground">Low Profit</div>
              </Card>
            </div>
            <div className="space-y-4">
              {inventoryData.menu.topPerformers.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="bg-green-500/10">
                      {item.margin}% margin
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Cost: ${item.cost}</span>
                    <span>Price: ${item.price}</span>
                    <span>{item.sales} sold</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Waste Management */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-400" />
            Waste Analytics
          </h3>
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-red-500/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Monthly Waste</span>
                <Badge variant="outline" className={
                  inventoryData.waste.monthly.trend === 'decreasing'
                    ? 'bg-green-500/10'
                    : 'bg-red-500/10'
                }>
                  {inventoryData.waste.monthly.trend}
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                ${inventoryData.waste.monthly.amount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {inventoryData.waste.monthly.percentage}% of inventory value
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Top Wasted Items</h4>
              {inventoryData.waste.topWasted.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.item}</span>
                    <span className="text-red-400">${item.amount}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Reason: {item.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inventoryData.aiInsights.map((insight, index) => (
          <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">{insight.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{insight.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={
                insight.type === 'optimization' 
                  ? 'bg-green-500/10'
                  : 'bg-red-500/10'
              }>
                {insight.impact}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {insight.confidence}% Confidence
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
          <Plus className="h-4 w-4" />
          Add Item
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
            className="absolute h-1 w-1 bg-yellow-400 rounded-full"
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
