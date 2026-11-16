"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AccountMenu } from "@/components/auth/account-menu";
import { LogoMark, Wordmark } from "@/components/logo";
import { EASE_OUT } from "@/lib/format";

const links = [
  { href: "/learn", title: "Learn" },
  { href: "/news", title: "News, explained" },
  { href: "/community", title: "Community" },
  { href: "/glossary", title: "Glossary" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const active = links.find((l) => pathname.startsWith(l.href))?.href ?? null;
  const underlined = hovered ?? active;

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <a
        href="#main-content"
        className="absolute top-2 left-4 -translate-y-20 rounded-md bg-card px-3 py-2 text-sm text-foreground focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Investing, together: home"
          className="group flex items-center gap-2.5"
        >
          <LogoMark className="size-8 transition-transform duration-500 ease-out group-hover:-rotate-12" />
          <Wordmark />
        </Link>

        {/* Desktop: one underline that glides between links. */}
        <nav
          aria-label="Main"
          className="hidden gap-7 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              onFocus={() => setHovered(link.href)}
              onBlur={() => setHovered(null)}
              aria-current={active === link.href ? "page" : undefined}
              className={`relative py-2 transition-colors ${
                active === link.href
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.title}
              {underlined === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <AccountMenu />
        </div>

        <button
          type="button"
          className="-mr-2 px-2 py-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile: panel opens and links rise in one after another. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-t lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <motion.ul
              className="flex flex-col px-6 py-4"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.04, delayChildren: 0.05 }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: EASE_OUT },
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href ? "page" : undefined}
                    className="block py-2.5 text-xl font-semibold"
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="border-t px-6 py-4">
              <AccountMenu onNavigate={() => setOpen(false)} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
