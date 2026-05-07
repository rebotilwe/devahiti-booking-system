import { useState } from "react";
import { Mail, Phone, MapPin, FileText, User } from "lucide-react";

export default function BookingForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    notes: initialData.notes || "",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required for on-location sessions";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-ocean/10 p-4 sm:p-6">
      <h3 className="font-heading text-xl text-foreground mb-6">Your Details</h3>
      
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Full Name <span className="text-ocean">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean ${
                errors.name ? "border-red-500" : "border-border"
              }`}
              placeholder="Your full name"
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Email <span className="text-ocean">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean ${
                errors.email ? "border-red-500" : "border-border"
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Phone Number <span className="text-ocean">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean ${
                errors.phone ? "border-red-500" : "border-border"
              }`}
              placeholder="+27 84 090 2083"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Address <span className="text-ocean">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean resize-none ${
                errors.address ? "border-red-500" : "border-border"
              }`}
              placeholder="Your full address for on-location sessions"
            />
          </div>
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Notes / Special Requests
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean resize-none"
              placeholder="Any special requests or additional information..."
            />
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mt-0.5"
          />
          <label className="text-sm text-muted-foreground">
            I agree to the <button type="button" className="text-ocean hover:underline">terms and conditions</button> and confirm that my booking is only confirmed after payment.
          </label>
        </div>
        {errors.termsAccepted && <p className="text-xs text-red-500">{errors.termsAccepted}</p>}
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean-dark transition"
      >
        Continue to Payment
      </button>
    </form>
  );
}