import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "../utils/types";
import { AppThunk } from "../utils/hooks";
import { setNotification } from "./notificationSlice";
import { parseImage } from "../utils/helper";
interface ImagesState {
  images: Image[];
  isFades: boolean;
}

const initialState: ImagesState = {
  images: [],
  isFades: false,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImage: (state, { payload }: PayloadAction<Image>) => {
      const index = state.images.findIndex(
        (prevImg) => prevImg.side === payload.side,
      );
      if (index !== -1) {
        state.images[index] = payload;
      } else {
        state.images.push(payload);
      }
    },

    setImages: (state, action: PayloadAction<Image[]>) => {
      action.payload.forEach((newImage) => {
        const index = state.images.findIndex(
          (img) => img.side === newImage.side,
        );
        if (index !== -1) {
          state.images[index] = newImage;
        } else {
          state.images.push(newImage);
        }
      });
    },
    toggleFades: (state) => {
      state.isFades = !state.isFades;
    },
  },
});

export const { setImage, setImages, toggleFades } = imagesSlice.actions;

export default imagesSlice.reducer;

export const setFiles = ({
  files,
  side,
}: {
  files: File[] | null;
  side: "left" | "right";
}): AppThunk => {
  return async (dispatch) => {
    if (!files) {
      dispatch(
        setNotification({ message: "Invalid image selected", type: "error" }),
      );
      return;
    }

    const filesToProcess = Math.min(files.length, 2);
    const processedImages: Image[] = [];

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      const assetsSide =
        i % 2 === 0 ? side : side === "left" ? "right" : "left";

      try {
        const parsedImage = await parseImage(file, assetsSide);
        processedImages.push(parsedImage);
      } catch (error) {
        dispatch(
          setNotification({ message: "Invalid image selected", type: "error" }),
        );
      }
    }

    dispatch(setImages(processedImages));
  };
};
