
# Audiophile E-commerce Website

A modern, responsive e-commerce website for audio equipment built with React, TypeScript, and Tailwind CSS. Features a comprehensive Content Management System (CMS) for dynamic content management.

## 🚀 Features

### Main Website
- **Responsive Design**: Optimized for desktop (1440px+), tablet (768px+), and mobile (375px+)
- **Product Catalog**: Browse headphones, speakers, and earphones
- **Shopping Cart**: Add/remove products, manage quantities
- **Checkout Process**: Complete order flow with form validation
- **Dynamic Content**: Hero, About, and Categories sections powered by CMS

### Content Management System (CMS)
- **Dynamic Content Management**: Edit hero section, about section, and categories in real-time
- **Product Management**: Add, edit, and delete products with full CRUD functionality
- **Image Upload**: Upload and manage images for products and categories
- **Category Management**: Create and manage product categories
- **Real-time Updates**: Changes in CMS immediately reflect on the main website
- **Image Gallery**: Upload, organize, and manage website images
- **Local Storage**: Persistent data storage for CMS content

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Charts**: Recharts (for future analytics)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd audiophile-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   bun run build
   ```

## 🎯 Usage

### Main Website
Visit `http://localhost:5173` to browse the main e-commerce website:
- Browse products by category
- View detailed product information
- Add products to cart
- Complete checkout process

### Content Management System
Access the CMS at `http://localhost:5173/cms` to manage website content:

#### CMS Navigation
- **🏠 Hero Section**: Edit homepage hero content (title, subtitle, description, button text)
- **ℹ️ About Section**: Manage about section content
- **📂 Categories**: Add, edit, and delete product categories with image upload
- **📦 Products**: Full product management with image uploads
- **🖼️ Images**: Upload and manage website images

#### CMS Features
1. **Hero Section Management**
   - Edit subtitle, title, description, and button text
   - Changes appear immediately on the homepage

2. **About Section Management**
   - Update section title and description
   - Dynamic content rendering with highlighted keywords

3. **Category Management**
   - Create new categories with names and images
   - Upload category images directly or use URLs
   - Auto-generate category URLs

4. **Product Management**
   - Add new products with complete details
   - Upload product images for mobile, tablet, and desktop
   - Set pricing, categories, and product features
   - Mark products as "new" or featured

5. **Image Gallery**
   - Upload images with drag-and-drop or file selection
   - Copy image URLs for use in content
   - Delete unused images
   - 5MB file size limit with validation

## 🎨 Design System

The application uses a carefully crafted design system with:
- **Colors**: Custom audiophile brand colors (#D87D4A, #FBAF85, etc.)
- **Typography**: Responsive text scales with proper hierarchy
- **Spacing**: Consistent spacing system using Tailwind utilities
- **Components**: Reusable UI components with consistent styling

## 📱 Responsive Design

- **Mobile**: 375px+ with touch-optimized interactions
- **Tablet**: 768px+ with adapted layouts
- **Desktop**: 1440px+ with full feature set

## 🔧 Configuration

### Environment Setup
The application runs entirely on the frontend with no backend requirements. Data is managed through:
- Static JSON files for initial product data
- Local storage for CMS content persistence
- FileReader API for image uploads

### Customization
- **Colors**: Modify `src/index.css` and `tailwind.config.ts`
- **Typography**: Update Tailwind config and CSS custom properties
- **Components**: Extend Shadcn/ui components in `src/components/ui/`

## 📂 Project Structure

```
src/
├── components/
│   ├── cart/          # Shopping cart components
│   ├── cms/           # CMS components and providers
│   ├── home/          # Homepage sections
│   ├── layout/        # Header, footer, navigation
│   └── ui/            # Reusable UI components
├── context/           # React context providers
├── data/              # Static data files
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── lib/               # Utility functions
```

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any static hosting provider

## 🔄 Data Management

### Static Data
- Initial products loaded from `src/data/products.json`
- Product images stored in `public/assets/`

### CMS Data
- CMS content stored in browser localStorage
- Images converted to base64 for local storage
- Data persists across browser sessions

### Data Flow
1. Static products load on app initialization
2. CMS products merge with static products
3. Content updates save to localStorage
4. Main website components consume CMS data via React Context

## 🎛️ CMS Administration

### Access Control
- CMS is openly accessible (add authentication as needed)
- All changes save locally in browser storage

### Data Backup
- Export CMS data via browser developer tools
- Access localStorage keys: `cms-content`, `cms-products`, `cms-images`

### Content Guidelines
- Use high-quality images (max 5MB)
- Write descriptive product names and descriptions
- Maintain consistent brand voice in content
- Test changes on different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across devices
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation above
- Review the code comments
- Test changes in the CMS interface
- Ensure responsive design across all breakpoints

---

**Note**: This is a frontend-only application. For production use, consider integrating with a backend CMS, database, and authentication system.
