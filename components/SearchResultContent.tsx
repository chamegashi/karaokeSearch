import { VFC, useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'

export type Model = "DAM" | "JOY";

type Props = {
  artist: string,
  song: string,
  keyword: string,
  model: Model,
  songId: string,
}

export const SearchResultContent: VFC<Props> = (props: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const addFavorit = () => {
    
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
          <button className="w-1/2 rounded border m-1 bg-gray-700" onChange={addFavorit}>お気に入りに登録</button>
        </div>
      )}
    </div>          
  )
}
