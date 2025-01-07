<p align="center" style="margin:50px 0;">
<img src="static/favicon.svg" width="100"/>
</p>

<h2 align="center" style="margin:50px 0; font-style: italic; font-weight: 500;">
  AuraMarket.
</h2>

## 📍 Table of Contents

- [Overview](#overview)
  - [📌 Project Structure](#📌-project-structure)
  - [⚜️ Built with](#⚜️-built-with)
  - [Technical instructions](#technical-instructions)
- [🚀 Getting Started](#🚀-getting-started)
  - [🟠 Pre-requirements](#🟠-pre-requirements)
  - [🔵 Installation](#🔵-installation)
  - [Users Authentication](#users-authentication)
- [📝 Authors](#📝-authors)

## Overview

**AuraMarket** is a lightweight e-commerce platform designed for users to explore the functionalities of an online marketplace in a fully local environment. The platform allows two types of users—admin and customer—to interact, simulate transactions, and test features in real-time without relying on external servers or databases.

The primary goal is to provide a seamless and interactive experience, demonstrating essential e-commerce functionalities while preserving simplicity and speed.

### 📌 Project Structure

- **src/assets**: Contains static files such as images, icons, and other resources used throughout the project.
- **src/components**: Houses reusable and shared components utilized across the application.
- **src/ui/atoms**: Smallest UI elements like buttons, inputs, or icons.
- **src/ui/molecules**: Combinations of atoms, like a form field or product card.
- **src/ui/organisms**: More complex UI elements formed by molecules and atoms, such as headers or forms.
- **src/lib**: Third-party libraries and modules that extend the platform’s capabilities.
- **src/utils**: Helper functions and utilities for common operations.

### ⚜️ Built with

- **SvelteKit**: To build a reactive and performant user interface.
- **TailwindCSS**: For rapid styling and responsive design.
- **TypeScript**: For type-safe code.
- **Vite**: For fast development and optimized builds.

### Technical instructions

| Command        | Action performed                               |
| -------------- | ---------------------------------------------- |
| `yarn install` | Install all dependencies                       |
| `yarn dev`     | Start a development server at `localhost:3000` |
| `yarn build`   | Generate the production build in `./dist/`     |
| `yarn preview` | Preview the build before deployment            |
| `yarn lint`    | Analyze and fix code quality issues            |

## 🚀 Getting Started

### 🟠 Pre-requirements

- Node.js (>=18.0.0 <=20.0.0)
- Yarn (>=3.2.0)

### 🔵 Installation

1. Clone repository:
   ```sh
   git clone git@github.com:yourusername/auramarket.git
   cd auramarket
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Run the development server:
   ```sh
   yarn dev
   ```

### Users Authentication

| Role     | Email          | Password |
| -------- | -------------- | -------- |
| admin    | admin@mail.com | admin123 |
| customer | john@mail.com  | changeme |

## 📝 Authors

- 🧑‍💼 [Leonardo Fontan](https://github.com/Lio-n)
