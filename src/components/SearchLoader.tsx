import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const SearchLoader = () => {
  const phrases = [
    "Tuning up the band...",
    "Composing the melody...",
    "Harmonizing the tones...",
    "Laying down the bass track...",
    "Writing out the lyrics...",
    "Polishing up the final notes...",
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        return (prevIndex + 1) % phrases.length
      })
    }, 3000)

    // clean-up to clear the interval
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h6 style={{ fontSize: "1.2rem" }}>{phrases[index]}</h6>
    </motion.div>
  )
}
