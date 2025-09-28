# Nextloop Technologies - Company Website

A modern, responsive company website built with Next.js, Supabase, and Tailwind CSS, showcasing Nextloop Technologies' services, expertise, and capabilities across software development, staffing, and digital solutions.

## 🚀 Tech Stack

- **Framework**: Next.js 13.4.4
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Animations**: Framer Motion
- **UI Components**: Lucide React (icons)
- **Rich Text Editor**: React Quill
- **Notifications**: SweetAlert2
- **Carousel/Slider**: Swiper
- **Date Handling**: Day.js

## 📁 Project Structure

```
nextloop-website/
├── components/           # Reusable UI components
├── pages/               # Next.js pages and API routes
├── public/              # Static assets (images, icons, etc.)
├── styles/              # Global styles and Tailwind config
├── lib/                 # Utility functions and configurations
├── data/                # Static data configurations
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
├── supabase/            # Database schemas and migrations
└── tests/               # Test files
```

## ✨ Key Features

### Core Functionality

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dynamic Content**: Database-driven content management via Supabase
- **Interactive Animations**: Smooth transitions with Framer Motion
- **SEO Optimized**: Next.js built-in optimization features
- **Rich Text Editing**: Content management with React Quill
- **Modern UI**: Clean, professional design with Lucide React icons

### Service Sections

- **Custom Software Development**: Enterprise solutions and web applications
- **Cloud Services**: Migration, infrastructure management, DevOps
- **Mobile App Development**: iOS/Android native and cross-platform apps
- **AI/ML Solutions**: Custom AI strategy and implementation
- **E-commerce Development**: Online stores and marketplace solutions
- **Digital Marketing**: SEO, PPC, social media, content marketing
- **MVP Development**: Rapid prototyping and market validation
- **Staffing Services**: Contract-to-hire and permanent placement

### Technology Showcase

- **Comprehensive Tech Stack Display**: 8 categories covering 40+ technologies
- **Industry Expertise**: Healthcare, Finance, E-commerce, FinTech sectors
- **Process Visualization**: Step-by-step development workflows
- **Case Studies**: Portfolio and success stories

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- Supabase account and project

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/nextloop-technologies/website.git
   cd nextloop-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SECRET_KEY=your_supabase_secret_key
   ```

4. **Supabase Setup**

   - Create a new Supabase project
   - Run database migrations (if any)
   - Configure authentication settings
   - Set up Row Level Security (RLS) policies

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis
- `npm run build-types` - Type check without emitting files
- `npm run test` - Run Jest tests
- `npm run test-watch` - Run tests in watch mode
- `npm run clean` - Clean build directories
- `npm run build-stats` - Build with bundle analysis
- `npm run export` - Export static files

## 🗃️ Data Management

### Static Data Configuration

The website uses a comprehensive static data configuration system located in the `data/` directory:

- **Services Data**: Detailed information for all service offerings
- **FAQ Collections**: Service-specific frequently asked questions
- **Technology Stack**: Organized by categories (Frontend, Backend, Mobile, Cloud, etc.)
- **Process Workflows**: Step-by-step development processes
- **Industry Expertise**: Sector-specific capabilities and case studies

### Database Integration

Supabase handles:

- Contact form submissions
- Newsletter subscriptions
- Blog content management
- User authentication (if applicable)
- Analytics and tracking data

## 🎨 Styling & Design

### Tailwind CSS Configuration

- **Responsive Design**: Mobile-first breakpoints
- **Custom Color Palette**: Brand-consistent colors
- **Typography Scale**: Hierarchical text sizing
- **Component Classes**: Reusable design patterns
- **Dark Mode**: Optional dark theme support

### Animation System

Framer Motion provides:

- Page transitions
- Component entrance animations
- Scroll-triggered animations
- Interactive hover effects
- Loading states

## 🧪 Testing

### Test Configuration

- **Framework**: Jest with jsdom environment
- **React Testing**: Testing Library for component tests
- **Coverage**: Automated test coverage reports
- **CI/CD Integration**: GitHub Actions compatibility

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode for development
npm run test-watch

# Generate coverage report
npm run test -- --coverage
```

## 📦 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Static Export (Optional)

```bash
npm run build-prod
```

### Deployment Platforms

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site deployment option
- **AWS/DigitalOcean**: Custom server deployment
- **GitHub Pages**: Static export deployment

## 🔧 Maintenance & Updates

### Regular Maintenance Tasks

- **Dependencies**: Update packages monthly using `npm update`
- **Security**: Run `npm audit` and fix vulnerabilities
- **Content**: Update service descriptions and technology listings
- **SEO**: Review and optimize meta tags and content
- **Performance**: Monitor Core Web Vitals and optimize as needed

### Content Updates

1. **Service Information**: Edit files in `data/services/`
2. **Technology Stack**: Update tech stack arrays in configuration
3. **FAQ Sections**: Modify FAQ collections for each service
4. **Blog Content**: Use Supabase dashboard for blog management

### Database Maintenance

- Regular backup of Supabase data
- Monitor database performance and usage
- Update RLS policies as needed
- Clean up unused data periodically

## 🤝 Contributing

### Development Workflow

1. Create feature branch from `main`
2. Follow ESLint configuration and Prettier formatting
3. Write tests for new functionality
4. Submit pull request with detailed description
5. Ensure all CI/CD checks pass

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Automated code formatting
- **Husky**: Pre-commit hooks for code quality
- **Lint-staged**: Staged file linting

## 📞 Support

For technical support or questions:

- **Development Team**: Check support details description
- **Documentation**: Check inline code comments
- **Issues**: Create GitHub issue with detailed description
- **Updates**: Subscribe to development newsletter

## 📄 License

This project is proprietary software owned by Nextloop Technologies. All rights reserved.

---

Built with ❤️ by the Nextloop Technologies team
