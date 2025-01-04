'use client'

import { useState } from 'react'
import { Bell, FileText, Edit, Trash2, Star, Clock, LogOut, Settings as SettingsIcon, Menu, X, User, FileSpreadsheet, Layout, History } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

const resumeTemplates = [
  { id: 'professional', name: 'Professional' },
  { id: 'creative', name: 'Creative' },
  { id: 'simple', name: 'Simple' },
  { id: 'modern', name: 'Modern' },
]

const savedResumes = [
  { id: 1, name: 'Software Engineer Resume', lastEdited: '2 days ago' },
  { id: 2, name: 'Product Manager Resume', lastEdited: '1 week ago' },
  { id: 3, name: 'Data Analyst Resume', lastEdited: '3 weeks ago' },
]

const historyLog = [
  { action: 'Edited Software Engineer Resume', timestamp: '2 days ago' },
  { action: 'Changed template to Modern', timestamp: '1 week ago' },
  { action: 'Downloaded Product Manager Resume', timestamp: '2 weeks ago' },
  { action: 'Created Data Analyst Resume', timestamp: '3 weeks ago' },
]

export default function UserDashboard() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about creating impactful resumes.'
  })
  const [activeTab, setActiveTab] = useState('profile')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Implement profile update logic here
    console.log('Profile updated')
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Implement password change logic here
    console.log('Password changed')
  }

  const handleDeleteResume = (id: number) => {
    // Implement resume deletion logic here
    console.log(`Deleting resume with id: ${id}`)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button type="button">Change Picture</Button>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        )
      case 'resumes':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Saved Resumes</CardTitle>
              <CardDescription>View and manage your saved resumes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedResumes.map((resume) => (
                  <div key={resume.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="text-sm font-medium">{resume.name}</h3>
                      <p className="text-sm text-muted-foreground">Last edited: {resume.lastEdited}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      case 'templates':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Resume Templates</CardTitle>
              <CardDescription>Quick access to your favorite templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resumeTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-muted"></div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Preview</Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Star className="h-4 w-4 mr-1" />
                        Favorite
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button type="submit">Change Password</Button>
                </form>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="email-notifications" />
                  <Label htmlFor="email-notifications">Receive email notifications</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 'history':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Recent actions on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historyLog.map((log, index) => (
                  <div key={index} className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-[82vh] bg-background">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex w-64 flex-col bg-background border-r">
        <nav className="flex-1 space-y-3 p-4">
          <Button

            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab('profile')}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Button>
          <Button

            variant={activeTab === 'resumes' ? 'default' : 'ghost'}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab('resumes')}
          >
            <FileSpreadsheet className="mr-3 h-5 w-5" />
            Resumes
          </Button>
          <Button

            variant={activeTab === 'templates' ? 'default' : 'ghost'}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab('templates')}
          >
            <Layout className="mr-3 h-5 w-5" />
            Templates
          </Button>
          <Button

            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab('settings')}
          >
            <SettingsIcon className="mr-3 h-5 w-5" />
            Settings
          </Button>
          <Button

            variant={activeTab === 'history' ? 'default' : 'ghost'}
            className="py-5 w-full justify-start text-lg font-medium"
            onClick={() => setActiveTab('history')}
          >
            <History className="mr-3 h-5 w-5" />
            History
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between md:hidden">
            <div className="flex items-center">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Resume Builder</SheetTitle>
                    <SheetDescription>Navigation</SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-2 mt-4">
                    <Button
                      variant={activeTab === 'profile' ? 'default' : 'ghost'}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </Button>
                    <Button
                      variant={activeTab === 'resumes' ? 'default' : 'ghost'}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => { setActiveTab('resumes'); setIsSidebarOpen(false); }}
                    >
                      <FileSpreadsheet className="mr-3 h-5 w-5" />
                      Resumes
                    </Button>
                    <Button
                      variant={activeTab === 'templates' ? 'default' : 'ghost'}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => { setActiveTab('templates'); setIsSidebarOpen(false); }}
                    >
                      <Layout className="mr-3 h-5 w-5" />
                      Templates
                    </Button>
                    <Button
                      variant={activeTab === 'settings' ? 'default' : 'ghost'}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
                    >
                      <SettingsIcon className="mr-3 h-5 w-5" />
                      Settings
                    </Button>
                    <Button
                      variant={activeTab === 'history' ? 'default' : 'ghost'}
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => {   setActiveTab('history'); setIsSidebarOpen(false); }}
                    >
                      <History className="mr-3 h-5 w-5" />
                      History
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              <h1 className="text-2xl font-semibold text-gray-900 ml-2 md:hidden">Resume Builder</h1>
            </div>
           
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}