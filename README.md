# 🔗 Smart URL Shortener

A modern, full-stack URL shortening application built with React, Node.js, and MongoDB. This application allows users to create short, shareable links with customizable expiration times and detailed analytics.

## ✨ Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Shortcodes**: Option to create custom shortcodes for your links
- **Expiration Control**: Set custom expiration times for your shortened URLs
- **Analytics Dashboard**: Track clicks, view creation dates, and monitor link performance
- **Real-time Statistics**: View detailed statistics for all your shortened URLs
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Logging System**: Comprehensive logging middleware for debugging and monitoring

## 🏗️ Architecture

The project follows a client-server architecture with three main components:

- **Frontend**: React application with Vite build tool
- **Backend**: Node.js/Express.js REST API
- **Database**: MongoDB for data persistence
- **Logging**: Custom logging middleware

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 22KN1A4494
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install logging middleware dependencies**
   ```bash
   cd ../logging-middleware
   npm install
   ```

### Configuration

1. **Set up MongoDB**
   - Ensure MongoDB is running on `mongodb://127.0.0.1:27017`
   - The application will automatically create the `urlshortener` database

2. **Environment Variables** (Optional)
   - Create a `.env` file in the backend directory if you need to customize settings
   - The application uses default values if no `.env` file is present

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   node index.js
   ```
   The backend will start on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

3. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application is now ready to use!

## 📖 Usage

### Creating Short URLs

1. Navigate to the main page
2. Enter a long URL in the input field
3. Optionally set:
   - **Validity**: Custom expiration time in minutes (default: 30 minutes)
   - **Custom Shortcode**: Your preferred shortcode (optional)
4. Click "Shorten" to generate the short URL
5. Copy and share your shortened link

### Viewing Analytics

1. Click on "View Analytics" in the navigation
2. View a comprehensive table showing:
   - All shortened URLs
   - Click counts
   - Creation dates
   - Expiration times
   - Original URLs

## 🔧 API Endpoints

### Backend API (Port 5000)

- `POST /shorturls` - Create a new shortened URL
- `GET /shorturls` - Get all shortened URLs
- `GET /shorturls/:shortcode` - Get specific URL details
- `GET /:shortcode` - Redirect to original URL

### Request Format

```json
{
  "url": "https://example.com/very-long-url",
  "validity": 60,
  "shortcode": "custom123"
}
```

### Response Format

```json
{
  "shortLink": "http://localhost:5000/abc123",
  "expiry": "2024-01-01T12:00:00.000Z"
}
```

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - UI framework
- **Vite 7.0.4** - Build tool and dev server
- **Tailwind CSS 4.1.11** - Styling framework
- **Axios 1.11.0** - HTTP client
- **React Router DOM 7.7.1** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB** - Database
- **CORS 2.8.5** - Cross-origin resource sharing
- **Body Parser 2.2.0** - Request body parsing
- **Dotenv 17.2.1** - Environment variable management

### Development Tools
- **ESLint 9.30.1** - Code linting
- **Logging Middleware** - Custom logging system

## 📁 Project Structure

```
22KN1A4494/
├── backend/
│   ├── index.js          # Main server file
│   ├── package.json      # Backend dependencies
│   └── routes.js         # API routes (if separated)
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── Shorten.jsx   # URL shortening component
│   │   ├── Stats.jsx     # Analytics component
│   │   └── main.jsx      # React entry point
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── logging-middleware/
    ├── logger.js         # Custom logging middleware
    └── package.json      # Logging dependencies
```

## 🔍 Features in Detail

### URL Shortening
- Generates random 6-character shortcodes
- Supports custom shortcodes
- Validates URL format
- Prevents duplicate shortcodes

### Analytics
- Tracks click counts
- Records click timestamps
- Stores referrer information
- Monitors IP addresses

### Security
- Input validation
- Error handling
- CORS configuration
- Request logging

## 🚀 Deployment

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Production
```bash
cd backend
npm install --production
node index.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify all dependencies are installed
4. Check that both frontend and backend servers are running

## 🔄 Future Enhancements

- User authentication and personal URL management
- QR code generation for shortened URLs
- Advanced analytics with charts and graphs
- Bulk URL shortening
- API rate limiting
- Custom domain support 