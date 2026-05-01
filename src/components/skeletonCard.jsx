import React from "react";
import "@/styles/skeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-title shimmer" />
        <div className="skeleton-line skeleton-subtitle shimmer" />
      </div>
    </div>
  );
};

export default SkeletonCard;
