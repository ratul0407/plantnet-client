/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../../components/Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const PurchaseModal = ({ closeModal, isOpen, plant, refetch }) => {
  const axiosSecure = useAxiosSecure();
  // Total Price Calculation
  const { user } = useAuth();

  const { _id, name, quantity, category, seller, price } = plant;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [purchaseInfo, setPurchaseInfo] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    plantId: _id,
    seller: seller?.email,
    address: "",
    status: "Pending",
  });
  console.log(totalQuantity);
  const handleQuantity = (value) => {
    if (value > quantity) {
      value = 20;
      setTotalQuantity(quantity);
      setTotalPrice(quantity * price);
      return toast.error("Quantity Exceeds available stock", {
        duration: 2000,
      });
    }
    if (value < 0) {
      setTotalQuantity(1);
      return toast.error("Quantity cannot be less than 1");
    }
    setTotalQuantity(value);
    setTotalPrice(value * price);
    console.log(`Value ${value}`, `total Quantity ${totalQuantity}`);
    setPurchaseInfo((prev) => {
      return { ...prev, quantity: value, price: value * price };
    });
  };

  const handlePurchase = async () => {
    console.log(totalPrice, totalQuantity);
    console.table(purchaseInfo);
    try {
      const data = await axiosSecure.post("/orders", purchaseInfo);
      console.log(data);

      await axiosSecure.patch(`/plants/quantity/${_id}`, {
        quantityToUpdate: totalQuantity,
      });
      toast.success("Order SuccessFull!");
      refetch();
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Plant: {name}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Category: {category}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Customer: {user?.displayName}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">Price: ${price}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Available Quantity: {quantity}
                  </p>

                  {/* quantity input field */}
                  <div className="text-sm flex items-center gap-6">
                    <label htmlFor="quantity" className="block text-gray-600">
                      Quantity:
                    </label>
                    <input
                      onChange={(e) => handleQuantity(parseInt(e.target.value))}
                      value={totalQuantity}
                      className="w-full py-3 pl-4 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      name="quantity"
                      id="quantity"
                      type="number"
                      placeholder="Available quantity"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3"></div>
                {/* address input field */}
                <div className=" text-sm flex items-center gap-6 pb-4">
                  <label htmlFor="address" className="block text-gray-600">
                    Address:
                  </label>
                  <input
                    onChange={(e) =>
                      setPurchaseInfo((prev) => {
                        return { ...prev, address: e.target.value };
                      })
                    }
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="quantity"
                    id="address"
                    type="text"
                    placeholder="Address"
                    required
                  />
                </div>
                <p>Total Price: ${totalPrice}</p>
                <Button onClick={handlePurchase} label={`pay $${totalPrice}`} />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
