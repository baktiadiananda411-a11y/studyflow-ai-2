# 📱 Responsive Design Guide - StudyFlow AI

Panduan lengkap untuk desain responsif di StudyFlow AI yang mendukung semua platform (HP, Tablet, Laptop) dengan deteksi device otomatis.

## 🎯 Fitur Responsive Design

### 1. **Device Detection Hook (`useDeviceType`)**
Hook otomatis mendeteksi jenis device dan screen size:

```typescript
import { useDeviceType } from "@/hooks/useDeviceType";

export default function MyComponent() {
  const { deviceType, isMobile, isTablet, isDesktop, width, height } = useDeviceType();
  
  return (
    <div>
      Tipe device: {deviceType} ({width}x{height}px)
    </div>
  );
}
```

### 2. **Breakpoints Tailwind CSS**
- **Mobile**: < 768px (sm: 640px)
- **Tablet**: 768px - 1024px (md: 768px, lg: 1024px)
- **Desktop**: ≥ 1024px (xl: 1280px, 2xl: 1536px)

### 3. **Responsive Sidebar**
- **Mobile**: Menu hamburger (sidebar tersembunyi, overlay saat dibuka)
- **Tablet**: Sidebar normal dengan scroll
- **Desktop**: Sidebar penuh dengan collapse button

### 4. **Mobile Header**
Header mobile dengan menu toggle hanya muncul di screen < 768px

---

## 🛠️ Komponen Responsive Utama

### ResponsiveSidebar Component
**File**: `/components/layout/ResponsiveSidebar.tsx`

Fitur:
- ✅ Auto-hide di mobile (hamburger menu)
- ✅ Collapsible di desktop
- ✅ Overlay dengan backdrop di mobile
- ✅ Smooth transition animations

**Penggunaan**:
```tsx
<ResponsiveSidebar 
  isOpen={isMenuOpen} 
  onClose={() => setIsMenuOpen(false)} 
/>
```

### MobileHeader Component
**File**: `/components/layout/MobileHeader.tsx`

Fitur:
- ✅ Logo dan nama app
- ✅ Menu toggle button
- ✅ Sticky positioning

**Penggunaan**:
```tsx
<MobileHeader 
  onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
  isMenuOpen={isMenuOpen}
/>
```

---

## 📋 Dashboard Layout Update

**File**: `/app/dashboard/layout.tsx`

Perubahan struktur:
```tsx
<div className="flex flex-col md:flex-row">
  <MobileHeader />
  <ResponsiveSidebar />
  <main>Content</main>
</div>
```

---

## 💡 Best Practices untuk Component Responsive

### 1. **Gunakan Tailwind Breakpoints**
```tsx
{/* Mobile: xs, Tablet: md, Desktop: lg+ */}
<div className="p-4 md:p-6 lg:p-8">
  {/* Padding: 4 (16px) di mobile → 6 (24px) di tablet → 8 (32px) di desktop */}
</div>
```

### 2. **Text Sizing**
```tsx
<h1 className="text-2xl md:text-4xl lg:text-5xl">Heading</h1>
```

### 3. **Grid Responsif**
```tsx
{/* 1 kolom mobile → 2 kolom tablet → 3 kolom desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### 4. **Flexbox dengan Arah Berbeda**
```tsx
<div className="flex flex-col md:flex-row items-start md:items-center">
  {/* Column di mobile, Row di desktop */}
</div>
```

### 5. **Hide/Show Conditional**
```tsx
{/* Hidden di mobile, visible di desktop */}
<div className="hidden md:block">Sidebar</div>

{/* Visible di mobile, hidden di desktop */}
<div className="md:hidden">Mobile Menu</div>
```

---

## 🎨 Responsive Dashboard Page

**File**: `/app/dashboard/page.tsx`

Update dilakukan untuk:
- ✅ Font sizes responsif (xs, md, lg)
- ✅ Padding responsif (p-4 → md:p-6 → lg:p-8)
- ✅ Grid columns responsif (1 → 2 → 3)
- ✅ Gap spacing responsif
- ✅ Icon sizes responsif
- ✅ Border radius responsif (rounded-2xl → rounded-3xl)

---

## 📱 Testing di Different Devices

### Menggunakan Chrome DevTools:
1. Buka DevTools (F12)
2. Klik device toggle (Ctrl + Shift + M)
3. Test di berbagai ukuran:
   - **iPhone 14**: 390x844px
   - **iPad**: 810x1080px
   - **MacBook**: 1440x900px

### Responsive Sizes:
```
Mobile  (xs): 320px → 639px
Tablet  (md): 640px → 1023px  (ideal: 768px)
Desktop (lg): 1024px → 1279px (ideal: 1280px)
Desktop (xl): 1280px+
```

---

## 🚀 Implementasi di Page Lain

Untuk membuat page lain responsif, gunakan pattern ini:

```tsx
export default function MyPage() {
  return (
    <div className="w-full pb-4 md:pb-6 lg:pb-8">
      {/* Container width full, responsive padding */}
      
      <div className="p-4 md:p-6 lg:p-8">
        {/* Responsive padding untuk semua sides */}
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>
        {/* Responsive text */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {/* Responsive grid */}
        </div>
      </div>
    </div>
  );
}
```

---

## 🔄 Automatic Device Detection

Hook `useDeviceType` otomatis:
- ✅ Detect device type saat mount
- ✅ Listen ke window resize event
- ✅ Update state sesuai breakpoint terbaru
- ✅ Cleanup event listener saat unmount

```typescript
const { 
  deviceType,      // "mobile" | "tablet" | "desktop"
  isMobile,        // boolean
  isTablet,        // boolean
  isDesktop,       // boolean
  width,           // number (px)
  height,          // number (px)
  isMounted        // boolean (true setelah hydration)
} = useDeviceType();
```

---

## ✨ Features Unggulan

| Feature | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Sidebar | Hamburger Menu | Full Sidebar | Full Sidebar + Collapse |
| Header | Mobile Header | - | - |
| Content Padding | Compact (p-4) | Medium (p-6) | Large (p-8) |
| Text Size | Smaller | Medium | Larger |
| Grid Columns | 1 | 2 | 3 |
| Responsif | ✅ | ✅ | ✅ |

---

## 📝 Checklist untuk Semua Pages

Saat membuat page baru, pastikan:

- [ ] Gunakan responsive text sizing (text-sm md:text-base lg:text-lg)
- [ ] Gunakan responsive padding (p-4 md:p-6 lg:p-8)
- [ ] Gunakan grid/flex dengan responsive breakpoints
- [ ] Test di mobile, tablet, dan desktop
- [ ] Gunakan `hidden md:block` untuk hide/show conditional
- [ ] Pastikan tidak ada horizontal scroll di mobile
- [ ] Gunakan `useDeviceType` hook jika perlu conditional rendering

---

## 🐛 Troubleshooting

### Sidebar tidak muncul di mobile:
- Pastikan `<MobileHeader>` dan `<ResponsiveSidebar>` ada di layout
- Check apakah `isMenuOpen` state ter-update

### Text overlap atau terlalu kecil:
- Tambah responsive font sizing: `text-xs md:text-sm lg:text-base`
- Gunakan breakpoint yang tepat

### Layout tidak responsif:
- Hindari `w-[fixed-pixel]`, gunakan `w-full` atau Tailwind units
- Gunakan flex/grid dengan responsive columns

---

## 📚 Dokumentasi Tambahan

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [React Hooks Best Practices](https://react.dev/reference/react/hooks)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**Status**: ✅ Responsive Design Implementation Complete
**Last Updated**: May 26, 2026
