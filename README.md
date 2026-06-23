# ShopyVibe

ShopyVibe is a modern, dynamic e-commerce platform that allows users to easily build, customize, and share their digital storefronts (their "Vibes"). It features an intuitive drag-and-drop style builder interface where users can choose from system-provided style templates or build a customized storefront from scratch, perfectly tailored to their brand identity.

## Features

- **Vibe Builder**: A fully interactive, drag-and-drop builder to customize the appearance of your storefront.
- **Style Templates**: Out-of-the-box, professionally designed templates to get started quickly.
- **Authentication**: Secure login using Email or Google OAuth via Auth.js (NextAuth).
- **Store Profiles**: Manage store details, add products, and configure store aesthetics.
- **QR & Link Generation**: Automatically generate QR codes and shareable links for your custom store.
- **Analytics Foundation**: Built-in architecture to track store views and interactions.
- **Dynamic Design**: Built with Tailwind CSS and Next.js App Router for a highly responsive, modern, and beautiful user experience.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MySQL (MariaDB)
- **Authentication**: [NextAuth.js v5 (Auth.js)](https://authjs.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Deployment**: Docker, Docker Compose, Nginx (Reverse Proxy)

## Getting Started Locally

First, ensure you have Node.js 18+ and a local MySQL database running.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the environment variables:**
   Create a `.env` file in the root directory based on `.env.example` (if available) and configure your database and authentication secrets:
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/shopyvibe"
   AUTH_SECRET="your-auth-secret"
   # Add your Google OAuth credentials if applicable
   # AUTH_GOOGLE_ID="..."
   # AUTH_GOOGLE_SECRET="..."
   ```

3. **Initialize the database:**
   Run Prisma migrations to set up your database schema.
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Deployment

ShopyVibe is configured to be easily deployed via Docker Compose on a shared server utilizing an Nginx reverse proxy pattern.

1. **Build the image:**
   The project includes a multi-stage `Dockerfile` tailored for Next.js with Prisma.
2. **Nginx Proxy:**
   An `nginx.conf` is provided to seamlessly map requests from your domain to the Next.js container.
3. **Run with Compose:**
   It integrates smoothly with an existing `docker-compose.yml` network. 

## Project Structure

- `app/`: Next.js App Router pages (Dashboard, Onboarding, Vibes Builder, Checkout, Settings).
- `actions/`: Server actions for database operations and authentication.
- `prisma/`: Prisma schema configuration and database setup.
- `public/`: Static assets.

## License

Private / Proprietary. All rights reserved.
