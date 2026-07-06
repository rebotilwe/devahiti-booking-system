import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Events from './pages/Events'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Payment from './pages/Payment'
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Schedule from './pages/Schedule'
import Checkout from './pages/Checkout'
import BookingConfirmation from './pages/BookingConfirmation'
import Admin from './pages/Admin'
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';
import AdminLogin from './pages/AdminLogin';
import Blog from './pages/Blog';
import GiftCard from './pages/GiftCard';
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop"; // ✅ ADD THIS
import ClassSchedule from './pages/ClassSchedule';
import BlogPost from './pages/BlogPost';
import TeacherTraining from './pages/TeacherTraining';
import Retreats from './pages/Retreats';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackToTop /> {/* ✅ ADD THIS */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/teacher-training" element={<TeacherTraining />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/class-schedule" element={<ClassSchedule />} />
            <Route path="/events" element={<Events />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/gift-card" element={<GiftCard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App