import Head from 'next/head'
import { VFC, useState, FormEvent } from 'react'

const Home: VFC = () => {

  const [musicText, setMusicText] = useState<string>("")

  
  const changeMusicText = (e: FormEvent<HTMLInputElement>) => {
    setMusicText(e.currentTarget.value);
  };

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white">
      <Head>
        <title >Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold p-8">カラオケ検索</h1>

      <div className="border mx-6 rounded pt-2 pb-8">
        <div>
          <p className="text-xl p-2">曲名</p>
          <input className="rounded p-3 font-bold text-gray-700" type="text" value={musicText} placeholder="指定なし" onChange={changeMusicText}/>
        </div>

        <div className="mt-4">
          <p className="text-xl p-2">アーティスト</p>
          <input className="rounded p-3 font-bold text-gray-700" type="text" value={musicText} placeholder="指定なし" onChange={changeMusicText}/>
        </div>
      </div>

      <button className="mt-7 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-6 rounded">検索！</button>

    </div>
  )
}

export default Home