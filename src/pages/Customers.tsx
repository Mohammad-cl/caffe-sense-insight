
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Customers() {
  // Mock customer data
  const customersData = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", access: "Admin", lastLogin: "Today, 09:15 AM" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", access: "Manager", lastLogin: "Yesterday, 04:23 PM" },
    { id: 3, name: "James Smith", email: "james@example.com", access: "Staff", lastLogin: "Apr 15, 2025" },
    { id: 4, name: "Lisa Wang", email: "lisa@example.com", access: "Staff", lastLogin: "Apr 14, 2025" },
    { id: 5, name: "Robert Chen", email: "robert@example.com", access: "Staff", lastLogin: "Apr 13, 2025" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Customers | CaffeSense</title>
      </Helmet>
      
      <main className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Users</CardTitle>
              <CardDescription>All registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Admin Users</CardTitle>
              <CardDescription>With administrative access</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Active Today</CardTitle>
              <CardDescription>Logged in today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>User List</CardTitle>
                <CardDescription>Manage users and access permissions</CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="w-full pl-8 md:w-[250px]"
                  />
                </div>
                
                <Button className="bg-caffe-500 hover:bg-caffe-600">
                  <Plus className="h-4 w-4 mr-1" />
                  Add User
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customersData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${customer.access === "Admin" ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300" : 
                          customer.access === "Manager" ? "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300" : 
                          "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300"}`}>
                        {customer.access}
                      </span>
                    </TableCell>
                    <TableCell>{customer.lastLogin}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
