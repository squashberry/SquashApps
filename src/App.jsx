import { useEffect, useMemo, useState } from 'react'

const products = [
  {
    slug: 'who',
    name: 'WHO',
    subtitle: "Caller intelligence & communication",
    developer: 'Squashberry',
    kind: 'app',
    category: 'Communication',
    badge: 'Featured',
    icon: 'W',
    iconClass: 'who',
    summary: "Know who's calling. Communicate smarter.",
    description:
      'WHO is the Squashberry caller-intelligence and communication experience, combining a modern dialer, caller identification, contacts, relay features and a clean mobile-first interface.',
    whatsNew: 'A refreshed communication experience with a modern dialer shell, smoother contact surfaces and smarter relay flows.',
    stats: ['Communication', 'Free', 'Made by Squashberry'],
    features: ['Caller intelligence', 'Modern dialer', 'Contacts & quick actions', 'Relay connectivity'],
    screenshots: ['Dialer', 'Caller ID', 'Contact', 'Relay'],
  },
  {
    slug: 'squashai',
    name: 'SquashAI',
    subtitle: 'Your offline pocket AI',
    developer: 'Squashberry',
    kind: 'app',
    category: 'Productivity',
    badge: 'New',
    icon: 'S',
    iconClass: 'squashai',
    summary: 'Private AI that travels with you.',
    description:
      'SquashAI is a pocket AI experience designed around local models, device-aware model choices and a simple mobile conversation interface.',
    whatsNew: 'Model selection and model-manager flows are being refined for low-memory devices and offline use.',
    stats: ['Productivity', 'Free', 'Made by Squashberry'],
    features: ['Offline models', 'Device-aware choices', 'Chat interface', 'One-model-at-a-time storage'],
    screenshots: ['Chat', 'Model Picker', 'Offline Mode', 'Settings'],
  },
  {
    slug: 'medisquash',
    name: 'MediSquash',
    subtitle: 'Medical learning & clinical research',
    developer: 'Squashberry',
    kind: 'app',
    category: 'Education',
    icon: 'M',
    iconClass: 'medisquash',
    summary: 'Study, search, research and learn.',
    description:
      'MediSquash brings medical learning, patient workflows, research tools, notes and a modern search experience into one focused workspace.',
    whatsNew: 'The Flutter migration is being aligned with the existing web experience while keeping search, research and notes consistent.',
    stats: ['Education', 'Free', 'Made by Squashberry'],
    features: ['Medical search', 'Research workspace', 'Patient tools', 'Notes & library'],
    screenshots: ['Home', 'Search', 'Research', 'Notes'],
  },
  {
    slug: 'netfliks',
    name: 'Netfliks',
    subtitle: 'Your personal streaming experience',
    developer: 'Squashberry',
    kind: 'app',
    category: 'Entertainment',
    icon: 'N',
    iconClass: 'netfliks',
    summary: 'A Squashberry-built streaming desktop experience.',
    description:
      'Netfliks is a desktop/PWA streaming experience with a cinematic library, search and watch-focused interface.',
    whatsNew: 'The desktop build is being prepared around a cleaner catalog, branding and installable experience.',
    stats: ['Entertainment', 'Free', 'Made by Squashberry'],
    features: ['Streaming library', 'Search', 'Installable desktop experience', 'Cinema-style browsing'],
    screenshots: ['Home', 'Movie Details', 'Search', 'Player'],
  },
  {
    slug: 'netfinder',
    name: 'Netfinder',
    subtitle: 'Discover movies and series',
    developer: 'Squashberry',
    kind: 'app',
    category: 'Entertainment',
    icon: 'N',
    iconClass: 'netfinder',
    summary: 'A movie discovery PWA built for Squashberry.',
    description:
      'Netfinder is a streaming-discovery concept focused on fast browsing, rich movie details and a polished installable web experience.',
    whatsNew: 'The API adapter architecture is ready to accept a future TMDb/OMDb data source without hard-coding the UI.',
    stats: ['Entertainment', 'Free', 'Made by Squashberry'],
    features: ['Movie discovery', 'Rich detail pages', 'Installable PWA', 'API adapter architecture'],
    screenshots: ['Discover', 'Details', 'Search', 'Watchlist'],
  },
  {
    slug: 'squashberrypay',
    name: 'SquashberryPay',
    subtitle: 'Payments and merchant tools',
    developer: 'Squashberry',
    kind: 'website',
    category: 'Finance',
    icon: 'P',
    iconClass: 'pay',
    summary: 'A payment platform for apps and websites.',
    description:
      'SquashberryPay is the web-first payments product for linking checkout experiences to Squashberry services and external websites.',
    whatsNew: 'Checkout, payment buttons and merchant-facing flows are being expanded toward a complete payment platform.',
    stats: ['Finance', 'Web', 'Made by Squashberry'],
    features: ['Payment buttons', 'Checkout flows', 'Merchant tools', 'Web integrations'],
    screenshots: ['Checkout', 'Merchant', 'Payments', 'Integrations'],
  },
]

function ProductIcon({ product, large = false }) {
  return (
    <div className={`app-icon ${product.iconClass} ${large ? 'large' : ''}`}>
      <span>{product.icon}</span>
    </div>
  )
}

function ActionButton({ product, onInstall }) {
  const label = product.kind === 'website' ? 'OPEN' : 'GET'
  return (
    <button className="action-button" onClick={() => onInstall(product)}>
      {label}
    </button>
  )
}

function ScreenshotCard({ product, title, index }) {
  return (
    <div className={`shot-card ${product.iconClass}`}>
      <div className="shot-topbar">
        <span className="shot-dot" />
        <span>{product.name}</span>
        <span className="shot-pill">{index + 1}</span>
      </div>
      <div className="shot-art">
        <div className="shot-heading">{title}</div>
        <div className="shot-lines">
          <span />
          <span />
          <span className="short" />
        </div>
        <div className="shot-panel">
          <strong>{product.summary}</strong>
          <small>{product.category}</small>
        </div>
      </div>
    </div>
  )
}

function StoreHeader({ page, setPage, query, setQuery }) {
  return (
    <header className="store-header">
      <div className="header-inner">
        <button className="brand-button" onClick={() => setPage('discover')} aria-label="SquashApps home">
          <span className="brand-mark">S</span>
          <span>SquashApps</span>
        </button>

        <nav className="desktop-nav">
          {[
            ['discover', 'Discover'],
            ['apps', 'Apps'],
            ['websites', 'Websites'],
          ].map(([key, label]) => (
            <button key={key} className={page === key ? 'nav-link active' : 'nav-link'} onClick={() => setPage(key)}>
              {label}
            </button>
          ))}
          <button className={page === 'about' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('about')}>
            About
          </button>
        </nav>

        <div className="header-search">
          <span className="search-icon">⌕</span>
          <input
            aria-label="Search SquashApps"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              if (event.target.value.trim()) setPage('search')
            }}
          />
          {query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
        </div>
      </div>
    </header>
  )
}

function MobileNav({ page, setPage }) {
  return (
    <nav className="mobile-nav">
      {[
        ['discover', '⌂', 'Discover'],
        ['apps', '▦', 'Apps'],
        ['websites', '◉', 'Websites'],
        ['search', '⌕', 'Search'],
      ].map(([key, icon, label]) => (
        <button key={key} className={page === key ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={() => setPage(key)}>
          <span>{icon}</span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  )
}

function Discover({ products, onOpenProduct, onInstall, setPage }) {
  const featured = products.find((product) => product.slug === 'who')
  const newProduct = products.find((product) => product.slug === 'squashai')
  const website = products.find((product) => product.slug === 'squashberrypay')
  const editorials = [
    { title: 'Built by Squashberry', subtitle: 'A growing collection of products, all in one place.', product: featured },
    { title: 'Pocket intelligence', subtitle: 'Take SquashAI with you and keep your workspace close.', product: newProduct },
    { title: 'Payments for the web', subtitle: 'Connect checkout experiences through SquashberryPay.', product: website },
  ]

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">SQUASHBERRY</p>
        <h1>Great products.<br />One home.</h1>
        <p className="hero-copy">SquashApps is the home for apps and web products made by Squashberry.</p>
      </section>

      <section className="featured-grid">
        {editorials.map((item, index) => (
          <article
            key={item.product.slug}
            className={`editorial-card editorial-${index + 1} ${item.product.iconClass}`}
            onClick={() => onOpenProduct(item.product.slug)}
          >
            <div className="editorial-copy">
              <p className="eyebrow light">{item.title}</p>
              <h2>{item.product.name}</h2>
              <p>{item.subtitle}</p>
            </div>
            <ProductIcon product={item.product} large />
          </article>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DISCOVER</p>
            <h2>Apps</h2>
          </div>
          <button className="see-all" onClick={() => setPage('apps')}>See All <span>›</span></button>
        </div>
        <ProductRows products={products.filter((p) => p.kind === 'app').slice(0, 4)} onOpenProduct={onOpenProduct} onInstall={onInstall} />
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ON THE WEB</p>
            <h2>Web products</h2>
          </div>
          <button className="see-all" onClick={() => setPage('websites')}>See All <span>›</span></button>
        </div>
        <ProductRows products={products.filter((p) => p.kind === 'website')} onOpenProduct={onOpenProduct} onInstall={onInstall} />
      </section>
    </div>
  )
}

function ProductRows({ products, onOpenProduct, onInstall }) {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <button key={product.slug} className="product-row" onClick={() => onOpenProduct(product.slug)}>
          <ProductIcon product={product} />
          <span className="row-copy">
            <strong>{product.name}</strong>
            <span>{product.subtitle}</span>
            <small>{product.category}</small>
          </span>
          <span className="row-action" onClick={(event) => { event.stopPropagation(); onInstall(product) }}>
            {product.kind === 'website' ? 'OPEN' : 'GET'}
          </span>
          <span className="row-chevron">›</span>
        </button>
      ))}
    </div>
  )
}

function CollectionPage({ title, eyebrow, products, onOpenProduct, onInstall }) {
  return (
    <div className="page collection-page">
      <section className="collection-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>Everything in this collection is made by Squashberry.</p>
      </section>
      <div className="collection-list">
        {products.map((product) => (
          <article key={product.slug} className="collection-card" onClick={() => onOpenProduct(product.slug)}>
            <ProductIcon product={product} large />
            <div className="collection-card-copy">
              <h2>{product.name}</h2>
              <p>{product.subtitle}</p>
              <span>{product.category} · {product.kind === 'website' ? 'Web' : 'App'}</span>
              <p className="collection-summary">{product.summary}</p>
            </div>
            <ActionButton product={product} onInstall={onInstall} />
          </article>
        ))}
      </div>
    </div>
  )
}

function SearchPage({ query, products, onOpenProduct, onInstall }) {
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return products.filter((product) =>
      [product.name, product.subtitle, product.category, product.description].join(' ').toLowerCase().includes(term)
    )
  }, [query, products])

  return (
    <div className="page search-page">
      <section className="collection-header">
        <p className="eyebrow">SEARCH</p>
        <h1>{query ? `Results for “${query}”` : 'Search SquashApps'}</h1>
      </section>
      {query && results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h2>No products found</h2>
          <p>Try another search term.</p>
        </div>
      ) : (
        <ProductRows products={results} onOpenProduct={onOpenProduct} onInstall={onInstall} />
      )}
    </div>
  )
}

function ProductPage({ product, onBack, onInstall }) {
  return (
    <div className="page product-page">
      <button className="back-button" onClick={onBack}>‹ <span>Back</span></button>

      <section className="product-header">
        <ProductIcon product={product} large />
        <div className="product-title-block">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-subtitle">{product.subtitle}</p>
          <p className="developer">{product.developer}</p>
        </div>
        <ActionButton product={product} onInstall={onInstall} />
      </section>

      <div className="product-metadata">
        {product.stats.map((stat) => <span key={stat}>{stat}</span>)}
      </div>

      <section className="screenshots-section">
        <div className="horizontal-scroll">
          {product.screenshots.map((title, index) => (
            <ScreenshotCard key={title} product={product} title={title} index={index} />
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-main">
          <p className="eyebrow">ABOUT</p>
          <h2>{product.summary}</h2>
          <p>{product.description}</p>
        </div>
        <aside className="info-side">
          <div>
            <span>Category</span>
            <strong>{product.category}</strong>
          </div>
          <div>
            <span>Developer</span>
            <strong>{product.developer}</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>{product.kind === 'website' ? 'Web' : 'Installable'}</strong>
          </div>
        </aside>
      </section>

      <section className="whats-new">
        <div>
          <p className="eyebrow">WHAT'S NEW</p>
          <h2>Version 1.0</h2>
        </div>
        <p>{product.whatsNew}</p>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURES</p>
            <h2>Inside {product.name}</h2>
          </div>
        </div>
        <div className="feature-grid">
          {product.features.map((feature, index) => (
            <div className="feature-card" key={feature}>
              <span>0{index + 1}</span>
              <strong>{feature}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function About({ setPage }) {
  return (
    <div className="page about-page">
      <section className="collection-header">
        <p className="eyebrow">SQUASHBERRY</p>
        <h1>One place for every product.</h1>
        <p>SquashApps is a product catalog built around the discovery patterns people already know from modern app stores.</p>
      </section>
      <div className="reference-card">
        <div className="reference-copy">
          <p className="eyebrow">DESIGN REFERENCE</p>
          <h2>App Store-inspired, Squashberry-owned.</h2>
          <p>
            The interface follows the product-page, screenshot-gallery, editorial-card and Get/Open patterns documented in Apple’s official App Store materials, while using original SquashApps branding and product content.
          </p>
          <div className="reference-links">
            <a href="https://developer.apple.com/app-store/product-page/" target="_blank" rel="noreferrer">Apple product page guidance ↗</a>
            <a href="https://developer.apple.com/app-store/search/" target="_blank" rel="noreferrer">Apple App Store search guidance ↗</a>
          </div>
        </div>
        <div className="reference-stack">
          <div className="reference-screen screen-one"><span>GET</span><strong>App page</strong></div>
          <div className="reference-screen screen-two"><span>OPEN</span><strong>Product</strong></div>
        </div>
      </div>
      <button className="primary-text-button" onClick={() => setPage('discover')}>Explore SquashApps →</button>
    </div>
  )
}

function InstallSheet({ product, onClose }) {
  if (!product) return null
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="install-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-grabber" />
        <ProductIcon product={product} large />
        <p className="eyebrow">{product.kind === 'website' ? 'WEBSITE' : 'INSTALLABLE APP'}</p>
        <h2>{product.name}</h2>
        <p>
          {product.kind === 'website'
            ? 'SquashberryPay will open as a web product when its live destination is connected.'
            : 'When a live PWA install prompt is available, SquashApps will hand the installation to your browser.'}
        </p>
        <button className="sheet-primary" onClick={onClose}>Done</button>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('discover')
  const [query, setQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState('')
  const [installProduct, setInstallProduct] = useState(null)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const selectedProduct = products.find((product) => product.slug === selectedSlug)

  function openProduct(slug) {
    setSelectedSlug(slug)
    setPage('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleInstall(product) {
    if (product.kind === 'website') {
      setInstallProduct(product)
      return
    }

    if (deferredPrompt) {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
      return
    }

    setInstallProduct(product)
  }

  let content
  if (page === 'product' && selectedProduct) {
    content = <ProductPage product={selectedProduct} onBack={() => setPage('discover')} onInstall={handleInstall} />
  } else if (page === 'apps') {
    content = <CollectionPage title="Apps" eyebrow="SQUASHBERRY APPS" products={products.filter((p) => p.kind === 'app')} onOpenProduct={openProduct} onInstall={handleInstall} />
  } else if (page === 'websites') {
    content = <CollectionPage title="Websites" eyebrow="SQUASHBERRY ON THE WEB" products={products.filter((p) => p.kind === 'website')} onOpenProduct={openProduct} onInstall={handleInstall} />
  } else if (page === 'search') {
    content = <SearchPage query={query} products={products} onOpenProduct={openProduct} onInstall={handleInstall} />
  } else if (page === 'about') {
    content = <About setPage={setPage} />
  } else {
    content = <Discover products={products} onOpenProduct={openProduct} onInstall={handleInstall} setPage={setPage} />
  }

  return (
    <>
      <StoreHeader page={page} setPage={setPage} query={query} setQuery={setQuery} />
      <main>{content}</main>
      <footer className="site-footer">
        <div>
          <strong>SquashApps</strong>
          <span>Apps and web products by Squashberry.</span>
        </div>
        <span>App Store-inspired product catalog · 2026</span>
      </footer>
      <MobileNav page={page} setPage={setPage} />
      {installProduct && <InstallSheet product={installProduct} onClose={() => setInstallProduct(null)} />}
    </>
  )
}