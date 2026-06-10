import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
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
import ClassSchedule from './pages/ClassSchedule';
import BlogPost from './pages/BlogPost';  // ✅ NEW: Individual blog post component
// ✅ IMPORT NEW PAGES
import TeacherTraining from './pages/TeacherTraining';
import Retreats from './pages/Retreats';

function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            
            {/* ✅ NEW ROUTES - Split from Events */}
            <Route path="/teacher-training" element={<TeacherTraining />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/class-schedule" element={<ClassSchedule />} />
            
            {/* Old events route - can keep or remove */}
            <Route path="/events" element={<Events />} />
            
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} /> {/* ✅ NEW: Individual blog post route */}
            <Route path="/gift-card" element={<GiftCard />} />

            {/* Booking System Routes */}
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            
            {/* Payment Routes */}
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  )
}

export default App