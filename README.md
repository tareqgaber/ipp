# React TypeScript Starter with Untitled UI

A production-ready React + TypeScript + Vite starter template with authentication, routing, state management, and Untitled UI components.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🎨 **Untitled UI** - Beautiful, accessible UI components built on React Aria
- 🔐 **Authentication** - Complete auth flow with JWT token management
- 🌍 **i18n** - Multi-language support (English & Arabic) with RTL
- 🎯 **TypeScript** - Full type safety
- 🔄 **Redux Toolkit** - State management
- 🔌 **React Query** - Server state management
- 🛣️ **React Router 7** - Client-side routing with protected routes
- 🌓 **Dark Mode** - Built-in theme switching
- 📱 **Responsive** - Mobile-first design

## Project Structure

```
src/
├── api/              # API configuration and queries
│   ├── axios/        # Axios setup with interceptors
│   ├── queries/      # React Query hooks
│   └── types/        # API type definitions
├── components/       # Reusable components
│   ├── layout/       # Layout components (Auth, Admin)
│   └── RHFInputs/    # React Hook Form input components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and configurations
│   ├── auth/         # Authentication utilities
│   └── i18n/         # Internationalization setup
├── pages/            # Page components
│   ├── auth/         # Login page
│   └── admin/        # Dashboard page
├── providers/        # Context providers
├── router/           # Routing configuration
├── store/            # Redux store
└── styles/           # Global styles and theme

```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Key Technologies

- **UI Framework**: Untitled UI with React Aria Components
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Animations**: Framer Motion

## Configuration

### Environment Variables

Create a `.env` file with:

```
VITE_API_BASE_URL=your_api_url
```

### Routes

- `/login` - Login page
- `/admin` - Dashboard (protected)

See [AUTH_GUIDE.md](./AUTH_GUIDE.md) for authentication details and [TRANSLATION_IMPLEMENTATION.md](./TRANSLATION_IMPLEMENTATION.md) for i18n usage.
