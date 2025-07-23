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
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  Brain,
  Activity,
  CreditCard,
  QrCode,
  Receipt,
  PieChart as PieIcon,
  BarChart2,
  Calendar,
  Clock,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  FileText,
  Download,
  Printer,
  Settings,
  Filter,
  Search,
  RefreshCcw,
  ShoppingBag,
  Building,
  Utensils
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

// Mock financial data
const financeData = {
  overview: {
    revenue: 158420.75,
    expenses: 89650.30,
    profit: 68770.45,
    profitMargin: 43.4,
    growth: 12.5
  },
  revenueStreams: [
    { source: 'Dine-in', amount: 98450.25, percentage: 62 },
    { source: 'Takeaway', amount: 35680.50, percentage: 22 },
    { source: 'Events', amount: 24290.00, percentage: 16 }
  ],
  expenses: {
    categories: [
      { name: 'Ingredients', amount: 42680.20, budget: 45000 },
      { name: 'Staff', amount: 28450.60, budget: 30000 },
      { name: 'Utilities', amount: 8520.50, budget: 9000 },
      { name: 'Marketing', amount: 5890.00, budget: 6000 }
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 85420 },
      { month: 'Feb', amount: 88650 },
      { month: 'Mar', amount: 89650 }
    ]
  },
  payments: {
    methods: [
      { type: 'Card', count: 845, amount: 89650.25 },
      { type: 'QR', count: 456, amount: 45680.50 },
      { type: 'Cash', count: 234, amount: 23090.00 }
    ],
    recent: [
      {
        id: 'TXN001',
        amount: 245.50,
        method: 'Card',
        status: 'completed',
        timestamp: '2024-03-20T15:30:00'
      },
      {
        id: 'TXN002',
        amount: 89.99,
        method: 'QR',
        status: 'completed',
        timestamp: '2024-03-20T15:25:00'
      }
    ]
  },
  reports: {
    daily: {
      revenue: 5890.50,
      orders: 142,
      avgOrderValue: 41.48
    },
    weekly: {
      revenue: 38450.75,
      orders: 945,
      avgOrderValue: 40.69
    },
    monthly: {
      revenue: 158420.75,
      orders: 3850,
      avgOrderValue: 41.15
    }
  },
  aiInsights: [
    {
      type: 'opportunity',
      title: 'Revenue Optimization',
      description: 'Increase prices for top 5 dishes by 8% to optimize profit margins',
      impact: 'Potential +12% profit increase',
      confidence: 92
    },
    {
      type: 'risk',
      title: 'Cost Alert',
      description: 'Ingredient costs trending 15% higher than usual',
      impact: 'Potential -5% profit margin',
      confidence: 88
    }
  ],
  performanceMetrics: [
    { date: '2024-01', revenue: 142000, expenses: 82000, profit: 60000 },
    { date: '2024-02', revenue: 148000, expenses: 85000, profit: 63000 },
    { date: '2024-03', revenue: 158420, expenses: 89650, profit: 68770 }
  ]
};

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function Finance() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [showAIInsights, setShowAIInsights] = useState(true);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-emerald-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Finance Hub Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 
            to-blue-400 bg-clip-text text-transparent">
            Finance
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-emerald-500/10 text-emerald-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Finance Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Transaction Monitoring
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Financial Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
            <Badge variant="outline" className="bg-emerald-500/10">
              <TrendingUp className="h-4 w-4 mr-1" />
              {financeData.overview.growth}%
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Total Revenue</h3>
            <div className="text-2xl font-bold">
              ${financeData.overview.revenue.toLocaleString()}
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-red-500/10">
              <ShoppingBag className="h-5 w-5 text-red-500" />
            </div>
            <Badge variant="outline">Expenses</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Total Expenses</h3>
            <div className="text-2xl font-bold">
              ${financeData.overview.expenses.toLocaleString()}
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Wallet className="h-5 w-5 text-blue-500" />
            </div>
            <Badge variant="outline">Profit</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Net Profit</h3>
            <div className="text-2xl font-bold">
              ${financeData.overview.profit.toLocaleString()}
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <PieIcon className="h-5 w-5 text-purple-500" />
            </div>
            <Badge variant="outline">Margin</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Profit Margin</h3>
            <div className="text-2xl font-bold">{financeData.overview.profitMargin}%</div>
          </div>
        </Card>
      </div>

      {/* Revenue & Expense Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-400" />
            Financial Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={financeData.performanceMetrics}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fill="url(#revenueGradient)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                fill="url(#expenseGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Streams */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <PieIcon className="h-5 w-5 text-purple-400" />
            Revenue Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={financeData.revenueStreams}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="amount"
              >
                {financeData.revenueStreams.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {financeData.revenueStreams.map((stream, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span>{stream.source}</span>
                </div>
                <span className="text-muted-foreground">{stream.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Expense Categories & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Categories */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-red-400" />
            Expense Breakdown
          </h3>
          <div className="space-y-4">
            {financeData.expenses.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center gap-4">
                    <span>${category.amount.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">
                      /{category.budget.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(category.amount / category.budget) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-400" />
            Payment Analytics
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {financeData.payments.methods.map((method, index) => (
                <Card key={index} className="p-4 bg-white/5">
                  <div className="text-lg font-bold">
                    ${method.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {method.type} ({method.count} txns)
                  </div>
                </Card>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Recent Transactions</h4>
              {financeData.payments.recent.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-3 
                  rounded-lg bg-white/5">
                  <div>
                    <div className="font-medium">{txn.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(txn.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${txn.amount}</div>
                    <Badge variant="outline">{txn.method}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {financeData.aiInsights.map((insight, index) => (
          <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">{insight.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{insight.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={
                insight.type === 'opportunity' 
                  ? 'bg-emerald-500/10'
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
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-emerald-400 rounded-full"
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
