import { useLocation, Link } from "react-router-dom";

export default function Payment() {
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("class");

  const classes = {
    group: {
      name: "Group Yoga Class",
      price: "250.00",
      duration: "1 hr 15 min",
    },
    sound: {
      name: "Sound Journey",
      price: "350.00",
      duration: "1 hr 15 min",
    },
    private: {
      name: "Private Yoga Session",
      price: "650.00",
      duration: "1 hr",
    },
    yin: {
      name: "Yin Yoga",
      price: "250.00",
      duration: "1 hr 15 min",
    },
    corporate: {
      name: "Corporate Yoga",
      price: "1500.00",
      duration: "1 hr",
    },
  };

  const selectedClass = classes[type] || classes.group;

  // REPLACE THESE with Mandy's actual PayFast credentials
  const PAYFAST_MERCHANT_ID = "YOUR_MERCHANT_ID";
  const PAYFAST_MERCHANT_KEY = "YOUR_MERCHANT_KEY";
  const SITE_URL = "https://devahitiwellness.co.za"; // Replace with actual domain

  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean/5 px-6 py-20">
      <div className="bg-white shadow-xl p-8 max-w-md w-full rounded-lg">
        <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2 text-center">
          Complete Your Booking
        </h2>
        
        <div className="w-12 h-px bg-ocean/30 mx-auto mb-6" />

        <div className="text-center mb-6">
          <p className="text-muted-foreground text-sm uppercase tracking-wide">
            Class Selected
          </p>
          <p className="font-heading text-xl text-foreground mt-1">
            {selectedClass.name}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Duration: {selectedClass.duration}
          </p>
        </div>

        <div className="bg-ocean/5 p-4 rounded-lg text-center mb-6">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="font-heading text-3xl text-ocean">R {selectedClass.price}</p>
        </div>

        {/* PayFast Form */}
        <form action="https://www.payfast.co.za/eng/process" method="post">
          <input type="hidden" name="merchant_id" value={PAYFAST_MERCHANT_ID} />
          <input type="hidden" name="merchant_key" value={PAYFAST_MERCHANT_KEY} />
          <input type="hidden" name="amount" value={selectedClass.price} />
          <input type="hidden" name="item_name" value={selectedClass.name} />
          <input type="hidden" name="return_url" value={`${SITE_URL}/success`} />
          <input type="hidden" name="cancel_url" value={`${SITE_URL}/cancel`} />
          
          {/* Customer details - user will enter on PayFast */}
          <input type="hidden" name="name_first" value="" />
          <input type="hidden" name="email_address" value="" />

          <button
            type="submit"
            className="w-full bg-ocean text-white py-4 uppercase tracking-[0.3em] text-xs font-medium hover:bg-ocean-dark transition-all rounded-sm"
          >
            Pay Now with PayFast
          </button>
        </form>

        <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="text-xs text-amber-700">
            ⚠️ <strong>Important:</strong> Your booking is only confirmed after payment is completed.
            You will be redirected back after payment.
          </p>
        </div>

        <Link to="/booking" className="block text-center mt-4 text-xs text-muted-foreground hover:text-ocean transition">
          ← Back to Booking
        </Link>
      </div>
    </div>
  );
}