import { useState } from "react"

import axios from "axios"

import { useMidi } from "../hooks/useMidi"

const baseURL = process.env.API_URL
export function Search() {
  const { setMidiFile } = useMidi()
  const [searchValue, setSearchValue] = useState("")

  const doRequest = async () => {
    const response = await axios.get(`${baseURL}/search?query=${searchValue}`, {
      responseType: "arraybuffer",
    })

    const blob = new Blob([response.data], { type: "audio/midi" })
    const file = new File([blob], "MIDI_sample.mid", { type: "audio/midi" })
    setMidiFile(file)
    console.log({ file })
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <input
        className="w-[600px] rounded-lg p-3 text-black"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            doRequest()
          }
        }}
      />
    </main>
  )
}
