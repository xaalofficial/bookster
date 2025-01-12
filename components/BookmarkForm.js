import { useState } from 'react'

export default function BookmarkForm({ addBookmark, folders }) {
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    url: '',
    description: '',
    folder: folders[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addBookmark({ ...newBookmark, id: Date.now() })
    setNewBookmark({ title: '', url: '', description: '', folder: folders[0] })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Bookmark</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          value={newBookmark.title}
          onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
        <input
          id="url"
          type="url"
          placeholder="Enter URL"
          value={newBookmark.url}
          onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          placeholder="Enter description"
          value={newBookmark.description}
          onChange={(e) => setNewBookmark({ ...newBookmark, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows="3"
        />
      </div>
      <div>
        <label htmlFor="folder" className="block text-sm font-medium text-gray-700">Folder</label>
        <select
          id="folder"
          value={newBookmark.folder}
          onChange={(e) => setNewBookmark({ ...newBookmark, folder: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {folders.map(folder => (
            <option key={folder} value={folder}>{folder}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
        Add Bookmark
      </button>
    </form>
  )
}

