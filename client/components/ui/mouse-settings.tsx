"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Settings, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MouseSettingsProps {
  onSensitivityChange: (sensitivity: number) => void
  onToggleEffects: (enabled: boolean) => void
}

export default function MouseSettings({ onSensitivityChange, onToggleEffects }: MouseSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [sensitivity, setSensitivity] = useState(1)
  const [effectsEnabled, setEffectsEnabled] = useState(true)

  useEffect(() => {
    const savedSensitivity = localStorage.getItem("mouseSensitivity")
    const savedEffectsEnabled = localStorage.getItem("mouseEffectsEnabled")

    if (savedSensitivity) {
      const sens = Number.parseFloat(savedSensitivity)
      setSensitivity(sens)
      onSensitivityChange(sens)
    }

    if (savedEffectsEnabled !== null) {
      const enabled = savedEffectsEnabled === "true"
      setEffectsEnabled(enabled)
      onToggleEffects(enabled)
    }
  }, [onSensitivityChange, onToggleEffects])

  const handleSensitivityChange = (newSensitivity: number) => {
    setSensitivity(newSensitivity)
    onSensitivityChange(newSensitivity)
    localStorage.setItem("mouseSensitivity", newSensitivity.toString())
  }

  const handleToggleEffects = () => {
    const newEnabled = !effectsEnabled
    setEffectsEnabled(newEnabled)
    onToggleEffects(newEnabled)
    localStorage.setItem("mouseEffectsEnabled", newEnabled.toString())
  }

  return (
    <div className="fixed top-6 right-6 z-30">
      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-64 border-0 bg-background/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">Mouse Settings</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Mouse Effects</label>
                <Button
                  variant={effectsEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleEffects}
                  className="w-full text-xs"
                >
                  {effectsEnabled ? "Enabled" : "Disabled"}
                </Button>
              </div>

              {effectsEnabled && (
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">
                    Sensitivity: {sensitivity.toFixed(1)}x
                  </label>
                  <div className="space-y-2">
                    {[0.5, 1, 1.5, 2].map((sens) => (
                      <Button
                        key={sens}
                        variant={sensitivity === sens ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSensitivityChange(sens)}
                        className="w-full text-xs"
                      >
                        {sens}x
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-background/80 backdrop-blur-sm border-0 hover:bg-background"
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  )
}
