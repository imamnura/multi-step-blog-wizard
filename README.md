# Blog Wizard (Next.js + Tailwind v4)

A multi-step blog creation wizard built with **Next.js (App Router)**, **TypeScript**, **Tailwind v4**, and **Zod**. Posts are stored locally (localStorage). The app includes search/filter, date range filter, pagination, dark mode, autosave draft, and Markdown preview.

## Tech Stack

- Next.js (App Router), TypeScript
- Tailwind CSS v4
- Zod (validation)
- Context + Reducer (Posts), localStorage persistence
- marked + DOMPurify (Markdown + sanitization)
- Vitest + React Testing Library (unit tests + coverage)
- Storybook (component docs)

## Features

- **Wizard 4-step**: Metadata → Summary/Category → Content → Review & Submit
- **Validation per step** (Zod)
- **Autosave draft** (sessionStorage)
- **Markdown + Preview** (sanitized)
- **Search & Filter** (keyword, category)
- **Date Range Filter** (createdAt)
- **Pagination** (reusable component)
- **Dark Mode Toggle** (persisted)
- **SEO** metadata per page (list & detail)
- **Sticky Footer**

## Getting Started

```bash
pnpm i
pnpm dev
```

## Test

```bash
pnpm test
pnpm test:coverage
```

## Storybook

```bash
pnpm storybook
```

## Project Structure

```bash
app/            # pages (list, new, detail), layout, SEO
components/     # wizard steps + reusable UI
context/        # PostsContext, ThemeContext
hooks/          # useLocalStorage
lib/            # storage, paginate, date helpers
types/          # Post types
```
