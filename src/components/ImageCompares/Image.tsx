const Image = ({ url }: { url: string }) => {
  return (
    <img alt="side-image" className={`images-diff__side-image`} src={url} />
  );
};

export default Image;
