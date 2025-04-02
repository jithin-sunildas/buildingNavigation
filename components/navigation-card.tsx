"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ChevronUp,
  X,
  ArrowRight,
  Footprints,
  MoveRightIcon as TurnRight,
  MoveLeftIcon as TurnLeft,
  StepBackIcon as Stairs,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface NavigationCardProps {
  currentLocation: string
  destination: string
  onStopNavigation: () => void
}

interface NavigationStep {
  instruction: string
  icon: React.ReactNode
  distance: string
  time: string
}

export function NavigationCard({ currentLocation, destination, onStopNavigation }: NavigationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // Sample navigation steps
  const navigationSteps: NavigationStep[] = [
    {
      instruction: "Walk straight ahead",
      icon: <Footprints className="h-5 w-5" />,
      distance: "15m",
      time: "20s",
    },
    {
      instruction: "Turn right at the water fountain",
      icon: <TurnRight className="h-5 w-5" />,
      distance: "5m",
      time: "10s",
    },
    {
      instruction: "Take the stairs to the 2nd floor",
      icon: <Stairs className="h-5 w-5" />,
      distance: "10m",
      time: "30s",
    },
    {
      instruction: "Turn left at the hallway",
      icon: <TurnLeft className="h-5 w-5" />,
      distance: "8m",
      time: "15s",
    },
    {
      instruction: `Arrive at ${destination}`,
      icon: <ArrowRight className="h-5 w-5" />,
      distance: "0m",
      time: "0s",
    },
  ]

  // Simulate progress
  useEffect(() => {
    const totalSteps = navigationSteps.length
    setProgress((currentStep / (totalSteps - 1)) * 100)

    // Auto-advance for demo purposes
    const timer = setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentStep, navigationSteps.length])

  return (
    <div className="fixed bottom-16 left-0 right-0 px-4 z-10">
      <Card
        className={cn(
          "bg-gray-900/80 backdrop-blur-md border-purple-900/50 transition-all duration-300 shadow-[0_0_15px_rgba(91,33,182,0.3)]",
          expanded ? "max-h-96" : "max-h-36",
        )}
      >
        <div className="p-3 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-300">Navigating to</h3>
            <h2 className="text-lg font-bold text-white">{destination}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onStopNavigation}
            className="text-gray-400 hover:text-white hover:bg-red-900/30"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Stop Navigation</span>
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 border border-blue-700/50">
              {navigationSteps[currentStep].icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{navigationSteps[currentStep].instruction}</p>
              <div className="flex gap-3 text-sm text-gray-400">
                <span>{navigationSteps[currentStep].distance}</span>
                <span>•</span>
                <span>{navigationSteps[currentStep].time}</span>
              </div>
            </div>
          </div>

          <Progress value={progress} className="h-1 bg-gray-800" indicatorClassName="bg-blue-500" />
        </div>

        {expanded && (
          <div className="p-4 pt-0">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Next Steps</h3>
            <div className="space-y-4">
              {navigationSteps.slice(currentStep + 1).map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-500 border border-gray-700/50">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-300">{step.instruction}</p>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{step.distance}</span>
                      <span>•</span>
                      <span>{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center py-2 text-gray-400 hover:text-white hover:bg-gray-800/50"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronUp className={cn("h-5 w-5 transition-transform", expanded ? "rotate-180" : "")} />
          <span className="sr-only">{expanded ? "Collapse" : "Expand"}</span>
        </Button>
      </Card>
    </div>
  )
}

