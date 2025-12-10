# 🍽️ Restaurant POS System - Billu Da Dhaba

![Restaurant POS](https://img.shields.io/badge/Restaurant-POS_System-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)

A complete, all-in-one restaurant point-of-sale system with modern features including QR menu, tablet ordering, online orders, and table management.

## 🌟 Features

### 🎯 Core Features
- **POS Billing System** - Complete billing with tax calculation
- **Menu Management** - Categorized menu with images
- **Table Management** - Real-time table status tracking
- **Receipt Generation** - Printable receipts with QR codes
- **User Management** - Multi-role login system

### 🚀 Advanced Features
- **QR Digital Menu** - Customers scan QR to view menu
- **Tablet Menu** - Optimized for tablet devices
- **Online Ordering** - Direct online orders with 0% commission
- **Table QR Codes** - Unique QR codes for each table
- **Order History** - Complete sales history tracking

### 📱 Mobile Optimized
- Fully responsive design
- Touch-friendly interface
- Works on all screen sizes
- Mobile-first approach

## 📋 Demo Accounts

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Administrator |
| reception | reception123 | Receptionist |

## 🛠️ Installation

### Quick Start (Local)

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/yourusername/restaurant-pos.git
   cd restaurant-pos
   ```

2. **File Structure**
   ```
   restaurant-pos/
   ├── index.html          # Main application file
   ├── styles.css         # All CSS styles
   ├── script.js          # All JavaScript functionality
   └── images/            # Menu item images
       ├── paneer-tikka.jpg
       ├── butter-paneer.jpg.jpg
       └── ... (other menu images)
   ```

3. **Run the application**
   - Simply open `index.html` in any modern web browser
   - No server or installation required!

### Server Deployment

#### Option 1: Apache/Nginx
```bash
# Copy files to web server
sudo cp -r restaurant-pos /var/www/html/
sudo chmod -R 755 /var/www/html/restaurant-pos
```

#### Option 2: Node.js (with live server)
```bash
npm install -g live-server
live-server --port=8080
# Visit: http://localhost:8080
```

#### Option 3: Python (Simple HTTP server)
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## 📁 Project Structure

### File Details

#### 1. **index.html** - Main Application
- Complete HTML structure
- All modals and UI components
- External library imports (Bootstrap, FontAwesome, QRCode)
- Semantic HTML with accessibility features

#### 2. **styles.css** - All Styles
- Responsive CSS with mobile-first approach
- CSS variables for theming
- Animations and transitions
- Print styles for receipts
- Media queries for all device sizes

#### 3. **script.js** - Application Logic
- **UserManager** - User authentication and management
- **BillManager** - Bill creation and calculation
- **MenuManager** - Menu and inventory management
- **QRManager** - QR code generation and handling
- **Event Listeners** - All user interactions
- **LocalStorage** - Data persistence

### Key Components

#### User Management System
```javascript
// Features:
// - User registration/login
// - Role-based permissions
// - Session management
// - Demo accounts
```

#### Bill Management
```javascript
// Features:
// - Add/remove menu items
// - Quantity adjustment
// - Tax calculation (5%)
// - Bill history
// - Receipt generation
```

#### Menu System
```javascript
// Features:
// - Category filtering
// - Search functionality
// - Veg/Non-veg indicators
// - Image support
// - Price display
```

## 🔧 Configuration

### Customizing for Your Restaurant

1. **Update Restaurant Details** (in `script.js`):
```javascript
// Line ~400: Update menu items
this.menuItems = [
    { id: 1, name: "Your Dish", price: 250, category: "main", type: "veg", image: "images/your-dish.jpg" },
    // Add your menu items here
];
```

2. **Update Restaurant Information** (in `index.html`):
```html
<!-- Line ~15: Update restaurant name -->
<h2>Your Restaurant Name</h2>

<!-- Line ~340: Update receipt header -->
<h4 style="margin-bottom: 5px;">YOUR RESTAURANT NAME</h4>
<p style="margin-bottom: 3px; font-size: 0.8rem;">Your Address</p>
```

3. **Update Images:**
- Place your restaurant logo as `images/Billu-Da-Dhaba.jpg.jpg`
- Add menu item images in `images/` folder
- Update image paths in menu items array

### Environment Variables (Optional)
Create a `config.js` file:
```javascript
const CONFIG = {
    restaurant: {
        name: "Your Restaurant",
        address: "Your Address",
        phone: "+91 XXXXX XXXXX",
        gstin: "XXABCDE1234F1Z5",
        taxRate: 5 // in percentage
    },
    features: {
        onlineOrders: true,
        qrMenu: true,
        tabletMenu: true,
        tableManagement: true
    }
};
```

## 💻 Usage Guide

### For Restaurant Staff

#### 1. Login
- Use demo accounts or create new account
- Choose role (Admin/Receptionist)

#### 2. Take Orders
- Select category (Starters, Main, etc.)
- Click items to add to bill
- Select table number or takeaway/delivery

#### 3. Manage Bill
- Adjust quantities with +/- buttons
- Remove items with ✕ button
- View real-time total with tax

#### 4. Generate Bill
- Click "GENERATE BILL"
- Review receipt with QR code
- Print or download as PDF

#### 5. Manage Tables
- Click "Tables" button
- View table status (Available/Occupied)
- Mark tables as occupied/available

### For Managers

#### 1. View Sales History
- All bills are saved in localStorage
- Access via browser DevTools > Application > LocalStorage

#### 2. Update Menu
- Edit `script.js` menu items array
- Add/remove items as needed
- Update prices or categories

#### 3. Generate QR Codes
- Click "Features" > "QR Menu"
- Generate main QR or table-specific QR codes
- Download and print for tables

## 🔐 Security Features

- Local data storage (no external servers)
- User authentication
- Session management
- Data persistence
- No sensitive data transmission

## 📱 Mobile & Tablet Usage

### Mobile Features
- Touch-friendly buttons
- Optimized for small screens
- Responsive layout
- Portrait/landscape support

### Tablet Features
- Split-screen layout on tablets
- Larger touch targets
- Optimized for horizontal use
- Perfect for table-side ordering

## 🖨️ Printing & Receipts

### Receipt Features
- Restaurant details with GSTIN
- Itemized bill with quantities
- Tax calculation
- QR code for digital receipt
- Printable format

### Print Options
1. **Thermal Printer:** Use browser print dialog
2. **PDF Export:** Download as PDF
3. **Email Receipt:** Future feature
4. **SMS Receipt:** Future feature

## 🔄 Data Management

### Local Storage Structure
```javascript
// Data stored in browser
localStorage.setItem('restaurant_users', users);    // User accounts
localStorage.setItem('current_user', user);         // Current session
localStorage.setItem('bill_history', bills);        // Sales history
localStorage.setItem('bill_counter', counter);      // Bill numbering
localStorage.setItem('table_status', status);       // Table management
localStorage.setItem('online_orders', orders);      // Online orders
```

### Backup & Restore
```javascript
// Export data
const backup = {
    users: localStorage.getItem('restaurant_users'),
    bills: localStorage.getItem('bill_history'),
    settings: localStorage.getItem('pos_settings')
};

// Import data
localStorage.setItem('restaurant_users', backup.users);
```

## 🚀 Deployment Options

### 1. **Local Network**
- Run on any computer
- Access via local IP: `http://192.168.1.x`
- No internet required after setup

### 2. **Cloud Hosting**
- Upload to web server
- Use domain name
- Access from anywhere

### 3. **Kiosk Mode**
```bash
# Windows: Create shortcut with
chrome.exe --kiosk --app=http://localhost:8080

# Linux: Use Firefox kiosk mode
firefox --kiosk http://localhost:8080
```

### 4. **PWA (Progressive Web App)**
Add `manifest.json`:
```json
{
  "name": "Restaurant POS",
  "short_name": "POS",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3498db"
}
```

## 🔧 Troubleshooting

### Common Issues & Solutions

1. **Images not loading**
   - Check image paths in `script.js`
   - Ensure images are in `images/` folder
   - Verify file permissions

2. **LocalStorage not saving**
   - Check browser settings (private/incognito mode)
   - Clear browser cache
   - Try different browser

3. **Print not working**
   - Check printer connection
   - Use PDF option as alternative
   - Configure print settings

4. **Mobile layout issues**
   - Refresh page
   - Clear cache
   - Check viewport settings

5. **QR codes not generating**
   - Check internet connection (QR library loads from CDN)
   - Refresh page
   - Try generating again

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Opera 50+

## 📈 Future Enhancements

### Planned Features
- [ ] Inventory Management
- [ ] Employee Management
- [ ] Customer Database
- [ ] SMS/Email Notifications
- [ ] Analytics Dashboard
- [ ] Multi-language Support
- [ ] Offline Mode
- [ ] Cloud Sync
- [ ] API Integration
- [ ] Payment Gateway Integration

### Integration Possibilities
- **Accounting Software:** Tally, QuickBooks
- **Food Delivery:** Zomato, Swiggy APIs
- **Payment:** Razorpay, Stripe
- **Kitchen Display:** KOT printing
- **CRM:** Customer relationship management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Setup
```bash
# Clone repository
git clone https://github.com/yourusername/restaurant-pos.git

# Open in code editor
code restaurant-pos

# Make changes and test locally
# Open index.html in browser
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Quick Help
1. **Reset Application:** Clear browser localStorage
2. **Restore Defaults:** Delete `script.js` and replace with original
3. **Debug Mode:** Open browser DevTools (F12) for errors

### Contact
- **Issues:** [GitHub Issues](https://github.com/yourusername/restaurant-pos/issues)
- **Documentation:** [Wiki](https://github.com/yourusername/restaurant-pos/wiki)
- **Email:** support@yourrestaurant.com

## 🙏 Acknowledgments

- **Bootstrap** - For responsive framework
- **FontAwesome** - For icons
- **QRCode.js** - For QR code generation
- **jsPDF** - For PDF generation
- **html2canvas** - For screenshots

## 🎯 Quick Reference Commands

```bash
# Start development server
python3 -m http.server 8000

# Clear application data
localStorage.clear()

# Export data
console.log(JSON.parse(localStorage.getItem('bill_history')))

# Import demo data
# Use demo accounts: admin/admin123
```

## 📊 System Requirements

### Minimum Requirements
- **Browser:** Modern web browser with JavaScript enabled
- **Storage:** 10MB local storage available
- **Screen:** 320px minimum width
- **Memory:** 256MB RAM

### Recommended
- **Browser:** Chrome/Firefox latest version
- **Storage:** 100MB available
- **Screen:** 1024x768 or higher
- **Internet:** For QR code generation
- **Printer:** Thermal receipt printer (80mm)

---

## ⚡ Quick Start Summary

1. **Download** all three files (`index.html`, `styles.css`, `script.js`)
2. **Create** `images` folder with your menu images
3. **Open** `index.html` in browser
4. **Login** with `admin/admin123`
5. **Start** taking orders!

---

**Made with ❤️ for restaurants worldwide**

For any questions or support, please open an issue on GitHub or contact the development team.
