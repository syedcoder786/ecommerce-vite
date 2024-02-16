// ContactUs.js
import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:w-2/4">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-lg mb-6">
        We'd love to hear from you! Whether you have a question about our
        products, need assistance with your order, or just want to say hello,
        we're here to help.
      </p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Send us a message</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Your message"
              rows="5"
            ></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p className="text-lg mb-2">Email: contact@example.com</p>
        <p className="text-lg mb-2">Phone: +123-456-7890</p>
        <p className="text-lg">Address: 123 Main Street, City, Country</p>
      </div>
    </div>
  );
};

export default ContactUs;
