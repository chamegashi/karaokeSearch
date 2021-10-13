import Head from 'next/head'
import { VFC, useState, FormEvent, useEffect } from 'react'
import Link from "next/link";
import { HeartIcon } from '@heroicons/react/solid'

const Home: VFC = () => {
  const [keyword, setKeyword] = useState<string>("")
  const [history, setHistory] = useState<string[]>([])
  
  useEffect(() => {
    let newHistory = []
    const history = JSON.parse(localStorage.getItem("history"))

    if(history) newHistory = history
    setHistory(newHistory)
  }, [])

  const changeKeyword = (e: FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const saveSerachHistory = (keyword: string) => {
    let newHistory: string[] = []
    const localHistory = JSON.parse(localStorage.getItem("history"));

    if(localHistory) newHistory = localHistory

    newHistory.unshift(keyword)

    if(newHistory.length > 5){
      newHistory.pop()
    }

    localStorage.setItem('history', JSON.stringify(newHistory));
  }


  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">
      <Head>
        <meta name="theme-color" content="#f9a8d4" />
        <title>カラオケ検索</title>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <div className="relative border-b border-gray-700 bg-gray-600 shadow-2xl py-4">
        <h1 className="text-3xl font-bold">カラオケ検索</h1>
        <Link href={{
          pathname: "/favorite",
        }}>
          <HeartIcon className="w-10 absolute inset-y-0 right-0 m-3"/>
        </Link>
      </div>

      <div className="text-lg m-5">
        <p>カラオケに曲が入っているかどうか検索できます。</p>
      </div>

      <div className="text-lg m-5">
        <p>空白区切りで複数条件検索ができます。</p>
      </div>

      <div className="border mx-6 rounded pt-2 pb-8">
        <div>
          <p className="text-xl p-2">キーワード</p>
          <input className="rounded p-3 font-bold text-gray-700" type="text" value={keyword} placeholder="歌手名 or タイトル" onChange={changeKeyword}/>
        </div>
      </div>


      <Link
        href={{
          pathname: "/search",
          query: {
            keyword: keyword,
          },
        }}
      >
        <button onClick={() => {saveSerachHistory(keyword)}} className="mt-7 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-6 rounded">検索！</button>
      </Link>

      <h1 className="text-2xl font-bold mt-6">検索履歴</h1>

      { (history.length !== 0) && (
        <div className="m-2">
          { history.map((historyString, i) => {return (
            <Link
              href={{
                pathname: "/search",
                query: {
                  keyword: historyString,
                },
              }}
              key={i}
            >
              <div className="h-10 bg-gray-600 rounded w-full my-2 flex justify-center">
                <p className="text-lg pt-1">{historyString}</p>
              </div>
            </Link>
          )})}
        </div>
      ) }

    </div>
  )
}

export default Home