# Mayu Glow — E-Commerce Platform with Admin Panel (Firebase)

A React + Firebase e-commerce application featuring a unified customer/admin authentication flow, role-based route guards, complete Firestore data model, Cloud Storage image management, admin dashboard, order fulfillment control, and date-windowed aggregated sales statistics.

---

## 🌟 Architecture & Tech Stack

- **Frontend**: React (Vite), React Router v6, Lucide Icons, Framer Motion
- **Backend / Database**: Firebase — Authentication, Firestore, Storage
- **State Management**: React Context (`AuthContext`, `CartContext`)
- **Design System**: Unified Mayu Glow Aesthetic (`sage`, `cream`, `gold` theme, glassmorphism, responsive cards, and premium inputs)

---

## 🔒 1. Out-of-Band Admin Creation (`scripts/setAdminClaim.js`)

Per strict security requirements, **Admin account creation is NOT public**. There is no UI toggle to grant admin privileges.

To grant a user the `"admin"` role, run the included Node.js script using the Firebase Admin SDK:

```bash
# Provide Google Application Credentials for Firebase Admin SDK
export GOOGLE_APPLICATION_CREDENTIALS="path/to/serviceAccountKey.json"

# Run the script with target user UID
node scripts/setAdminClaim.js <USER_UID>
```

This sets custom claims `{ role: "admin" }` on the target Firebase Auth ID token and updates the user record in Firestore.

---

## 🚀 2. Getting Started

### Installation
```bash
npm install
```

### Environment Configuration
Create a `.env` file in the root directory (or set Vite environment variables):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Running Locally
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🗄️ 3. Firestore Data Model & Security Rules

### Document Schemas
```
users/{uid}          { firstName, lastName, phone, email, role, address, postalCode, city, state, country, createdAt }
categories/{catId}   { name, description, createdAt }
products/{productId} { name, description, price, stock, categoryId, imageUrls: [], createdAt, updatedAt }
orders/{orderId}     { userId, items: [{ productId, name, price, qty }], total, status, createdAt }
```

### Security Enforcement (`firestore.rules`)
- **Products & Categories**: All authenticated users can read; only `request.auth.token.role == 'admin'` can write.
- **Users**: Users can read/write their own document (`request.auth.uid == uid`); admins can read.
- **Orders**: Users can read/write orders belonging to them (`userId == request.auth.uid`); admins can read/write all orders.

---

## 🖥️ 4. Feature Checklist

- [x] **Single Login & Signup Flow**: Role-based redirect (`/admin/dashboard` for admins, `/` for users)
- [x] **Route Protection Wrapper**: `<ProtectedRoute role="admin">` enforcing custom claims
- [x] **Profile Completion Gate**: Redirects missing address fields to `/profile/complete` prior to checkout
- [x] **Admin Dashboard**: Headline stat cards (Total Users, Total Products, Total Orders, Total Revenue)
- [x] **Category Management**: Full CRUD operations on catalog categories
- [x] **Product & Storage Management**: Product CRUD + Firebase Storage image upload progress & deletion
- [x] **Order Fulfillment**: Complete order listing with status filters and manual status update controls
- [x] **Aggregated Sales Stats**: 7 / 30 / 90 day windowed sales rollups (Top 5 Best & Bottom 5 Worst Sellers)
- [x] **Shared Design System**: Single unified visual theme across customer storefront and admin panel
