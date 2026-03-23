import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full items-center">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt="Sony"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo.png"
            alt="Dell"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          {/* New LG Link - Direct and Reliable */}
          <img
            src="https://brandcentral.lg.com/images/ci/main_logo_black.png"
            alt="LG"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          {/* New Apple Link - Standard Vector Logo */}
          <img
            src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png"
            alt="Apple"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png"
            style={{ width: "150px", objectFit: "contain" }}
            alt="Microsoft"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;