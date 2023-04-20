import React, { useState, useEffect } from 'react'
import NasaImage from './NasaImage'
import ReactPaginate from 'react-paginate'

interface Props {
  searchQuery: string
}

interface NasaImage {
  url: string
  title: string
  explanation: string
}

const IMAGES_PER_PAGE = 10

export const SearchResults = ({ searchQuery }: Props) => {
  const [searchResults, setSearchResults] = useState<NasaImage[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${encodeURIComponent(
            searchQuery
          )}&media_type=image&page=${currentPage}&page_size=10`
        )
        const data = await response.json()
        const totalHits = data.collection.metadata.total_hits
        const totalPages = Math.ceil(totalHits / IMAGES_PER_PAGE)
        setTotalPages(totalPages)
        const images = data.collection.items
          .filter((item: any) => item.data[0].media_type === 'image')
          .map((item: any) => ({
            url: item.links[0].href,
            title: item.data[0].title,
            explanation: item.data[0].description
          }))
        setSearchResults(images)
      } catch (error) {
        console.error(error)
      }
    }

    if (searchQuery) {
      fetchSearchResults()
    }
  }, [searchQuery, currentPage])

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1)
  }

  const renderPagination = () => {
    const pagesToShow = 9
    let pages: (JSX.Element | null)[] = []

    for (let i = 0; i < totalPages; i++) {
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - pagesToShow / 2 &&
          i <= currentPage + pagesToShow / 2)
      ) {
        pages.push(
          <li
            key={i}
            className={`page-item${i === currentPage - 1 ? ' active' : ''}`}>
            <button className='page-link' onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          </li>
        )
      } else if (pages[pages.length - 1] !== null) {
        pages.push(null)
      }
    }

    return pages
  }
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {searchResults.map((image) => (
          <NasaImage key={image.title} image={image} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav>
          <ReactPaginate
            pageCount={totalPages}
            initialPage={currentPage - 1}
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            breakLabel={'...'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={
              'flex flex-wrap gap-x-2 justify-center items-center'
            }
            previousClassName={
              'inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 page-item'
            }
            nextClassName={
              'inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 page-item'
            }
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
          />
        </nav>
      )}
    </div>
  )
}
