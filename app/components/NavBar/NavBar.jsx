"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Our Process",
    href: "#our-process",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Gallery",
    href: "#gallery",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function NavBar({
  showLogo = false,
  logoSrc = "",
  logoAlt = "Your Gardens by Design",
  solidAtTop = false,
  className = "",
}) {
  const pathname = usePathname();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  const toggleMenu = () => {
    setMenuIsOpen((currentState) => !currentState);
  };

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuIsOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuIsOpen]);

  const navbarIsSolid = solidAtTop || isScrolled || menuIsOpen;

  return (
    <header
      className={`
        ${styles.navBar}
        ${navbarIsSolid ? styles.navBarSolid : ""}
        ${className}
      `.trim()}
    >
      <div className={styles.navInner}>
        {showLogo && (
          <Link
            href="/"
            className={styles.brand}
            aria-label="Your Gardens by Design home"
            onClick={closeMenu}
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={190}
                height={70}
                className={styles.logo}
                priority
              />
            ) : (
              <span className={styles.brandText}>
                Your Gardens
                <span>by Design</span>
              </span>
            )}
          </Link>
        )}

        <nav
          className={styles.desktopNavigation}
          aria-label="Primary navigation"
        >
          <ul className={styles.desktopLinkList}>
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      ${styles.navLink}
                      ${isActive ? styles.activeLink : ""}
                    `.trim()}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/contact" className={styles.ctaButton}>
            Request a Consultation
          </Link>
        </nav>

        <button
          type="button"
          className={`
            ${styles.menuButton}
            ${menuIsOpen ? styles.menuButtonOpen : ""}
          `.trim()}
          onClick={toggleMenu}
          aria-expanded={menuIsOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`
          ${styles.mobileMenu}
          ${menuIsOpen ? styles.mobileMenuOpen : ""}
        `.trim()}
        aria-hidden={!menuIsOpen}
      >
        <nav className={styles.mobileNavigation} aria-label="Mobile navigation">
          <ul className={styles.mobileLinkList}>
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      ${styles.mobileNavLink}
                      ${isActive ? styles.mobileActiveLink : ""}
                    `.trim()}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={menuIsOpen ? 0 : -1}
                    onClick={closeMenu}
                  >
                    <span>{link.label}</span>

                    <span className={styles.mobileLinkArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className={styles.mobileCtaButton}
            tabIndex={menuIsOpen ? 0 : -1}
            onClick={closeMenu}
          >
            Request a Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
