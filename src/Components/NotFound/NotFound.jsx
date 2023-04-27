import React from "react";

import "./NotFound.css";

export default function NotFound({ title }) {
  return (
    <div className="not_found">
      <h2>
        <span>Page</span> Not Found
        <i class="fa-solid fa-robot fa-fade"></i>
      </h2>
    </div>
  );
}
