import { useState, useEffect, useRef } from "react";

const BRAND_NAME = "OBSCURA";

const collections = [
  { id: 1, name: "Hoodies", count: "24 pieces", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80", tag: "ESSENTIALS" },
  { id: 2, name: "Jackets", count: "18 pieces", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", tag: "OUTERWEAR" },
  { id: 3, name: "Streetwear", count: "32 pieces", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80", tag: "URBAN" },
  { id: 4, name: "Sneakers", count: "15 pieces", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", tag: "FOOTWEAR" },
  { id: 5, name: "Accessories", count: "40 pieces", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", tag: "DETAILS" },
  { id: 6, name: "Luxury Sets", count: "12 pieces", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", tag: "EXCLUSIVE" },
];

const products = [
  { id: 1, name: "Obsidian Oversized Hoodie", price: 189, originalPrice: 240, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500&q=80", category: "Hoodies", isNew: true, isSale: true },
  { id: 2, name: "Noir Leather Jacket", price: 485, originalPrice: 485, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80", category: "Jackets", isNew: false, isSale: false },
  { id: 3, name: "Eclipse Cargo Pants", price: 145, originalPrice: 190, image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=500&q=80", category: "Streetwear", isNew: false, isSale: true },
  { id: 4, name: "Shadow Runner Sneakers", price: 220, originalPrice: 220, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", category: "Sneakers", isNew: true, isSale: false },
  { id: 5, name: "Minimal Tote Bag", price: 95, originalPrice: 95, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", category: "Accessories", isNew: false, isSale: false },
  { id: 6, name: "Velvet Bomber Jacket", price: 345, originalPrice: 420, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80", category: "Jackets", isNew: true, isSale: true },
  { id: 7, name: "Urban Zip Hoodie", price: 165, originalPrice: 165, image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500&q=80", category: "Hoodies", isNew: false, isSale: false },
  { id: 8, name: "Phantom Wide Leg Trousers", price: 198, originalPrice: 250, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b6e08?w=500&q=80", category: "Streetwear", isNew: true, isSale: true },
];

const testimonials = [
  { id: 1, name: "Sarah M.", role: "Fashion Influencer", text: "OBSCURA has completely transformed my wardrobe. Every piece feels like wearable art — dark, intentional, and impossibly cool.", rating: 5, avatar: "SM" },
  { id: 2, name: "Alex K.", role: "Celebrity Stylist", text: "The quality is unmatched at this price point. I recommend OBSCURA to every single one of my clients without hesitation.", rating: 5, avatar: "AK" },
  { id: 3, name: "Jordan L.", role: "Creative Director", text: "Finally a brand that understands modern luxury without the pretension. OBSCURA is exactly what streetwear needed.", rating: 5, avatar: "JL" },
  { id: 4, name: "Maya R.", role: "Fashion Model", text: "The silhouettes are just incredible. I've worn every collection and each one is more stunning than the last.", rating: 5, avatar: "MR" },
];

const editorialImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
];

export default function ObscuraFashion() {
  const [darkMode, setDarkMode] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroBg, setHeroBg] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [notification, setNotification] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [emailValue, setEmailValue] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t1 = setInterval(() => setCurrentTestimonial(p => (p + 1) % testimonials.length), 5000);
    const t2 = setInterval(() => setHeroBg(p => (p + 1) % editorialImages.length), 6000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    showNotification(`✓ ${product.name} added to cart`);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      showNotification(exists ? `Removed from wishlist` : `♥ Added to wishlist`);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const categories = ["All", "Hoodies", "Jackets", "Streetwear", "Sneakers", "Accessories"];
  const filteredProducts = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const t = {
    bg: darkMode ? "#080808" : "#f5f3f0",
    bg2: darkMode ? "#111111" : "#eeece9",
    bg3: darkMode ? "#181818" : "#e5e3e0",
    text: darkMode ? "#f0ede8" : "#0d0a08",
    muted: darkMode ? "#777777" : "#888880",
    accent: "#c9a96e",
    accentDark: "#a8844a",
    border: darkMode ? "#1f1f1f" : "#d8d6d3",
    glass: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    glassBorder: darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)",
    navBg: darkMode ? "rgba(8,8,8,0.92)" : "rgba(245,243,240,0.92)",
  };

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'Josefin Sans', sans-serif", minHeight: "100vh", overflowX: "hidden", transition: "background 0.5s, color 0.5s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Josefin+Sans:wght@200;300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.accent}; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
        @keyframes float0 { 0%,100%{transform:translateY(0) rotate(-1deg);} 50%{transform:translateY(-18px) rotate(1deg);} }
        @keyframes float1 { 0%,100%{transform:translateY(0) rotate(1deg);} 50%{transform:translateY(-14px) rotate(-1deg);} }
        @keyframes float2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-22px);} }
        @keyframes scanline { 0%{top:-4px;opacity:0;} 10%{opacity:1;} 90%{opacity:1;} 100%{top:100%;opacity:0;} }
        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        @keyframes glitch { 0%,94%,100%{transform:translate(0);clip-path:none;} 95%{transform:translate(-3px,1px);} 97%{transform:translate(3px,-1px);} 99%{transform:translate(-2px,2px);} }
        @keyframes gradientPan { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
        @keyframes pulse { 0%,100%{opacity:.6;} 50%{opacity:1;} }
        @keyframes shimmer { 0%{opacity:.3;} 50%{opacity:.7;} 100%{opacity:.3;} }
        @keyframes dotPulse { 0%,100%{transform:scale(1);opacity:.6;} 50%{transform:scale(1.4);opacity:1;} }

        .pcrd:hover .pimg { transform:scale(1.09); }
        .pcrd:hover .povl { opacity:1; }
        .pcrd:hover .pbtns { opacity:1; transform:translateY(0); }
        .pimg { transition:transform .7s cubic-bezier(.25,.46,.45,.94); }
        .povl { opacity:0; transition:opacity .4s; }
        .pbtns { opacity:0; transform:translateY(16px); transition:opacity .4s, transform .4s cubic-bezier(.25,.46,.45,.94); }
        .ccrd:hover .cimg { transform:scale(1.08); }
        .cimg { transition:transform .8s cubic-bezier(.25,.46,.45,.94); }
        .navlnk::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:${t.accent}; transition:width .3s; }
        .navlnk:hover::after { width:100%; }
        .navlnk { position:relative; }
        .socicon:hover { transform:translateY(-3px) scale(1.1); color:${t.accent}; }
        .socicon { transition:all .25s; }
        .footlnk:hover { color:${t.text}; }
        .footlnk { transition:color .2s; }
        .sz-btn:hover { border-color:${t.accent}; color:${t.accent}; }
        .sz-btn { transition:all .2s; }
        .sz-active { background:${t.accent}; border-color:${t.accent}; color:#000; }
        .catbtn-active { background:${t.accent}; border-color:${t.accent}; color:#000; font-weight:700; }
        .catbtn:hover { border-color:${t.accent}; color:${t.accent}; }
        .catbtn { transition:all .25s; }
        input[type=email]::placeholder { color:${t.muted}; }
        input:focus { outline:none; }
        button { font-family:'Josefin Sans', sans-serif; }
        @media(max-width:900px){
          .hero-title{font-size:52px!important;}
          .colgrid{grid-template-columns:repeat(2,1fr)!important;}
          .prodgrid{grid-template-columns:repeat(2,1fr)!important;}
          .aboutgrid{grid-template-columns:1fr!important;}
          .socgrid{grid-template-columns:1fr!important;}
          .footgrid{grid-template-columns:1fr 1fr!important;}
          .floatcard{display:none!important;}
          .statgrid{grid-template-columns:repeat(2,1fr)!important;}
        }
        @media(max-width:500px){
          .hero-title{font-size:38px!important;}
          .colgrid{grid-template-columns:1fr!important;}
          .prodgrid{grid-template-columns:1fr!important;}
          .footgrid{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* TOAST */}
      {notification && (
        <div style={{ position:"fixed", top:24, right:24, zIndex:9999, background:t.accent, color:"#000", padding:"12px 22px", borderRadius:"2px", fontSize:"12px", fontWeight:"700", letterSpacing:".08em", animation:"fadeUp .3s ease", boxShadow:"0 8px 30px rgba(201,169,110,.35)" }}>
          {notification}
        </div>
      )}

      {/* ─── NAVBAR ─── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, height:72, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", background:scrollY>60?t.navBg:"transparent", backdropFilter:scrollY>60?"blur(20px)":"none", borderBottom:scrollY>60?`1px solid ${t.border}`:"none", transition:"all .4s" }}>
        {/* Logo */}
        <div onClick={() => setMobileMenuOpen(false)} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, letterSpacing:".25em", cursor:"pointer", animation:"glitch 12s infinite", userSelect:"none" }}>
          {BRAND_NAME}
        </div>

        {/* Desktop Links */}
        <div style={{ display:"flex", gap:36, alignItems:"center" }}>
          {["Collections","New Arrivals","Editorial","About","Contact"].map(l => (
            <span key={l} className="navlnk" style={{ fontSize:11, fontWeight:500, letterSpacing:".14em", cursor:"pointer", color:t.muted, textTransform:"uppercase", whiteSpace:"nowrap" }}>{l}</span>
          ))}
        </div>

        {/* Icons */}
        <div style={{ display:"flex", gap:20, alignItems:"center" }}>
          <button onClick={() => setSearchOpen(s => !s)} style={{ background:"none", border:"none", cursor:"pointer", color:t.text, padding:4, display:"flex" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>

          <button onClick={() => toggleWishlist({ id: -1, name: "" })} style={{ background:"none", border:"none", cursor:"default", color:t.text, padding:4, display:"flex", position:"relative" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill={wishlist.length?"#e05555":"none"} stroke={wishlist.length?"#e05555":"currentColor"} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {wishlist.length > 0 && <span style={{ position:"absolute", top:-6, right:-6, background:"#e05555", borderRadius:"50%", width:15, height:15, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700 }}>{wishlist.length}</span>}
          </button>

          <button onClick={() => setCartOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", color:t.text, padding:4, display:"flex", position:"relative" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && <span style={{ position:"absolute", top:-6, right:-6, background:t.accent, borderRadius:"50%", width:15, height:15, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#000", fontWeight:700 }}>{cartCount}</span>}
          </button>

          <button onClick={() => setDarkMode(d => !d)} style={{ width:46, height:26, borderRadius:13, border:`1px solid ${t.border}`, background:t.bg3, cursor:"pointer", position:"relative", transition:"background .3s", flexShrink:0 }}>
            <div style={{ position:"absolute", top:3, width:18, height:18, borderRadius:"50%", background:t.accent, left:darkMode?3:23, transition:"left .3s", fontSize:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {darkMode?"☾":"☀"}
            </div>
          </button>

          <button onClick={() => setMobileMenuOpen(m => !m)} style={{ background:"none", border:"none", cursor:"pointer", color:t.text, display:"flex", flexDirection:"column", gap:5, padding:4, width:24 }}>
            <div style={{ height:1, background:t.text, transition:"all .3s", transform:mobileMenuOpen?"rotate(45deg) translate(4px,4px)":"none", width:"100%" }}/>
            <div style={{ height:1, background:t.text, transition:"all .3s", opacity:mobileMenuOpen?0:1, width:"70%" }}/>
            <div style={{ height:1, background:t.text, transition:"all .3s", transform:mobileMenuOpen?"rotate(-45deg) translate(4px,-4px)":"none", width:"100%" }}/>
          </button>
        </div>
      </nav>

      {/* SEARCH BAR */}
      {searchOpen && (
        <div style={{ position:"fixed", top:72, left:0, right:0, zIndex:999, background:t.navBg, backdropFilter:"blur(20px)", borderBottom:`1px solid ${t.border}`, padding:"28px 40px", animation:"fadeUp .25s ease" }}>
          <div style={{ maxWidth:600, margin:"0 auto", display:"flex", alignItems:"center", gap:16 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={t.muted} strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products, collections..." style={{ flex:1, background:"none", border:"none", color:t.text, fontSize:20, fontFamily:"'Josefin Sans',sans-serif", fontWeight:300, letterSpacing:".04em" }}/>
            <button onClick={() => setSearchOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:t.muted, fontSize:22, lineHeight:1 }}>✕</button>
          </div>
          {searchQuery && (
            <div style={{ maxWidth:600, margin:"16px auto 0", display:"flex", gap:8, flexWrap:"wrap" }}>
              {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <div key={p.id} onClick={() => { setQuickViewProduct(p); setSearchOpen(false); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:t.glass, border:`1px solid ${t.glassBorder}`, borderRadius:2, cursor:"pointer" }}>
                  <img src={p.image} style={{ width:32, height:40, objectFit:"cover", borderRadius:1 }} alt=""/>
                  <div>
                    <div style={{ fontSize:12, fontWeight:500 }}>{p.name}</div>
                    <div style={{ fontSize:11, color:t.accent }}>${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:998, background:darkMode?"rgba(8,8,8,.98)":"rgba(245,243,240,.98)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:36, animation:"fadeIn .3s" }}>
          {["Collections","New Arrivals","Editorial","About","Contact"].map((l,i) => (
            <span key={l} onClick={() => setMobileMenuOpen(false)} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:300, letterSpacing:".08em", cursor:"pointer", animation:`fadeUp .35s ease ${i*.08}s both` }}>{l}</span>
          ))}
          <div style={{ display:"flex", gap:20, marginTop:20 }}>
            {["📸","🎵","𝕏","f"].map((icon,i) => (
              <div key={i} style={{ width:44, height:44, border:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:2, cursor:"pointer", fontSize:18 }}>{icon}</div>
            ))}
          </div>
        </div>
      )}

      {/* ─── CART DRAWER ─── */}
      {cartOpen && (
        <>
          <div onClick={() => setCartOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", zIndex:1001, backdropFilter:"blur(6px)" }}/>
          <div style={{ position:"fixed", right:0, top:0, bottom:0, width:"min(440px,95vw)", zIndex:1002, background:t.bg, borderLeft:`1px solid ${t.border}`, display:"flex", flexDirection:"column", animation:"slideRight .4s cubic-bezier(.25,.46,.45,.94)" }}>
            <div style={{ padding:"28px 28px 20px", borderBottom:`1px solid ${t.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:400 }}>Shopping Bag</div>
                <div style={{ color:t.muted, fontSize:11, letterSpacing:".12em", marginTop:3 }}>{cartCount} {cartCount === 1?"ITEM":"ITEMS"}</div>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:t.muted, fontSize:22 }}>✕</button>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"16px 28px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign:"center", padding:"80px 20px", color:t.muted }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontWeight:300, lineHeight:1 }}>∅</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, marginTop:16 }}>Your bag is empty</div>
                  <div style={{ fontSize:13, marginTop:8 }}>Add some pieces to begin</div>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{ display:"flex", gap:16, padding:"18px 0", borderBottom:`1px solid ${t.border}` }}>
                  <img src={item.image} style={{ width:80, height:100, objectFit:"cover", borderRadius:2, flexShrink:0 }} alt={item.name}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:500, letterSpacing:".04em", marginBottom:6, lineHeight:1.4 }}>{item.name}</div>
                    <div style={{ color:t.accent, fontWeight:600, fontSize:14, marginBottom:12 }}>${item.price}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <button onClick={() => setCart(p => p.map(i => i.id===item.id ? {...i,qty:Math.max(1,i.qty-1)} : i))} style={{ background:t.bg3, border:`1px solid ${t.border}`, cursor:"pointer", width:28, height:28, borderRadius:2, color:t.text, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                      <span style={{ fontSize:13, minWidth:16, textAlign:"center" }}>{item.qty}</span>
                      <button onClick={() => setCart(p => p.map(i => i.id===item.id ? {...i,qty:i.qty+1} : i))} style={{ background:t.bg3, border:`1px solid ${t.border}`, cursor:"pointer", width:28, height:28, borderRadius:2, color:t.text, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                      <button onClick={() => setCart(p => p.filter(i => i.id!==item.id))} style={{ background:"none", border:"none", cursor:"pointer", color:t.muted, fontSize:11, letterSpacing:".08em", marginLeft:"auto" }}>REMOVE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div style={{ padding:"20px 28px 28px", borderTop:`1px solid ${t.border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                  <span style={{ color:t.muted, fontSize:11, letterSpacing:".12em" }}>SUBTOTAL</span>
                  <span style={{ fontWeight:700, fontSize:20, fontFamily:"'Cormorant Garamond',serif" }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ color:t.muted, fontSize:11, marginBottom:20 }}>Shipping calculated at checkout</div>
                <button style={{ width:"100%", padding:"15px 0", background:t.accent, border:"none", cursor:"pointer", color:"#000", fontSize:12, letterSpacing:".18em", fontWeight:700, textTransform:"uppercase", borderRadius:2, marginBottom:10, transition:"opacity .2s" }} onMouseEnter={e=>e.target.style.opacity=".85"} onMouseLeave={e=>e.target.style.opacity="1"}>
                  Checkout — ${cartTotal.toFixed(2)}
                </button>
                <button onClick={() => setCartOpen(false)} style={{ width:"100%", padding:"13px 0", background:"none", border:`1px solid ${t.border}`, cursor:"pointer", color:t.text, fontSize:12, letterSpacing:".15em", borderRadius:2 }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* QUICK VIEW */}
      {quickViewProduct && (
        <>
          <div onClick={() => setQuickViewProduct(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.85)", zIndex:1003, backdropFilter:"blur(10px)" }}/>
          <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:1004, width:"min(800px,94vw)", background:t.bg, border:`1px solid ${t.border}`, borderRadius:3, display:"grid", gridTemplateColumns:"1fr 1fr", overflow:"hidden", animation:"fadeIn .3s ease", maxHeight:"90vh", overflowY:"auto" }}>
            <img src={quickViewProduct.image} style={{ width:"100%", height:"100%", minHeight:400, objectFit:"cover", display:"block" }} alt={quickViewProduct.name}/>
            <div style={{ padding:"48px 36px", display:"flex", flexDirection:"column", gap:18, position:"relative" }}>
              <button onClick={() => setQuickViewProduct(null)} style={{ position:"absolute", top:18, right:18, background:"none", border:"none", cursor:"pointer", color:t.muted, fontSize:20 }}>✕</button>
              <div style={{ display:"flex", gap:8 }}>
                {quickViewProduct.isNew && <span style={{ background:t.accent, color:"#000", fontSize:9, letterSpacing:".18em", fontWeight:700, padding:"4px 10px", borderRadius:2 }}>NEW ARRIVAL</span>}
                {quickViewProduct.isSale && <span style={{ background:"#c94444", color:"#fff", fontSize:9, letterSpacing:".18em", fontWeight:700, padding:"4px 10px", borderRadius:2 }}>SALE</span>}
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:300, lineHeight:1.15 }}>{quickViewProduct.name}</div>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <span style={{ color:t.accent, fontSize:26, fontWeight:600, fontFamily:"'Cormorant Garamond',serif" }}>${quickViewProduct.price}</span>
                {quickViewProduct.originalPrice > quickViewProduct.price && <span style={{ color:t.muted, fontSize:16, textDecoration:"line-through", fontFamily:"'Cormorant Garamond',serif" }}>${quickViewProduct.originalPrice}</span>}
              </div>
              <p style={{ color:t.muted, fontSize:13, lineHeight:1.85, borderTop:`1px solid ${t.border}`, paddingTop:18 }}>
                Crafted with premium materials and meticulous attention to detail, this piece embodies the OBSCURA philosophy — dark luxury that speaks without shouting.
              </p>
              <div>
                <div style={{ fontSize:10, letterSpacing:".18em", color:t.muted, marginBottom:10, fontWeight:600 }}>SELECT SIZE</div>
                <div style={{ display:"flex", gap:8 }}>
                  {["XS","S","M","L","XL","XXL"].map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={`sz-btn${selectedSize===s?" sz-active":""}`} style={{ padding:"8px 12px", border:`1px solid ${t.border}`, background:"none", color:t.text, cursor:"pointer", fontSize:11, letterSpacing:".1em", borderRadius:2 }}>{s}</button>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }} style={{ flex:1, padding:"15px 0", background:t.accent, border:"none", cursor:"pointer", color:"#000", fontSize:11, letterSpacing:".18em", fontWeight:700, textTransform:"uppercase", borderRadius:2 }}>
                  Add to Bag
                </button>
                <button onClick={() => { toggleWishlist(quickViewProduct); }} style={{ width:48, height:48, border:`1px solid ${t.border}`, background:"none", cursor:"pointer", color:t.text, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill={wishlist.find(w=>w.id===quickViewProduct.id)?"#e05555":"none"} stroke={wishlist.find(w=>w.id===quickViewProduct.id)?"#e05555":t.muted} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position:"relative", height:"100vh", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {/* Background layers */}
        <div style={{ position:"absolute", inset:0 }}>
          {editorialImages.map((img, i) => (
            <div key={i} style={{ position:"absolute", inset:0, backgroundImage:`url(${img})`, backgroundSize:"cover", backgroundPosition:"center", opacity: heroBg===i ? (darkMode?.22:.14) : 0, transition:"opacity 1.5s ease", transform:`scale(${1 + scrollY*0.0003})` }}/>
          ))}
          {/* Animated gradient */}
          <div style={{ position:"absolute", inset:0, background:darkMode?"linear-gradient(135deg,#060606 0%,#15100a 35%,#0a0a0a 65%,#060606 100%)":"linear-gradient(135deg,#f0ede8 0%,#e8dfd0 35%,#f0eee8 65%,#ece9e3 100%)", backgroundSize:"400% 400%", animation:"gradientPan 10s ease infinite" }}/>
          {/* Grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`, backgroundSize:"90px 90px", opacity:.08 }}/>
          {/* Scanline */}
          <div style={{ position:"absolute", left:0, right:0, height:3, background:`linear-gradient(90deg,transparent,${t.accent}60,transparent)`, animation:"scanline 5s linear infinite" }}/>
          {/* Bottom fade */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"40%", background:`linear-gradient(to bottom,transparent,${t.bg})` }}/>
        </div>

        {/* Floating Cards */}
        <div className="floatcard" style={{ position:"absolute", left:"4%", top:"22%", animation:"float0 7s ease-in-out infinite" }}>
          <div style={{ background:t.glass, backdropFilter:"blur(16px)", border:`1px solid ${t.glassBorder}`, borderRadius:3, padding:14, width:158, boxShadow:"0 20px 60px rgba(0,0,0,.3)" }}>
            <img src={products[0].image} style={{ width:"100%", height:120, objectFit:"cover", borderRadius:2 }} alt=""/>
            <div style={{ fontSize:10, letterSpacing:".1em", marginTop:10, fontWeight:500, lineHeight:1.4 }}>{products[0].name}</div>
            <div style={{ color:t.accent, fontSize:12, fontWeight:700, marginTop:5 }}>${products[0].price}</div>
          </div>
        </div>

        <div className="floatcard" style={{ position:"absolute", right:"4%", top:"28%", animation:"float1 9s ease-in-out infinite" }}>
          <div style={{ background:t.glass, backdropFilter:"blur(16px)", border:`1px solid ${t.glassBorder}`, borderRadius:3, padding:14, width:146, boxShadow:"0 20px 60px rgba(0,0,0,.3)" }}>
            <img src={products[3].image} style={{ width:"100%", height:110, objectFit:"cover", borderRadius:2 }} alt=""/>
            <div style={{ fontSize:10, letterSpacing:".1em", marginTop:10, fontWeight:500, lineHeight:1.4 }}>{products[3].name}</div>
            <div style={{ color:t.accent, fontSize:12, fontWeight:700, marginTop:5 }}>${products[3].price}</div>
          </div>
        </div>

        <div className="floatcard" style={{ position:"absolute", right:"6%", bottom:"22%", animation:"float2 6s ease-in-out infinite" }}>
          <div style={{ background:t.glass, backdropFilter:"blur(16px)", border:`1px solid ${t.glassBorder}`, borderRadius:3, padding:14, width:148, boxShadow:"0 20px 60px rgba(0,0,0,.3)" }}>
            <div style={{ color:t.accent, fontSize:13, marginBottom:6 }}>★★★★★</div>
            <p style={{ fontSize:11, color:t.muted, lineHeight:1.6, fontStyle:"italic" }}>"Absolute perfection — wearable art."</p>
            <div style={{ fontSize:11, fontWeight:600, marginTop:8, letterSpacing:".06em" }}>— Maya R.</div>
          </div>
        </div>

        {/* Hero Text */}
        <div style={{ position:"relative", textAlign:"center", padding:"0 24px", maxWidth:960 }}>
          <div style={{ fontSize:10, letterSpacing:".38em", color:t.accent, fontWeight:700, marginBottom:22, animation:"fadeUp .8s ease .2s both" }}>
            SS/26 — LIMITED EDITION COLLECTION
          </div>
          <h1 className="hero-title" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(52px,8.5vw,116px)", fontWeight:300, lineHeight:.88, letterSpacing:"-.02em", animation:"fadeUp .8s ease .4s both", marginBottom:30 }}>
            Redefine<br/>
            <em style={{ fontStyle:"italic", color:t.accent }}>Modern</em><br/>
            Fashion
          </h1>
          <p style={{ color:t.muted, fontSize:14, letterSpacing:".06em", lineHeight:1.9, maxWidth:480, margin:"0 auto 44px", animation:"fadeUp .8s ease .6s both" }}>
            Where darkness meets design. Curated luxury streetwear for those who move with intention and dress with purpose.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", animation:"fadeUp .8s ease .8s both" }}>
            <button onClick={() => setCartOpen(true)} style={{ padding:"15px 52px", background:t.accent, border:"none", cursor:"pointer", color:"#000", fontSize:11, letterSpacing:".22em", fontWeight:700, textTransform:"uppercase", borderRadius:2, transition:"all .3s" }} onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 10px 30px rgba(201,169,110,.35)"}} onMouseLeave={e=>{e.target.style.transform="none";e.target.style.boxShadow="none"}}>
              Shop Now
            </button>
            <button style={{ padding:"15px 52px", background:"transparent", border:`1px solid ${darkMode?"rgba(240,237,232,.35)":t.border}`, cursor:"pointer", color:t.text, fontSize:11, letterSpacing:".22em", fontWeight:500, textTransform:"uppercase", borderRadius:2, transition:"all .3s" }} onMouseEnter={e=>e.target.style.background=t.glass} onMouseLeave={e=>e.target.style.background="transparent"}>
              New Collection
            </button>
          </div>
        </div>

        {/* Scroll Cue */}
        <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, animation:"fadeIn 1s ease 1.6s both" }}>
          <span style={{ fontSize:9, letterSpacing:".28em", color:t.muted, textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:1, height:44, background:`linear-gradient(to bottom,${t.accent},transparent)`, animation:"float0 2s ease-in-out infinite" }}/>
        </div>

        {/* Corner brackets */}
        {[["top-left","top","left"],["top-right","top","right"],["bottom-left","bottom","left"],["bottom-right","bottom","right"]].map(([k,v,h]) => (
          <div key={k} style={{ position:"absolute", [v]:20, [h]:20, width:32, height:32, borderTop:v==="top"?`1px solid ${t.accent}60`:"none", borderBottom:v==="bottom"?`1px solid ${t.accent}60`:"none", borderLeft:h==="left"?`1px solid ${t.accent}60`:"none", borderRight:h==="right"?`1px solid ${t.accent}60`:"none" }}/>
        ))}
      </section>

      {/* ─── MARQUEE ─── */}
      <div style={{ overflow:"hidden", background:t.accent, padding:"11px 0" }}>
        <div style={{ display:"flex", animation:"marquee 22s linear infinite", whiteSpace:"nowrap" }}>
          {Array(6).fill(["FREE GLOBAL SHIPPING","NEW SS/26 DROPS","EXCLUSIVE MEMBERS CLUB","DARK LUXURY STREETWEAR","LIMITED EDITION","HANDCRAFTED IN LIMITED RUNS"]).flat().map((txt,i) => (
            <span key={i} style={{ fontSize:11, fontWeight:700, letterSpacing:".22em", color:"#000", padding:"0 36px" }}>{txt} ◆</span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section style={{ padding:"72px 40px", borderBottom:`1px solid ${t.border}` }}>
        <div className="statgrid" style={{ maxWidth:960, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:40, textAlign:"center" }}>
          {[["12K+","Happy Clients"],["340+","Unique Pieces"],["28","Countries Served"],["4.9★","Average Rating"]].map(([num,lbl],i) => (
            <div key={i} style={{ animation:`fadeUp .6s ease ${i*.1}s both` }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:300, color:t.accent, lineHeight:1 }}>{num}</div>
              <div style={{ fontSize:11, letterSpacing:".16em", color:t.muted, marginTop:8, textTransform:"uppercase" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      <section style={{ padding:"96px 40px" }}>
        <div style={{ maxWidth:1380, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:56, flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:14 }}>OUR UNIVERSE</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5vw,68px)", fontWeight:300, lineHeight:.92 }}>Featured<br/><em style={{ fontStyle:"italic" }}>Collections</em></h2>
            </div>
            <span style={{ fontSize:11, letterSpacing:".16em", color:t.muted, cursor:"pointer", borderBottom:`1px solid ${t.muted}`, paddingBottom:2 }}>VIEW ALL →</span>
          </div>
          <div className="colgrid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
            {collections.map((col,i) => (
              <div key={col.id} className="ccrd" style={{ position:"relative", overflow:"hidden", cursor:"pointer", aspectRatio:i===0||i===3?"1/1.45":"1/1.12" }}>
                <img src={col.image} className="cimg" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} alt={col.name}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.15) 55%,transparent 100%)" }}/>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"22px 20px" }}>
                  <div style={{ fontSize:9, letterSpacing:".24em", color:t.accent, marginBottom:5, fontWeight:700 }}>{col.tag}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, color:"#fff", lineHeight:1.1 }}>{col.name}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginTop:5, letterSpacing:".06em" }}>{col.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CINEMATIC SHOWCASE ─── */}
      <section style={{ position:"relative", height:"75vh", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80)`, backgroundSize:"cover", backgroundPosition:"center", transform:`scale(${1+scrollY*0.0002})`, filter:darkMode?"brightness(.28) contrast(1.2)":"brightness(.4) contrast(1.1)", transition:"transform .1s" }}/>
        <div style={{ position:"absolute", inset:0, background:darkMode?"rgba(8,8,8,.55)":"rgba(0,0,0,.5)" }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.015) 2px,rgba(255,255,255,.015) 4px)` }}/>
        <div style={{ position:"relative", textAlign:"center", color:"#fff", padding:"0 24px" }}>
          <div style={{ fontSize:10, letterSpacing:".42em", color:t.accent, fontWeight:700, marginBottom:20 }}>EDITORIAL SS/26</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6.5vw,96px)", fontWeight:300, lineHeight:.9, marginBottom:44 }}>Dressed in<br/><em style={{ fontStyle:"italic" }}>Darkness</em></h2>
          <button style={{ padding:"15px 60px", background:"transparent", border:"1px solid rgba(255,255,255,.55)", cursor:"pointer", color:"#fff", fontSize:11, letterSpacing:".22em", fontWeight:600, textTransform:"uppercase", borderRadius:2, transition:"all .3s" }} onMouseEnter={e=>{e.target.style.background="rgba(255,255,255,.1)"}} onMouseLeave={e=>{e.target.style.background="transparent"}}>
            View Editorial
          </button>
        </div>
        {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i) => (
          <div key={i} style={{ position:"absolute", [v]:24, [h]:24, width:38, height:38, borderTop:v==="top"?`1px solid ${t.accent}70`:"none", borderBottom:v==="bottom"?`1px solid ${t.accent}70`:"none", borderLeft:h==="left"?`1px solid ${t.accent}70`:"none", borderRight:h==="right"?`1px solid ${t.accent}70`:"none" }}/>
        ))}
      </section>

      {/* ─── PRODUCTS ─── */}
      <section style={{ padding:"96px 40px", background:t.bg2 }}>
        <div style={{ maxWidth:1380, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:14 }}>SHOP THE COLLECTION</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:300 }}>Premium <em style={{ fontStyle:"italic" }}>Pieces</em></h2>
          </div>
          {/* Filters */}
          <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:48, flexWrap:"wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`catbtn${activeCategory===cat?" catbtn-active":""}`} style={{ padding:"9px 22px", background:"transparent", border:`1px solid ${t.border}`, cursor:"pointer", color:t.text, fontSize:11, letterSpacing:".14em", borderRadius:2, textTransform:"uppercase" }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="prodgrid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
            {filteredProducts.map((p,i) => (
              <div key={p.id} className="pcrd" style={{ cursor:"pointer", animation:`fadeUp .5s ease ${i*.07}s both` }} onMouseEnter={() => setHoveredProduct(p.id)} onMouseLeave={() => setHoveredProduct(null)}>
                <div style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4", background:t.bg3, marginBottom:14, borderRadius:1 }}>
                  <img src={p.image} className="pimg" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} alt={p.name}/>
                  {/* Badges */}
                  <div style={{ position:"absolute", top:12, left:12, display:"flex", flexDirection:"column", gap:6, zIndex:2 }}>
                    {p.isNew && <span style={{ background:t.accent, color:"#000", fontSize:9, letterSpacing:".18em", fontWeight:700, padding:"4px 9px", borderRadius:1 }}>NEW</span>}
                    {p.isSale && <span style={{ background:"#c94444", color:"#fff", fontSize:9, letterSpacing:".18em", fontWeight:700, padding:"4px 9px", borderRadius:1 }}>SALE</span>}
                  </div>
                  {/* Wish */}
                  <button onClick={() => toggleWishlist(p)} style={{ position:"absolute", top:10, right:10, background:t.glass, backdropFilter:"blur(8px)", border:`1px solid ${t.glassBorder}`, borderRadius:"50%", width:36, height:36, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2, transition:"transform .2s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.15)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill={wishlist.find(w=>w.id===p.id)?"#e05555":"none"} stroke={wishlist.find(w=>w.id===p.id)?"#e05555":"rgba(255,255,255,.8)"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                  {/* Overlay */}
                  <div className="povl" style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.44)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:14, gap:8 }}>
                    <button className="pbtns" onClick={() => addToCart(p)} style={{ width:"100%", padding:"12px 0", background:t.accent, border:"none", cursor:"pointer", color:"#000", fontSize:11, letterSpacing:".18em", fontWeight:700, textTransform:"uppercase", borderRadius:2 }}>
                      Add to Bag
                    </button>
                    <button className="pbtns" onClick={() => setQuickViewProduct(p)} style={{ width:"100%", padding:"10px 0", background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.25)", cursor:"pointer", color:"#fff", fontSize:11, letterSpacing:".14em", fontWeight:500, textTransform:"uppercase", borderRadius:2, backdropFilter:"blur(4px)" }}>
                      Quick View
                    </button>
                  </div>
                </div>
                <div style={{ fontSize:9, letterSpacing:".18em", color:t.muted, marginBottom:4, textTransform:"uppercase" }}>{p.category}</div>
                <div style={{ fontSize:13, fontWeight:500, letterSpacing:".03em", marginBottom:8, lineHeight:1.35 }}>{p.name}</div>
                <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                  <span style={{ color:t.accent, fontWeight:700, fontSize:15, fontFamily:"'Cormorant Garamond',serif" }}>${p.price}</span>
                  {p.originalPrice > p.price && <span style={{ color:t.muted, fontSize:12, textDecoration:"line-through", fontFamily:"'Cormorant Garamond',serif" }}>${p.originalPrice}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:56 }}>
            <button style={{ padding:"15px 64px", background:"transparent", border:`1px solid ${t.border}`, cursor:"pointer", color:t.text, fontSize:11, letterSpacing:".2em", textTransform:"uppercase", borderRadius:2, transition:"all .25s" }} onMouseEnter={e=>{e.target.style.borderColor=t.accent;e.target.style.color=t.accent}} onMouseLeave={e=>{e.target.style.borderColor=t.border;e.target.style.color=t.text}}>
              Load More Pieces
            </button>
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS SLIDER ─── */}
      <section style={{ padding:"96px 0", overflow:"hidden" }}>
        <div style={{ padding:"0 40px", maxWidth:1380, margin:"0 auto 44px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:14 }}>JUST DROPPED</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4.5vw,60px)", fontWeight:300 }}>New <em style={{ fontStyle:"italic" }}>Arrivals</em></h2>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => setCurrentSlide(p => Math.max(0,p-1))} style={{ width:48, height:48, border:`1px solid ${t.border}`, background:"none", cursor:"pointer", color:t.text, borderRadius:2, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .25s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=t.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>←</button>
            <button onClick={() => setCurrentSlide(p => Math.min(products.length-1,p+1))} style={{ width:48, height:48, border:"none", background:t.accent, cursor:"pointer", color:"#000", borderRadius:2, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>→</button>
          </div>
        </div>
        <div style={{ paddingLeft:40, display:"flex", gap:16, overflowX:"hidden" }}>
          {[...products,...products].slice(currentSlide,currentSlide+5).map((p,i) => (
            <div key={`${p.id}-${i}`} onClick={() => setQuickViewProduct(p)} style={{ minWidth:268, flex:"0 0 268px", cursor:"pointer", animation:`fadeUp .4s ease ${i*.07}s both` }}>
              <div style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4", background:t.bg3, marginBottom:12, borderRadius:1 }}>
                <img src={p.image} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .6s" }} alt={p.name} onMouseEnter={e=>e.target.style.transform="scale(1.07)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                {p.isNew && <span style={{ position:"absolute", top:12, left:12, background:t.accent, color:"#000", fontSize:9, letterSpacing:".18em", fontWeight:700, padding:"4px 9px" }}>NEW</span>}
              </div>
              <div style={{ fontSize:12, fontWeight:500, marginBottom:5, lineHeight:1.35 }}>{p.name}</div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ color:t.accent, fontWeight:700, fontFamily:"'Cormorant Garamond',serif", fontSize:15 }}>${p.price}</span>
                {p.originalPrice>p.price && <span style={{ color:t.muted, fontSize:12, textDecoration:"line-through", fontFamily:"'Cormorant Garamond',serif" }}>${p.originalPrice}</span>}
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:32, padding:"0 40px" }}>
          {products.map((_,i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{ width:i===currentSlide?24:7, height:7, background:i===currentSlide?t.accent:t.border, border:"none", borderRadius:4, cursor:"pointer", transition:"all .3s" }}/>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="aboutgrid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:580 }}>
        <div style={{ position:"relative", overflow:"hidden", minHeight:400 }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80)`, backgroundSize:"cover", backgroundPosition:"center", filter:darkMode?"brightness(.35) contrast(1.15)":"brightness(.45) contrast(1.1)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,transparent 60%,rgba(0,0,0,.6))" }}/>
          <div style={{ position:"absolute", bottom:32, left:32, color:"#fff" }}>
            <div style={{ fontSize:10, letterSpacing:".22em", color:t.accent, marginBottom:6 }}>EST. 2021</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:300 }}>Paris × New York × Lagos</div>
          </div>
        </div>
        <div style={{ padding:"72px 56px", display:"flex", flexDirection:"column", justifyContent:"center", background:t.bg2 }}>
          <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:20 }}>THE OBSCURA STORY</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,3.5vw,52px)", fontWeight:300, lineHeight:1.1, marginBottom:28 }}>
            Born in Darkness,<br/><em style={{ fontStyle:"italic" }}>Made for the Bold</em>
          </h2>
          <p style={{ color:t.muted, lineHeight:1.95, fontSize:14, marginBottom:20 }}>
            OBSCURA was founded with a singular vision — to create clothing that speaks the language of modern luxury without sacrificing edge. Born at the intersection of Parisian minimalism and New York street culture.
          </p>
          <p style={{ color:t.muted, lineHeight:1.95, fontSize:14, marginBottom:40 }}>
            Each collection is crafted in limited runs using ethically-sourced materials. We believe fashion should be intentional, sustainable, and unapologetically bold.
          </p>
          <button style={{ alignSelf:"flex-start", padding:"14px 44px", background:"transparent", border:`1px solid ${t.border}`, cursor:"pointer", color:t.text, fontSize:11, letterSpacing:".2em", fontWeight:600, textTransform:"uppercase", borderRadius:2, transition:"all .25s" }} onMouseEnter={e=>{e.target.style.borderColor=t.accent;e.target.style.color=t.accent}} onMouseLeave={e=>{e.target.style.borderColor=t.border;e.target.style.color=t.text}}>
            Our Story →
          </button>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding:"96px 40px", textAlign:"center", background:t.bg2 }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:14 }}>COMMUNITY VOICES</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,56px)", fontWeight:300, marginBottom:56 }}>What They <em style={{ fontStyle:"italic" }}>Say</em></h2>
          <div key={currentTestimonial} style={{ animation:"fadeIn .6s ease" }}>
            <div style={{ color:t.accent, fontSize:22, letterSpacing:4, marginBottom:24 }}>{"★".repeat(testimonials[currentTestimonial].rating)}</div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(20px,3vw,32px)", fontWeight:300, lineHeight:1.55, fontStyle:"italic", marginBottom:36 }}>
              "{testimonials[currentTestimonial].text}"
            </p>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div style={{ width:52, height:52, background:`linear-gradient(135deg,${t.accent},${t.accentDark})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#000", fontSize:14, fontWeight:700, marginBottom:8 }}>{testimonials[currentTestimonial].avatar}</div>
              <div style={{ fontWeight:700, fontSize:14, letterSpacing:".1em" }}>{testimonials[currentTestimonial].name}</div>
              <div style={{ color:t.muted, fontSize:11, letterSpacing:".14em", textTransform:"uppercase" }}>{testimonials[currentTestimonial].role}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:44 }}>
            {testimonials.map((_,i) => (
              <button key={i} onClick={() => setCurrentTestimonial(i)} style={{ width:i===currentTestimonial?28:8, height:8, background:i===currentTestimonial?t.accent:t.border, border:"none", borderRadius:4, cursor:"pointer", transition:"all .35s", animation:i===currentTestimonial?"dotPulse 2s ease-in-out infinite":undefined }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECOND EDITORIAL ─── */}
      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:480 }}>
        {[{ img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", tag:"WOMENSWEAR", title:"Grace & Edge" },
          { img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", tag:"MENSWEAR", title:"Strength & Silence" }
        ].map((item,i) => (
          <div key={i} style={{ position:"relative", overflow:"hidden", cursor:"pointer", minHeight:400 }} className="ccrd">
            <img src={item.img} className="cimg" style={{ width:"100%", height:"100%", objectFit:"cover", filter:darkMode?"brightness(.4)":"brightness(.45)" }} alt=""/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 60%)" }}/>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:36, color:"#fff" }}>
              <div style={{ fontSize:9, letterSpacing:".28em", color:t.accent, marginBottom:8, fontWeight:700 }}>{item.tag}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:300 }}>{item.title}</div>
              <div style={{ fontSize:11, letterSpacing:".14em", marginTop:12, color:"rgba(255,255,255,.6)", paddingBottom:2, borderBottom:"1px solid rgba(255,255,255,.2)", display:"inline-block" }}>EXPLORE →</div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section style={{ padding:"96px 40px", textAlign:"center" }}>
        <div style={{ maxWidth:580, margin:"0 auto" }}>
          <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:14 }}>STAY IN THE LOOP</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:300, marginBottom:16 }}>Join Our Fashion<br/><em style={{ fontStyle:"italic" }}>Community</em></h2>
          <p style={{ color:t.muted, fontSize:14, lineHeight:1.85, marginBottom:40 }}>Exclusive drops, editorial content, and first access to limited editions — delivered to your inbox before anyone else.</p>
          {emailSubmitted ? (
            <div style={{ padding:"24px 40px", background:t.glass, border:`1px solid ${t.glassBorder}`, borderRadius:2, color:t.accent, fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300 }}>
              ✓ Welcome to OBSCURA. Check your inbox.
            </div>
          ) : (
            <div style={{ display:"flex", gap:0, maxWidth:460, margin:"0 auto" }}>
              <input type="email" value={emailValue} onChange={e=>setEmailValue(e.target.value)} placeholder="your@email.com" style={{ flex:1, padding:"15px 18px", background:t.bg3, border:`1px solid ${t.border}`, borderRight:"none", color:t.text, fontSize:13, fontFamily:"'Josefin Sans',sans-serif", letterSpacing:".04em", borderRadius:"2px 0 0 2px" }}/>
              <button onClick={() => { if(emailValue) { setEmailSubmitted(true); showNotification("Welcome to OBSCURA!"); }}} style={{ padding:"15px 28px", background:t.accent, border:"none", cursor:"pointer", color:"#000", fontSize:11, letterSpacing:".18em", fontWeight:700, textTransform:"uppercase", borderRadius:"0 2px 2px 0", whiteSpace:"nowrap", transition:"opacity .2s" }} onMouseEnter={e=>e.target.style.opacity=".85"} onMouseLeave={e=>e.target.style.opacity="1"}>
                Join Now
              </button>
            </div>
          )}
          <p style={{ color:t.muted, fontSize:11, letterSpacing:".06em", marginTop:16 }}>No spam. Unsubscribe anytime. 10% off your first order.</p>
        </div>
      </section>

      {/* ─── SOCIAL + CONTACT ─── */}
      <section style={{ padding:"72px 40px", borderTop:`1px solid ${t.border}`, borderBottom:`1px solid ${t.border}` }}>
        <div className="socgrid" style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:16 }}>FOLLOW THE JOURNEY</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3vw,40px)", fontWeight:300, marginBottom:32 }}>@obscura_official</h3>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[{n:"Instagram",i:"📸",h:"@obscura_official"},{n:"TikTok",i:"🎵",h:"@obscura"},{n:"Twitter / X",i:"𝕏",h:"@obscura_hq"},{n:"Facebook",i:"f",h:"OBSCURA Fashion"},{n:"WhatsApp",i:"💬",h:"+1 555 OBSCURA"}].map(s => (
                <div key={s.n} className="socicon" style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 16px", background:t.glass, border:`1px solid ${t.glassBorder}`, borderRadius:2, cursor:"pointer" }}>
                  <span style={{ fontSize:18 }}>{s.i}</span>
                  <div>
                    <div style={{ fontSize:10, letterSpacing:".1em", fontWeight:700 }}>{s.n}</div>
                    <div style={{ fontSize:10, color:t.muted }}>{s.h}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:10, letterSpacing:".34em", color:t.accent, fontWeight:700, marginBottom:16 }}>GET IN TOUCH</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3vw,40px)", fontWeight:300, marginBottom:28 }}>Contact Us</h3>
            {[{l:"Email",v:"hello@obscura.fashion"},{l:"WhatsApp",v:"+1 (555) OBSCURA"},{l:"Studio",v:"Soho, New York City"},{l:"Hours",v:"Mon–Sat, 9am–7pm EST"}].map(info => (
              <div key={info.l} style={{ display:"flex", gap:24, padding:"14px 0", borderBottom:`1px solid ${t.border}` }}>
                <span style={{ fontSize:10, letterSpacing:".15em", color:t.muted, width:72, flexShrink:0, paddingTop:1, textTransform:"uppercase" }}>{info.l}</span>
                <span style={{ fontSize:13 }}>{info.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding:"60px 40px 28px", background:darkMode?"#050505":"#e0deda" }}>
        <div style={{ maxWidth:1380, margin:"0 auto" }}>
          <div className="footgrid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:44, marginBottom:56 }}>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:300, letterSpacing:".24em", marginBottom:16 }}>OBSCURA</div>
              <p style={{ color:t.muted, fontSize:13, lineHeight:1.9, maxWidth:272, marginBottom:24 }}>Where darkness meets design. Premium streetwear and luxury fashion for the modern individual.</p>
              <div style={{ display:"flex", gap:10 }}>
                {["📸","🎵","𝕏","f"].map((icon,i) => (
                  <div key={i} className="socicon" style={{ width:38, height:38, border:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", borderRadius:2, fontSize:14 }}>{icon}</div>
                ))}
              </div>
            </div>
            {[{title:"Shop",links:["New Arrivals","Hoodies","Jackets","Sneakers","Accessories","Luxury Sets","Sale"]},
              {title:"Company",links:["Our Story","Careers","Press","Sustainability","Wholesale","Affiliates"]},
              {title:"Support",links:["FAQs","Shipping Info","Returns","Size Guide","Contact Us","Gift Cards"]}
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:10, letterSpacing:".24em", fontWeight:700, marginBottom:20, color:t.accent, textTransform:"uppercase" }}>{col.title}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {col.links.map(l => (
                    <span key={l} className="footlnk" style={{ fontSize:13, color:t.muted, cursor:"pointer", letterSpacing:".03em" }}>{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <span style={{ fontSize:11, color:t.muted, letterSpacing:".08em" }}>© 2026 OBSCURA FASHION. All rights reserved.</span>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
              {["Privacy Policy","Terms of Service","Cookie Settings","Accessibility"].map(l => (
                <span key={l} className="footlnk" style={{ fontSize:11, color:t.muted, cursor:"pointer", letterSpacing:".06em" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}