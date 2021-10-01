import Head from 'next/head'
import { VFC, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios'

const Search: VFC = () => {
  const router = useRouter()
  const [musicText, setMusicText] = useState<string>("")
  const [artistText, setArtistText] = useState<string>("")

  useEffect(() => {
    if (!router.query) {
      return;
    }
    const query = router.query;

    if (query.music && typeof query.music === "string") {
      setMusicText(query.music);
    }
    if (query.artist && typeof query.artist === "string") {
      setArtistText(query.artist);
    }

    const config = {
      headers: {
        Referer: "https://www.clubdam.com/karaokesearch/",
      }
    }

    axios.post(
      'https://www.clubdam.com/dkwebsys/search-api/SearchVariousByKeywordApi',
      {
        authKey:"2/Qb9R@8s*",
        compId:"1",
        dispCount:"100",
        keyword:"ホロネス",
        modelTypeCode:"1",
        pageNo:"1",
        serialNo:"AT00001",
        sort:"2",
      },
      config
    )
    .then(res => {
      console.info(res.data)
    })
    .catch((e) => {
      if (e.response !== undefined) {
        console.error(e.response.data.error)
      }
    })

  }, [])

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">

      <Head>
        <title >カラオケ検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold p-8">カラオケ検索結果</h1>

      <p>{musicText}</p>
      <p>{artistText}</p>
    </div>
  )
}

export default Search