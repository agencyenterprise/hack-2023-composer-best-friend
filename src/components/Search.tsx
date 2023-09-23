import { useState } from "react"

import axios from "axios"
import Color from "color"
import MidiPlayer from "react-midi-player"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"

import { useSession } from "@clerk/clerk-react"
import styled from "@emotion/styled"

import { useMidi } from "../hooks/useMidi"
import { ToolbarButton } from "../signal/components/Toolbar/ToolbarButton"
import { Button } from "./Button"
import { SearchLoader } from "./SearchLoader"

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
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const Input = styled.input`
  height: 50px;
  width: 600px;
  border-radius: 4px;
  padding: 6px 15px;
  font-size: 18px;
  color: black;
  border: none;
`

const RowContainer = styled.div`
  gap: 10px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 300px;
`

const Row = styled.div`
  padding: 6px 15px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => Color(theme.backgroundColor).darken(0.2).hex()};
  border-radius: 4px;
  &:hover {
    background: ${({ theme }) => theme.secondaryBackgroundColor};
  }

  button {
    background: none;
    text-decoration: underline;
    color: ${({ theme }) => theme.themeColor};
    font-size: 1rem;
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
  color: black;
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
  overlay: {
    backgroundColor: "rgba(11,11,11, 0.5)",
  },
}

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 600px;
`

export interface FileDesc {
  name: string
  file: File
  buffer: any
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

function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(",")
  /* @ts-ignore */
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[arr.length - 1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export function Search() {
  const { session } = useSession()
  const [key, setKey] = useState("")
  const { files, setFiles, setMidiFile } = useMidi()

  const [searchValue, setSearchValue] = useState("")
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()

  const doRequest = async () => {
    if (isSearching) return

    try {
      setIsSearching(true)

      const response = await axios.get(
        `${baseURL}/search?query=${searchValue}`,
        // `${baseURL}/search?query=${searchValue}&mode=presentation`,
        {
          // responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${await session?.getToken()}`,
          },
        },
      )
      const newFiles = []

      console.log(response.data)

      for (let i = 0; i < response.data.length; i++) {
        // // const arrayBuffer = new Uint8Array(response.data[i].data).buffer // Convert array of integers to ArrayBuffer
        // // const blob = new Blob([arrayBuffer], { type: "audio/midi" })
        // // const file = new File([blob], `midi-sample-${i + 1}.midi`, {
        // //   type: "audio/midi",
        // // })

        // newFiles.push({
        //   name: `midi-sample-${i + 1}.midi`,
        //   file: dataURLtoFile(response.data[i], `midi-sample-${i + 1}.midi`),
        //   buffer: dataUriToBuffer(response.data[i]),
        //   // buffer: data,
        // })

        const arrayBuffer = new Uint8Array(response.data[i].data).buffer // Convert array of integers to ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: "audio/midi" })
        const file = new File([blob], `midi-sample-${i + 1}.midi`, {
          type: "audio/midi",
        })

        newFiles.push({
          name: file.name,
          file,
          buffer: await blobToBase64DataURL(blob),
          // buffer: data,
        })

        // const byteArray = new Uint8Array(
        //   atob(response.data[i].join(""))
        //     .split("")
        //     .map((char) => char.charCodeAt(0)),
        // )
        // const blob = new Blob([byteArray], { type: "audio/midi" })
        // const file = new File([blob], `midi-sample-${i + 1}.mid`, {
        //   type: "audio/midi",
        // })

        // console.log({ file })

        // newFiles.push({
        //   name: file.name,
        //   file,
        //   buffer: await blobToBase64DataURL(blob),
        // })
      }

      setFiles(newFiles)
    } catch (e: any) {
      console.log(e)
      setIsOpen(true)
    } finally {
      setIsSearching(false)
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

  function handleMidiClick(file: FileDesc) {
    setMidiFile(file.file)
    navigate("/playground")
  }

  return (
    <Content>
      <InputWrapper>
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
        <ToolbarButton
          type="button"
          onClick={() => doRequest()}
          style={{
            height: "50px",
            fontSize: "1rem",
            width: "120px",
            display: "flex",
            justifyContent: "center",
          }}
          selected={true}
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </ToolbarButton>
      </InputWrapper>

      {isSearching && (
        <LoaderWrapper>
          <SearchLoader />
          <p
            style={{ fontSize: "1rem", textAlign: "center", color: "#9a9a9a" }}
          >
            (Stretch your legs and hang tight! We're processing your tracks 🥁)
          </p>
        </LoaderWrapper>
      )}

      {!isSearching && files.length > 0 && (
        <RowContainer>
          {files.map((fileDesc) => {
            return (
              <Row
                key={fileDesc.name}
                onClick={() => setMidiFile(fileDesc.file)}
              >
                <button onClick={() => handleMidiClick(fileDesc)}>
                  {fileDesc.name}
                </button>
                <div style={{ marginTop: "5px" }}>
                  <MidiPlayer
                    key={fileDesc.name}
                    data={atob(fileDesc.buffer)}
                  />
                </div>
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
        <div
          style={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
          }}
        >
          <h2 style={{ color: "White", margin: 0 }}>Save your key</h2>
          <p style={{ fontSize: "1rem", margin: 0 }}>
            It seems you reached the excerpts generation limit. Please, include
            your OpenAI's API key to keep generating new amazing tracks 🎸
          </p>
          <p style={{ color: "#9a9a9a", margin: 0 }}>
            (We will never share your key with anyone, it will be stored in our
            database and used only to generate your own excerpts.)
          </p>
          <FormKey onSubmit={onSaveKey}>
            <InputKey value={key} onChange={(e) => setKey(e.target.value)} />
            <ButtonsContainer>
              <Button type="submit" style={{ backgroundColor: "#4c41cc" }}>
                Save
              </Button>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </ButtonsContainer>
          </FormKey>
        </div>
      </Modal>
    </Content>
  )
}
