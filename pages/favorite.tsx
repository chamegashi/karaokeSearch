import Head from 'next/head'
import { VFC, useEffect, useState } from 'react'
import Link from "next/link";
import { HeartIcon } from '@heroicons/react/solid'

import { SearchResultContent } from '../components/SearchResultContent'

type Favorite = {
  song: string,
  artist: string,
  songId: string,
  model: string
}

const Search: VFC = () => {
  const [isJoy, setIsJoy] = useState<boolean>(true)
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [joyFavorites, setJoyFavorites] = useState<Favorite[]>([])
  const [damFavorites, setDamFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite"));
    if(!favorites){
      return
    }

    const joyData = favorites.filter((favorite) => {return favorite.model === "JOY"})
    const damData = favorites.filter((favorite) => {return favorite.model === "DAM"})
    
    setJoyFavorites(joyData)
    setDamFavorites(damData)
    setFavorites(favorites)
  }, [])

  useEffect(() => {
    const joyData = favorites.filter((favorite) => {return favorite.model === "JOY"})
    const damData = favorites.filter((favorite) => {return favorite.model === "DAM"})
    
    setJoyFavorites(joyData)
    setDamFavorites(damData)
  }, [favorites])

  const addFavorit = (favorite: Favorite) => {
    return
  }

  const deleteFavorit = (songId: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorite"));
    const newFavorites = favorites.filter((favorite) => {return favorite.songId !== songId})
    localStorage.setItem('favorite', JSON.stringify(newFavorites));
    setFavorites(newFavorites)
  }

  return (
    <div className="w-full text-center min-h-screen bg-gray-700 text-white pb-2">

      <Head>
        <meta name="theme-color" content="#f9a8d4" />
        <title>お気に入り</title>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <div className="relative border-b border-gray-700 bg-gray-600 shadow-2xl py-4">
        <h1 className="text-3xl font-bold">お気に入り</h1>
        <Link href={{
          pathname: "/favorite",
        }}>
          <HeartIcon className="w-10 absolute inset-y-0 right-0 m-3"/>
        </Link>
      </div>

      <Link href={{
          pathname: "/",
        }}>
        <button className="border p-2 mb-4 rounded mt-4">検索画面に戻る</button>
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

          { joyFavorites.map((content, index) => {
            return(
              <SearchResultContent
                key={index}
                artist={content.artist}
                song={content.song}
                model={"JOY"}
                songId={content.songId}
                favorites={favorites}
                addFavorite={addFavorit}
                deleteFavorite={deleteFavorit}/>
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

          { damFavorites.map((content, index) => {
            return(
              <SearchResultContent
                key={index} artist={content.artist}
                song={content.song}
                model={"DAM"}
                songId={content.songId}
                favorites={favorites}
                addFavorite={addFavorit}
                deleteFavorite={deleteFavorit}/>
            )
          })}

        </div>
      )}

      { isJoy && joyFavorites.length === 0 && (
        <p className="text-3xl font-bold p-8">何もありませんでした。</p>
      )}
      { !isJoy && damFavorites.length === 0 && (
        <p className="text-3xl font-bold p-8">何もありませんでした。</p>
      )}


    </div>
  )
}

export default Search