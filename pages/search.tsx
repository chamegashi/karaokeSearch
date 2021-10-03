import Head from 'next/head'
import { VFC, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios'

const Search: VFC = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>("")

  useEffect(() => {
    if (!router.query) {
      return;
    }
    const query = router.query;

    console.log(query)

    if (query.keyword && typeof query.keyword === "string") {
      setKeyword(query.keyword);
    }

  }, [])

  useEffect(() => {
    if(!keyword){
      return
    }

    axios.get('http://127.0.0.1:5000/api/search?keyword=' + keyword)
    .then(res => {
      console.log(res.data)
    })
    .catch((e) => {
      if (e.response !== undefined) {
        console.error(e.response.data.error)
      }
    })

  }, [keyword])

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">

      <Head>
        <title >カラオケ検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold p-8">カラオケ検索結果</h1>

      <p>{keyword}</p>
    </div>
  )
}

export default Search