"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import type { DocumentationSection } from "@/lib/types";

interface SidebarProps {
  sections: DocumentationSection[];
}

export default function Sidebar({ sections }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(
    sections.length > 0 ? sections[0].slug : ""
  );
  const [search, setSearch] = useState("");
  const observerReady = useRef(false);

  useEffect(() => {
    // Delay observer so first section stays active on initial load
    const timer = setTimeout(() => {
      observerReady.current = true;
    }, 800);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!observerReady.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 }
    );

    const els = document.querySelectorAll(".doc-section[id]");
    els.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [sections]);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const q = search.toLowerCase();
    return sections.filter((s) => {
      const matchSelf = s.title.toLowerCase().includes(q);
      const matchChild = s.children?.some((c) =>
        c.title.toLowerCase().includes(q)
      );
      return matchSelf || matchChild;
    });
  }, [sections, search]);

  // Scroll to section without changing URL hash
  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSlug(slug);
      }
      setIsOpen(false);
    },
    []
  );

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-search-wrap">
          <input
            type="text"
            placeholder="Search documentation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sidebar-search"
          />
        </div>

        <nav>
          <ul className="sidebar-nav">
            {filteredSections.map((section) => (
              <li key={section.documentId} className="sidebar-item">
                <a
                  href={`#${section.slug}`}
                  className={`sidebar-link ${activeSlug === section.slug ? "active" : ""}`}
                  onClick={(e) => scrollTo(e, section.slug)}
                >
                  {section.title}
                </a>

                {section.children && section.children.length > 0 && (
                  <ul className="sidebar-children">
                    {section.children
                      .sort((a, b) => a.order - b.order)
                      .filter(
                        (c) =>
                          !search.trim() ||
                          c.title.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((child) => (
                        <li key={child.documentId} className="sidebar-item">
                          <a
                            href={`#${child.slug}`}
                            className={`sidebar-link ${activeSlug === child.slug ? "active" : ""}`}
                            onClick={(e) => scrollTo(e, child.slug)}
                          >
                            {child.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
