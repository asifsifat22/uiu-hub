# UIU Hub

A comprehensive platform for United International University students to connect, share resources, and collaborate.

## Features

- **Book Exchange**: Buy and sell used textbooks
- **Study Groups**: Form and join study groups
- **Social Feed**: Share updates and connect with peers
- **Resource Sharing**: Access and share academic resources
- **Lost & Found**: Post and find lost items
- **Real-time Chat**: Communicate with study groups

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **UI/UX**: Framer Motion, React Icons
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uiu-hub.git
   ```

2. Install dependencies:
   ```bash
   cd uiu-hub
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The app is configured for deployment on Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Set up Vercel project:
   ```bash
   vercel link
   ```

4. Add environment variables to Vercel:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

5. Deploy to production:
   ```bash
   vercel --prod
   ```

Alternatively, you can deploy directly from the Vercel dashboard:

1. Push your code to GitHub
2. Import your repository in the Vercel dashboard
3. Configure environment variables in the Vercel project settings
4. Deploy!

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Database Setup

1. Create a new Supabase project
2. Run the migration in `supabase/migrations/20250325073313_add_core_tables.sql`
3. Configure storage buckets and policies as defined in the migration

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
