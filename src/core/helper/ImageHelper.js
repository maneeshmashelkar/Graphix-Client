/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const Imageurl = product
    ? `${API}/product/photo/${product._id}`
    : "https://bitsofco.de/content/images/2018/12/broken-1.png";

  return (
    <div className="rounded border border-success p-2">
      <img
        src={Imageurl}
        alt="photo"
        style={{ maxHeight: "75%", maxWidth: "75%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
