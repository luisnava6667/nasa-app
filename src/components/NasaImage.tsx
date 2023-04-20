import React, { useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'

interface Props {
  image: {
    url: string
    title: string
    explanation: string
  }
}

const NasaImage = ({ image }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='cursor-pointer w-full h-64 relative'>
        <Image
          src={image.url}
          alt={image.title}
          width={100}
          height={100}
          className='w-full h-full rounded-lg shadow-md object-cover'
          onClick={handleOpenModal}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={image.title}
        className='modal'
        overlayClassName='overlay'>
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50'>
          <button
            onClick={handleCloseModal}
            className='close-button absolute top-2 right-2'>
            &times;
          </button>
          <div className='bg-white rounded-lg shadow-lg p-4'>
            <h2 className='text-2xl font-bold mb-2'>{image.title}</h2>
            <p className='mb-4'>{image.explanation}</p>
            <div className='modal-image'>
              <Image
                src={image.url}
                alt={image.title}
                className='w-full'
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default NasaImage
