import React from "react"

interface MidiContextValue {
  midiFile: File | null
  setMidiFile: React.Dispatch<React.SetStateAction<File | null>>
}

interface MidiProviderProps {
  children: React.ReactNode
}

const MidiContext = React.createContext({} as MidiContextValue)

export function MidiProvider({ children }: MidiProviderProps) {
  const [midiFile, setMidiFile] = React.useState<File | null>(null)

  return (
    <MidiContext.Provider value={{ midiFile, setMidiFile }}>
      {children}
    </MidiContext.Provider>
  )
}

export function useMidi() {
  const context = React.useContext(MidiContext)

  if (context === undefined) {
    throw new Error("useMidi must be used within a MidiProvider")
  }

  return context
}
