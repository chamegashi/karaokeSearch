import Head from 'next/head'
import { VFC, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

interface content {
  artist: string,
  song: string
}

const Search: VFC = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>("")
  const [content, setContent] = useState<content>()

  useEffect(() => {
    if (!router.query) {
      return;
    }
    const query = router.query;
    if (query.keyword && typeof query.keyword === "string") {
      setKeyword(query.keyword);
    }
  }, [])

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">

      <Head>
        <title >曲詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold p-8">曲詳細</h1>

      <Link href={{
          pathname: "/search",
        }}>
        <button className="border p-2 mb-4 rounded">検索結果画面に戻る</button>
      </Link>


    </div>
  )
}

export default Search