import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const UserDataRow = ({ userData, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { email, role, status } = userData || {};
  const updateRole = async (selectedRole) => {
    if (selectedRole === role)
      return toast.error(`He is already a ${selectedRole}`);
    try {
      await axiosSecure.patch(`user/role/${email}`, { role: selectedRole });
      toast.success("Role updated successfully");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err);
    } finally {
      setIsOpen(false);
    }

    console.log(selectedRole);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-red-500 whitespace-no-wrap">
          {status ? status : "Unavailable"}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserModal
          updateRole={updateRole}
          role={role}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
  userData: PropTypes.object,
};

export default UserDataRow;
