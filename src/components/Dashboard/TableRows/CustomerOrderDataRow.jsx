import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
const CustomerOrderDataRow = ({ order }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  console.log(order);
  const { quantity, status, price } = order;

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src="https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg"
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="table-data">
        <p className="table-row">Money Plant</p>
      </td>
      <td className="table-data">
        <p className="table-row">Indoor</p>
      </td>
      <td className="table-data">
        <p className="table-row">$120</p>
      </td>
      <td className="table-data">
        <p className="table-row">5</p>
      </td>
      <td className="table-data">
        <p className="table-row">Pending</p>
      </td>

      <td className="table-data">
        <button
          onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative cursor-pointer">Cancel</span>
        </button>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  );
};

CustomerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
};

export default CustomerOrderDataRow;
