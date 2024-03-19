import { createSlice } from '@reduxjs/toolkit'

interface ImagesState {
  images: {
    one: string
    tow: string
  }
  isFades: boolean
}

const initialState: ImagesState = {
  images: {
    one: '',
    tow: '',
  },
  isFades: false,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // addNoteLocal: (state, action: PayloadAction<Note>) => {},
  },
})

// export const { } = notesSlice.actions

export default notesSlice.reducer

// Thunk for fetching notes asynchronously
// export const fetchNotes = (): AppThunk => async (dispatch) => {
//   dispatch(setStatus('loading'));
//   try {
//     // Simulated API call
//     const response = await fetch('https://api.example.com/notes');
//     const data = await response.json();
//     dispatch(setNotes(data));
//     dispatch(setStatus('success'));
//   } catch (error) {
//     dispatch(setStatus('failed'));
//   }
// };

// export default notesSlice.reducer
