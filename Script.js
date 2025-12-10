// User Management System
class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('restaurant_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('current_user')) || null;
        
        if (this.users.length === 0) {
            this.addDemoAccounts();
        }
    }
    
    addDemoAccounts() {
        const demoUsers = [
            {
                id: 1,
                fullName: "Admin User",
                username: "admin",
                email: "admin@billudadhaba.com",
                password: "admin123",
                role: "admin",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                fullName: "Receptionist",
                username: "reception",
                email: "reception@billudadhaba.com",
                password: "reception123",
                role: "receptionist",
                createdAt: new Date().toISOString()
            }
        ];
        
        this.users = demoUsers;
        this.saveUsers();
    }
    
    saveUsers() {
        localStorage.setItem('restaurant_users', JSON.stringify(this.users));
    }
    
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('current_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: "Invalid username or password" };
    }
    
    signup(fullName, username, email, password) {
        if (this.users.some(u => u.username === username)) {
            return { success: false, message: "Username already exists" };
        }
        
        if (this.users.some(u => u.email === email)) {
            return { success: false, message: "Email already registered" };
        }
        
        const newUser = {
            id: this.users.length + 1,
            fullName,
            username,
            email,
            password,
            role: "receptionist",
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        this.currentUser = newUser;
        localStorage.setItem('current_user', JSON.stringify(newUser));
        
        return { success: true, user: newUser };
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('current_user');
    }
    
    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// Bill Manager
class BillManager {
    constructor() {
        this.currentBill = [];
        this.billCounter = parseInt(localStorage.getItem('bill_counter')) || 1;
        this.billHistory = JSON.parse(localStorage.getItem('bill_history')) || [];
    }
    
    addItem(item) {
        const existingItem = this.currentBill.find(billItem => billItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            this.currentBill.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                total: item.price,
                type: item.type
            });
        }
        
        return this.currentBill;
    }
    
    updateQuantity(itemId, change) {
        const itemIndex = this.currentBill.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            const item = this.currentBill[itemIndex];
            item.quantity += change;
            
            if (item.quantity < 1) {
                this.currentBill.splice(itemIndex, 1);
            } else {
                item.total = item.quantity * item.price;
            }
        }
        
        return this.currentBill;
    }
    
    removeItem(itemId) {
        this.currentBill = this.currentBill.filter(item => item.id !== itemId);
        return this.currentBill;
    }
    
    clearBill() {
        this.currentBill = [];
        return this.currentBill;
    }
    
    getBillSummary() {
        const subtotal = this.currentBill.reduce((sum, item) => sum + item.total, 0);
        const tax = subtotal * 0.05;
        const discount = 0;
        const total = subtotal + tax - discount;
        
        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            discount: parseFloat(discount.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        };
    }
    
    generateBill(tableNumber, cashierName) {
        const summary = this.getBillSummary();
        const billData = {
            id: this.billCounter,
            billNumber: String(this.billCounter).padStart(6, '0'),
            table: tableNumber,
            items: [...this.currentBill],
            summary: summary,
            cashier: cashierName,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        this.billHistory.push(billData);
        localStorage.setItem('bill_history', JSON.stringify(this.billHistory));
        
        this.billCounter++;
        localStorage.setItem('bill_counter', this.billCounter);
        
        return billData;
    }
}

// Menu Manager with Enhanced Features
class MenuManager {
    constructor() {
        this.menuItems = [
            { id: 1, name: "Paneer Tikka", price: 220, category: "starters", type: "veg", image: "images/paneer-tikka.jpg" },
            { id: 2, name: "Aloo Tikki", price: 180, category: "starters", type: "veg", image: "images/aloo-tikkia.jpg" },
            { id: 3, name: "Butter Paneer", price: 320, category: "main", type: "veg", image: "images/butter-paneer.jpg.jpg" },
            { id: 4, name: "Paneer Butter Masala", price: 260, category: "main", type: "veg", image: "images/paneer-buttermasala.jpg.jpg" },
            { id: 5, name: "Dal Makhani", price: 200, category: "main", type: "veg", image: "images/dal-makhani.jpg.jpg" },
            { id: 6, name: "Paneer Biryani", price: 280, category: "main", type: "veg", image: "images/paneer-biryani.jpg.jpg" },
            { id: 7, name: "Veg Biryani", price: 220, category: "main", type: "veg", image: "images/veg-biryani.jpg.jpg" },
            { id: 8, name: "Butter Naan", price: 50, category: "breads", type: "veg", image: "images/butter-naan.jpg.jpg" },
            { id: 9, name: "Garlic Naan", price: 60, category: "breads", type: "veg", image: "images/garlic-naan.hpg.jpg" },
            { id: 10, name: "Roti", price: 25, category: "breads", type: "veg", image: "images/roti.jpg.jpg" },
            { id: 11, name: "Coke", price: 50, category: "drinks", type: "veg", image: "images/coke.jpg.jpg" },
            { id: 12, name: "Fresh Lime", price: 60, category: "drinks", type: "veg", image: "images/fresh-lime.jpg.jpg" },
            { id: 13, name: "Mango Lassi", price: 80, category: "drinks", type: "veg", image: "images/mango-lassi.jpg.jpg" },
            { id: 14, name: "Gulab Jamun", price: 120, category: "desserts", type: "veg", image: "images/gulab-jamun.jpg.jpg" },
            { id: 15, name: "Ice Cream", price: 100, category: "desserts", type: "veg", image: "images/ice-cream.jpg.jpg" },
        ];
        
        this.onlineOrders = JSON.parse(localStorage.getItem('online_orders')) || [];
        this.tableStatus = JSON.parse(localStorage.getItem('table_status')) || this.initializeTableStatus();
    }
    
    initializeTableStatus() {
        const status = {};
        for (let i = 1; i <= 10; i++) {
            status[i] = {
                number: i,
                status: Math.random() > 0.3 ? 'available' : 'occupied',
                orderId: null
            };
        }
        localStorage.setItem('table_status', JSON.stringify(status));
        return status;
    }
    
    updateTableStatus(tableNumber, status) {
        this.tableStatus[tableNumber] = {
            number: tableNumber,
            status: status,
            orderId: status === 'occupied' ? Date.now().toString() : null
        };
        localStorage.setItem('table_status', JSON.stringify(this.tableStatus));
    }
    
    addOnlineOrder(order) {
        order.id = this.onlineOrders.length + 1001;
        order.status = 'pending';
        order.createdAt = new Date().toISOString();
        this.onlineOrders.push(order);
        localStorage.setItem('online_orders', JSON.stringify(this.onlineOrders));
        return order;
    }
    
    getFilteredItems(category, searchTerm = '') {
        let items = this.menuItems;
        
        if (category !== 'all') {
            items = items.filter(item => item.category === category);
        }
        
        if (searchTerm) {
            items = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return items;
    }
}

// QR Code Manager
class QRManager {
    constructor() {
        this.generatedQRCodes = JSON.parse(localStorage.getItem('generated_qr_codes')) || [];
    }
    
    generateQRCode(text, elementId, size = 200) {
        return new Promise((resolve, reject) => {
            try {
                const element = document.getElementById(elementId);
                if (!element) {
                    reject(new Error(`Element with id ${elementId} not found`));
                    return;
                }
                
                // Clear existing content
                element.innerHTML = '';
                
                // Generate QR code
                QRCode.toCanvas(text, { width: size, height: size }, (error, canvas) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    
                    element.appendChild(canvas);
                    
                    // Save to history
                    const qrData = {
                        id: Date.now(),
                        text: text,
                        timestamp: new Date().toISOString(),
                        size: size
                    };
                    this.generatedQRCodes.push(qrData);
                    localStorage.setItem('generated_qr_codes', JSON.stringify(this.generatedQRCodes));
                    
                    resolve(canvas);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    generateTableQRCode(tableNumber, size = 100) {
        const text = `${window.location.origin}/menu?table=${tableNumber}&restaurant=BilluDaDhaba`;
        return this.generateQRCode(text, `tableQr${tableNumber}`, size);
    }
    
    generateMainMenuQRCode(size = 200) {
        const text = `${window.location.origin}/menu?restaurant=BilluDaDhaba`;
        return this.generateQRCode(text, 'qrCodeDisplay', size);
    }
    
    generateReceiptQRCode(billData, size = 70) {
        const text = JSON.stringify({
            restaurant: "Billu Da Dhaba",
            billNumber: billData.billNumber,
            total: billData.summary.total,
            date: billData.date,
            items: billData.items
        });
        
        const element = document.getElementById('qrCode');
        if (!element) return;
        
        element.innerHTML = '';
        
        QRCode.toCanvas(text, { width: size, height: size }, (error, canvas) => {
            if (!error) {
                element.appendChild(canvas);
            }
        });
    }
    
    downloadQRCode(canvas, filename = 'qr-code.png') {
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}

// Initialize Managers
const userManager = new UserManager();
const billManager = new BillManager();
const menuManager = new MenuManager();
const qrManager = new QRManager();

// DOM elements
const loginPage = document.getElementById('loginPage');
const posSystem = document.getElementById('posSystem');
const posContainer = document.querySelector('.pos-container');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const logoutBtn = document.getElementById('logoutBtn');
const currentUserName = document.getElementById('currentUserName');

const menuGrid = document.getElementById('menuGrid');
const billItems = document.getElementById('billItems');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const searchInput = document.getElementById('searchInput');
const categoryTabs = document.querySelectorAll('.category-tab');
const generateBillBtn = document.getElementById('generateBillBtn');
const clearBtn = document.getElementById('clearBtn');

const receiptContainer = document.getElementById('receiptContainer');
const receipt = document.getElementById('receipt');
const receiptItems = document.getElementById('receiptItems');
const receiptBillNo = document.getElementById('receiptBillNo');
const receiptDate = document.getElementById('receiptDate');
const receiptTime = document.getElementById('receiptTime');
const receiptTable = document.getElementById('receiptTable');
const receiptCashier = document.getElementById('receiptCashier');
const receiptSubtotal = document.getElementById('receiptSubtotal');
const receiptTax = document.getElementById('receiptTax');
const receiptDiscount = document.getElementById('receiptDiscount');
const receiptTotal = document.getElementById('receiptTotal');
const receiptPaid = document.getElementById('receiptPaid');
const receiptChange = document.getElementById('receiptChange');

const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const printReceiptBtn = document.getElementById('printReceiptBtn');
const closeReceiptBtn = document.getElementById('closeReceiptBtn');

const tableSelect = document.getElementById('tableSelect');

// Feature Elements
const featuresBtn = document.getElementById('featuresBtn');
const tablesBtn = document.getElementById('tablesBtn');
const onlineOrdersBtn = document.getElementById('onlineOrdersBtn');
const featuresModal = document.getElementById('featuresModal');
const closeFeaturesBtn = document.getElementById('closeFeaturesBtn');
const qrModal = document.getElementById('qrModal');
const closeQrBtn = document.getElementById('closeQrBtn');
const qrMenuBtn = document.getElementById('qrMenuBtn');
const qrOrderingBtn = document.getElementById('qrOrderingBtn');
const tabletMenuBtn = document.getElementById('tabletMenuBtn');
const onlineOrderingBtn = document.getElementById('onlineOrderingBtn');
const qrCodeDisplay = document.getElementById('qrCodeDisplay');
const qrUrl = document.getElementById('qrUrl');
const copyQrUrlBtn = document.getElementById('copyQrUrlBtn');
const downloadQrBtn = document.getElementById('downloadQrBtn');
const tableQrContainer = document.getElementById('tableQrContainer');

const tablesModal = document.getElementById('tablesModal');
const closeTablesBtn = document.getElementById('closeTablesBtn');
const tableCards = document.querySelectorAll('.table-card');
const newTableNumber = document.getElementById('newTableNumber');
const addTableBtn = document.getElementById('addTableBtn');

const onlineOrdersModal = document.getElementById('onlineOrdersModal');
const closeOnlineOrdersBtn = document.getElementById('closeOnlineOrdersBtn');
const enableOnlineOrders = document.getElementById('enableOnlineOrders');
const minOrderAmount = document.getElementById('minOrderAmount');
const deliveryRadius = document.getElementById('deliveryRadius');
const deliveryTime = document.getElementById('deliveryTime');
const cashOnDelivery = document.getElementById('cashOnDelivery');
const onlinePayment = document.getElementById('onlinePayment');
const saveOnlineOrderSettings = document.getElementById('saveOnlineOrderSettings');
const onlineOrdersList = document.getElementById('onlineOrdersList');

// Check login status on page load
function checkLoginStatus() {
    if (userManager.isLoggedIn()) {
        showPOS();
    } else {
        showLogin();
    }
}

// Show login page
function showLogin() {
    loginPage.style.display = 'block';
    posSystem.style.display = 'none';
}

// Show POS system
function showPOS() {
    loginPage.style.display = 'none';
    posSystem.style.display = 'block';
    posContainer.style.display = 'block';
    
    if (userManager.currentUser) {
        currentUserName.textContent = `Welcome, ${userManager.currentUser.fullName} (${userManager.currentUser.role})`;
    }
    
    initializeMenu();
    updateBillDisplay();
    updateTableCards();
}

// Show alert message
function showAlert(message, type = 'success') {
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'danger'} alert-dismissible fade show alert-message`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

// Tab switching for login/signup
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Login form submission
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const result = userManager.login(username, password);
    
    if (result.success) {
        showAlert('Login successful!', 'success');
        setTimeout(() => {
            showPOS();
        }, 500);
    } else {
        showAlert(result.message, 'danger');
    }
});

// Signup form submission
signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('signupFullName').value;
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match!', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long!', 'danger');
        return;
    }
    
    const result = userManager.signup(fullName, username, email, password);
    
    if (result.success) {
        showAlert('Account created successfully!', 'success');
        setTimeout(() => {
            showPOS();
        }, 500);
    } else {
        showAlert(result.message, 'danger');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    userManager.logout();
    showAlert('Logged out successfully!', 'success');
    setTimeout(() => {
        showLogin();
        loginFormElement.reset();
        signupFormElement.reset();
        loginTab.click();
    }, 500);
});

// Initialize the menu
function initializeMenu() {
    renderMenuItems(menuManager.menuItems);
}

// Render menu items
function renderMenuItems(items) {
    menuGrid.innerHTML = '';
    
    if (items.length === 0) {
        menuGrid.innerHTML = '<div class="col-12 text-center py-4"><p style="font-size: 1rem;">No items found</p></div>';
        return;
    }
    
    items.forEach(item => {
        const menuItemEl = document.createElement('div');
        menuItemEl.className = 'menu-item';
        menuItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-details">
                <div class="menu-item-name">
                    <span class="veg-indicator ${item.type === 'veg' ? 'veg' : 'non-veg'}"></span>
                    ${item.name}
                </div>
                <div class="menu-item-price">₹${item.price}</div>
            </div>
        `;
        
        menuItemEl.addEventListener('click', () => {
            billManager.addItem(item);
            updateBillDisplay();
            showAlert(`${item.name} added to bill`, 'success');
        });
        menuGrid.appendChild(menuItemEl);
    });
}

// Update bill display
function updateBillDisplay() {
    const currentBill = billManager.currentBill;
    const summary = billManager.getBillSummary();
    
    if (currentBill.length === 0) {
        billItems.innerHTML = `
            <div class="empty-bill">
                <i class="fas fa-receipt fa-3x mb-3"></i>
                <p>No items added yet</p>
            </div>
        `;
        subtotalEl.textContent = '₹0.00';
        taxEl.textContent = '₹0.00';
        totalEl.textContent = '₹0.00';
        return;
    }
    
    let billHTML = '';
    
    currentBill.forEach(item => {
        billHTML += `
            <div class="bill-item">
                <div class="bill-item-name">${item.name}</div>
                <div class="bill-item-controls">
                    <button class="quantity-btn quantity-decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
                    <span class="ms-2">₹${item.total}</span>
                    <button class="btn btn-sm btn-outline-danger ms-2" data-id="${item.id}" style="padding: 4px 8px; font-size: 0.8rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    billItems.innerHTML = billHTML;
    subtotalEl.textContent = `₹${summary.subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${summary.tax.toFixed(2)}`;
    totalEl.textContent = `₹${summary.total.toFixed(2)}`;
    
    document.querySelectorAll('.quantity-decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            billManager.updateQuantity(id, -1);
            updateBillDisplay();
        });
    });
    
    document.querySelectorAll('.quantity-increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            billManager.updateQuantity(id, 1);
            updateBillDisplay();
        });
    });
    
    document.querySelectorAll('.btn-outline-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            billManager.removeItem(id);
            updateBillDisplay();
            showAlert('Item removed from bill', 'warning');
        });
    });
}

// Clear bill
clearBtn.addEventListener('click', () => {
    if (billManager.currentBill.length === 0) {
        showAlert('Bill is already empty!', 'warning');
        return;
    }
    
    if (confirm('Are you sure you want to clear the current bill?')) {
        billManager.clearBill();
        updateBillDisplay();
        showAlert('Bill cleared successfully!', 'success');
    }
});

// Generate bill - UPDATED FUNCTION
generateBillBtn.addEventListener('click', () => {
    if (billManager.currentBill.length === 0) {
        showAlert('Please add items to the bill before generating.', 'warning');
        return;
    }
    
    const tableValue = tableSelect.value;
    const tableText = tableSelect.options[tableSelect.selectedIndex].text;
    const cashierName = userManager.currentUser?.fullName || 'Cashier';
    
    // Update table status to occupied if it's a numbered table
    if (tableValue !== 'takeaway' && tableValue !== 'delivery') {
        const tableNum = parseInt(tableValue);
        if (!isNaN(tableNum)) {
            menuManager.updateTableStatus(tableNum, 'occupied');
            updateTableCards();
        }
    }
    
    // Generate bill data
    const billData = billManager.generateBill(tableText, cashierName);
    
    // Update receipt display with bill data
    updateReceiptDisplay(billData);
    
    // Show receipt modal
    receiptContainer.style.display = 'flex';
    
    // Show success message
    showAlert(`Bill #${billData.billNumber} generated for ${tableText}!`, 'success');
});

// Update receipt display - UPDATED FUNCTION
function updateReceiptDisplay(billData) {
    const now = new Date();
    
    // Update receipt header information
    receiptBillNo.textContent = billData.billNumber;
    receiptDate.textContent = now.toLocaleDateString('en-IN');
    receiptTime.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    receiptTable.textContent = billData.table;
    receiptCashier.textContent = billData.cashier;
    
    // Clear previous receipt items
    receiptItems.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-weight: bold; padding-bottom: 5px; border-bottom: 1px solid #000; font-size: 0.85rem;">
            <span>Item</span>
            <span>Qty x Price</span>
            <span>Amount</span>
        </div>
    `;
    
    // Add current bill items to receipt
    billData.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'receipt-item';
        itemDiv.innerHTML = `
            <span style="flex: 2; text-align: left;">${item.name}</span>
            <span style="flex: 1; text-align: center;">${item.quantity} x ₹${item.price}</span>
            <span style="flex: 1; text-align: right;">₹${item.total}</span>
        `;
        receiptItems.appendChild(itemDiv);
    });
    
    // Update receipt summary
    receiptSubtotal.textContent = `₹${billData.summary.subtotal.toFixed(2)}`;
    receiptTax.textContent = `₹${billData.summary.tax.toFixed(2)}`;
    receiptDiscount.textContent = `₹${billData.summary.discount.toFixed(2)}`;
    receiptTotal.textContent = `₹${billData.summary.total.toFixed(2)}`;
    receiptPaid.textContent = `₹${billData.summary.total.toFixed(2)}`;
    receiptChange.textContent = '₹0.00';
    
    // Generate QR code for receipt
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    
    QRCode.toCanvas(
        JSON.stringify({
            restaurant: "Billu Da Dhaba",
            billNumber: billData.billNumber,
            total: billData.summary.total,
            date: billData.date,
            items: billData.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))
        }),
        { width: 70, height: 70 },
        (error, canvas) => {
            if (!error && canvas) {
                qrCodeContainer.appendChild(canvas);
            }
        }
    );
}

// Download PDF - UPDATED FUNCTION
downloadPdfBtn.addEventListener('click', async () => {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Get current bill data
        const tableText = receiptTable.textContent;
        const billNumber = receiptBillNo.textContent;
        const date = receiptDate.textContent;
        const time = receiptTime.textContent;
        const cashier = receiptCashier.textContent;
        const items = billManager.currentBill;
        const summary = billManager.getBillSummary();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(44, 62, 80);
        doc.text("BILLU DA DHABA", 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text("56 Food Street, Indore", 105, 28, { align: 'center' });
        doc.text("Phone: +91 98765 43210", 105, 34, { align: 'center' });
        doc.text("GSTIN: 23ABCDE1234F1Z5", 105, 40, { align: 'center' });
        
        // Separator line
        doc.setDrawColor(200, 200, 200);
        doc.line(10, 45, 200, 45);
        
        // Bill details
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Bill No: ${billNumber}`, 10, 55);
        doc.text(`Date: ${date}`, 10, 60);
        doc.text(`Time: ${time}`, 10, 65);
        doc.text(`Table: ${tableText}`, 10, 70);
        doc.text(`Cashier: ${cashier}`, 10, 75);
        
        // Separator line
        doc.line(10, 80, 200, 80);
        
        // Table header
        doc.setFillColor(240, 240, 240);
        doc.rect(10, 85, 190, 10, 'F');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("Item", 15, 92);
        doc.text("Qty", 120, 92);
        doc.text("Price", 150, 92);
        doc.text("Amount", 180, 92, { align: 'right' });
        
        // Items
        let yPos = 100;
        items.forEach(item => {
            // Item name (with word wrapping)
            const itemName = doc.splitTextToSize(item.name, 80);
            const nameHeight = itemName.length * 5;
            
            // Check if we need a new page
            if (yPos + nameHeight > 270) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.text(itemName, 15, yPos);
            doc.text(item.quantity.toString(), 120, yPos);
            doc.text(`₹${item.price}`, 150, yPos);
            doc.text(`₹${item.total}`, 180, yPos, { align: 'right' });
            
            yPos += Math.max(nameHeight, 10);
        });
        
        yPos += 10;
        
        // Separator line
        doc.line(10, yPos, 200, yPos);
        yPos += 10;
        
        // Summary
        doc.setFontSize(12);
        doc.text("Subtotal:", 120, yPos);
        doc.text(`₹${summary.subtotal.toFixed(2)}`, 180, yPos, { align: 'right' });
        yPos += 8;
        
        doc.text("Tax (5%):", 120, yPos);
        doc.text(`₹${summary.tax.toFixed(2)}`, 180, yPos, { align: 'right' });
        yPos += 8;
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("Total:", 120, yPos);
        doc.text(`₹${summary.total.toFixed(2)}`, 180, yPos, { align: 'right' });
        yPos += 15;
        
        // Separator line
        doc.line(10, yPos, 200, yPos);
        yPos += 15;
        
        // Footer
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text("Thank you for dining with us!", 105, yPos, { align: 'center' });
        yPos += 6;
        doc.text("Visit again soon!", 105, yPos, { align: 'center' });
        yPos += 6;
        doc.text("** This is a computer generated bill **", 105, yPos, { align: 'center' });
        
        // Save PDF
        doc.save(`Bill_${billNumber}_${date.replace(/\//g, '-')}.pdf`);
        
        showAlert('PDF downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error generating PDF:', error);
        showAlert('Error generating PDF. Please try again.', 'danger');
    }
});

// Print receipt
printReceiptBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Bill - ${receiptBillNo.textContent}</title>
                <style>
                    body { font-family: 'Courier New', monospace; padding: 20px; font-size: 1rem; }
                    .receipt { max-width: 300px; margin: 0 auto; }
                    .text-center { text-align: center; }
                    .receipt-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                    .receipt-total { font-weight: bold; border-top: 2px dashed #000; padding-top: 10px; }
                    @media print {
                        body { margin: 0; padding: 10px; }
                    }
                </style>
            </head>
            <body>
                <div class="receipt">
                    ${receipt.innerHTML}
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 500);
                    };
                <\/script>
            </body>
        </html>
    `);
    printWindow.document.close();
    
    showAlert('Printing bill...', 'success');
});

// Close receipt modal
closeReceiptBtn.addEventListener('click', () => {
    receiptContainer.style.display = 'none';
    billManager.clearBill();
    updateBillDisplay();
});

// Close receipt when clicking outside
receiptContainer.addEventListener('click', (e) => {
    if (e.target === receiptContainer) {
        receiptContainer.style.display = 'none';
        billManager.clearBill();
        updateBillDisplay();
    }
});

// Filter menu by category
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        const searchTerm = searchInput.value.toLowerCase();
        
        let filteredItems = menuManager.getFilteredItems(category, searchTerm);
        
        const menuSection = document.querySelector('.menu-section');
        menuSection.classList.remove('category-all', 'category-starters', 'category-main', 'category-breads', 'category-drinks', 'category-desserts');
        menuSection.classList.add(`category-${category}`);
        
        renderMenuItems(filteredItems);
    });
});

// Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.category-tab.active').getAttribute('data-category');
    
    const filteredItems = menuManager.getFilteredItems(activeCategory, searchTerm);
    renderMenuItems(filteredItems);
});

// Features functionality
featuresBtn.addEventListener('click', () => {
    featuresModal.style.display = 'flex';
});

closeFeaturesBtn.addEventListener('click', () => {
    featuresModal.style.display = 'none';
});

// QR Menu functionality
qrMenuBtn.addEventListener('click', () => {
    featuresModal.style.display = 'none';
    qrModal.style.display = 'flex';
    
    // Generate main QR code
    qrManager.generateMainMenuQRCode(200)
        .then(() => {
            showAlert('QR code generated successfully!', 'success');
        })
        .catch(error => {
            console.error('Error generating QR code:', error);
            showAlert('Error generating QR code. Please try again.', 'danger');
        });
});

closeQrBtn.addEventListener('click', () => {
    qrModal.style.display = 'none';
});

// QR Ordering functionality
qrOrderingBtn.addEventListener('click', () => {
    featuresModal.style.display = 'none';
    qrModal.style.display = 'flex';
    
    // Generate table-specific QR codes
    generateTableQRs();
});

// Generate table-specific QR codes
async function generateTableQRs() {
    tableQrContainer.innerHTML = '';
    
    const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    for (const tableNumber of tables) {
        const tableDiv = document.createElement('div');
        tableDiv.className = 'text-center';
        tableDiv.innerHTML = `
            <div class="mb-2">Table ${tableNumber}</div>
            <div id="tableQr${tableNumber}" style="width: 100px; height: 100px; margin: 0 auto;"></div>
        `;
        tableQrContainer.appendChild(tableDiv);
        
        try {
            await qrManager.generateTableQRCode(tableNumber, 100);
        } catch (error) {
            console.error(`Error generating QR for table ${tableNumber}:`, error);
            document.getElementById(`tableQr${tableNumber}`).innerHTML = 
                '<div class="text-danger small">Error generating QR</div>';
        }
    }
    
    showAlert('Table QR codes generated successfully!', 'success');
}

// Copy QR URL
copyQrUrlBtn.addEventListener('click', () => {
    qrUrl.select();
    document.execCommand('copy');
    showAlert('QR URL copied to clipboard!', 'success');
});

// Download QR code
downloadQrBtn.addEventListener('click', () => {
    const canvas = qrCodeDisplay.querySelector('canvas');
    if (canvas) {
        qrManager.downloadQRCode(canvas, 'billu-da-dhaba-menu-qr.png');
        showAlert('QR code downloaded!', 'success');
    } else {
        showAlert('Please generate a QR code first!', 'warning');
    }
});

// Tablet menu
tabletMenuBtn.addEventListener('click', () => {
    featuresModal.style.display = 'none';
    showAlert('Tablet menu launched! Open on tablet devices.', 'success');
    
    // Simulate tablet menu launch
    const tabletMenuWindow = window.open('', '_blank');
    tabletMenuWindow.document.write(`
        <html>
            <head>
                <title>Billu Da Dhaba - Tablet Menu</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background: #f8f9fa; }
                    .menu-item { background: white; border-radius: 10px; padding: 15px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                    .menu-item h4 { margin: 0 0 5px 0; color: #2c3e50; }
                    .menu-item .price { color: #27ae60; font-weight: bold; }
                </style>
            </head>
            <body>
                <h2>Billu Da Dhaba - Digital Menu</h2>
                <p>Scan QR code or use this tablet to browse our menu</p>
                <div id="tabletMenuItems"></div>
                <script>
                    const menuItems = ${JSON.stringify(menuManager.menuItems)};
                    const container = document.getElementById('tabletMenuItems');
                    
                    menuItems.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'menu-item';
                        div.innerHTML = \`
                            <h4>\${item.name}</h4>
                            <div class="price">₹\${item.price}</div>
                            <small>\${item.category.toUpperCase()} • \${item.type.toUpperCase()}</small>
                        \`;
                        container.appendChild(div);
                    });
                <\/script>
            </body>
        </html>
    `);
    tabletMenuWindow.document.close();
});

// Online ordering
onlineOrderingBtn.addEventListener('click', () => {
    featuresModal.style.display = 'none';
    onlineOrdersModal.style.display = 'flex';
});

// Tables functionality
tablesBtn.addEventListener('click', () => {
    tablesModal.style.display = 'flex';
});

closeTablesBtn.addEventListener('click', () => {
    tablesModal.style.display = 'none';
});

// Update table cards
function updateTableCards() {
    tableCards.forEach(card => {
        const tableNum = parseInt(card.getAttribute('data-table'));
        const tableStatus = menuManager.tableStatus[tableNum];
        
        card.classList.remove('active', 'occupied');
        card.querySelector('.table-status').classList.remove('status-available', 'status-occupied');
        
        if (tableStatus.status === 'available') {
            card.classList.add('active');
            card.querySelector('.table-status').className = 'table-status status-available';
            card.querySelector('.table-status').textContent = 'Available';
        } else {
            card.classList.add('occupied');
            card.querySelector('.table-status').className = 'table-status status-occupied';
            card.querySelector('.table-status').textContent = 'Occupied';
        }
    });
}

// Table card click event
tableCards.forEach(card => {
    card.addEventListener('click', () => {
        const tableNum = card.getAttribute('data-table');
        const tableStatus = menuManager.tableStatus[tableNum];
        
        if (tableStatus.status === 'available') {
            menuManager.updateTableStatus(parseInt(tableNum), 'occupied');
            showAlert(`Table ${tableNum} marked as occupied`, 'warning');
        } else {
            menuManager.updateTableStatus(parseInt(tableNum), 'available');
            showAlert(`Table ${tableNum} marked as available`, 'success');
        }
        
        updateTableCards();
    });
});

// Add new table
addTableBtn.addEventListener('click', () => {
    const newTableNum = parseInt(newTableNumber.value);
    if (newTableNum && newTableNum > 10) {
        menuManager.tableStatus[newTableNum] = {
            number: newTableNum,
            status: 'available',
            orderId: null
        };
        localStorage.setItem('table_status', JSON.stringify(menuManager.tableStatus));
        
        // Add to table select dropdown
        const option = document.createElement('option');
        option.value = newTableNum;
        option.textContent = `Table ${newTableNum}`;
        tableSelect.appendChild(option);
        
        // Refresh table display
        updateTableCards();
        newTableNumber.value = '';
        showAlert(`Table ${newTableNum} added successfully!`, 'success');
    } else {
        showAlert('Please enter a valid table number greater than 10', 'warning');
    }
});

// Online orders functionality
onlineOrdersBtn.addEventListener('click', () => {
    onlineOrdersModal.style.display = 'flex';
    loadOnlineOrders();
});

closeOnlineOrdersBtn.addEventListener('click', () => {
    onlineOrdersModal.style.display = 'none';
});

// Load online orders
function loadOnlineOrders() {
    onlineOrdersList.innerHTML = '';
    
    menuManager.onlineOrders.slice(-5).reverse().forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'list-group-item';
        
        const statusClass = order.status === 'pending' ? 'bg-warning' : 
                          order.status === 'preparing' ? 'bg-info' : 
                          order.status === 'delivered' ? 'bg-success' : 'bg-secondary';
        
        orderItem.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <strong>Order #${order.id}</strong><br>
                    <small>${order.items?.map(item => item.name).join(', ') || 'Items not specified'}</small><br>
                    <small class="text-muted">${new Date(order.createdAt).toLocaleString()}</small>
                </div>
                <div class="text-end">
                    <span class="badge ${statusClass}">${order.status}</span><br>
                    <small>₹${order.total || '0'}</small>
                </div>
            </div>
        `;
        
        onlineOrdersList.appendChild(orderItem);
    });
}

// Save online order settings
saveOnlineOrderSettings.addEventListener('click', () => {
    const settings = {
        enabled: enableOnlineOrders.checked,
        minOrderAmount: parseInt(minOrderAmount.value),
        deliveryRadius: parseInt(deliveryRadius.value),
        deliveryTime: parseInt(deliveryTime.value),
        cashOnDelivery: cashOnDelivery.checked,
        onlinePayment: onlinePayment.checked
    };
    
    localStorage.setItem('online_order_settings', JSON.stringify(settings));
    showAlert('Online order settings saved!', 'success');
});

// Load saved settings
function loadOnlineOrderSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('online_order_settings')) || {
        enabled: true,
        minOrderAmount: 200,
        deliveryRadius: 5,
        deliveryTime: 30,
        cashOnDelivery: true,
        onlinePayment: true
    };
    
    enableOnlineOrders.checked = savedSettings.enabled;
    minOrderAmount.value = savedSettings.minOrderAmount;
    deliveryRadius.value = savedSettings.deliveryRadius;
    deliveryTime.value = savedSettings.deliveryTime;
    cashOnDelivery.checked = savedSettings.cashOnDelivery;
    onlinePayment.checked = savedSettings.onlinePayment;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    loadOnlineOrderSettings();
    updateTableCards();
});
// Script.js — minimal behavior for demo
document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('loginView');
  const posView = document.getElementById('posView');
  const loginForm = document.getElementById('loginForm');
  const loggedUser = document.getElementById('loggedUser');
  const logoutBtn = document.getElementById('logout');

  const menuGrid = document.getElementById('menuGrid');
  const billItemsEl = document.getElementById('billItems');
  const emptyBill = document.getElementById('emptyBill');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const clearBtn = document.getElementById('clearBtn');
  const printBtn = document.getElementById('printBtn');

  const receiptModal = document.getElementById('receiptModal');
  const receiptItems = document.getElementById('receiptItems');
  const receiptTotal = document.getElementById('receiptTotal');
  const receiptUser = document.getElementById('receiptUser');
  const closeReceipt = document.getElementById('closeReceipt');

  let bill = [];

  // Login -> show POS
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('staffName').value || 'Staff';
    loggedUser.textContent = name;
    loginView.style.display = 'none';
    posView.style.display = 'block';
  });

  logoutBtn.addEventListener('click', () => {
    posView.style.display = 'none';
    loginView.style.display = 'block';
    bill = [];
    renderBill();
  });

  // Category tabs
  document.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.menu-item').forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) item.style.display = '';
        else item.style.display = 'none';
      });
    });
  });

  // Search filter
  document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.menu-item').forEach(item => {
      const name = item.dataset.name.toLowerCase();
      item.style.display = name.includes(q) ? '' : 'none';
    });
  });

  // Add to bill by clicking item
  menuGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.menu-item');
    if (!item) return;
    const id = item.dataset.id;
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);
    addToBill({ id, name, price });
  });

  function addToBill(product) {
    const found = bill.find(i => i.id === product.id);
    if (found) found.qty += 1;
    else bill.push({ ...product, qty: 1 });
    renderBill();
  }

  function renderBill() {
    billItemsEl.innerHTML = '';
    if (bill.length === 0) {
      billItemsEl.appendChild(emptyBill);
      subtotalEl.textContent = '$0.00';
      totalEl.textContent = '$0.00';
      return;
    }
    bill.forEach(line => {
      const el = document.createElement('div');
      el.className = 'bill-item';
      el.innerHTML = `
        <div class="bill-item-name">${line.name} x ${line.qty}</div>
        <div class="bill-item-controls">
          <button class="quantity-btn" data-action="dec" data-id="${line.id}">-</button>
          <div style="min-width:40px;text-align:right;padding-right:6px;">$${(line.price * line.qty).toFixed(2)}</div>
          <button class="quantity-btn" data-action="inc" data-id="${line.id}">+</button>
        </div>
      `;
      billItemsEl.appendChild(el);
    });

    const sub = bill.reduce((s, l) => s + l.price * l.qty, 0);
    subtotalEl.textContent = `$${sub.toFixed(2)}`;
    totalEl.textContent = `$${sub.toFixed(2)}`;
    attachQuantityHandlers();
  }

  function attachQuantityHandlers() {
    billItemsEl.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const idx = bill.findIndex(i => i.id === id);
        if (idx === -1) return;
        if (action === 'inc') bill[idx].qty += 1;
        else {
          bill[idx].qty -= 1;
          if (bill[idx].qty <= 0) bill.splice(idx, 1);
        }
        renderBill();
      });
    });
  }

  clearBtn.addEventListener('click', () => {
    bill = [];
    renderBill();
  });

  // Print / show receipt
  printBtn.addEventListener('click', () => {
    if (bill.length === 0) return alert('No items to print');
    receiptItems.innerHTML = '';
    bill.forEach(line => {
      const ri = document.createElement('div');
      ri.className = 'receipt-item';
      ri.innerHTML = `<div>${line.name} x ${line.qty}</div><div>$${(line.price * line.qty).toFixed(2)}</div>`;
      receiptItems.appendChild(ri);
    });
    const total = bill.reduce((s, l) => s + l.price * l.qty, 0);
    receiptTotal.textContent = `$${total.toFixed(2)}`;
    receiptUser.textContent = `Served by: ${loggedUser.textContent}`;
    receiptModal.style.display = 'flex';
    receiptModal.setAttribute('aria-hidden','false');
  });

  closeReceipt.addEventListener('click', () => {
    receiptModal.style.display = 'none';
    receiptModal.setAttribute('aria-hidden','true');
  });

  // init
  renderBill();
});