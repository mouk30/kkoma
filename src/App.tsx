import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MascotBanner } from './components/MascotBanner';
import { StorySection } from './components/StorySection';
import { MenuSection } from './components/MenuSection';
import { StampSection } from './components/StampSection';
import { ReviewSection } from './components/ReviewSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ItemOptionModal } from './components/ItemOptionModal';
import { CartDrawer } from './components/CartDrawer';
import { MascotGreeting } from './components/MascotGreeting';
import { MenuItem } from './data/cafeData';
import { CartItem, CartItemOption } from './types/cart';
import { Check, Coffee, Stamp, MapPin, ShoppingBag, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kkoma_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kkoma_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (
    item: MenuItem,
    options: CartItemOption,
    quantity: number
  ) => {
    const unitPrice =
      item.price +
      (options.extraShot ? 500 : 0) -
      (options.useTumbler ? 300 : 0);
    const itemTotalPrice = unitPrice * quantity;

    // Check if duplicate option already exists
    const existingIndex = cartItems.findIndex(
      (c) =>
        c.menuItem.id === item.id &&
        c.options.temp === options.temp &&
        c.options.extraShot === options.extraShot &&
        c.options.sweetness === options.sweetness &&
        c.options.useTumbler === options.useTumbler
    );

    if (existingIndex > -1) {
      const next = [...cartItems];
      next[existingIndex].quantity += quantity;
      next[existingIndex].itemTotalPrice =
        unitPrice * next[existingIndex].quantity;
      setCartItems(next);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        menuItem: item,
        options,
        quantity,
        itemTotalPrice,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    showToast(`'${item.name}' ${quantity}개가 장바구니에 담겼습니다.`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            const unitPrice =
              item.menuItem.price +
              (item.options.extraShot ? 500 : 0) -
              (item.options.useTumbler ? 300 : 0);
            return {
              ...item,
              quantity: nextQty,
              itemTotalPrice: unitPrice * nextQty,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#18181B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#18181B] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#3F3F46] flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Mascot Greeting with Waving Animation and Sound */}
      <MascotGreeting onNavigate={scrollToSection} />

      {/* Navigation Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStamp={() => scrollToSection('stamp')}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero Section */}
        <Hero
          onOrderClick={() => scrollToSection('menu')}
          onStampClick={() => scrollToSection('stamp')}
        />

        {/* Mascot Introduction & Signature Picks Banner */}
        <MascotBanner
          onSelectRecommendedItem={(item) => setModalItem(item)}
        />

        {/* Story & Philosophy */}
        <StorySection />

        {/* Menu Section */}
        <MenuSection onSelectItem={(item) => setModalItem(item)} />

        {/* Digital Stamp Punch Card Simulation */}
        <StampSection />

        {/* Naver Place Visitor Reviews */}
        <ReviewSection />

        {/* Location & Visiting Guide */}
        <LocationSection />
      </main>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb Zone) */}
      <nav
        aria-label="모바일 하단 내비게이션"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EBE5DC] shadow-lg pb-safe"
      >
        <div className="grid grid-cols-5 items-center h-14 px-1">
          <button
            onClick={() => scrollToSection('menu')}
            className="flex flex-col items-center justify-center py-1 text-[#71717A] hover:text-[#FF5B00] active:text-[#FF5B00] transition-colors cursor-pointer"
          >
            <Coffee className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-tight mt-0.5">메뉴</span>
          </button>

          <button
            onClick={() => scrollToSection('story')}
            className="flex flex-col items-center justify-center py-1 text-[#71717A] hover:text-[#FF5B00] active:text-[#FF5B00] transition-colors cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-tight mt-0.5">포토존</span>
          </button>

          <button
            onClick={() => scrollToSection('stamp')}
            className="flex flex-col items-center justify-center py-1 text-[#71717A] hover:text-[#FF5B00] active:text-[#FF5B00] transition-colors cursor-pointer"
          >
            <Stamp className="w-5 h-5 text-[#FF5B00]" />
            <span className="text-[10px] font-bold tracking-tight mt-0.5 text-[#FF5B00]">스탬프</span>
          </button>

          <button
            onClick={() => scrollToSection('location')}
            className="flex flex-col items-center justify-center py-1 text-[#71717A] hover:text-[#FF5B00] active:text-[#FF5B00] transition-colors cursor-pointer"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-tight mt-0.5">길찾기</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center justify-center py-1 text-[#18181B] hover:text-[#FF5B00] active:text-[#FF5B00] transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#18181B]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#FF5B00] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">포장주문</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <Footer />

      {/* Item Customization Modal */}
      <ItemOptionModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart & Takeout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
