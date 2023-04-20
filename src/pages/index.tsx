import SearchForm from '@/components/SearchForm'
import {SearchResults} from '@/components/SearchResults'
import Head from 'next/head'
import React, { useState } from 'react'


export default function Home() {
const [searchQuery, setSearchQuery] = useState('')
const [searchDate, setSearchDate] = useState('')
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className='max-w-5xl mx-auto px-4'>
      <Head>
        <title>Imagen del día de la NASA</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className='text-4xl font-bold mt-8 mb-4'>
          Imagen del día de la NASA
        </h1>
        <p className='text-gray-600 mb-8'>
          Descubre la imagen del día de la NASA o busca imágenes relacionadas
          con tu tema favorito.
        </p>
        <SearchForm onSearch={handleSearch} />
        {searchQuery && <SearchResults searchQuery={searchQuery} />}
      </main>
    </div>
  )
}







