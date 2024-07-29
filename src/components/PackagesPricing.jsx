import "./PackagesPricing.css"

export default function PackagesPricing() {
  return (
    <div className="packages-pricing">
      <h1 className="content-heading">Packages Pricing</h1>
      <div className="packages-wrapper">
          <div className="package">
            <h3>Basic</h3>
            <p className="pkg-desc">Buy our basic package and get a discount of 20% on every bundle</p>
            <p className="pkg-price"><b>Fixed price:</b> 899 PKR</p>
            <button>Buy now</button>
          </div>
          <div className="package">
            <h3>Exclusive</h3>
            <p className="pkg-desc">Buy our exclusive package and get a discount of 35% on every bundle</p>
            <p className="pkg-price"><b>Fixed price:</b> 1199 PKR</p>
            <button>Buy now</button>
          </div>
          <div className="package">
            <h3>Premium</h3>
            <p className="pkg-desc">Buy our premium package and get a discount of 40% on every bundle</p>
            <p className="pkg-price"><b>Fixed price:</b> 1799 PKR</p>
            <button>Buy now</button>
          </div>
      </div>
    </div>
  );
}