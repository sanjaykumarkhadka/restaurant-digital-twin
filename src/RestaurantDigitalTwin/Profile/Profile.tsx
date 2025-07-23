import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Clock,
  Shield,
  Bell,
  Smartphone,
  Wifi,
  Database,
  Cloud,
  Lock,
  Key,
  Save,
  RefreshCcw,
  Upload,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Coffee,
  Utensils,
  MapPin,
  Image,
  Camera,
  Edit,
  Plus,
  QrCode,
  Palette,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Mock profile/settings data
const settingsData = {
  restaurant: {
    name: "Quantum Bistro",
    type: "Fine Dining",
    description: "Modern fusion cuisine with a quantum twist",
    logo: "/restaurant-logo.png",
    coverImage: "/restaurant-cover.jpg",
    established: "2022",
    branches: 3
  },
  contact: {
    email: "info@quantumbistro.com",
    phone: "+91 98765 43210",
    website: "www.quantumbistro.com",
    address: "123 Innovation Street, Bangalore",
    socialMedia: {
      instagram: "@quantumbistro",
      facebook: "QuantumBistro",
      twitter: "@QuantumBistro"
    }
  },
  operations: {
    timings: {
      monday: { open: "11:00", close: "23:00" },
      tuesday: { open: "11:00", close: "23:00" },
      wednesday: { open: "11:00", close: "23:00" },
      thursday: { open: "11:00", close: "23:00" },
      friday: { open: "11:00", close: "00:00" },
      saturday: { open: "11:00", close: "00:00" },
      sunday: { open: "11:00", close: "23:00" }
    },
    seatingCapacity: 120,
    privateRooms: 2,
    parkingAvailable: true
  },
  integrations: {
    pos: "QuantumPOS v2.1",
    payment: ["Stripe", "Razorpay", "UPI"],
    delivery: ["Zomato", "Swiggy"],
    accounting: "QuickBooks",
    active: true
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    alerts: {
      lowInventory: true,
      staffing: true,
      reviews: true,
      security: true
    }
  },
  security: {
    twoFactor: true,
    lastPasswordChange: "2024-02-15",
    activeDevices: [
      { name: "iPhone 13", lastAccess: "2024-03-20T15:30:00" },
      { name: "MacBook Pro", lastAccess: "2024-03-20T14:45:00" }
    ],
    backupEnabled: true
  },
  theme: {
    mode: "dark",
    color: "blue",
    animations: true,
    compactView: false
  },
  backup: {
    lastBackup: "2024-03-20T00:00:00",
    autoBackup: true,
    frequency: "daily",
    retention: 30
  }
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('general');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsDirty(false);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-violet-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 
            to-indigo-400 bg-clip-text text-transparent">
            Restaurant Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your restaurant settings and configurations
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <RefreshCcw className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Restaurant Profile */}
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={settingsData.restaurant.logo} />
                    <AvatarFallback>QB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Restaurant Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your restaurant's basic information
                    </p>
                  </div>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Restaurant Name</label>
                    <Input 
                      defaultValue={settingsData.restaurant.name}
                      onChange={() => setIsDirty(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select 
                      defaultValue={settingsData.restaurant.type}
                      onValueChange={() => setIsDirty(true)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fine Dining">Fine Dining</SelectItem>
                        <SelectItem value="Casual Dining">Casual Dining</SelectItem>
                        <SelectItem value="Fast Casual">Fast Casual</SelectItem>
                        <SelectItem value="Café">Café</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea 
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                      rows={3}
                      defaultValue={settingsData.restaurant.description}
                      onChange={() => setIsDirty(true)}
                    />
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {Object.entries(settingsData.contact).map(([key, value]) => (
                    key !== 'socialMedia' && (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium capitalize">
                          {key}
                        </label>
                        <Input 
                          defaultValue={value}
                          onChange={() => setIsDirty(true)}
                        />
                      </div>
                    )
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs content... */}
        </div>
      </Tabs>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button className="rounded-full shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          Add Branch
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <QrCode className="h-4 w-4" />
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-violet-400 rounded-full"
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
