import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  parentPage?: string;
  parentPageLink?: string;
  parentPage2?: string;
  parentPageLink2?: string;
  currentPage: string;
}

export default function Breadcrumbs({
  parentPage,
  parentPageLink,
  parentPage2,
  parentPageLink2,
  currentPage,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-10 flex w-full items-center justify-start space-x-2 text-sm"
    >
      {/* Home */}
      <Link
        href="/"
        className="whitespace-nowrap text-gray-500 transition-colors hover:text-gray-700"
      >
        Home
      </Link>

      <ChevronRight
        className="h-4 w-4 shrink-0 text-gray-400"
        strokeWidth={2}
      />

      {/* Parent Page (e.g., Gallery or Players) */}
      {parentPage && parentPageLink && (
        <>
          <Link
            href={parentPageLink as string}
            className="whitespace-nowrap text-gray-500 transition-colors hover:text-gray-700"
          >
            {parentPage}
          </Link>

          <ChevronRight
            className="h-4 w-4 shrink-0 text-gray-400"
            strokeWidth={2}
          />
        </>
      )}

      {/* Parent Page 2 (Second Level) */}
      {parentPage2 && parentPageLink2 && (
        <>
          <Link
            href={parentPageLink2 as string}
            className="whitespace-nowrap text-gray-500 transition-colors hover:text-gray-700"
          >
            {parentPage2}
          </Link>

          <ChevronRight
            className="h-4 w-4 shrink-0 text-gray-400"
            strokeWidth={2}
          />
        </>
      )}

      {/* Current Page - Bold & Pinned Left */}
      <span className="max-w-45 truncate font-bold text-gray-900 md:max-w-none dark:text-gray-100">
        {currentPage}
      </span>
    </nav>
  );
}
