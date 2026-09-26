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
import { MenuItem, MASCOT_INFO } from './data/cafeData';
import { CartItem, CartItemOption } from './types/cart';
import { Check, Sparkles, MessageCircle, X } from 'lucide-react';

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
  const [isMascotPopupOpen, setIsMascotPopupOpen] = useState(false);

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
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#3F3F46] flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Mascot Quick Chat Assistant */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        {isMascotPopupOpen ? (
          <div className="bg-white rounded-2xl p-4 shadow-2xl border-2 border-[#FFD9C4] w-72 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden p-0.5 bg-[#FF5B00]">
                  <img
                    src={MASCOT_INFO.avatar}
                    alt="꼬마"
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-xs text-[#18181B] block">마스코트 꼬마</span>
                  <span className="text-[10px] text-[#FF5B00] font-semibold">COMA CAFE 안내원</span>
                </div>
              </div>
              <button
                onClick={() => setIsMascotPopupOpen(false)}
                className="p-1 rounded-lg text-[#A1A1AA] hover:text-[#18181B] hover:bg-[#F4F4F5] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#52525B] leading-relaxed">
              &ldquo;신림동 COMA CAFE는 <strong>새벽 5시까지</strong> 열려있어!
              튤 조명 거울 포토존에서 핑크 전화기랑 인생샷 꼭 남겨봐 🧡&rdquo;
            </p>

            <div className="mt-3 pt-2 border-t border-[#F0ECE4] flex gap-2">
              <button
                onClick={() => {
                  scrollToSection('menu');
                  setIsMascotPopupOpen(false);
                }}
                className="flex-1 py-1.5 px-2 bg-[#FF5B00] hover:bg-[#E65200] text-white rounded-lg text-[11px] font-bold text-center transition-colors cursor-pointer"
              >
                크로플 보러가기
              </button>
              <button
                onClick={() => {
                  scrollToSection('stamp');
                  setIsMascotPopupOpen(false);
                }}
                className="flex-1 py-1.5 px-2 bg-[#F4F1EA] hover:bg-[#EBE6DC] text-[#18181B] rounded-lg text-[11px] font-bold text-center transition-colors cursor-pointer"
              >
                도장 찍기
              </button>
            </div>
          </div>
        ) : null}

        <button
          onClick={() => setIsMascotPopupOpen(!isMascotPopupOpen)}
          className="group flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#FFF5ED] border-2 border-[#FFD9C4] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          title="꼬마 마스코트와 대화하기"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5B00] to-[#FFA726] shadow-xs group-hover:scale-105 transition-transform">
            <img
              src={MASCOT_INFO.avatar}
              alt="꼬마"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="text-xs font-bold text-[#18181B] group-hover:text-[#FF5B00] transition-colors pr-1">
            꼬마에게 물어보기
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>

      {/* Navigation Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStamp={() => scrollToSection('stamp')}
      />

      <main className="flex-1">
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
