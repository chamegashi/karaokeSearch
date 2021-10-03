import Head from 'next/head'
import { VFC, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios'

import { getContentsdata } from './api/api'

interface content {
  artist: string,
  song: string
}

const Search: VFC = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>("")
  const [joyContents, setJoyContents] = useState<content[]>([])
  const [damContents, setDamContents] = useState<content[]>([])

  const { getFn, loading, error, response } = getContentsdata()

  useEffect(() => {
    if (!router.query) {
      return;
    }
    const query = router.query;
    if (query.keyword && typeof query.keyword === "string") {
      setKeyword(query.keyword);
      getFn(query.keyword)
    }
  }, [])

  useEffect(() => {
    if(!response){
      return
    }
    setJoyContents(response.joyResponce)
    setDamContents(response.damResponce)
  }, [response])

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">

      <Head>
        <title >カラオケ検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold p-8">カラオケ検索結果</h1>

      { loading && (
         <p className="text-3xl font-bold p-8">Loading...</p>
      )}

      { !loading && (
        <p>{keyword}</p>
      )}
      

    </div>
  )
}

export default Search