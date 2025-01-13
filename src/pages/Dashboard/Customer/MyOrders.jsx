import { Helmet } from "react-helmet-async";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/customer-orders/${user?.email}`);
      return data;
    },
  });

  console.log(orders);
  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="table-head">
                      Image
                    </th>
                    <th scope="col" className="table-head">
                      Name
                    </th>
                    <th scope="col" className="table-head">
                      Category
                    </th>
                    <th scope="col" className="table-head">
                      Price
                    </th>
                    <th scope="col" className="table-head">
                      Quantity
                    </th>
                    <th scope="col" className="table-head">
                      Status
                    </th>

                    <th scope="col" className="table-head">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => {
                    console.log(order);
                    return (
                      <CustomerOrderDataRow key={order._id} order={order} />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
