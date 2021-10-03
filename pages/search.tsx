import Head from 'next/head'
import { VFC, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

import { getContentsdata } from './api/api'
import { SearchResultContent } from '../components/SearchResultContent'

interface content {
  artist: string,
  song: string
}

const Search: VFC = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>("")
  const [joyContents, setJoyContents] = useState<content[]>([])
  const [damContents, setDamContents] = useState<content[]>([])
  const [isJoy, setIsJoy] = useState<boolean>(true)

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

  useEffect(() => {
    if(error){
      console.log(error)
    }
  }, [error])

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">

      <Head>
        <title >カラオケ検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold p-8">カラオケ検索結果</h1>

      <Link href={{
          pathname: "/",
        }}>
        <button className="border p-2 mb-4 rounded">検索画面に戻る</button>
      </Link>

      { isJoy && (
        <div>
          <nav className="flex justify-center sm:flex-row my-2">
            <button className="w-1/3 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
                JoySound
            </button><button className="w-1/3 text-gray-200 py-4 px-6 block hover:text-blue-500 focus:outline-none"  onClick={() => setIsJoy(!isJoy)}>
                DAM
            </button>
          </nav>

          { joyContents.map((content, index) => {
            return(
              <SearchResultContent key={index} artist={content.artist} song={content.song}/>
            )
          })}

        </div>
      )}

      { !isJoy && (
        <div>
          <nav className="flex justify-center sm:flex-row my-2">
            <button className="w-1/3 text-gray-200 py-4 px-6 block hover:text-blue-500 focus:outline-none"  onClick={() => setIsJoy(!isJoy)}>
                JoySound
            </button><button className="w-1/3 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
                DAM
            </button>
          </nav>

          { damContents.map((content, index) => {
            return(
              <SearchResultContent key={index} artist={content.artist} song={content.song}/>
            )
          })}

        </div>
      )}

      { loading && (
         <p className="text-3xl font-bold p-8">Loading...</p>
      )}      

    </div>
  )
}

export default Search