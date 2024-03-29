# Image Compare

Images compares app build with React, Typescript, Redux, and more

# Features

- Image selected

  - Select images in diffract sides, left and right
  - Drag and drop images
  - Browse local images & select image with url
    > when selected image with url, first we check if the url point to a valid image link, if it's,
    > we save the image data with `Blob` and use it, so not needed to fetch the image again to add it to the `dom`
  - Drag and chose multiply images
  - change selected image
    > so use able to select image with: Drag & Drop, url, browser local files

- Image diff component
  > show tow selected images top of both, and have a nice diff bar moves with cursor move
- error handling and notifications
- loading handles
- popups menu, and tooltip
- format the file size to a human readily size with B, KB, MB, GB, TB
- copy images infos text

## what you can do

you can see [TO-DO file](./TODOS.md)

# Errors and Troubleshooting

if got `Network Error` just try again and it's will works fine, this because you browser may not have a rights permissions to get local file
