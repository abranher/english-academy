import SectionTitle from "../common/SectionTitle";
import BoxBase from "../../../../components/common/BoxBase";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <BoxBase>
        <SectionTitle
          title="Main Features"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </BoxBase>
    </>
  );
};

export default Features;
