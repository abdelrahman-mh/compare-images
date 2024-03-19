import React, { ChangeEvent, useState } from 'react'
import ImageDiff from './components/ImagesDiff'

const App: React.FC = () => {
  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0]
  //   handleFile(file as File | undefined)
  // }

  // const handleFile = async (file: File | undefined, type: 'image1' | 'image2') => {
  //   try {

  //     if (file) {
  //       // Validate file type
  //       if (file.type.startsWith('image/')) {
  //         setSelectedFile(file)
  //         setErrorMessage('')
  //         // Display image preview
  //         const reader = new FileReader()
  //         reader.onload = () => {
  //           setImagePreview(reader.result as string)
  //         }
  //         reader.readAsDataURL(file)
  //       } else {
  //         setSelectedFile(null)
  //         setImagePreview(null)
  //         setErrorMessage('Please select an image file.')
  //       }
  //     }
  //   }catch (err) {
  //     console.log('err', err)
  //   }
  // }

  return (
    <>
      <ImageDiff />
    </>
  )
}

export default App
