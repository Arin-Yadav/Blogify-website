import React, { useState } from "react";
import { showToast } from "../helpers/ShowToast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("success", "You are now subscribed to Newsletter");
    setEmail(""); // Clear the email input
  };

  return (
    <section className="w-full py-16 px-4 sm:px-8 lg:px-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl mb-6">📬</h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Stay in the Loop
        </h2>
        <p className="text-base sm:text-lg lg:text-xl opacity-80">
          Get our best stories delivered to your inbox weekly. No spam, just
          quality content.
        </p>
      </div>

      <div className="text-center py-12 sm:py-16">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 hover:border-[#f38b15] outline-none text-base sm:text-lg"
          />
          <a href="#" className="w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-red-500 hover:bg-red-600 text-white text-base sm:text-xl font-bold cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-lg outline-none">
              Subscribe
            </button>
          </a>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
