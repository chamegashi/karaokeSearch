import Head from 'next/head'
import { VFC, useEffect, useState } from 'react'
import { useRouter } from "next/router";

const Search: VFC = () => {
  const router = useRouter()
  const [musicText, setMusicText] = useState<string>("")

  useEffect(() => {
    if (!router.query) {
      return;
    }
    const query = router.query;

    if (query.music && typeof query.music === "string") {
      setMusicText(query.music);
    }

  }, [])

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">
      <p>{musicText}</p>
    </div>
  )
}

export default Search