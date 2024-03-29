import React from "react";
import DragSide from "./DragSide";
import { SideProvider } from "../../context/SideContext";

interface Props {}

const ImageCompare: React.FC<Props> = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 mt-3 justify-center">
      <SideProvider value="left">
        <DragSide />
      </SideProvider>
      <SideProvider value="right">
        <DragSide />
      </SideProvider>
      <div className="absolute"></div>
    </div>
  );
};

export default ImageCompare;
