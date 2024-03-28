import { Image } from "./types";
import { AxiosResponse } from "axios";
export const getUrlFromFIle = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const isValidType = (file: File): boolean => {
  return file.type.startsWith("image/");
};
export const parseImage = async (
  file: File,
  side: "left" | "right",
): Promise<Image> => {
  if (isValidType(file)) {
    const url = await getUrlFromFIle(file);
    const image: Image = {
      url,
      name: file.name,
      size: file.size,
      side,
    };

    return image;
  }
  throw new Error("Invalid image!");
};

export const getImageNameFromUrl = (imageUrl: string): string => {
  const urlParts = imageUrl.split("/");
  return urlParts[urlParts.length - 1];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseImageFromWEB = ({
  response,
  imageUrl,
  side,
}: {
  response: AxiosResponse<any, any>;
  imageUrl: string;
  side: "left" | "right";
}): Promise<Image> => {
  return new Promise((resolve, reject) => {
    try {
      const contentType = response.headers["content-type"];
      if (contentType && contentType.startsWith("image/")) {
        const imageData = new Blob([response.data], { type: contentType });
        console.log("imageData", imageData);
        const imageUrlObject = URL.createObjectURL(imageData);
        const imageInfo: Image = {
          url: imageUrlObject,
          name: getImageNameFromUrl(imageUrl),
          size: Number(imageData.size),
          side,
        };

        resolve(imageInfo);
      } else {
        reject(new Error("The URL does not point to a valid image."));
      }
    } catch (error) {
      reject(error);
    }
  });
};
