import React from "react"
import { FileDesc } from "../components/Search"

interface MidiContextValue {
  midiFile: File | null
  setMidiFile: React.Dispatch<React.SetStateAction<File | null>>
  files: FileDesc[]
  setFiles: React.Dispatch<React.SetStateAction<FileDesc[]>>
}

interface MidiProviderProps {
  children: React.ReactNode
}

const MidiContext = React.createContext({} as MidiContextValue)

export function MidiProvider({ children }: MidiProviderProps) {
  const [midiFile, setMidiFile] = React.useState<File | null>(null)
  const [files, setFiles] = React.useState<FileDesc[]>([])

  return (
    <MidiContext.Provider value={{ midiFile, setMidiFile, files, setFiles }}>
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
