import React, { useState } from "react";
import SectionHeader from "../SectionHeader";
import { Award } from "lucide-react";

// import your 3 certificates
import cert1 from "../../assets/android.jpg";
import cert2 from "../../assets/artificial.jpg";
import cert3 from "../../assets/programming.jpg";

const certificates = [
  {
    title: "Artificial Intelligence",
    description: "Completed an AI course from Udacity.",
    image: cert1,
    live: "https://www.udacity.com/certificate/e/9798cd24-a933-11f0-acf9-e3c95565ac11"
  },
  {
    title: "Mobile App Development Certificate",
    description: "Completed Android course from Udacity.",
    image: cert2,
    live: "https://www.udacity.com/certificate/e/813e22d4-a926-11f0-88bb-139877eb694d"
  },
  {
    title: "Programming Certificate",
    description: "Completed a programming course from Udacity.",
    image: cert3,
    live: "https://www.udacity.com/certificate/e/272bb7ce-b8b4-11ef-b5d9-fb41cce1aebe"
  },
];

const CertificateSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      id="certificate"
      className="py-20 px-8 min-h-screen flex flex-col items-center"
      style={{ background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" }}
    >
      <SectionHeader Icon={Award} title="Certificates" />

      {/* Certificate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-8">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between w-80"
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                <p className="text-gray-700 mb-4">{cert.description}</p>
              </div>
              <button
                onClick={() => setSelectedCert(cert)}
                className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                See Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full relative shadow-xl flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-3xl z-50"
            >
              &times;
            </button>

            {/* Left: Certificate Image */}
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full md:w-1/2 h-48 md:h-auto object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            />

            {/* Right: Info + iframe */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-2xl font-bold mb-3">{selectedCert.title}</h3>
              <p className="text-gray-700 mb-4">{selectedCert.description}</p>

              {/* Live certificate preview */}
              <div className="flex-1 mb-4">
                <iframe
                  src={selectedCert.live}
                  title={selectedCert.title}
                  className="w-full h-64 md:h-72 border rounded-lg"
                ></iframe>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificateSection;
