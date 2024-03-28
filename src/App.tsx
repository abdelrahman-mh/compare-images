import ImageCompares from "./components/ImageCompares";
import ImagesDetails from "./components/ImageDetails";
import Notification from "./components/Notification";
import Options from "./components/Options";

const App: React.FC = () => {
  return (
    <>
      <Options />
      <ImagesDetails />
      <ImageCompares />
      <Notification />
    </>
  );
};

export default App;
