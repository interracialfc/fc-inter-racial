import { PortableTextComponents } from "@portabletext/react";

export const customBlock: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-6 text-3xl font-bold text-black">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 text-2xl font-bold text-black">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 text-xl font-bold text-black">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 text-lg font-bold text-black">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-md mb-2 font-bold text-black">{children}</h5>
    ),
    // Note: Use 'normal' instead of 'p' for standard Sanity paragraphs
    normal: ({ children }) => (
      <p className="mb-2 text-sm font-light">{children}</p>
    ),
  },

  // 1. Add List Styles (ul and ol)
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },

  // 2. Add List Item Style (li)
  listItem: {
    bullet: ({ children }) => (
      <li className="text-sm font-light">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-sm font-light">{children}</li>
    ),
  },

  // 3. Add Inline Styles (Bold, Italic, Link)
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic-style italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-blue-600 transition-colors hover:underline"
      >
        {children}
      </a>
    ),
  },
};
