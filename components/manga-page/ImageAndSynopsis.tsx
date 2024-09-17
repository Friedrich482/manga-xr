import MainImage from "../MainImage";
import Synopsis from "./Synopsis";

const ImageAndSynopsis = ({
  image,
  title,
  synopsis,
}: {
  image: string;
  title: string;
  synopsis: string;
}) => {
  return (
    <div className="flow-root w-11/12 justify-start place-self-start">
      <div className="float-left pb-0 pr-4">
        <MainImage image={image} title={title} />
      </div>
      <Synopsis synopsis={synopsis} />
    </div>
  );
};
export default ImageAndSynopsis;
