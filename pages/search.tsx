import Head from 'next/head'
import { VFC, useEffect, useState, FormEvent } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

import { GetContentsData } from './api/api'
import { SearchResultContent } from '../components/SearchResultContent'

interface content {
  artist: string,
  song: string,
  songId: string,
}

const Search: VFC = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>("")
  const [joyContents, setJoyContents] = useState<content[]>([])
  const [damContents, setDamContents] = useState<content[]>([])
  const [isJoy, setIsJoy] = useState<boolean>(true)

  const { getFn, loading, error, response } = GetContentsData()

  useEffect(() => {
    if (!router.query) {
      return;
    }
    const query = router.query;
    if (query.keyword && typeof query.keyword === "string") {
      setKeyword(query.keyword);
      getFn(query.keyword)
    }
  }, [getFn, router.query])

  useEffect(() => {
    if(!response){
      return
    }
    console.log(response)
    setJoyContents(response.joyResponce)
    setDamContents(response.damResponce)
  }, [response])

  useEffect(() => {
    if(error){
      console.log(error)
    }
  }, [error])

  const changeKeyword = (e: FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white pb-2">

      <Head>
        <meta name="theme-color" content="#f9a8d4" />
        <title>カラオケ検索結果</title>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <h1 className="text-3xl font-bold p-8">カラオケ検索結果</h1>

      <Link href={{
          pathname: "/",
        }}>
        <button className="border p-2 mb-4 rounded">検索画面に戻る</button>
      </Link>

      { loading && (
         <p className="text-3xl font-bold p-8">Loading...</p>
      )}

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
              <SearchResultContent key={index} artist={content.artist} song={content.song} keyword={keyword} model={"JOY"} songId={content.songId}/>
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
              <SearchResultContent key={index} artist={content.artist} song={content.song} keyword={keyword} model={"DAM"} songId={content.songId}/>
            )
          })}

        </div>
      )}

      { !loading && isJoy && joyContents.length === 0 && (
        <p className="text-3xl font-bold p-8">何もありませんでした。</p>
      )}
      { !loading && !isJoy && damContents.length === 0 && (
        <p className="text-3xl font-bold p-8">何もありませんでした。</p>
      )}


    </div>
  )
}

export default Search