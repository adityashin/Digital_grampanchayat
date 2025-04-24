import React from "react";
import {
  FaRegFileAlt,
  FaUsers,
  FaCheckCircle,
  FaDatabase,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";

const Slide2 = () => {
  const stats = [
    {
      icon: <FaRegFileAlt size={50} color="#9c4a17" />,
      value: "500+",
      description: "Schemes Uploaded",
    },
    {
      icon: <FaUsers size={50} color="#9c4a17" />,
      value: "50K+",
      description: "Registered Villagers",
    },
    {
      icon: <FaCheckCircle size={50} color="#9c4a17" />,
      value: "10K+",
      description: "Applications Approved",
    },
    {
      icon: <FaDatabase size={50} color="#9c4a17" />,
      value: "100+",
      description: "Gram Panchayats Connected",
    },
    {
      icon: <FaClock size={50} color="#9c4a17" />,
      value: "24x7",
      description: "Scheme Availability",
    },
    {
      icon: <FaPhoneAlt size={50} color="#9c4a17" />,
      value: "Helpline",
      description: "1800-987-654",
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="icon">{stat.icon}</div>
          <h1 className="value">{stat.value}</h1>
          <p className="description">{stat.description}</p>
        </div>
      ))}

      <style jsx>{`
        .stats-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin: 40px auto;
          max-width: 1200px;
        }
        .stat-card {
          flex: 1 1 calc(33.333% - 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          background-color: #e8f5e9;
          border-radius: 10px;
          border: 3px solid #9c4a17;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
        }
        .icon {
          margin-bottom: 10px;
        }
        .value {
          font-size: 2.5rem;
          color: #9c4a17;
          margin: 10px 0;
        }
        .description {
          font-size: 1rem;
          color: #9c4a17;
        }
        @media (max-width: 768px) {
          .stat-card {
            flex: 1 1 calc(50% - 20px);
          }
        }
        @media (max-width: 480px) {
          .stat-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Slide2;
