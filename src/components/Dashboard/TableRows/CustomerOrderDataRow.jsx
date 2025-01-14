import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const CustomerOrderDataRow = ({ order, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  console.log(order);
  const { _id, name, image, category, quantity, status, price, plantId } =
    order;
  const axiosSecure = useAxiosSecure();
  //handle order delete
  const handleOrderDelete = async () => {
    try {
      console.log(_id);
      const { data } = await axiosSecure.delete(`/orders/${_id}`);
      if (data.deletedCount > 0) {
        await axiosSecure.patch(`/plants/quantity/${plantId}`, {
          quantityToUpdate: quantity,
          status: "increase",
        });
      }
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      closeModal();
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="table-data">
        <p className="table-row">{name}</p>
      </td>
      <td className="table-data">
        <p className="table-row">{category}</p>
      </td>
      <td className="table-data">
        <p className="table-row">${price}</p>
      </td>
      <td className="table-data">
        <p className="table-row">{quantity}</p>
      </td>
      <td className="table-data">
        <p className="table-row">{status}</p>
      </td>

      <td className="table-data">
        <button
          onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative cursor-pointer">Cancel</span>
        </button>

        <DeleteModal
          handleDelete={handleOrderDelete}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

CustomerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
};

export default CustomerOrderDataRow;
