import React, { useState } from 'react'

interface Props {
  onSearch: (query: string) => void
}

const SearchForm = ({ onSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(searchQuery)
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        <input
          type='text'
          placeholder='Buscar imágenes de la NASA...'
          className='flex-grow py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          value={searchQuery}
          onChange={handleQueryChange}
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg'>
          Buscar
        </button>
      </div>
    </form>
  )
}

export default SearchForm
