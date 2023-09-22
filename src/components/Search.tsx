import { useState } from 'react';

import axios from 'axios';
import Color from 'color';
import MidiPlayer from 'react-midi-player';
import { Link } from 'react-router-dom';

import { useSession } from '@clerk/clerk-react';
import styled from '@emotion/styled';

import { useMidi } from '../hooks/useMidi';

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -300px;
  display: flex;
  flex-direction: column;
}
`
const Input = styled.input`
  height: 40px;
  width: 600px;
  border-radius: 10px;
  padding: 6px 15px;
  font-size: 18px;
  margin-bottom: 20px;
`

const RowContainer = styled.div`
  gap: 10px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  padding: 5px 10px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => Color(theme.backgroundColor).darken(0.2).hex()};
  &:hover {
    background: ${({ theme }) => theme.secondaryBackgroundColor};
  }
`
interface FileDesc {
  name: string
  file: File
  buffer: string
}
const baseURL = process.env.API_URL
export function Search() {
  const { session } = useSession()
  const { midiFile, setMidiFile } = useMidi()
  const [searchValue, setSearchValue] = useState("")
  const [arrayBuffers, setArrayBuffers] = useState<FileDesc[]>([])

  const doRequest = async () => {
    const response = await axios.get(`${baseURL}/search?query=${searchValue}`, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${await session?.getToken()}`,
      },
    })

    const blob = new Blob([response.data], { type: "audio/midi" })
    const file = new File([blob], "MIDI_sample.mid", { type: "audio/midi" })

    try {
      // Convert the Blob to a Base64 string
      const reader = new FileReader()
      reader.onload = function () {
        if (reader.result) {
          const base64String = (reader.result as any).split(",")[1]
          // Use the base64String as needed
          setArrayBuffers([{ name: file.name, file, buffer: base64String }])
        }
      }
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  return (
    <Content>
      <Input
        placeholder="Search for a song"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            doRequest()
          }
        }}
      />
      {arrayBuffers.length > 0 && (
        <RowContainer>
          {arrayBuffers.map((fileDesc, index) => {
            return (
              <Row onClick={() => setMidiFile(fileDesc.file)}>
                <Link to="/playground">{fileDesc.name}</Link>
                {/* {fileDesc.buffer} */}
                <MidiPlayer key="1" data={atob(fileDesc.buffer)} />
              </Row>
            )
          })}
        </RowContainer>
      )}
    </Content>
  )
}
