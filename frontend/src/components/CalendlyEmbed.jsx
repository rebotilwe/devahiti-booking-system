import { useEffect } from "react";

export default function CalendlyEmbed({ url }) {
  useEffect(() => {
    // Prevent duplicate script injection
    if (window.Calendly) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // optional cleanup (safe but not required in SPA)
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget min-w-[320px] h-[750px]"
      data-url={url}
      style={{ minWidth: "320px", height: "750px" }}
    />
  );
}