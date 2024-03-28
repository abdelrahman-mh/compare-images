import React from "react";
import DragSide from "./DragSide";
import { SideProvider } from "../../context/SideContext";

interface Props {}

const ImageCompare: React.FC<Props> = () => {
  return (
    <div className="image-compare flex flex-col items-center gap-5 mt-3">
      <SideProvider value="left">
        <DragSide />
      </SideProvider>
      <SideProvider value="right">
        <DragSide />
      </SideProvider>
      <div className="image-compare__diff-bar"></div>
    </div>
  );
};

export default ImageCompare;
