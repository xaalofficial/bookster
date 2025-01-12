import { useCallback } from 'react'
import { useDrop } from 'react-dnd'
import BookmarkItem from './BookmarkItem'

const ItemTypes = {
  BOOKMARK: 'bookmark'
}

export default function BookmarkList({ bookmarks, editBookmark, deleteBookmark, togglePinBookmark, moveBookmark, folders }) {
  const [, drop] = useDrop(() => ({ accept: ItemTypes.BOOKMARK }))

  const renderBookmark = useCallback((bookmark, index) => {
    return (
      <BookmarkItem
        key={bookmark.id}
        index={index}
        id={bookmark.id}
        bookmark={bookmark}
        editBookmark={editBookmark}
        deleteBookmark={deleteBookmark}
        togglePinBookmark={togglePinBookmark}
        moveBookmark={moveBookmark}
        folders={folders}
      />
    )
  }, [editBookmark, deleteBookmark, togglePinBookmark, moveBookmark, folders])

  return (
    <div ref={drop} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((bookmark, i) => (
        <div key={bookmark.id}>
          {renderBookmark(bookmark, i)}
        </div>
      ))}
    </div>
  )
}

