interface NasaImageData {
  data: {
    id: string
    title: string
    media_type: string
    url: string
  }[]
}

export const getImages = async (searchQuery: string): Promise<ImageData[]> => {
  const response = await fetch(
    `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`
  )

  if (!response.ok) {
    throw new Error('Error al buscar las imágenes.')
  }

  const data: NasaImageData = await response.json()

  return data.data.map((image) => ({
    id: image.id,
    title: image.title,
    url: image.url
  }))
}
