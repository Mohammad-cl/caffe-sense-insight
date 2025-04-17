
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Admin() {
  // Mock admin data
  const deviceData = [
    { id: "esp32-001", name: "ESP32 Room 1", status: "Online", lastUpdate: "2 minutes ago" },
    { id: "esp32-002", name: "ESP32 Room 2", status: "Online", lastUpdate: "5 minutes ago" },
    { id: "esp32-003", name: "ESP32 Counter", status: "Online", lastUpdate: "1 minute ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin | CaffeSense</title>
      </Helmet>
      
      <main className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Sensors</CardTitle>
              <CardDescription>All connected sensors</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">15</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Active Devices</CardTitle>
              <CardDescription>ESP32 devices online</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Alert Status</CardTitle>
              <CardDescription>Current system alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">Normal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Data Storage</CardTitle>
              <CardDescription>Sensor data storage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">42.8 MB</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>Status of ESP32 devices in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deviceData.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-mono">{device.id}</TableCell>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300">
                        {device.status}
                      </span>
                    </TableCell>
                    <TableCell>{device.lastUpdate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>CaffeSense monitoring system details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Version</h3>
                <p>CaffeSense v1.0.0</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Maintenance</h3>
                <p>April 15, 2025</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Data Retention</h3>
                <p>30 days</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Next Backup</h3>
                <p>April 18, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
