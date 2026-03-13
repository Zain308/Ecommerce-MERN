import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt="Sony"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
            alt="Dell"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png"
            alt="LG"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png"
            alt="Apple"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
            style={{ width: "150px", objectFit: "contain" }}
            alt="Microsoft"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;