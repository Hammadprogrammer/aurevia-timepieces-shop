import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-champagne">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-[0.34em]">AUREVIA</div>
          <p className="mt-3 max-w-sm text-sm text-champagne/70">
            Timeless Craft. Modern Elegance. Assembled and regulated for Pakistan, delivered from
            our Karachi atelier to every province.
          </p>
        </div>
        <div>
          <h4 className="text-eyebrow text-gold">Collections</h4>
          <ul className="mt-4 space-y-2 text-sm text-champagne/75">
            <li>
              <Link to="/men" className="hover:text-gold">
                Men's Watches
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-gold">
                Women's Watches
              </Link>
            </li>
            <li>
              <Link to="/luxury" className="hover:text-gold">
                Luxury Watches
              </Link>
            </li>
            <li>
              <Link to="/smart" className="hover:text-gold">
                Smart Watches
              </Link>
            </li>
            <li>
              <Link to="/sports" className="hover:text-gold">
                Sports Watches
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-eyebrow text-gold">Client Care</h4>
          <ul className="mt-4 space-y-2 text-sm text-champagne/75">
            <li>
              <Link to="/orders" className="hover:text-gold">
                Track My Orders
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-gold">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold">
                Our Maison
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-champagne/10 py-6 text-center text-xs text-champagne/50">
        © {new Date().getFullYear()} Aurevia Watches, Karachi · Cash on Delivery, Easypaisa,
        JazzCash, Bank Transfer & Card accepted
      </div>
    </footer>
  );
}
