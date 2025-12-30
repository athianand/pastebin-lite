# 📋 Pastebin-Lite

A modern, responsive pastebin application where users can create text pastes and share them via URLs. Pastes can have optional time-based expiry (TTL) and view-count limits.

## ✨ Features

- 🎨 **Modern UI**: Clean, responsive design with gradient backgrounds and smooth animations
- ⏰ **Time-based Expiry**: Set TTL in seconds for automatic paste expiration
- 👁️ **View Limits**: Limit the number of times a paste can be viewed
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🔒 **Safe Rendering**: HTML content is safely escaped to prevent XSS
- 📋 **Copy to Clipboard**: Easy one-click copying of paste content and URLs
- ⚡ **Fast**: Built with Next.js for optimal performance

## 🚀 How to run locally

### Prerequisites
- Node.js 18+ installed
- A Vercel KV database (or Redis-compatible database)

### Setup Instructions

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd pastebin-lite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   KV_REST_API_URL=your_vercel_kv_rest_url
   KV_REST_API_TOKEN=your_vercel_kv_rest_token
   ```

   **To get Vercel KV credentials:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Create a new KV database or use existing one
   - Copy the REST API URL and Token from the database settings

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 🗄️ Persistence Layer

This application uses **Vercel KV** (Redis-compatible) as the persistence layer. This choice ensures:

- ✅ **Serverless Compatibility**: Data survives across serverless function invocations
- ⚡ **High Performance**: Redis provides sub-millisecond response times
- 🔄 **TTL Support**: Native support for automatic key expiration
- 📈 **Scalability**: Handles high concurrent loads efficiently
- 🛡️ **Reliability**: Managed service with built-in redundancy

## 🏗️ API Endpoints

### Health Check
```
GET /api/healthz
```
Returns application health status and database connectivity.

### Create Paste
```
POST /api/pastes
Content-Type: application/json

{
  "content": "Your text content here",
  "ttl_seconds": 3600,     // Optional: expire after 1 hour
  "max_views": 10          // Optional: limit to 10 views
}
```

### Get Paste (API)
```
GET /api/pastes/:id
```
Returns paste data with remaining views and expiry information.

### View Paste (HTML)
```
GET /p/:id
```
Displays the paste content in a user-friendly HTML page.

## 🧪 Testing Features

### Deterministic Time Testing
For automated testing, set the environment variable:
```env
TEST_MODE=1
```

Then use the `x-test-now-ms` header to control the current time for expiry logic:
```bash
curl -H "x-test-now-ms: 1640995200000" http://localhost:3000/api/pastes/abc123
```

## 🎨 Design Decisions

### Architecture
- **Next.js App Router**: Modern React framework with built-in API routes
- **TypeScript**: Type safety and better developer experience
- **Server-Side Rendering**: Fast initial page loads and SEO benefits

### UI/UX
- **Gradient Design**: Modern, visually appealing interface
- **Responsive Layout**: CSS Grid and Flexbox for all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Loading states, success messages, and error handling

### Security
- **Content Sanitization**: All user content is safely rendered
- **No Hardcoded URLs**: Environment-based configuration
- **Input Validation**: Server-side validation for all inputs

### Performance
- **Efficient Queries**: Minimal database operations
- **Caching**: Leverages Next.js built-in caching mechanisms
- **Optimized Builds**: Tree-shaking and code splitting

## 📁 Project Structure

```
app/
├── api/
│   ├── healthz/
│   │   └── route.ts          # Health check endpoint
│   └── pastes/
│       ├── route.ts          # Create paste endpoint
│       └── [id]/
│           └── route.ts      # Get paste endpoint
├── p/
│   └── [id]/
│       ├── page.tsx          # Paste view page
│       └── not-found.tsx     # 404 page for pastes
├── layout.tsx                # Root layout
└── page.tsx                  # Home page (create paste)
```

## 🚀 Deployment

This application is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production
```env
KV_REST_API_URL=your_production_kv_url
KV_REST_API_TOKEN=your_production_kv_token
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.