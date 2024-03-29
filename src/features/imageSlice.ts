import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../utils/hooks'
import imagesServices from '../services/imageServices'
import { parseImageFromWEB } from '../utils/helper'
import { Image, Side } from '../utils/types'
import { AppThunk } from '../utils/hooks'
import { parseImage } from '../utils/helper'
interface ImagesState {
  images: Image[]
  isFades: boolean
}

const initialState: ImagesState = {
  images: [],
  isFades: false,
}

export const setImageFromUri = createAsyncThunk<
  void,
  { value: string; side: 'left' | 'right' },
  { state: RootState }
>('images/fetchAndSetImage', async ({ value, side }, { dispatch, rejectWithValue }) => {
  try {
    const response = await imagesServices.fetchImage(value)
    const image = await parseImageFromWEB({ response, imageUrl: value, side })

    if (image) {
      dispatch(setImage(image))
      dispatch(triggerFades())
    } else {
      return rejectWithValue('The URL does not point to a valid image. Please try another one.')
    }
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message)
    }
    return rejectWithValue('The URL does not point to a valid image. Please try another one.')
  }
})

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImage: (state, { payload }: PayloadAction<Image>) => {
      const index = state.images.findIndex((prevImg) => prevImg.side === payload.side)
      if (index !== -1) {
        state.images[index] = payload
      } else {
        state.images.push(payload)
      }
    },

    setImages: (state, action: PayloadAction<Image[]>) => {
      action.payload.forEach((newImage) => {
        const index = state.images.findIndex((img) => img.side === newImage.side)
        if (index !== -1) {
          state.images[index] = newImage
        } else {
          state.images.push(newImage)
        }
      })
    },
    triggerFades: (state) => {
      state.isFades = state.images.length === 2 ? true : false
    },
  },
})

export const { setImage, setImages, triggerFades } = imagesSlice.actions

export default imagesSlice.reducer

export const setFiles = ({ files, side }: { files: File[] | null; side: Side }): AppThunk => {
  return async (dispatch) => {
    if (!files || files.length === 0) {
      throw new Error('No images selected. Please select at least one image.')
    }

    const filesToProcess = files.slice(0, 2)
    try {
      const processedImagesPromises = filesToProcess.map((file, index) => {
        const assetsSide = index % 2 === 0 ? side : side === 'left' ? 'right' : 'left'
        return parseImage(file, assetsSide)
      })

      const processedImages = await Promise.all(processedImagesPromises)
      dispatch(setImages(processedImages))
      dispatch(triggerFades())
    } catch (error) {
      throw new Error(
        'Failed to process selected images. Please ensure they are valid image files.'
      )
    }
  }
}
