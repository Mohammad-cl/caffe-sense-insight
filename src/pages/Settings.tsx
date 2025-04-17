
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Settings | CaffeSense</title>
      </Helmet>
      
      <main className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <ThemeToggle />
        </div>
        
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your workspace preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="CaffeSense Monitoring" />
                  <p className="text-xs text-muted-foreground">
                    This will be displayed throughout the interface
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="update-interval">Data Refresh Interval</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-update">Auto Updates</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically refresh dashboard data
                    </p>
                  </div>
                  <Switch id="auto-update" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-alerts">Sound Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Play sounds for critical notifications
                    </p>
                  </div>
                  <Switch id="sound-alerts" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-caffe-500 hover:bg-caffe-600">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="sensors">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Configuration</CardTitle>
                <CardDescription>Adjust sensor thresholds and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Temperature Thresholds (°C)</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Minimum: 19°C</span>
                      <span className="text-sm">Maximum: 26°C</span>
                    </div>
                    <Slider 
                      defaultValue={[19, 26]} 
                      min={15} 
                      max={30} 
                      step={0.5}
                      className="w-full" 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Humidity Thresholds (%)</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Minimum: 40%</span>
                      <span className="text-sm">Maximum: 60%</span>
                    </div>
                    <Slider 
                      defaultValue={[40, 60]} 
                      min={30} 
                      max={80} 
                      step={1}
                      className="w-full" 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>CO Level Alert (ppm)</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Alert threshold: 50 ppm</span>
                    </div>
                    <Slider 
                      defaultValue={[50]} 
                      min={10} 
                      max={100} 
                      step={5}
                      className="w-full" 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-caffe-500 hover:bg-caffe-600">Save Thresholds</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive alerts via SMS
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="alert-email">Alert Email</Label>
                  <Input id="alert-email" type="email" defaultValue="alerts@example.com" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-caffe-500 hover:bg-caffe-600">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure system parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex space-x-2">
                    <Input id="api-key" value="••••••••••••••••••••••••••" readOnly className="font-mono" />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable detailed logging
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-semibold text-destructive">Danger Zone</h3>
                  <p className="text-xs text-muted-foreground">
                    These actions cannot be undone
                  </p>
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                      Reset All Settings
                    </Button>
                    <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                      Clear All Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
