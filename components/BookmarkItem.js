import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const ItemTypes = {
  BOOKMARK: 'bookmark'
}

export default function BookmarkItem({ id, index, bookmark, editBookmark, deleteBookmark, togglePinBookmark, moveBookmark, folders }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedBookmark, setEditedBookmark] = useState(bookmark)

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.BOOKMARK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveBookmark(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOOKMARK,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleEdit = () => {
    editBookmark(bookmark.id, editedBookmark)
    setIsEditing(false)
  }

  if (isDragging) {
    // Get the current dimensions of the dragged item
    const { height, width } = ref.current?.getBoundingClientRect() || {};
  
    return (
      <div
        ref={ref}
        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg"
        style={{
          height: height ? `${height}px` : 'auto',
          width: width ? `${width}px` : 'auto',
        }}
      ></div>
    );
  }
  

  return (
    <div 
      ref={ref} 
      data-handler-id={handlerId} 
      className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isDragging ? 'shadow-2xl z-50 cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {isEditing ? (
        <div className="p-4 space-y-4">
          <input
            type="text"
            value={editedBookmark.title}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, title: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            value={editedBookmark.url}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, url: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editedBookmark.description}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, description: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <select
            value={editedBookmark.folder}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, folder: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {folders.map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>
          <div className="flex justify-end space-x-2">
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold text-gray-800">{bookmark.title}</h2>
            <button onClick={() => togglePinBookmark(bookmark.id)} className={`${bookmark.isPinned ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-600`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block mb-2 truncate">{bookmark.url}</a>
          <p className="text-gray-600 mb-4">{bookmark.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Folder: {bookmark.folder}</span>
            <div>
              <button onClick={() => setIsEditing(true)} className="text-yellow-500 hover:text-yellow-600 mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button onClick={() => deleteBookmark(bookmark.id)} className="text-red-500 hover:text-red-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

