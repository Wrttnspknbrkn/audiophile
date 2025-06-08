
# Audiophile E-commerce Website

A modern, fully-responsive e-commerce website for high-end audio equipment built with React, TypeScript, and Tailwind CSS. Features a complete content management system for easy content updates.

## 🚀 Features

### Main Website
- **Responsive Design**: Optimized for desktop (1440px+), tablet (768px+), and mobile (375px+)
- **Product Catalog**: Browse headphones, speakers, and earphones
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout Process**: Complete order processing with form validation
- **Dynamic Content**: All content managed through integrated CMS

### Content Management System (CMS)
- **Easy Content Management**: Update hero sections, about content, and categories
- **Product Management**: Full CRUD operations for products
- **Image Management**: Upload and organize images with URL generation
- **Category Management**: Add, edit, and delete product categories
- **Real-time Updates**: Changes instantly reflect on the main website

## 🛠 Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Package Manager**: npm/bun

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

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Main Website
- **Homepage**: Browse featured products and categories
- **Categories**: View products by category (headphones, speakers, earphones)
- **Product Pages**: Detailed product information with gallery
- **Cart**: Manage your shopping cart
- **Checkout**: Complete your purchase with form validation

### Accessing the CMS
The Content Management System can be accessed through two routes:

1. **`/admin`** - Primary CMS access route
2. **`/cms`** - Alternative CMS access route

### CMS Features

#### Content Management
- **Hero Section**: Update homepage hero content, titles, descriptions, and call-to-action buttons
- **About Section**: Manage about page content and images
- **Categories**: Add, edit, and delete product categories with image uploads

#### Product Management
- **Add Products**: Create new products with comprehensive details
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from catalog
- **Image Uploads**: Upload product images for mobile, tablet, and desktop views
- **Validation**: Built-in form validation ensures data integrity

#### Image Management
- **Upload Images**: Drag-and-drop or click to upload images
- **Organize Gallery**: Manage uploaded images
- **Copy URLs**: Easily copy image URLs for use in content
- **File Validation**: Automatic file size and type validation

## 🏗 Project Structure

```
src/
├── components/
│   ├── cms/                 # CMS-specific components
│   │   ├── CMSProvider.tsx  # CMS state management
│   │   └── CMSEditor.tsx    # Legacy CMS editor
│   ├── home/                # Homepage components
│   ├── layout/              # Layout components
│   └── ui/                  # Reusable UI components
├── pages/
│   ├── Index.tsx            # Homepage
│   ├── CMSPage.tsx          # Content Management System
│   ├── CategoryPage.tsx     # Category listing page
│   ├── ProductPage.tsx      # Product detail page
│   └── CheckoutPage.tsx     # Checkout process
├── context/
│   └── CartContext.tsx      # Shopping cart state
├── data/
│   └── products.json        # Product data
├── types/
│   └── product.ts           # TypeScript interfaces
└── hooks/
    └── use-toast.ts         # Toast notification hook
```

## 💾 Data Management

### Content Storage
- **CMS Content**: Stored in browser localStorage with real-time updates
- **Static Products**: Defined in `src/data/products.json`
- **Dynamic Products**: Added through CMS and stored in localStorage
- **Images**: Uploaded images converted to base64 and stored locally

### Content Synchronization
All CMS changes are immediately reflected on the main website without requiring a page refresh, thanks to the React Context API integration.

## 🎨 Design System

The website follows a carefully crafted design system:

### Colors
- **Primary Orange**: `#D87D4A` (Audiophile Orange)
- **Light Orange**: `#FBAF85` (Hover states)
- **Dark**: `#191919` (Text and backgrounds)
- **Light Gray**: `#F1F1F1` (Backgrounds)

### Typography
- **Headings**: Optimized font weights and sizes for hierarchy
- **Body Text**: Readable font sizes with proper line heights
- **Responsive**: Typography scales appropriately across devices

### Components
- **Buttons**: Consistent styling with hover effects
- **Forms**: Proper validation states and error handling
- **Cards**: Uniform spacing and shadows
- **Navigation**: Intuitive and accessible

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Key Development Features

- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **Responsive Design**: Mobile-first approach
- **Component Architecture**: Reusable and maintainable components

## 📱 Responsive Breakpoints

- **Mobile**: 375px and up
- **Tablet**: 768px and up  
- **Desktop**: 1440px and up

## 🚦 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service of choice

The project is built as a static site and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from Frontend Mentor
- Icons from Lucide React
- UI components from Shadcn/UI
- Built with modern React best practices

---

**Need help?** Check the [CHANGELOG.md](CHANGELOG.md) for detailed version history and updates.
