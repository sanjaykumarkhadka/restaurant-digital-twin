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
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Zap,
  Star,
  Activity,
  Brain,
  Calendar,
  Timer,
  Medal,
  Target,
  UserCheck,
  UserMinus,
  UserPlus,
  ClipboardList,
  MapPin,
  BarChart2,
  Settings,
  Plus,
  Search,
  Filter,
  Bell,
  MessageSquare,
  Mail,
  Phone,
  Award,
  Briefcase,
  Coffee
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Mock staff data
const staffData = {
  overview: {
    totalStaff: 24,
    activeNow: 12,
    onLeave: 2,
    newHires: 3,
    departments: {
      kitchen: 8,
      service: 10,
      bar: 4,
      management: 2
    }
  },
  performance: {
    averageRating: 4.7,
    topPerformers: [
      { id: 1, name: 'Sarah Chen', role: 'Head Server', rating: 4.9, orders: 145, tips: 890 },
      { id: 2, name: 'Mike Johnson', role: 'Chef', rating: 4.8, dishes: 280, accuracy: 99 }
    ],
    metrics: [
      { month: 'Jan', efficiency: 88, satisfaction: 92 },
      { month: 'Feb', efficiency: 92, satisfaction: 94 },
      { month: 'Mar', efficiency: 90, satisfaction: 95 }
    ]
  },
  scheduling: {
    currentShift: {
      morning: ['Sarah Chen', 'David Kim', 'Lisa Wong'],
      evening: ['Mike Johnson', 'James Smith', 'Emma Davis']
    },
    upcomingLeaves: [
      { staff: 'David Kim', from: '2024-04-01', to: '2024-04-05', type: 'Vacation' },
      { staff: 'Lisa Wong', from: '2024-04-10', to: '2024-04-11', type: 'Personal' }
    ],
    coverage: {
      monday: 95,
      tuesday: 90,
      wednesday: 85,
      thursday: 92,
      friday: 98,
      saturday: 100,
      sunday: 88
    }
  },
  training: {
    ongoingPrograms: [
      {
        name: 'Food Safety Certification',
        participants: 5,
        completion: 75,
        deadline: '2024-04-15'
      },
      {
        name: 'Customer Service Excellence',
        participants: 8,
        completion: 60,
        deadline: '2024-04-20'
      }
    ],
    skillMatrix: [
      { skill: 'Food Preparation', proficiency: 85 },
      { skill: 'Customer Service', proficiency: 90 },
      { skill: 'POS System', proficiency: 88 },
      { skill: 'Wine Knowledge', proficiency: 75 }
    ]
  },
  locationTracking: {
    activeZones: {
      kitchen: ['Mike Johnson', 'Emma Davis'],
      diningArea: ['Sarah Chen', 'James Smith'],
      bar: ['Lisa Wong'],
      storage: ['David Kim']
    },
    efficiency: {
      averageResponseTime: '2.5 mins',
      peakHourCoverage: '95%',
      tableTurnoverRate: '4.2/hour'
    }
  },
  aiInsights: [
    {
      type: 'staffing',
      title: 'Peak Hour Alert',
      description: 'Consider adding 2 servers for Friday evening',
      impact: 'high',
      confidence: 92
    },
    {
      type: 'training',
      title: 'Skill Gap Detected',
      description: 'Wine service training recommended for 4 staff members',
      impact: 'medium',
      confidence: 88
    }
  ]
};

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function Staff() {
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showAIInsights, setShowAIInsights] = useState(true);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Staff Hub Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-400 bg-clip-text text-transparent">
            Staff
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Staff Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Staff Monitoring
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Staff Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <Badge variant="outline">Total</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Total Staff</h3>
            <div className="text-2xl font-bold">{staffData.overview.totalStaff}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">On Duty</h3>
            <div className="text-2xl font-bold">{staffData.overview.activeNow}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Timer className="h-5 w-5 text-yellow-500" />
            </div>
            <Badge variant="outline">Performance</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Avg Rating</h3>
            <div className="text-2xl font-bold">{staffData.performance.averageRating}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Target className="h-5 w-5 text-purple-500" />
            </div>
            <Badge variant="outline">Training</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">In Progress</h3>
            <div className="text-2xl font-bold">
              {staffData.training.ongoingPrograms.length} Programs
            </div>
          </div>
        </Card>
      </div>

      {/* Staff Performance & Location */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-400" />
            Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={staffData.performance.metrics}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="satisfaction"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Live Location Tracking */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-400" />
            Staff Locations
          </h3>
          <div className="space-y-4">
            {Object.entries(staffData.locationTracking.activeZones).map(([zone, staff]) => (
              <div key={zone} className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{zone}</span>
                  <Badge variant="outline">{staff.length}</Badge>
                </div>
                <div className="flex -space-x-2">
                  {staff.map((member, index) => (
                    <Avatar key={index} className="border-2 border-background">
                      <AvatarFallback>{member[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Scheduling & Training */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Shift */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-400" />
            Current Shift
          </h3>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10">
                <h4 className="font-medium mb-3">Morning Shift</h4>
                <div className="flex flex-wrap gap-2">
                  {staffData.scheduling.currentShift.morning.map((staff, index) => (
                    <Badge key={index} variant="outline">
                      {staff}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10">
                <h4 className="font-medium mb-3">Evening Shift</h4>
                <div className="flex flex-wrap gap-2">
                  {staffData.scheduling.currentShift.evening.map((staff, index) => (
                    <Badge key={index} variant="outline">
                      {staff}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Training Progress */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Training Programs
          </h3>
          <div className="space-y-4">
            {staffData.training.ongoingPrograms.map((program, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{program.name}</span>
                  <Badge variant="outline">
                    {program.participants} Participants
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={program.completion} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{program.completion}% Complete</span>
                    <span>Due: {program.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staffData.aiInsights.map((insight, index) => (
          <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">{insight.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{insight.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-purple-500/10">
                {insight.confidence}% Confidence
              </Badge>
              <Button variant="outline" size="sm">Take Action</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button className="rounded-full shadow-lg gap-2">
          <UserPlus className="h-4 w-4" />
          Add Staff
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <MessageSquare className="h-4 w-4" />
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
