import MainImage from "../MainImage";
import Synopsys from "./Synopsys";

const ImageAndSynopSys = ({
  image,
  title,
  synopsys,
}: {
  image: string;
  title: string;
  synopsys: string;
}) => {
  return (
    <div className="flow-root w-11/12 justify-start place-self-start">
      <div className="float-left pb-0 pr-4">
        <MainImage image={image} title={title} />
      </div>
      <Synopsys synopsys={synopsys} />
    </div>
  );
};
export default ImageAndSynopSys;
