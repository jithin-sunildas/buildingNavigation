"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Menu, Search, MapPin, Navigation, User, Home, Settings, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavigationCard } from "@/components/navigation-card"
import { MapScene } from "@/components/map-scene"
import { SearchBar } from "@/components/search-bar"

export default function IndoorNavigation() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Main Entrance")
  const [destination, setDestination] = useState("")

  const startNavigation = (dest: string) => {
    setDestination(dest)
    setIsNavigating(true)
  }

  const stopNavigation = () => {
    setIsNavigating(false)
    setDestination("")
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 z-10 w-full bg-black/80 backdrop-blur-md border-b border-purple-900/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            VoxelNav
          </h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gray-900/95 backdrop-blur-md border-purple-900/50 text-white">
            <div className="flex flex-col gap-6 mt-8">
              <h2 className="text-xl font-bold">Settings</h2>
              <div className="flex flex-col gap-4">
                <Button variant="ghost" className="justify-start gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Preferences
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <MapPin className="h-4 w-4" />
                  Saved Locations
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* 3D Map Viewer */}
      <div className="flex-1 mt-14 mb-24 relative">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 5, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <MapScene isNavigating={isNavigating} destination={destination} />
          <OrbitControls enableZoom={true} enablePan={true} />
          <Environment preset="night" />
        </Canvas>

        {/* User position indicator */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.7)]"></div>
        </div>
      </div>

      {/* Search Bar - Only show when not navigating */}
      {!isNavigating && (
        <div className="fixed top-16 left-0 right-0 px-4 z-10">
          <SearchBar currentLocation={currentLocation} onStartNavigation={startNavigation} />
        </div>
      )}

      {/* Navigation Card - Only show when navigating */}
      {isNavigating && (
        <NavigationCard currentLocation={currentLocation} destination={destination} onStopNavigation={stopNavigation} />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-purple-900/50 px-2 py-3 flex justify-around">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("text-white hover:bg-white/10", isNavigating && "text-blue-400")}
        >
          <Navigation className="h-5 w-5" />
          <span className="sr-only">Navigate</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Compass className="h-5 w-5" />
          <span className="sr-only">Explore</span>
        </Button>
      </div>
    </main>
  )
}

