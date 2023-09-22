import { useState } from 'react';

import axios from 'axios';
import Color from 'color';
import MidiPlayer from 'react-midi-player';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import { useSession } from '@clerk/clerk-react';
import styled from '@emotion/styled';

import { useMidi } from '../hooks/useMidi';
import { Button } from './Button';

async function updateKey(key: string, token: string) {
  await axios.post(
    `${process.env.API_URL}/users/key`,
    { key },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
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

const FormKey = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`
const InputKey = styled.input`
  padding: 4px 10px;
  width: 300px;
  height: 30px;
  font-size: 14px;
  border-radius: 5px;
`

const customStyles = {
  content: {
    padding: "7px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#272935",
  },
}

interface FileDesc {
  name: string
  file: File
  buffer: string
}

const blobToBase64DataURL = (blob: Blob): Promise<string> =>
  new Promise((resolvePromise) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader?.result) {
        resolvePromise((reader.result as any).split(",")[1] as string)
      }
    }
    reader.readAsDataURL(blob)
  })

const baseURL = process.env.API_URL
export function Search() {
  const { session } = useSession()
  const [key, setKey] = useState("")
  const { midiFile, setMidiFile } = useMidi()
  const [searchValue, setSearchValue] = useState("")
  const [files, setFiles] = useState<FileDesc[]>([])
  const [modalIsOpen, setIsOpen] = useState(false)

  const doRequest = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/search?query=${searchValue}`,
        {
          // responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${await session?.getToken()}`,
          },
        },
      )

      const blob = new Blob([response.data], { type: "audio/midi" })
      const file = new File([blob], "MIDI_sample.mid", { type: "audio/midi" })
      setFiles([
        { name: file.name, file, buffer: await blobToBase64DataURL(blob) },
      ])
    } catch (e: any) {
      setIsOpen(true)
    }
  }

  const onSaveKey = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    if (key?.trim() !== "") {
      await updateKey(key, (await session?.getToken()) as string)
      setIsOpen(false)
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
      {files.length > 0 && (
        <RowContainer>
          {files.map((fileDesc) => {
            return (
              <Row onClick={() => setMidiFile(fileDesc.file)}>
                <Link to="/playground">{fileDesc.name}</Link>
                <MidiPlayer key="1" data={atob(fileDesc.buffer)} />
              </Row>
            )
          })}
        </RowContainer>
      )}
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Chatgpt key"
        style={customStyles}
      >
        <div>
          <h2>Save your key</h2>
          <FormKey onSubmit={onSaveKey}>
            <InputKey value={key} onChange={(e) => setKey(e.target.value)} />
            <ButtonsContainer>
              <Button type="submit">Save</Button>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </ButtonsContainer>
          </FormKey>
        </div>
      </Modal>
    </Content>
  )
}
