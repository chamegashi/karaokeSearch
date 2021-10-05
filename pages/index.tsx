import Head from 'next/head'
import { VFC, useState, FormEvent } from 'react'
import Link from "next/link";

const Home: VFC = () => {
  const [keyword, setKeyword] = useState<string>("")
  
  const changeKeyword = (e: FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">
      <Head>
        <meta name="theme-color" content="#f9a8d4" />
        <title>カラオケ検索</title>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <h1 className="text-3xl font-bold p-8">カラオケ検索</h1>

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
        <button className="mt-7 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-6 rounded">検索！</button>
      </Link>

    </div>
  )
}

export default Home