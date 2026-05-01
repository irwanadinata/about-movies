import "@/styles/home.css";

function SkeletonBanner() {
  return (
    <div className="skeleton-banner">
      <div className="skeleton-banner-img shimmer"></div>
      <div className="posterImage-overlay">
        <div className="skeleton-banner-title shimmer"></div>
        <div className="skeleton-banner-runtime shimmer"></div>
        <div className="skeleton-banner-desc shimmer"></div>
        <div
          className="skeleton-banner-desc shimmer"
          style={{ width: "80%", marginTop: "0.5rem" }}
        ></div>
        <div
          className="skeleton-banner-desc shimmer"
          style={{ width: "60%", marginTop: "0.5rem" }}
        ></div>
      </div>
    </div>
  );
}

export default SkeletonBanner;
