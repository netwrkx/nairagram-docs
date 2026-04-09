"use client";

import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDocumentationData, useSidebarSections } from "@/hooks/useStrapi";
import Sidebar from "./Sidebar";
import EndpointCard from "./EndpointCard";
import ResponseCodesTable from "./ResponseCodesTable";
import AlertBox from "./AlertBox";
import BankTable from "./BankTable";
import OperatorTable from "./OperatorTable";
import { TestBankTable, TestWalletTable } from "./TestDataTable";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorDisplay from "./ErrorDisplay";
import HeadingIcon from "./HeadingIcon";
import type { ApiEndpoint, DocumentationSection } from "@/lib/types";

export default function DocumentationPage() {
  const queryClient = useQueryClient();
  const { data: sidebarSections = [] } = useSidebarSections();
  const { isLoading, isError, error, sections, endpoints, banks, operators, testData } =
    useDocumentationData();

  const endpointsBySection = useMemo(() => {
    const map: Record<string, ApiEndpoint[]> = {};
    endpoints.forEach((ep) => {
      const slug = ep.section?.slug;
      if (slug) {
        if (!map[slug]) map[slug] = [];
        map[slug].push(ep);
      }
    });
    return map;
  }, [endpoints]);

  const topLevel = useMemo(
    () => sections.filter((s) => !s.parent).sort((a, b) => a.order - b.order),
    [sections]
  );

  return (
    <>
      {/* ── Header ── */}
      <header className="header">
        <a href="/" className="header-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nairagram_logo.png"
            alt="Nairagram"
            className="header-logo"
          />
        </a>
        <nav className="header-nav">
          <a
            href="https://staging.nairagrambasket.com/login.php"
            className="header-link btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dashboard
          </a>
        </nav>
      </header>

      <div className="layout">
        {/* ── Sidebar ── */}
        {!isLoading && <Sidebar sections={sidebarSections} />}

        {/* ── Main ── */}
        {isLoading ? (
          <>
            <aside className="sidebar">
              <div className="sidebar-search-wrap">
                <input className="sidebar-search" placeholder="Search documentation..." disabled />
              </div>
              <div style={{ padding: "0 20px" }}>
                {[1,2,3,4,5,6,7].map((i) => (
                  <div key={i} className="skeleton-line" style={{ height: 16, width: `${50 + i * 6}%`, marginBottom: 12 }} />
                ))}
              </div>
            </aside>
            <LoadingSkeleton />
          </>
        ) : isError ? (
          <ErrorDisplay error={error as Error} onRetry={() => queryClient.invalidateQueries()} />
        ) : (
          <main className="main">
            {topLevel.map((section) => (
              <SectionBlock
                key={section.documentId}
                section={section}
                allSections={sections}
                endpointsBySection={endpointsBySection}
                banks={banks}
                operators={operators}
                testData={testData}
              />
            ))}
          </main>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <div className="footer-text">
          ©{new Date().getFullYear()} - Nairagram Ltd. All rights reserved.
        </div>
      </footer>
    </>
  );
}

/* ══════════════════════════════════════
   Section renderer — recursive
   ══════════════════════════════════════ */
function SectionBlock({
  section,
  allSections,
  endpointsBySection,
  banks,
  operators,
  testData,
}: {
  section: DocumentationSection;
  allSections: DocumentationSection[];
  endpointsBySection: Record<string, ApiEndpoint[]>;
  banks: any[];
  operators: any[];
  testData: any[];
}) {
  const children = allSections
    .filter((s) => s.parent?.documentId === section.documentId)
    .sort((a, b) => a.order - b.order);

  const sectionEndpoints = endpointsBySection[section.slug] || [];

  return (
    <>
      <section className="doc-section" id={section.slug}>
        <h2>
          <HeadingIcon />
          {section.title}
          <a href={`#${section.slug}`} className="anchor-hash">#</a>
        </h2>

        {/* Prose content */}
        {section.content && (
          <div className="endpoint-description">
            {section.content.split("\n").map((line, i) =>
              line.trim() ? <p key={i}>{line}</p> : null
            )}
          </div>
        )}

        {/* Alerts */}
        {section.alerts?.map((alert) => (
          <AlertBox key={alert.id} alert={alert} />
        ))}

        {/* Global response codes table (for "Nairagram Response Codes" section) */}
        {section.global_response_codes && section.global_response_codes.length > 0 && (
          <>
            <h3><HeadingIcon />Response Codes</h3>
            <p>The following table lists the success codes that the endpoint request returns.</p>
            <ResponseCodesTable
              codes={section.global_response_codes.filter((c) => parseInt(c.code) < 400)}
              showContent={true}
            />
            <h3><HeadingIcon />Error Messages</h3>
            <p>The following table lists the error codes and messages that the endpoint request returns.</p>
            <ResponseCodesTable
              codes={section.global_response_codes.filter((c) => parseInt(c.code) >= 400)}
              showContent={true}
            />
          </>
        )}

        {/* Test data tables */}
        {section.slug === "test-bank-account-numbers" && (
          <>
            <p>The following table lists the bank account numbers that you can use for your testing.</p>
            <TestBankTable data={testData} />
          </>
        )}

        {section.slug === "test-data-mobile-wallet" && (
          <TestWalletTable data={testData} />
        )}

        {/* Base URL for "Implementing Nairagram Services" */}
        {section.slug === "implementing-nairagram-services" && (
          <p>
            <strong>Base URL</strong>:{" "}
            <a href="https://nairagrambasket.com/api" target="_blank" rel="noopener noreferrer">
              https://nairagrambasket.com/api
            </a>
          </p>
        )}

        {/* API endpoints belonging to this section */}
        {sectionEndpoints
          .sort((a, b) => a.order - b.order)
          .map((ep) => (
            <EndpointCard key={ep.documentId} endpoint={ep} />
          ))}

        {/* Bank lists under client-support */}
        {section.slug === "client-support" && banks.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <BankTable banks={banks} />
          </div>
        )}
      </section>

      {/* Render child sections */}
      {children.map((child) => (
        <SectionBlock
          key={child.documentId}
          section={child}
          allSections={allSections}
          endpointsBySection={endpointsBySection}
          banks={banks}
          operators={operators}
          testData={testData}
        />
      ))}

      {/* Operator wallet codes table */}
      {section.slug === "client-support" && operators.length > 0 && (
        <section className="doc-section" id="operator-wallet-codes">
          <h3>
            <HeadingIcon />
            Operator Wallet Code
            <a href="#operator-wallet-codes" className="anchor-hash">#</a>
          </h3>
          <p>The following table lists the supported operator wallet codes.</p>
          <OperatorTable operators={operators} />
        </section>
      )}
    </>
  );
}
