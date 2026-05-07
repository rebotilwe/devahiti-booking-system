import { useState, useEffect } from "react";
import { getBookings } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");
  const [newSlotDay, setNewSlotDay] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const API_URL = "https://devahiti-booking-system.onrender.com/api";

  const fetchAllData = async () => {
    try {
      const [bookingsRes, blockedRes, scheduleRes, customersRes, revenueRes] = await Promise.all([
        fetch(`${API_URL}/bookings`),
        fetch(`${API_URL}/admin/blocked-dates`),
        fetch(`${API_URL}/admin/schedule`),
        fetch(`${API_URL}/admin/customers`),
        fetch(`${API_URL}/admin/analytics/revenue`),
      ]);

      setBookings(await bookingsRes.json());
      setBlockedDates(await blockedRes.json());
      setWeeklySchedule(await scheduleRes.json());
      setCustomers(await customersRes.json());
      setAnalytics(await revenueRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      try {
        const response = await fetch(`${API_URL}/bookings/${id}`, { method: "DELETE" });
        if (response.ok) {
          await fetchAllData();
          alert("Booking deleted successfully");
        } else {
          alert("Failed to delete booking");
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Error deleting booking");
      }
    }
  };

  const deleteOldBookings = async () => {
    if (window.confirm("Delete all bookings older than 30 days? This action cannot be undone.")) {
      try {
        const response = await fetch(`${API_URL}/bookings/old`, { method: "DELETE" });
        if (response.ok) {
          await fetchAllData();
          alert("Old bookings deleted successfully");
        } else {
          alert("Failed to delete old bookings");
        }
      } catch (error) {
        console.error("Error deleting old bookings:", error);
        alert("Error deleting old bookings");
      }
    }
  };

  const addBlockedDate = async () => {
    if (!newBlockedDate) return;
    try {
      const response = await fetch(`${API_URL}/admin/blocked-dates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked_date: newBlockedDate, reason: newBlockedReason }),
      });
      const data = await response.json();
      setBlockedDates([...blockedDates, data]);
      setNewBlockedDate("");
      setNewBlockedReason("");
    } catch (error) {
      console.error("Error adding blocked date:", error);
    }
  };

  const removeBlockedDate = async (id) => {
    try {
      await fetch(`${API_URL}/admin/blocked-dates/${id}`, { method: "DELETE" });
      setBlockedDates(blockedDates.filter(date => date.id !== id));
    } catch (error) {
      console.error("Error removing blocked date:", error);
    }
  };

  const addTimeSlot = async () => {
    if (!newSlotDay || !newSlotTime) return;
    try {
      const response = await fetch(`${API_URL}/admin/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day_of_week: newSlotDay, time_slot: newSlotTime }),
      });
      const data = await response.json();
      setWeeklySchedule([...weeklySchedule, data]);
      setNewSlotDay("");
      setNewSlotTime("");
    } catch (error) {
      console.error("Error adding time slot:", error);
    }
  };

  const removeTimeSlot = async (id) => {
    try {
      await fetch(`${API_URL}/admin/schedule/${id}`, { method: "DELETE" });
      setWeeklySchedule(weeklySchedule.filter(slot => slot.id !== id));
    } catch (error) {
      console.error("Error removing time slot:", error);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-heading mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-6">Manage bookings, schedule, and customers</p>

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-ocean/10">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-heading text-ocean">R{analytics.totals?.total_revenue || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-ocean/10">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-heading text-ocean">{analytics.totals?.total_bookings || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-ocean/10">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-heading text-ocean">{analytics.totals?.total_customers || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-ocean/10">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-heading text-ocean">{bookings.filter(b => b.payment_status === 'pending').length}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-b mb-6">
        <button onClick={() => setActiveTab("bookings")} className={`px-4 py-2 ${activeTab === "bookings" ? "border-b-2 border-ocean text-ocean" : "text-muted-foreground"}`}>Bookings</button>
        <button onClick={() => setActiveTab("blocked-dates")} className={`px-4 py-2 ${activeTab === "blocked-dates" ? "border-b-2 border-ocean text-ocean" : "text-muted-foreground"}`}>Blocked Dates</button>
        <button onClick={() => setActiveTab("schedule")} className={`px-4 py-2 ${activeTab === "schedule" ? "border-b-2 border-ocean text-ocean" : "text-muted-foreground"}`}>Weekly Schedule</button>
        <button onClick={() => setActiveTab("customers")} className={`px-4 py-2 ${activeTab === "customers" ? "border-b-2 border-ocean text-ocean" : "text-muted-foreground"}`}>Customers</button>
      </div>

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">Total: {bookings.length} bookings</div>
            <button onClick={deleteOldBookings} className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600">
              Delete Bookings Older Than 30 Days
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Service</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="p-2">{booking.id}</td>
                    <td className="p-2">{booking.booking_date}</td>
                    <td className="p-2">{booking.booking_time}</td>
                    <td className="p-2">{booking.customer_name}</td>
                    <td className="p-2">{booking.service_type}</td>
                    <td className="p-2">R{booking.total_price || 0}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {booking.payment_status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button onClick={() => deleteBooking(booking.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blocked Dates Tab */}
      {activeTab === "blocked-dates" && (
        <div>
          <div className="bg-ocean/5 p-4 rounded-lg mb-6">
            <h3 className="font-heading text-lg mb-3">Block a Date</h3>
            <div className="flex gap-3 flex-wrap">
              <input type="date" value={newBlockedDate} onChange={(e) => setNewBlockedDate(e.target.value)} className="px-3 py-2 border rounded" />
              <input type="text" placeholder="Reason" value={newBlockedReason} onChange={(e) => setNewBlockedReason(e.target.value)} className="px-3 py-2 border rounded flex-1" />
              <button onClick={addBlockedDate} className="px-4 py-2 bg-ocean text-white rounded hover:bg-ocean-dark">Block Date</button>
            </div>
          </div>
          <div className="space-y-2">
            {blockedDates.map((date) => (
              <div key={date.id} className="flex justify-between items-center border p-3 rounded">
                <div><span className="font-medium">{date.blocked_date}</span>{date.reason && <span className="text-sm text-muted-foreground ml-3">({date.reason})</span>}</div>
                <button onClick={() => removeBlockedDate(date.id)} className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Schedule Tab */}
      {activeTab === "schedule" && (
        <div>
          <div className="bg-ocean/5 p-4 rounded-lg mb-6">
            <h3 className="font-heading text-lg mb-3">Add Time Slot</h3>
            <div className="flex gap-3 flex-wrap">
              <select value={newSlotDay} onChange={(e) => setNewSlotDay(e.target.value)} className="px-3 py-2 border rounded">
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <input type="time" value={newSlotTime} onChange={(e) => setNewSlotTime(e.target.value)} className="px-3 py-2 border rounded" />
              <button onClick={addTimeSlot} className="px-4 py-2 bg-ocean text-white rounded hover:bg-ocean-dark">Add Slot</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Day</th>
                  <th className="p-2">Time</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {weeklySchedule.map((slot) => (
                  <tr key={slot.id} className="border-t">
                    <td className="p-2">{slot.day_of_week}</td>
                    <td className="p-2">{slot.time_slot}</td>
                    <td className="p-2">
                      <button onClick={() => removeTimeSlot(slot.id)} className="text-red-500 text-sm">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === "customers" && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{customer.customer_name}</td>
                  <td className="p-2">{customer.customer_email}</td>
                  <td className="p-2">{customer.customer_phone}</td>
                  <td className="p-2">{customer.total_bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}