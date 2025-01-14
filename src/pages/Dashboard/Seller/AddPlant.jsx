import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utils";

const AddPlant = () => {
  const [uploadBtnText, setUploadBtnText] = useState("Upload Image");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //plant information
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const image_url = await imageUpload(image);

    //seller information
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      seller,
      image: image_url,
    };

    console.table(plantData);

    try {
      await axiosSecure.post(`/plants`, plantData);
      toast.success("Data added Successfully!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadBtnText={uploadBtnText}
        setUploadBtnText={setUploadBtnText}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
