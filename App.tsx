import React, { useState, useMemo } from 'react';
import { Smartphone, Zap, Headphones, Check } from 'lucide-react';
import { Product, CartItem, CategoryFilter, PriceFilter, SortOption } from './types';
import { PRODUCTS, HOT_DEAL_PRODUCT } from './data/products';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { HeroSection } from './components/HeroSection';
import { FeatureBar } from './components/FeatureBar';
import { FilterBar } from './components/FilterBar';
import { CategorySection } from './components/CategorySection';
import { TrustCards } from './components/TrustCards';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { TrackOrderModal } from './components/TrackOrderModal';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppChatDesk } from './components/WhatsAppChatDesk';

export default function App() {
  // Navigation & Filter states
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [brandFilter, setBrandFilter] = useState('All Brands (Apple, Anker, Baseus...)');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  // Dialog & Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isWhatsAppDeskOpen, setIsWhatsAppDeskOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Update Product Image Handler
  const handleUpdateProductImage = (productId: string, newImageUrl: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, image: newImageUrl } : p))
    );
    setSelectedProduct((prev) =>
      prev && prev.id === productId ? { ...prev, image: newImageUrl } : prev
    );
    showToast('Product image updated successfully!');
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, model?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedModel: model || product.tag }];
    });
    showToast(`Added "${product.title.slice(0, 32)}..." to cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Cart counts & totals
  const cartCount = useMemo(() => cart.reduce((acc, i) => acc + i.quantity, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    [cart]
  );

  // WhatsApp Order Actions
  const handleWhatsAppOrder = (product: Product, model?: string) => {
    const text = encodeURIComponent(
      `Hello Sakith Tech! 👋\nI would like to order:\n• *${product.title}*\n• Model: ${model || product.tag}\n• Price: Rs. ${product.price.toLocaleString()}\n\nPlease confirm availability for Cash on Delivery (COD).`
    );
    window.open(`https://wa.me/94771234567?text=${text}`, '_blank');
  };

  const handleWhatsAppCartCheckout = (cartItems: CartItem[], total: number) => {
    let orderDetails = `Hello Sakith Tech! 👋\nI would like to place an order from your website:\n\n`;
    cartItems.forEach((item, idx) => {
      orderDetails += `${idx + 1}. *${item.product.title}* (${item.selectedModel || item.product.tag}) x ${item.quantity} = Rs. ${(item.product.price * item.quantity).toLocaleString()}\n`;
    });
    orderDetails += `\n*Total COD Amount:* Rs. ${total.toLocaleString()}\nDelivery: Islandwide Doorstep COD.\nPlease confirm my order.`;

    const text = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/94771234567?text=${text}`, '_blank');
  };

  // Category focus view scroll
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Product filtering engine
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'deals') {
          if (!product.badge?.includes('%') && product.badge !== 'HOT') return false;
        } else if (selectedCategory === 'new') {
          if (product.badge !== 'NEW' && product.badge !== 'BESTSELLER') return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCategory = product.categoryLabel.toLowerCase().includes(q);
        const matchTag = product.tag.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchCategory && !matchTag) return false;
      }

      // Price filter
      if (priceFilter === 'under2k' && product.price >= 2000) return false;
      if (priceFilter === '2k-5k' && (product.price < 2000 || product.price > 5000)) return false;
      if (priceFilter === 'over5k' && product.price <= 5000) return false;

      // Brand filter
      if (
        brandFilter !== 'All Brands (Apple, Anker, Baseus...)' &&
        !product.brand.toLowerCase().includes(brandFilter.toLowerCase())
      ) {
        return false;
      }

      // In-stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.soldCount - a.soldCount;
      return 0; // featured default
    });
  }, [productsList, selectedCategory, searchQuery, priceFilter, brandFilter, inStockOnly, sortBy]);

  // Split into categories for the 3 visual rails
  const coverProducts = useMemo(
    () => filteredProducts.filter((p) => p.category === 'covers'),
    [filteredProducts]
  );
  const powerProducts = useMemo(
    () => filteredProducts.filter((p) => p.category === 'power'),
    [filteredProducts]
  );
  const audioProducts = useMemo(
    () => filteredProducts.filter((p) => p.category === 'audio'),
    [filteredProducts]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0f1f4b] text-white px-4 py-2.5 rounded-xl shadow-xl border border-blue-400/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-3" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenWhatsApp={() => setIsWhatsAppDeskOpen(true)}
      />

      {/* Category Pill Sub-Navbar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === 'covers') handleScrollToSection('covers-section');
          if (cat === 'power') handleScrollToSection('power-section');
          if (cat === 'audio') handleScrollToSection('audio-section');
        }}
      />

      {/* Hero Section with Hot Deal of the Week */}
      <HeroSection
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === 'covers') handleScrollToSection('covers-section');
          if (cat === 'power') handleScrollToSection('power-section');
          if (cat === 'audio') handleScrollToSection('audio-section');
        }}
        onOpenProduct={setSelectedProduct}
        onQuickWhatsAppBuy={(prod) => handleWhatsAppOrder(prod)}
      />

      {/* Feature Highlights Bar */}
      <FeatureBar onOpenWhatsApp={() => setIsWhatsAppDeskOpen(true)} />

      {/* Filter and Sort Control Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === 'covers') handleScrollToSection('covers-section');
          if (cat === 'power') handleScrollToSection('power-section');
          if (cat === 'audio') handleScrollToSection('audio-section');
        }}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
        brandFilter={brandFilter}
        onBrandFilterChange={setBrandFilter}
        inStockOnly={inStockOnly}
        onInStockToggle={() => setInStockOnly((prev) => !prev)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalActiveItems={filteredProducts.length}
      />

      {/* Main Content Areas: 3 Category Sections */}
      <main className="flex-1 space-y-2 pb-8">
        
        {/* SECTION 1: Phone Back Covers */}
        {(selectedCategory === 'all' || selectedCategory === 'covers') && (
          <CategorySection
            id="covers-section"
            icon={Smartphone}
            iconBg="bg-blue-50"
            iconColor="text-[#0037b0]"
            title="Phone Back Covers"
            badgeText="50 Items Catalog"
            subtitle="Tempered Glass, Matte Frosted, MagSafe Ring & Heavy-Duty Shockproof Armor"
            rightBadgeText="Models: iPhone 11-16 Pro Max • Galaxy S22-S24 Ultra • Redmi"
            products={coverProducts}
            paginationInfo="Showing 1 - 10 of 50 Phone Cover Models • Available for 40+ Phone Types"
            onAddToCart={handleAddToCart}
            onWhatsAppOrder={(prod) => handleWhatsAppOrder(prod)}
            onQuickView={setSelectedProduct}
            onFocusView={() => {
              setSelectedCategory('covers');
              handleScrollToSection('covers-section');
            }}
          />
        )}

        {/* SECTION 2: Power Banks & MagSafe Solutions */}
        {(selectedCategory === 'all' || selectedCategory === 'power') && (
          <CategorySection
            id="power-section"
            icon={Zap}
            iconBg="bg-blue-50"
            iconColor="text-amber-600"
            title="Power Banks & MagSafe Solutions"
            badgeText="50 Items Catalog"
            subtitle="GaN Fast Desktop Blocks, Magnetic Wireless Packs, 65W Laptop Power & PD Cables"
            rightBadgeText="6 Months Direct Warranty"
            products={powerProducts}
            paginationInfo="Showing 1 - 10 of 50 Charging & Power Items"
            onAddToCart={handleAddToCart}
            onWhatsAppOrder={(prod) => handleWhatsAppOrder(prod)}
            onQuickView={setSelectedProduct}
            onFocusView={() => {
              setSelectedCategory('power');
              handleScrollToSection('power-section');
            }}
          />
        )}

        {/* SECTION 3: Headphones & Audio */}
        {(selectedCategory === 'all' || selectedCategory === 'audio') && (
          <CategorySection
            id="audio-section"
            icon={Headphones}
            iconBg="bg-blue-50"
            iconColor="text-sky-600"
            title="Headphones & Audio"
            badgeText="50 Items Catalog"
            subtitle="ANC Wireless Earbuds, Deep Bass Over-Ear Studio Sets, Waterproof Sports & Gaming TWS"
            rightBadgeText="Hi-Res Audio Certified • Bluetooth 5.4"
            products={audioProducts}
            paginationInfo="Showing 1 - 10 of 50 Audio Items"
            onAddToCart={handleAddToCart}
            onWhatsAppOrder={(prod) => handleWhatsAppOrder(prod)}
            onQuickView={setSelectedProduct}
            onFocusView={() => {
              setSelectedCategory('audio');
              handleScrollToSection('audio-section');
            }}
          />
        )}

        {/* Reassurance / Trust Cards */}
        <TrustCards onOpenWhatsApp={() => setIsWhatsAppDeskOpen(true)} />

      </main>

      {/* Footer */}
      <Footer
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppDeskOpen(true)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onWhatsAppOrder={handleWhatsAppCartCheckout}
      />

      {/* Live Order Tracking Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        onOpenWhatsApp={() => {
          setIsTrackOrderOpen(false);
          setIsWhatsAppDeskOpen(true);
        }}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onWhatsAppBuy={(prod, model) => handleWhatsAppOrder(prod, model)}
        onUpdateImage={handleUpdateProductImage}
      />

      {/* Cash on Delivery Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={(orderId) => {
          showToast(`Order ${orderId} placed successfully!`);
          setCart([]); // Clear cart upon successful order
        }}
        onOpenWhatsApp={() => setIsWhatsAppDeskOpen(true)}
      />

      {/* Floating WhatsApp Chat Launcher & Desk */}
      <WhatsAppChatDesk
        isOpen={isWhatsAppDeskOpen}
        onClose={() => setIsWhatsAppDeskOpen(false)}
        onOpen={() => setIsWhatsAppDeskOpen(true)}
      />

    </div>
  );
}
