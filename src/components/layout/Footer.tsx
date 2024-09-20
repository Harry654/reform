import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 py-8 text-black">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Reform. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
