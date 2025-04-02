"use client"

import { useState } from "react"
import { Search, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample location data
const locations = [
  "Conference Room A",
  "Cafeteria",
  "Executive Office",
  "Meeting Room 101",
  "IT Department",
  "Lobby",
  "Restrooms",
  "Elevator",
  "Stairwell",
  "Parking Garage",
]

interface SearchBarProps {
  currentLocation: string
  onStartNavigation: (destination: string) => void
}

export function SearchBar({ currentLocation, onStartNavigation }: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState("")

  const handleSelect = (destination: string) => {
    setSelectedDestination(destination)
    setOpen(false)
  }

  const handleStartNavigation = () => {
    if (selectedDestination) {
      onStartNavigation(selectedDestination)
    }
  }

  return (
    <Card className="bg-gray-900/60 backdrop-blur-md border-purple-900/50 p-3 shadow-[0_0_15px_rgba(91,33,182,0.3)]">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-gray-300">From: {currentLocation}</span>
      </div>

      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 justify-between bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 text-left"
            >
              {selectedDestination || "Select destination"}
              <Search className="h-4 w-4 text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 bg-gray-900 border-purple-900/50">
            <Command>
              <CommandInput placeholder="Search locations..." />
              <CommandList>
                <CommandEmpty>No locations found.</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem key={location} onSelect={() => handleSelect(location)} className="hover:bg-gray-800">
                      {location}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleStartNavigation}
          disabled={!selectedDestination}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Start Navigation</span>
        </Button>
      </div>
    </Card>
  )
}

