import { VFC, useState } from 'react'
import Link from "next/link";

type Props = {
  artist: string,
  song: string,
  keyword: string,
}

export const SearchResultContent: VFC<Props> = (props: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

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
          <Link
            href={{
              pathname: "/search",
              query: {
                keyword: props.song,
              },
            }}
          >
            <button className="w-1/2 rounded border m-1 bg-gray-700">タイトルで検索</button>
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                keyword: props.artist,
              },
            }}
          >
            <button className="w-1/2 rounded border m-1 bg-gray-700">アーティスト名で検索</button>
          </Link>
        </div>
      )}

    </div>          
  )
}
