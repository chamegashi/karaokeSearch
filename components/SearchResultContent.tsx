import { VFC } from 'react'

type Content = {
  artist: string,
  song: string
}

export const SearchResultContent: VFC<Content> = (content: Content) => {

  return (
    <div className="">
      <div className="bg-gray-600 h-16 mx-4 my-1 rounded flex justify-center">
        <div className="w-3/5 flex flex-wrap content-center text-left">
          <p className="px-3 text-sm truncate">{content.song}</p>
        </div>
        <div className="w-2/5 flex flex-wrap content-center text-left">
          <p className="text-xs text-gray-400 truncate">{content.artist}</p>
        </div>
      </div>
    </div>          
  )
}
