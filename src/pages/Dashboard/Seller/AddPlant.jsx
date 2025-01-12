import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";

const AddPlant = () => {
  //handle form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddPlant;
