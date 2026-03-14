<div align="center">

<img src="./public/logo.png" alt="Shelbook Logo" width="120" height="120" />

# Shelbook

**A decentralized social media platform built on Aptos blockchain**

[![Demo](https://img.shields.io/badge/🌐_Live_Demo-shelbook.xyz-blue?style=for-the-badge)](https://www.shelbook.xyz/)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Aptos](https://img.shields.io/badge/Aptos-Blockchain-00d4ff?style=for-the-badge)](https://aptoslabs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

**🚀 [Try Shelbook Live](https://www.shelbook.xyz/) 🚀**

---

*Shelbook-style UI with Web3 technology • Wallet-based authentication • Decentralized file storage*

</div>

---

## ✨ Features

- 📱 **Shelbook-Style Interface** - Familiar and intuitive UI/UX
- 🔐 **Web3 Authentication** - No passwords, just connect your Aptos wallet
- 📸 **Posts & Stories** - Share images and videos with decentralized storage
- ⏱️ **24-Hour Stories** - Auto-expiring stories like Instagram/Shelbook
- 💾 **Decentralized Storage** - Files stored on Aptos blockchain via Shelby Protocol
- 👤 **User Profiles** - Customizable profiles with avatar, bio, and stats
- 💬 **Comments & Likes** - Full social interactions
- 🌙 **Dark Mode** - Beautiful dark theme support
- 📱 **Responsive Design** - Works perfectly on mobile and desktop

---

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ installed
- Aptos wallet (Petra, Martian, etc.)
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/trsonfu/Shelbook.git
cd Shelbook

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations
npm run supabase:db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture

Shelbook combines traditional web2 technologies with cutting-edge web3 infrastructure:

- **Frontend:** Next.js 16 (App Router) + Tailwind CSS v4
- **Blockchain:** Aptos (for decentralized storage)
- **Storage:** Shelby Protocol (on-chain file storage)
- **Database:** Supabase (PostgreSQL for metadata)
- **Auth:** Wallet-based (no passwords needed)

### System Architecture

```
User Interface (Next.js + React)
         ↓
API Routes (Next.js serverless)
    ↓           ↓
Supabase    Shelby Protocol
(Metadata)  (File Storage)
                ↓
         Aptos Blockchain
```

**📐 For detailed architecture diagrams, database schema, and technical docs:**
→ **[View Architecture Documentation](./docs/ARCHITECTURE_DIAGRAMS.md)**

---

## 🚀 Deployment

### Deploy to Vercel

1. **Fork this repository** to your GitHub account

2. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get your Project URL and API keys

3. **Deploy to Vercel:**
   - Import your GitHub repository to Vercel
   - Add environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Run database migrations:**
   ```bash
   npm run supabase:db:push
   ```

5. **Deploy!** Your app will be live at `your-app.vercel.app`

### Environment Variables

#### Required (Production):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Optional:
```env
NEXT_PUBLIC_SHELBY_API_KEY=your-shelby-api-key
NEXT_PUBLIC_APTOS_API_KEY=your-aptos-api-key
OPENAI_API_KEY=your-openai-key
```

---

## 📚 Documentation

- **[Architecture & System Design](./docs/ARCHITECTURE_DIAGRAMS.md)** - Complete technical documentation
- **API Endpoints** - See [ARCHITECTURE_DIAGRAMS.md](./docs/ARCHITECTURE_DIAGRAMS.md#api-endpoints)
- **Database Schema** - See [ARCHITECTURE_DIAGRAMS.md](./docs/ARCHITECTURE_DIAGRAMS.md#database-schema)
- **Upload Flow** - See [ARCHITECTURE_DIAGRAMS.md](./docs/ARCHITECTURE_DIAGRAMS.md#upload-flow)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **State Management:** React Hooks

### Backend
- **API:** Next.js API Routes (serverless)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Auth:** Cookie-based sessions with wallet verification
- **Storage:** [Shelby Protocol](https://shelby.xyz/)

### Blockchain
- **Network:** [Aptos](https://aptoslabs.com/)
- **Wallet Integration:** @aptos-labs/wallet-adapter-react
- **Storage Protocol:** Shelby Protocol (decentralized blob storage)

---

## 🎨 Key Features Explained

### Posts
- Upload images or videos (max 100MB)
- Stored on Aptos blockchain via Shelby Protocol
- Add captions and interact (like, comment)
- Permanent storage (never expires)

### Stories
- Temporary posts that expire after 24 hours
- Same decentralized storage as posts
- Displayed in horizontal carousel
- Perfect for sharing moments

### Profiles
- Customizable with avatar and bio
- View posts and stats
- Follow other users
- Edit your own profile

### Authentication
- Connect with any Aptos wallet
- No password required
- Session-based (7-day expiry)
- Automatic wallet change detection

---

## 📦 Project Structure

```
shelbook/
├── app/
│   ├── (main)/              # Main app pages
│   │   ├── page.tsx         # Homepage (feed)
│   │   ├── profile/[id]/    # Profile pages
│   │   ├── post/[id]/       # Post detail pages
│   │   └── story/[id]/      # Story viewer
│   └── api/                 # API routes
│       ├── auth/            # Authentication
│       ├── posts/           # Post operations
│       ├── stories/         # Story operations
│       ├── users/           # User operations
│       └── upload/          # File upload
├── components/
│   ├── auth/                # Auth components
│   ├── layout/              # Layout (header, sidebar, nav)
│   ├── post/                # Post components
│   ├── story/               # Story components
│   └── profile/             # Profile components
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities and helpers
├── supabase/
│   └── migrations/          # Database migrations
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions
```

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build           # Production build
npm start              # Start production server

# Linting
npm run lint           # Run ESLint

# Supabase
npm run supabase:start     # Start local Supabase
npm run supabase:stop      # Stop local Supabase
npm run supabase:db:push   # Push migrations
npm run supabase:db:pull   # Pull schema
```

### Database Migrations

The project includes 3 migrations:
1. `001_initial_schema.sql` - Users table
2. `002_complete_schema.sql` - Posts, comments, likes, follows
3. `003_stories_schema.sql` - Stories and story views

Apply migrations:
```bash
npm run supabase:db:push
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Shelby Protocol](https://shelby.xyz/) - Decentralized storage solution
- [Aptos Labs](https://aptoslabs.com/) - Blockchain infrastructure
- [Supabase](https://supabase.com/) - Backend as a Service
- [Vercel](https://vercel.com/) - Hosting platform
- [shadcn/ui](https://ui.shadcn.com/) - UI component library

---

## 📧 Contact & Links

- **Live Demo:** [https://www.shelbook.xyz/](https://www.shelbook.xyz/)
- **GitHub:** [https://github.com/trsonfu/Shelbook](https://github.com/trsonfu/Shelbook)
- **Architecture Docs:** [ARCHITECTURE_DIAGRAMS.md](./docs/ARCHITECTURE_DIAGRAMS.md)

---

<div align="center">

**Built with ❤️ using Next.js, Aptos, and Shelby Protocol**

⭐ Star this repo if you find it helpful!

</div>
