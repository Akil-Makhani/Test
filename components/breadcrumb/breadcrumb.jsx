import React from "react";
import Link from "next/link";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm mb-6">
      <ol className="flex items-center space-x-1 text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href} className="text-black-600 hover:underline" prefetch={false}>
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
