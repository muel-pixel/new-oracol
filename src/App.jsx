import React, { useState, useEffect, useRef } from "react";
/* ─── Fonts ─── */
const FontLink = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,600&family=Tenor+Sans&family=DM+Mono:wght@300;400;500&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);
  return null;
};

/* ─── Images ─── */
const IMGS = {
  front_shirt: "/images/front_shirt.jpg",
  skull_black: "/images/skull_black.jpg",
  skull_cream: "/images/skull_cream.jpg",
  upandan: "/images/upandan.jpg",
  trouser: "/images/trouser.jpg",
  maior_shirt: "/images/maior_shirt.jpg",
  vest: "/images/vest.jpg",
};

/* ─── Tokens ─── */
const T = {
  ink: "#0c0c0a", parchment: "#f4efe5", bone: "#e2d9c8",
  gold: "#b8975a", goldLight: "#d4b47a", goldDim: "rgba(184,151,90,0.15)",
  ash: "#7a7568", mist: "#b8b0a0", white: "#faf8f4",
};

/* ─── Global Styles ─── */
const GlobalStyle = () => (
  <style>{`
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{background:${T.ink};color:${T.parchment};font-family:'Tenor Sans',sans-serif;overflow-x:hidden;cursor:none}
    *{cursor:none!important}
    ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:#0c0c0a}::-webkit-scrollbar-thumb{background:#b8975a}
    @keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes scrollPulse{0%,100%{opacity:.3}50%{opacity:.8}}
    @keyframes drawerIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
    @keyframes overlayIn{from{opacity:0}to{opacity:1}}
    @keyframes grain{0%,100%{transform:translate(0,0)}25%{transform:translate(-2%,-3%)}50%{transform:translate(3%,2%)}75%{transform:translate(-1%,3%)}}
  `}</style>
);

/* ─── Grain ─── */
const Grain = () => (
  <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9990,
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
    backgroundRepeat:"repeat",backgroundSize:"200px 200px",animation:"grain 8s steps(10) infinite",opacity:0.3,mixBlendMode:"overlay"}}/>
);

/* ─── Cursor ─── */
const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({x:0,y:0}), rp = useRef({x:0,y:0});
  const hov = useRef(false);
  useEffect(() => {
    const mv = e => { pos.current = {x:e.clientX,y:e.clientY}; };
    document.addEventListener("mousemove", mv);
    const addHov = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach(el => {
        el.addEventListener("mouseenter", () => hov.current=true);
        el.addEventListener("mouseleave", () => hov.current=false);
      });
    };
    addHov();
    let raf;
    const anim = () => {
      rp.current.x += (pos.current.x - rp.current.x) * 0.13;
      rp.current.y += (pos.current.y - rp.current.y) * 0.13;
      if(dot.current){ dot.current.style.left=pos.current.x-4+"px"; dot.current.style.top=pos.current.y-4+"px"; }
      if(ring.current){
        const s = hov.current ? 52 : 34;
        ring.current.style.left=rp.current.x+"px"; ring.current.style.top=rp.current.y+"px";
        ring.current.style.width=s+"px"; ring.current.style.height=s+"px";
      }
      raf = requestAnimationFrame(anim);
    };
    anim();
    return () => { document.removeEventListener("mousemove",mv); cancelAnimationFrame(raf); };
  },[]);
  const base = {position:"fixed",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transition:"width .2s,height .2s"};
  return(<>
    <div ref={dot} style={{...base,width:8,height:8,background:"#b8975a",mixBlendMode:"difference"}}/>
    <div ref={ring} style={{...base,border:"1px solid #b8975a",opacity:.55,transform:"translate(-50%,-50%)"}}/>
  </>);
};

/* ─── Data ─── */
const PRODUCTS = [
  { id:1, name:"Skull Rebellion Tee", collection:"ORACOL", price:42000, tag:"Graphic Tee", img:IMGS.skull_black,   bg:"#0c0c0a", light:false, numeral:"I",   desc:"'Originality is the Rebellion of the Wise' — oversized black tee, skull motif back print." },
  { id:2, name:"Instinct Lips Tee",   collection:"ORACOL", price:42000, tag:"Graphic Tee", img:IMGS.front_shirt,   bg:"#0a0a0f", light:false, numeral:"II",  desc:"'Before Influence, There Was Instinct' — bold UV lip graphic on premium oversized black." },
  { id:3, name:"Originality Tee — Cream", collection:"ORACOL", price:44000, tag:"Graphic Tee", img:IMGS.skull_cream, bg:"#f2ede0", light:true, numeral:"III", desc:"'Originality Can't Be Replicated' — 3D skull print on heavyweight cream cotton." },
  { id:4, name:"Castle Shirt",        collection:"SAMIOR",  price:78000, tag:"Shirt",       img:IMGS.maior_shirt,  bg:"#2a2230", light:false, numeral:"IV",  desc:"Pinstripe body meets old-master castle artwork panels — skull button placket detail." },
  { id:5, name:"Wide Leg Trouser",    collection:"SAMIOR",  price:68000, tag:"Bottoms",     img:IMGS.trouser,      bg:"#111009", light:false, numeral:"V",   desc:"Black wide-leg silhouette with gold waistband, contrast stitch hem patch." },
  { id:6, name:"Skull Vest",          collection:"ORACOL",  price:28000, tag:"Vest",        img:IMGS.vest,         bg:"#111109", light:false, numeral:"VI",  desc:"Black tank with vertical skull spine motif — ORACOL branded back hem." },
];

const GALLERY = [
  { id:1, img:IMGS.skull_black,  label:"The Rebellion Tee",     sub:"ORACOL — The Originals",  span:"row2" },
  { id:2, img:IMGS.maior_shirt,  label:"Castle Shirt",           sub:"SAMIOR — SS'25",          span:"" },
  { id:3, img:IMGS.front_shirt,  label:"Instinct Lips Tee",      sub:"ORACOL — The Originals",  span:"" },
  { id:4, img:IMGS.skull_cream,  label:"Originality Tee Cream",  sub:"ORACOL — The Originals",  span:"" },
  { id:5, img:IMGS.upandan,      label:"Ensemble — Full Look",   sub:"SAMIOR × ORACOL",         span:"row2" },
  { id:6, img:IMGS.trouser,      label:"Wide Leg Trouser",       sub:"SAMIOR Collection",        span:"col2" },
];

const fmt = n => `₦ ${n.toLocaleString()}`;

/* ─── Reveal ─── */
const useReveal = (t=0.12) => {
  const ref = useRef(null);
  const [vis,setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVis(true);obs.disconnect();} },{threshold:t});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  },[t]);
  return [ref,vis];
};
const Reveal = ({children,delay=0,style={}}) => {
  const [ref,vis] = useReveal();
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(32px)",transition:`opacity .9s ease ${delay}s,transform .9s ease ${delay}s`,...style}}>{children}</div>;
};

/* ─── Label ─── */
const Label = ({children,center=false}) => (
  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.38em",textTransform:"uppercase",color:T.gold,display:"flex",alignItems:"center",gap:14,justifyContent:center?"center":"flex-start",marginBottom:16}}>
    <span style={{display:"block",width:26,height:1,background:T.gold,opacity:.7,flexShrink:0}}/>
    {children}
    {center && <span style={{display:"block",width:26,height:1,background:T.gold,opacity:.7,flexShrink:0}}/>}
  </div>
);

/* ─── Button ─── */
const Btn = ({children,ghost=false,small=false,onClick,href,style={}}) => {
  const [h,setH] = useState(false);
  const base = {fontFamily:"'DM Mono',monospace",fontSize:small?9:10,letterSpacing:"0.25em",textTransform:"uppercase",padding:small?"10px 22px":"14px 36px",border:"1px solid",display:"inline-block",textDecoration:"none",transition:"all .3s ease",transform:h?"translateY(-2px)":"translateY(0)"};
  const s = ghost
    ? {...base,color:h?T.parchment:T.mist,borderColor:h?"rgba(244,239,229,.7)":"rgba(200,192,176,.28)",background:"transparent"}
    : {...base,color:T.ink,background:h?T.goldLight:T.gold,borderColor:h?T.goldLight:T.gold};
  const p = {style:{...s,...style},onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false),onClick};
  return href ? <a href={href} {...p}>{children}</a> : <button {...p}>{children}</button>;
};

/* ─── Ticker ─── */
const Ticker = () => {
  const str = ["SAMIOR","ORACOL","The Originals","Luxury Fashion","Lagos · London","SS '25 Collection"].map(i=>`${i}  ✦  `).join("").repeat(6);
  return(
    <div style={{overflow:"hidden",borderTop:"1px solid rgba(184,151,90,.12)",borderBottom:"1px solid rgba(184,151,90,.12)",padding:"13px 0",background:"#0f0e0c"}}>
      <div style={{display:"flex",animation:"marquee 30s linear infinite",whiteSpace:"nowrap",width:"fit-content"}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:T.ash}}>{str}</span>
      </div>
    </div>
  );
};

/* ─── Cart Drawer ─── */
const CartDrawer = ({open,onClose,items,onRemove}) => {
  const total = items.reduce((s,i)=>s+i.price*i.qty,0);
  return(<>
    {open && <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",backdropFilter:"blur(6px)",zIndex:1100,animation:"overlayIn .3s ease"}}/>}
    <div style={{position:"fixed",top:0,right:0,bottom:0,width:380,background:"#111009",zIndex:1101,borderLeft:"1px solid rgba(184,151,90,.12)",display:"flex",flexDirection:"column",transform:open?"translateX(0)":"translateX(100%)",transition:"transform .42s cubic-bezier(.25,.46,.45,.94)"}}>
      <div style={{padding:"32px 28px 24px",borderBottom:"1px solid rgba(184,151,90,.1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,letterSpacing:"0.08em"}}>Your Cart</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.25em",color:T.gold,marginTop:4}}>{items.length} ITEM{items.length!==1?"S":""}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"1px solid rgba(184,151,90,.15)",color:T.mist,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"24px 28px"}}>
        {items.length===0
          ? <div style={{textAlign:"center",paddingTop:60}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontStyle:"italic",color:T.ash,marginBottom:8}}>Your cart is empty</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.2em",color:T.ash,opacity:.5}}>START SHOPPING</div>
            </div>
          : items.map(item=>(
              <div key={item.id} style={{display:"flex",gap:16,marginBottom:24,paddingBottom:24,borderBottom:"1px solid rgba(184,151,90,.08)"}}>
                <div style={{width:72,height:88,overflow:"hidden",flexShrink:0,background:item.bg}}>
                  <img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:"0.2em",color:T.gold,marginBottom:4}}>{item.collection}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,marginBottom:4}}>{item.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.ash}}>{fmt(item.price)} × {item.qty}</div>
                </div>
                <button onClick={()=>onRemove(item.id)} style={{background:"none",border:"none",color:T.ash,fontSize:12,alignSelf:"flex-start",padding:4}}>✕</button>
              </div>
            ))
        }
      </div>
      {items.length>0 && (
        <div style={{padding:"24px 28px 32px",borderTop:"1px solid rgba(184,151,90,.08)"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.15em",color:T.mist}}>TOTAL</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:400}}>{fmt(total)}</span>
          </div>
          <Btn style={{width:"100%",textAlign:"center"}}>Checkout</Btn>
        </div>
      )}
    </div>
  </>);
};

/* ─── Nav ─── */
const Nav = ({cartCount,onCartOpen}) => {
  const [scrolled,setScrolled] = useState(false);
  const [hLink,setHL] = useState(null);
  useEffect(()=>{ const h=()=>setScrolled(window.scrollY>60); window.addEventListener("scroll",h); return()=>window.removeEventListener("scroll",h); },[]);
  const links=["Shop","Gallery","About","Contact"];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:900,display:"flex",alignItems:"center",justifyContent:"space-between",padding:scrolled?"16px 48px":"28px 48px",background:scrolled?"rgba(12,12,10,.94)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(184,151,90,.1)":"none",transition:"all .4s ease"}}>
      <a href="#hero" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,letterSpacing:"0.28em",color:T.parchment,textDecoration:"none"}}>SAMIOR</a>
      <ul style={{display:"flex",gap:36,listStyle:"none",position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
        {links.map(l=>(
          <li key={l}><a href={`#${l.toLowerCase()}`} onMouseEnter={()=>setHL(l)} onMouseLeave={()=>setHL(null)}
            style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:hLink===l?T.parchment:T.mist,textDecoration:"none",position:"relative",transition:"color .3s"}}>
            {l}
            <span style={{position:"absolute",bottom:-4,left:0,width:hLink===l?"100%":"0%",height:1,background:T.gold,transition:"width .3s",display:"block"}}/>
          </a></li>
        ))}
      </ul>
      <div style={{display:"flex",alignItems:"center",gap:20}}>
        <div style={{display:"flex",gap:18}}>
          {["Instagram","TikTok","WhatsApp"].map(s=>(
            <a key={s} href="#" style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:T.ash,textDecoration:"none"}}
              onMouseEnter={e=>e.target.style.color=T.gold} onMouseLeave={e=>e.target.style.color=T.ash}>{s}</a>
          ))}
        </div>
        <div style={{width:1,height:14,background:"rgba(184,151,90,.15)"}}/>
        <button onClick={onCartOpen} style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:T.parchment,background:"none",border:"1px solid rgba(184,151,90,.3)",padding:"6px 16px",transition:"all .3s"}}
          onMouseEnter={e=>{e.currentTarget.style.background=T.gold;e.currentTarget.style.color=T.ink;e.currentTarget.style.borderColor=T.gold;}}
          onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=T.parchment;e.currentTarget.style.borderColor="rgba(184,151,90,.3)";}}>
          Cart{cartCount>0&&<span style={{background:T.gold,color:T.ink,borderRadius:"50%",width:16,height:16,fontSize:8,display:"inline-flex",alignItems:"center",justifyContent:"center",marginLeft:6}}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

/* ─── Hero ─── */
const Hero = () => {
  const [ld,setLd]=useState(false);
  useEffect(()=>{ setTimeout(()=>setLd(true),100); },[]);
  return(
    <section id="hero" style={{position:"relative",height:"100vh",minHeight:680,display:"flex",alignItems:"flex-end",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(12,12,10,.18) 0%,rgba(12,12,10,0) 35%,rgba(12,12,10,.9) 100%), linear-gradient(108deg,#1a1610 0%,#2a2318 32%,#1c1a14 62%,#0e0d0b 100%)"}}/>
      {/* Editorial panels */}
      <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-10%",left:"53%",width:"60%",height:"120%",background:"linear-gradient(160deg,#2c2416,#1e1b12,#151310)",clipPath:"polygon(10% 0%,100% 0%,100% 100%,0% 100%)"}}/>
        <div style={{position:"absolute",top:"10%",left:"62%",width:"26%",height:"68%",border:"1px solid rgba(184,151,90,.12)"}}/>
        <div style={{position:"absolute",top:"14%",left:"64.5%",width:"21%",height:"62%",border:"1px solid rgba(184,151,90,.05)"}}/>
        {[0,1,2,3].map(i=><div key={i} style={{position:"absolute",top:`${22+i*14}%`,left:"62%",width:"26%",height:1,background:"rgba(184,151,90,.03)"}}/>)}
        {/* Shirt image in the panel */}
        <div style={{position:"absolute",top:"10%",left:"63%",width:"24%",height:"68%",overflow:"hidden",opacity:.18,mixBlendMode:"luminosity"}}>
          <img src={IMGS.maior_shirt} alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
        </div>
      </div>
      <div style={{position:"absolute",right:"5.5%",top:"50%",transform:"translateY(-50%) rotate(90deg)",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.32em",color:"rgba(184,151,90,.3)",whiteSpace:"nowrap",textTransform:"uppercase"}}>SS — 2025 Collection</div>
      <div style={{position:"absolute",left:"3.5%",top:"50%",transform:"translateY(-50%) rotate(-90deg)",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.32em",color:"rgba(200,192,176,.14)",whiteSpace:"nowrap",textTransform:"uppercase"}}>Lagos · London · Lagos</div>
      <div style={{position:"absolute",left:48,top:"50%",transform:"translateY(-50%)",width:1,height:180,background:"linear-gradient(to bottom,transparent,rgba(184,151,90,.35),transparent)"}}/>
      <div style={{position:"relative",zIndex:2,padding:"0 10% 10vh",maxWidth:680,opacity:ld?1:0,transform:ld?"translateY(0)":"translateY(40px)",transition:"opacity 1.4s ease .3s,transform 1.4s ease .3s"}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.36em",textTransform:"uppercase",color:T.gold,marginBottom:18,display:"flex",alignItems:"center",gap:16}}>
          <span style={{display:"block",width:36,height:1,background:T.gold,opacity:.6}}/>Luxury Fashion House
        </div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(72px,10vw,130px)",fontWeight:300,lineHeight:.9,letterSpacing:"0.06em",color:T.parchment,marginBottom:18}}>SAMIOR</h1>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,2.2vw,26px)",fontWeight:300,fontStyle:"italic",color:T.goldLight,marginBottom:14,letterSpacing:"0.03em"}}>Where Style Meets Sophistication</p>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.12em",color:T.ash,marginBottom:44,lineHeight:1.9,maxWidth:400}}>Luxury fashion house creating bespoke pieces<br/>and curated collections.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <Btn href="#shop">Shop Collection</Btn>
          <Btn href="#gallery" ghost>View Gallery</Btn>
        </div>
      </div>
      <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,zIndex:2,opacity:ld?1:0,transition:"opacity 1.2s ease 1.6s"}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.26em",textTransform:"uppercase",color:T.ash}}>Scroll</span>
        <div style={{width:1,height:42,background:"linear-gradient(to bottom,#b8975a,transparent)",animation:"scrollPulse 2.2s ease-in-out infinite"}}/>
      </div>
    </section>
  );
};

/* ─── Collection ─── */
const Collection = () => (
  <section id="shop" style={{padding:"140px 6% 120px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
    <Reveal>
      <div style={{position:"relative",height:620,overflow:"hidden",background:"#0f0e0b"}}>
        {/* Main product image - the outfit set */}
        <img src={IMGS.upandan} alt="ORACOL Collection" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",opacity:.85,transition:"transform .8s ease"}}
          onMouseEnter={e=>e.target.style.transform="scale(1.04)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
        {/* Overlay */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(12,12,10,.7) 0%,transparent 50%)"}}/>
        <div style={{position:"absolute",top:26,right:26,fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:T.gold,padding:"7px 13px",border:"1px solid rgba(184,151,90,.28)",background:"rgba(12,12,10,.6)"}}>SS 2025</div>
        <div style={{position:"absolute",bottom:24,left:24}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",color:T.gold,marginBottom:6}}>ORACOL × SAMIOR</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,letterSpacing:"0.08em",color:T.parchment}}>The Originals</div>
        </div>
      </div>
    </Reveal>
    <Reveal delay={0.18}>
      <Label>Featured Collection</Label>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(52px,6vw,80px)",fontWeight:300,letterSpacing:"0.08em",lineHeight:.95,color:T.parchment,marginBottom:28}}>ORA<em style={{fontStyle:"italic",color:T.goldLight}}>COL</em></h2>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,lineHeight:1.8,color:T.mist,marginBottom:44,maxWidth:400,fontWeight:300}}>A collection of streetwear, high-end fashion pieces, and accessories crafted for individuals who embrace originality.</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:48}}>
        {["Streetwear","High-End Fashion","Accessories","Bespoke"].map(t=>(
          <span key={t} style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:T.ash,padding:"6px 14px",border:"1px solid rgba(138,133,120,.2)"}}>{t}</span>
        ))}
      </div>
      <Btn href="#products">Explore ORACOL</Btn>
    </Reveal>
  </section>
);

/* ─── Product Card ─── */
const PCard = ({item,onAdd}) => {
  const [hov,setHov]=useState(false);
  const [added,setAdded]=useState(false);
  const [detail,setDetail]=useState(false);
  const handleAdd = () => { onAdd(item); setAdded(true); setTimeout(()=>setAdded(false),1600); };
  return(
    <Reveal>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setDetail(false);}} style={{background:"#111009",overflow:"hidden"}}>
        <div style={{aspectRatio:"3/4",position:"relative",overflow:"hidden",background:item.bg}}>
          <img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .7s ease",transform:hov?"scale(1.05)":"scale(1)"}}/>
          {/* Gradient bottom */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 55%,rgba(12,12,10,.85) 100%)"}}/>
          {/* Hover CTA */}
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"stretch",justifyContent:"flex-end",padding:18,opacity:hov?1:0,transition:"opacity .4s"}}>
            {detail && <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:T.mist,lineHeight:1.6,marginBottom:12,fontStyle:"italic"}}>{item.desc}</p>}
            <div style={{display:"flex",gap:6}}>
              <button onClick={handleAdd} style={{flex:1,fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:T.ink,background:added?T.goldLight:T.gold,border:"none",padding:"11px 0",transition:"background .3s"}}>
                {added?"Added ✓":"Quick Add"}
              </button>
              <button onClick={()=>setDetail(d=>!d)} style={{width:40,background:"none",border:"1px solid rgba(184,151,90,.3)",color:T.gold,fontSize:14}}>i</button>
            </div>
          </div>
          {/* Badges */}
          {item.id<=2 && <div style={{position:"absolute",top:14,left:14,fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:"0.2em",textTransform:"uppercase",color:T.ink,background:T.gold,padding:"5px 10px"}}>New</div>}
        </div>
        <div style={{padding:"18px 18px 22px",borderTop:"1px solid rgba(184,151,90,.08)"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:"0.24em",textTransform:"uppercase",color:T.gold,marginBottom:6}}>{item.collection}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,color:T.parchment,marginBottom:4}}>{item.name}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.ash,letterSpacing:"0.1em"}}>{fmt(item.price)}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:"0.15em",color:T.ash,opacity:.6,textTransform:"uppercase"}}>{item.tag}</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ─── Products ─── */
const Products = ({onAdd}) => (
  <section id="products" style={{padding:"100px 6%",background:"linear-gradient(180deg,#0c0c0a,#0f0e0c)"}}>
    <Reveal>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:64}}>
        <div>
          <Label>New Arrivals</Label>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,4.5vw,56px)",fontWeight:300,letterSpacing:"0.06em",color:T.parchment}}>
            Featured<br/><em style={{fontStyle:"italic",color:T.goldLight}}>Products</em>
          </h2>
        </div>
        <a href="#" style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.24em",textTransform:"uppercase",color:T.gold,textDecoration:"none",display:"flex",alignItems:"center",gap:10}}>View All <span>→</span></a>
      </div>
    </Reveal>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3}}>
      {PRODUCTS.map((p,i)=><PCard key={p.id} item={p} onAdd={onAdd}/>)}
    </div>
  </section>
);

/* ─── Gallery ─── */
const GItem = ({item,style={}}) => {
  const [hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{position:"relative",overflow:"hidden",...style}}>
      <img src={item.img} alt={item.label} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .8s cubic-bezier(.25,.46,.45,.94)",transform:hov?"scale(1.06)":"scale(1)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 50%,rgba(12,12,10,.8) 100%)"}}/>
      {/* Always visible label at bottom */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px 20px"}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase",color:T.gold,marginBottom:4,opacity:.8}}>{item.sub}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,color:T.parchment,letterSpacing:"0.04em"}}>{item.label}</div>
      </div>
      {/* Hover overlay */}
      <div style={{position:"absolute",inset:0,border:"1px solid rgba(184,151,90,.25)",opacity:hov?1:0,transition:"opacity .4s",pointerEvents:"none"}}/>
    </div>
  );
};

const Gallery = () => (
  <section id="gallery" style={{padding:"120px 6%"}}>
    <Reveal>
      <div style={{textAlign:"center",marginBottom:72}}>
        <Label center>Campaign</Label>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(44px,5.5vw,68px)",fontWeight:300,letterSpacing:"0.08em",color:T.parchment,marginBottom:16}}>Gallery</h2>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.2em",color:T.ash,textTransform:"uppercase"}}>Selected moments from recent collections and campaigns.</p>
      </div>
    </Reveal>
    <Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"340px 340px 280px",gap:4,marginBottom:56}}>
        <GItem item={GALLERY[0]} style={{gridColumn:1,gridRow:"1/3"}}/>
        <GItem item={GALLERY[1]} style={{gridColumn:2,gridRow:1}}/>
        <GItem item={GALLERY[2]} style={{gridColumn:3,gridRow:1}}/>
        <GItem item={GALLERY[3]} style={{gridColumn:2,gridRow:2}}/>
        <GItem item={GALLERY[4]} style={{gridColumn:3,gridRow:"2/4"}}/>
        <GItem item={GALLERY[5]} style={{gridColumn:"1/3",gridRow:3}}/>
      </div>
    </Reveal>
    <Reveal><div style={{textAlign:"center"}}><Btn ghost>View Full Gallery</Btn></div></Reveal>
  </section>
);

/* ─── Statement ─── */
const Statement = () => (
  <section id="about" style={{padding:"160px 6%",textAlign:"center",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 50%,rgba(184,151,90,.04),transparent)",pointerEvents:"none"}}/>
    <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:1,height:80,background:"linear-gradient(to bottom,transparent,rgba(184,151,90,.2))"}}/>
    <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:1,height:80,background:"linear-gradient(to bottom,rgba(184,151,90,.2),transparent)"}}/>
    <Reveal>
      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,letterSpacing:"0.4em",color:T.gold,display:"block",marginBottom:44,opacity:.6}}>✦ &nbsp; &nbsp; ✦ &nbsp; &nbsp; ✦</span>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:300,letterSpacing:"0.05em",color:T.parchment,marginBottom:28,lineHeight:1.1}}>Crafted with Purpose</h2>
      <div style={{width:50,height:1,background:T.gold,margin:"0 auto 32px",opacity:.4}}/>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(17px,2vw,22px)",fontWeight:300,lineHeight:1.85,color:T.mist,maxWidth:540,margin:"0 auto 52px",fontStyle:"italic"}}>
        Every piece is designed with attention to detail, quality craftsmanship, and timeless style.
      </p>
      <Btn href="#products">Discover the Collection</Btn>
    </Reveal>
  </section>
);

/* ─── Footer ─── */
const Footer = () => {
  const [hov,setHov]=useState(null);
  const cols=[
    {title:"Navigate",links:["Shop","Gallery","About","Contact"]},
    {title:"Collections",links:["ORACOL","New Arrivals","Accessories","Lookbook"]},
  ];
  return(
    <footer id="contact" style={{borderTop:"1px solid rgba(184,151,90,.1)",padding:"80px 6% 40px",background:"#0a0a08"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.4fr",gap:60,marginBottom:72}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,letterSpacing:"0.18em",marginBottom:10}}>SAMIOR</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:T.gold,marginBottom:20}}>Luxury Fashion House</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:300,color:T.ash,lineHeight:1.85,maxWidth:260}}>Creating bespoke pieces and curated collections for individuals who embrace originality.</p>
          <div style={{display:"flex",gap:16,marginTop:28}}>
            {["IG","TK","WA"].map(s=>(
              <a key={s} href="#" style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.18em",color:T.ash,textDecoration:"none",padding:"6px 12px",border:"1px solid rgba(138,133,120,.2)",transition:"all .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.color=T.gold;e.currentTarget.style.borderColor="rgba(184,151,90,.2)";}}
                onMouseLeave={e=>{e.currentTarget.style.color=T.ash;e.currentTarget.style.borderColor="rgba(138,133,120,.2)";}}>{s}</a>
            ))}
          </div>
        </div>
        {cols.map(col=>(
          <div key={col.title}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:T.gold,marginBottom:24}}>{col.title}</div>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:14}}>
              {col.links.map(l=>(
                <li key={l}><a href="#" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,color:hov===l?T.parchment:T.ash,textDecoration:"none",transition:"color .3s"}}
                  onMouseEnter={()=>setHov(l)} onMouseLeave={()=>setHov(null)}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:T.gold,marginBottom:24}}>Stay Connected</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:T.ash,lineHeight:1.75,marginBottom:20}}>Join the SAMIOR circle for early access and exclusive releases.</p>
          <div style={{display:"flex"}}>
            <input placeholder="Your email" style={{flex:1,background:"rgba(255,255,255,.04)",border:"1px solid rgba(184,151,90,.15)",borderRight:"none",padding:"12px 14px",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em",color:T.parchment,outline:"none"}}/>
            <button style={{background:T.gold,border:`1px solid ${T.gold}`,padding:"12px 16px",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:T.ink,whiteSpace:"nowrap"}}
              onMouseEnter={e=>e.target.style.background=T.goldLight} onMouseLeave={e=>e.target.style.background=T.gold}>Join</button>
          </div>
        </div>
      </div>
      <div style={{borderTop:"1px solid rgba(184,151,90,.08)",paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.14em",color:T.ash,textTransform:"uppercase"}}>© 2025 <span style={{color:T.gold}}>SAMIOR</span>. All rights reserved.</p>
        <div style={{display:"flex",gap:28}}>
          {["Privacy Policy","Terms of Service","Shipping & Returns"].map(l=>(
            <a key={l} href="#" style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:T.ash,textDecoration:"none"}}
              onMouseEnter={e=>e.target.style.color=T.gold} onMouseLeave={e=>e.target.style.color=T.ash}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

/* ─── App ─── */
export default function Samior() {
  const [cartOpen,setCartOpen]=useState(false);
  const [cartItems,setCartItems]=useState([]);
  const addToCart = item => setCartItems(prev => { const ex=prev.find(i=>i.id===item.id); if(ex) return prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i); return [...prev,{...item,qty:1}]; });
  const removeFromCart = id => setCartItems(prev=>prev.filter(i=>i.id!==id));
  const cartCount = cartItems.reduce((s,i)=>s+i.qty,0);
  return(<>
    <FontLink/><GlobalStyle/><Grain/><Cursor/>
    <Nav cartCount={cartCount} onCartOpen={()=>setCartOpen(true)}/>
    <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={cartItems} onRemove={removeFromCart}/>
    <main>
      <Hero/><Ticker/><Collection/><Products onAdd={addToCart}/><Gallery/><Statement/>
    </main>
    <Footer/>
  </>);
}
