'use client'

import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BookmarkList from '../components/BookmarkList'
import BookmarkForm from '../components/BookmarkForm'
import FolderList from '../components/FolderList'
import Modal from '../components/Modal'

export default function Home() {
  const [bookmarks, setBookmarks] = useState([])
  const [folders, setFolders] = useState(['Work', 'Personal', 'Learning'])
  const [selectedFolder, setSelectedFolder] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setBookmarks(storedBookmarks)
  }, [])

  const addBookmark = (newBookmark) => {
    const updatedBookmarks = [...bookmarks, { ...newBookmark, id: Date.now().toString(), isPinned: false }]
    setBookmarks(updatedBookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    setIsModalOpen(false)
  }

  const editBookmark = (id, updatedBookmark) => {
    const updatedBookmarks = bookmarks.map(bookmark => 
      bookmark.id === id ? { ...bookmark, ...updatedBookmark } : bookmark
    )
    setBookmarks(updatedBookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
  }

  const deleteBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id)
    setBookmarks(updatedBookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
  }

  const togglePinBookmark = (id) => {
    const updatedBookmarks = bookmarks.map(bookmark =>
      bookmark.id === id ? { ...bookmark, isPinned: !bookmark.isPinned } : bookmark
    )
    setBookmarks(updatedBookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
  }

  const moveBookmark = (dragIndex, hoverIndex) => {
    const dragBookmark = bookmarks[dragIndex]
    const updatedBookmarks = [...bookmarks]
    updatedBookmarks.splice(dragIndex, 1)
    updatedBookmarks.splice(hoverIndex, 0, dragBookmark)
    setBookmarks(updatedBookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
  }

  const filteredBookmarks = selectedFolder === 'All' 
    ? bookmarks 
    : bookmarks.filter(bookmark => bookmark.folder === selectedFolder)

  const sortedBookmarks = [
    ...filteredBookmarks.filter(b => b.isPinned),
    ...filteredBookmarks.filter(b => !b.isPinned)
  ]

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-blue-600">Bookster</h1>
            </div>
            <div className="flex justify-between items-center">
              <FolderList 
                folders={folders} 
                selectedFolder={selectedFolder} 
                setSelectedFolder={setSelectedFolder} 
              />
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Add New Bookmark
              </button>
            </div>
          </div>
        </nav>
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <BookmarkList 
              bookmarks={sortedBookmarks} 
              editBookmark={editBookmark} 
              deleteBookmark={deleteBookmark}
              togglePinBookmark={togglePinBookmark}
              moveBookmark={moveBookmark}
              folders={folders}
            />
          </div>
        </main>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BookmarkForm addBookmark={addBookmark} folders={folders} />
        </Modal>
      </div>
    </DndProvider>
  )
}

