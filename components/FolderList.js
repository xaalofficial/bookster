export default function FolderList({ folders, selectedFolder, setSelectedFolder }) {
  return (
    <div className="mt-4">
      <ul className="flex space-x-2 overflow-x-auto">
        <li>
          <button
            onClick={() => setSelectedFolder('All')}
            className={`px-4 py-2 rounded-full ${selectedFolder === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            All
          </button>
        </li>
        {folders.map(folder => (
          <li key={folder}>
            <button
              onClick={() => setSelectedFolder(folder)}
              className={`px-4 py-2 rounded-full ${selectedFolder === folder ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {folder}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

