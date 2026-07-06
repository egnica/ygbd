import Link from "next/link";
import styles from "./Footer.module.css";

const navigationLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Our Process",
    href: "/our-process",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.footerInner}>
        <div className={styles.footerMain}>
          <div className={styles.brandColumn}>
            <Link
              href="/"
              className={styles.brand}
              aria-label="Your Gardens by Design home"
            >
              <span className={styles.brandPrimary}>Your Gardens</span>
              <span className={styles.brandSecondary}>by Design</span>
            </Link>

            <p className={styles.brandDescription}>
              Thoughtful garden design shaped around your home, your landscape,
              and the way you want to live outdoors.
            </p>

            <Link href="/contact" className={styles.ctaButton}>
              Request a Consultation
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.linksColumn}>
            <p className={styles.columnLabel}>Explore</p>

            <nav aria-label="Footer navigation">
              <ul className={styles.linkList}>
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.contactColumn}>
            <p className={styles.columnLabel}>Begin Your Garden</p>

            <h2 className={styles.contactHeading}>
              Ready to create something beautiful?
            </h2>

            <p className={styles.contactText}>
              Tell us about your property, your ideas, and what you would like
              your outdoor space to become.
            </p>

            <Link href="/contact" className={styles.contactLink}>
              Contact Your Gardens by Design
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Your Gardens by Design. All rights reserved.
          </p>

          <div className={styles.bottomLinks}>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}