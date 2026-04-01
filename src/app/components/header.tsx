"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

const THEME_KEY = "smt-theme";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const [isDarkUi, setIsDarkUi] = useState(false);

  const applyTheme = useCallback((value: "light" | "dark") => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    root.classList.remove("light");

    if (value === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.add("dark");
    }

    setIsDarkUi(root.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(THEME_KEY);
    const initial: "light" | "dark" = saved === "dark" ? "dark" : "light";

    if (saved === "system") {
      window.localStorage.setItem(THEME_KEY, "light");
    }

    applyTheme(initial);
  }, [applyTheme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);

      // Active section logic for home page
      if (pathname === "/") {
        const sections = ["news", "our-story"];
        let currentSection = "";

        // Add a buffer for the fixed header
        const scrollPosition = window.scrollY + 150;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              currentSection = section;
            }
          }
        }
        setActiveSection(currentSection);
      } else {
        setActiveSection("");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const headerClasses = [
    "fixed top-0 left-0 right-0 z-50 w-full",
    scrolled
      ? "bg-white shadow-sm dark:bg-[#161617]"
      : "bg-white dark:bg-[#161617]",
  ].join(" ");

  const getLinkClass = (path: string, hash?: string) => {
    const baseClass = "text-base font-medium transition-colors";
    let isActive = false;

    if (path === "/players") {
      isActive = pathname.startsWith("/players");
    } else if (path === "/achievements") {
      isActive = pathname.startsWith("/achievements");
    } else if (path === "/shop") {
      isActive = pathname.startsWith("/shop");
    } else if (path === "/gallery") {
      isActive = pathname.startsWith("/gallery");
    } else if (path === "/contact") {
      isActive = pathname === "/contact";
    } else if (path === "/" && hash) {
      isActive = pathname === "/" && activeSection === hash;
    }

    return `${baseClass} ${isActive ? "text-irOrange font-bold" : "text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300"}`;
  };

  const smoothScrollToId = (id: string, retries = 20) => {
    const target = document.getElementById(id);
    if (!target) {
      if (retries > 0) {
        setTimeout(() => smoothScrollToId(id, retries - 1), 100);
      }
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSectionClick =
    (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setOpen(false);
      if (pathname === "/") {
        smoothScrollToId(id);
        window.history.replaceState(null, "", `/#${id}`);
        return;
      }
      router.push(`/#${id}`);
      setTimeout(() => smoothScrollToId(id), 100);
    };

  return (
    <header className={headerClasses}>
      <div className="mx-autopx-4 px-2 lg:px-8">
        <div className="relative flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full md:h-14 md:w-14">
              <Image
                alt="Inter Racial"
                src="/imgs/logo.jpg"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-black tracking-tight text-black md:text-2xl dark:text-white">
              FC Inter Racial
            </h1>
          </Link>

          <nav className="ml-auto hidden space-x-10 lg:flex lg:space-x-6 xl:space-x-10">
            <Link
              href="/#news"
              className={getLinkClass("/", "news")}
              onClick={handleSectionClick("news")}
            >
              News
            </Link>
            <Link href="/players" className={getLinkClass("/players")}>
              Players
            </Link>
            <Link
              href="/achievements"
              className={getLinkClass("/achievements")}
            >
              Achievements
            </Link>
            <Link href="/gallery" className={getLinkClass("/gallery")}>
              Gallery
            </Link>
            <Link
              href="/#our-story"
              className={getLinkClass("/", "our-story")}
              onClick={handleSectionClick("our-story")}
            >
              Our Story
            </Link>
            <Link href="/shop" className={getLinkClass("/shop")}>
              Shop
            </Link>
            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2 pl-10">
            {/* Theme toggle button */}
            <button
              type="button"
              aria-label={
                isDarkUi ? "Switch to light theme" : "Switch to dark theme"
              }
              className="hover:border-emeral-500 dark:hover:border-emeral-400 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black p-1 text-gray-700 transition hover:bg-black/70 md:h-10 md:w-10 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:hover:text-gray-800"
              onClick={() => {
                if (typeof window === "undefined") return;
                const next = document.documentElement.classList.contains("dark")
                  ? "light"
                  : "dark";
                window.localStorage.setItem(THEME_KEY, next);
                applyTheme(next);
              }}
            >
              {isDarkUi ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 md:h-6 md:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 25"
                  stroke="#fff"
                  className="h-5 w-5 md:h-6 md:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    fill="#fff"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="z-10 flex h-10 w-10 items-center justify-center text-black lg:hidden dark:text-white"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-60 bg-white p-6 lg:hidden dark:bg-[#161617]">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
              Navigation
            </span>
            <button
              type="button"
              aria-label="Close navigation"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-black transition hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link
              href="/#news"
              className={`py-2 text-xl ${getLinkClass("/", "news")}`}
              onClick={handleSectionClick("news")}
            >
              News
            </Link>
            <Link
              href="/players"
              className={`py-2 text-xl ${getLinkClass("/players")}`}
              onClick={() => setOpen(false)}
            >
              Players
            </Link>
            <Link
              href="/achievements"
              className={`py-2 text-xl ${getLinkClass("/achievements")}`}
              onClick={() => setOpen(false)}
            >
              Achievements
            </Link>
            <Link
              href="/gallery"
              className={`py-2 text-xl ${getLinkClass("/gallery")}`}
              onClick={() => setOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/#our-story"
              className={`py-2 text-xl ${getLinkClass("/", "our-story")}`}
              onClick={handleSectionClick("our-story")}
            >
              Our Story
            </Link>
            <Link
              href="/shop"
              className={`py-2 text-xl ${getLinkClass("/shop")}`}
              onClick={() => setOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className={`py-2 text-xl ${getLinkClass("/contact")}`}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
