import { VFC, useState, useEffect } from 'react'
import { HeartIcon } from '@heroicons/react/solid'

export type Model = "DAM" | "JOY";

type Props = {
  artist: string;
  song: string;
  keyword: string;
  model: Model;
  songId: string;
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  deleteFavorite: (songId: string) => void;
}

type Favorite = {
  song: string;
  artist: string;
  songId: string;
  model: string;
}
export const SearchResultContent: VFC<Props> = (props: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [isFavorited, setIsFavorited] = useState<boolean>(false)

  useEffect(() => {
    const filtered = props.favorites.filter((favorite) => {return favorite.songId === props.songId})
    if(filtered.length){
      setIsFavorited(true)
    }
  }, [props.favorites, props.songId])

  const sendFavoriteData: Favorite = {
    song: props.song,
    artist: props.artist,
    songId: props.songId,
    model: props.model,
  }

  return (
    <div className="cursor-pointer my-1">
      <button className="bg-gray-600 h-16 w-11/12 mx-4 rounded flex justify-center" onClick={() => {setIsClicked(!isClicked)}}>
        <div className="w-3/5 flex flex-wrap content-center text-left my-5">
          <p className="px-3 text-sm truncate">{props.song}</p>
        </div>
        <div className="w-2/5 flex flex-wrap content-center text-left my-5">
          <p className="text-xs text-gray-400 truncate">{props.artist}</p>
        </div>
      </button>

      {isClicked && (
        <div className="bg-gray-600 h-12 w-11/12 mx-4 mb-1 rounded-b border-t border-gray-800 flex text-gray-200 text-sm">
          {props.model === "JOY" && (
            <a href={"https://www.joysound.com/web/search/song/" + props.songId} className="w-1/2 rounded border m-1 bg-gray-700 flex justify-center">
              <button className="">{props.model}のページに飛ぶ</button>
            </a>
          )}
          {props.model === "DAM" && (
            <a href={"https://www.clubdam.com/karaokesearch/songleaf.html?requestNo=" + props.songId} className="w-1/2 rounded border m-1 bg-gray-700 flex justify-center">
              <button className="">{props.model}のページに飛ぶ</button>
            </a>
          )}

          {!isFavorited && (
            <button className="w-1/2 rounded border m-1 bg-gray-700" onClick={() => {props.addFavorite(sendFavoriteData);setIsFavorited(true)}}>お気に入りに登録</button>
          )}

          {isFavorited && (
            <button className="w-1/2 rounded border m-1 bg-gray-700" onClick={() => {props.deleteFavorite(props.songId);setIsFavorited(false)}}>お気に入りから解除</button>
          )}

        </div>
      )}
    </div>          
  )
}
