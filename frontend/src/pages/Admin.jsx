import { useState, useEffect } from "react";
import { getBookings } from "../api/api";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">Admin Dashboard</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Service</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-2">{booking.booking_date}</td>
                  <td className="p-2">{booking.booking_time}</td>
                  <td className="p-2">{booking.customer_name}</td>
                  <td className="p-2">{booking.service_type}</td>
                  <td className="p-2">R{booking.total_price || 0}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}