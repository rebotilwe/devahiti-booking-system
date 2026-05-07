import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Events from './pages/Events'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Payment from './pages/Payment'
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Schedule from './pages/Schedule'
import Checkout from './pages/Checkout'
import BookingConfirmation from './pages/BookingConfirmation'
import Admin from './pages/Admin'  // ✅ Fixed: uppercase A
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/events" element={<Events />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />

            <Route path="/schedule" element={<Schedule />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/admin" element={<Admin />} />
            // Add these routes
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App