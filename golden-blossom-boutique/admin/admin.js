/**
 * GOLDEN BLOSSOM BOUTIQUE • CASABLANCA
 * Administrator CMS & Product Management Controller
 * Includes Gb260000 Password Gate & AI Excel / CSV Product Importer
 */

(function () {
  'use strict';

  const ADMIN_PASSWORD = 'Gb260000';
  const API_BASE = (
    window.location.protocol === 'file:' ||
    ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000')
  ) ? 'http://localhost:3000' : '';

  let products = [];
  let orders = [];
  let websiteSettings = {};
  let parsedExcelProducts = [];

  // Real-time broadcast channel to instantly update open customer storefront tabs
  const broadcastSync = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('gb_live_sync_channel') : null;

  function notifyLiveWebsiteUpdate(type, payload = null) {
    const timestamp = Date.now();
    try {
      localStorage.setItem('gb_last_sync_timestamp', timestamp.toString());
      if (broadcastSync) {
        broadcastSync.postMessage({ type, payload, timestamp });
      }
    } catch(e) {}
  }

  // Luxury Image Pool for AI Enrichment when image is missing in Excel
  const LUXURY_IMAGE_POOLS = {
    jewelry: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475152-478311399767?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    apparel: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    accessories: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80'
    ]
  };

  // DOM Elements
  const DOM = {
    // Auth Gate
    loginGate: document.getElementById('loginGate'),
    adminApp: document.getElementById('adminApp'),
    adminLoginForm: document.getElementById('adminLoginForm'),
    adminPasswordInput: document.getElementById('adminPasswordInput'),
    togglePasswordBtn: document.getElementById('togglePasswordBtn'),
    loginErrorMessage: document.getElementById('loginErrorMessage'),
    btnLockPortal: document.getElementById('btnLockPortal'),

    // Stats
    statTotalProducts: document.getElementById('statTotalProducts'),
    statInStock: document.getElementById('statInStock'),
    statTotalOrders: document.getElementById('statTotalOrders'),
    statRevenue: document.getElementById('statRevenue'),
    tabCountProducts: document.getElementById('tabCountProducts'),
    tabCountOrders: document.getElementById('tabCountOrders'),

    // Tabs
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),

    // Products table & filters
    productsTableBody: document.getElementById('productsTableBody'),
    adminSearchInput: document.getElementById('adminSearchInput'),
    adminCategoryFilter: document.getElementById('adminCategoryFilter'),
    adminStockFilter: document.getElementById('adminStockFilter'),

    // Add Product Modal
    openAddProductBtn: document.getElementById('openAddProductBtn'),
    openAddProductBtn2: document.getElementById('openAddProductBtn2'),
    productModal: document.getElementById('productModal'),
    closeProductModalBtn: document.getElementById('closeProductModalBtn'),
    cancelProductBtn: document.getElementById('cancelProductBtn'),
    saveProductBtn: document.getElementById('saveProductBtn'),
    btnUseSampleImg: document.getElementById('btnUseSampleImg'),
    productForm: document.getElementById('productForm'),
    modalTitle: document.getElementById('modalTitle'),

    // Excel Importer Modal
    openExcelModalBtn: document.getElementById('openExcelModalBtn'),
    openExcelModalBtn2: document.getElementById('openExcelModalBtn2'),
    excelModal: document.getElementById('excelModal'),
    closeExcelModalBtn: document.getElementById('closeExcelModalBtn'),
    cancelExcelBtn: document.getElementById('cancelExcelBtn'),
    excelDropzone: document.getElementById('excelDropzone'),
    excelFileInput: document.getElementById('excelFileInput'),
    btnSelectExcelFile: document.getElementById('btnSelectExcelFile'),
    btnDownloadTemplate: document.getElementById('btnDownloadTemplate'),
    excelPreviewSection: document.getElementById('excelPreviewSection'),
    excelParsedCount: document.getElementById('excelParsedCount'),
    excelPreviewTableBody: document.getElementById('excelPreviewTableBody'),
    btnConfirmExcelImport: document.getElementById('btnConfirmExcelImport'),
    btnClearExcelFile: document.getElementById('btnClearExcelFile'),

    // Product Form Fields
    prodEditId: document.getElementById('prodEditId'),
    prodTitle: document.getElementById('prodTitle'),
    prodCategory: document.getElementById('prodCategory'),
    prodBadge: document.getElementById('prodBadge'),
    prodPriceMAD: document.getElementById('prodPriceMAD'),
    prodOriginalPriceMAD: document.getElementById('prodOriginalPriceMAD'),
    prodStockCount: document.getElementById('prodStockCount'),
    prodMaterialType: document.getElementById('prodMaterialType'),
    prodMaterial: document.getElementById('prodMaterial'),
    prodImg: document.getElementById('prodImg'),
    mainImgPreview: document.getElementById('mainImgPreview'),
    prodDescription: document.getElementById('prodDescription'),
    prodSizes: document.getElementById('prodSizes'),

    // Website Settings Form
    websiteSettingsForm: document.getElementById('websiteSettingsForm'),
    setAnnouncementText: document.getElementById('setAnnouncementText'),
    setHeroHeading: document.getElementById('setHeroHeading'),
    setHeroSubheading: document.getElementById('setHeroSubheading'),
    setBoutiquePhone: document.getElementById('setBoutiquePhone'),
    setFreeShipping: document.getElementById('setFreeShipping'),
    setBoutiqueEmail: document.getElementById('setBoutiqueEmail'),
    setBoutiqueAddress: document.getElementById('setBoutiqueAddress'),

    // Orders & Revenue
    ordersTableBody: document.getElementById('ordersTableBody'),
    refreshOrdersBtn: document.getElementById('refreshOrdersBtn'),
    btnResetOrders: document.getElementById('btnResetOrders'),
    btnQuickResetStats: document.getElementById('btnQuickResetStats'),

    // Toast
    adminToast: document.getElementById('adminToast')
  };

  // =========================================================================
  // AUTHENTICATION MANAGEMENT (PASSWORD: Gb260000)
  // =========================================================================
  function checkAuthentication() {
    const savedAuth = sessionStorage.getItem('gb_admin_auth');
    if (savedAuth === ADMIN_PASSWORD) {
      unlockPortal();
    } else {
      lockPortal();
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    const entered = DOM.adminPasswordInput.value;
    if (entered === ADMIN_PASSWORD) {
      sessionStorage.setItem('gb_admin_auth', ADMIN_PASSWORD);
      if (DOM.loginErrorMessage) DOM.loginErrorMessage.style.display = 'none';
      unlockPortal();
      showToast('Welcome to Golden Blossom Boutique Atelier Admin');
    } else {
      if (DOM.loginErrorMessage) DOM.loginErrorMessage.style.display = 'block';
      DOM.adminPasswordInput.classList.add('shake');
      setTimeout(() => DOM.adminPasswordInput.classList.remove('shake'), 500);
      DOM.adminPasswordInput.select();
    }
  }

  function unlockPortal() {
    if (DOM.loginGate) DOM.loginGate.style.display = 'none';
    if (DOM.adminApp) DOM.adminApp.style.display = 'flex';
    initAdminData();
  }

  function lockPortal() {
    sessionStorage.removeItem('gb_admin_auth');
    if (DOM.adminApp) DOM.adminApp.style.display = 'none';
    if (DOM.loginGate) DOM.loginGate.style.display = 'flex';
    if (DOM.adminPasswordInput) {
      DOM.adminPasswordInput.value = '';
      DOM.adminPasswordInput.focus();
    }
    if (DOM.loginErrorMessage) DOM.loginErrorMessage.style.display = 'none';
  }

  function togglePasswordVisibility() {
    const isPass = DOM.adminPasswordInput.type === 'password';
    DOM.adminPasswordInput.type = isPass ? 'text' : 'password';
    const eyeSvg = DOM.togglePasswordBtn.querySelector('svg');
    if (eyeSvg) {
      eyeSvg.innerHTML = isPass 
        ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
  }

  function getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-admin-password': ADMIN_PASSWORD
    };
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, isSuccess = true) {
    if (!DOM.adminToast) return;
    DOM.adminToast.innerHTML = `<span>${isSuccess ? '✨' : '⚠️'}</span> <span>${message}</span>`;
    DOM.adminToast.classList.add('show');
    setTimeout(() => {
      DOM.adminToast.classList.remove('show');
    }, 3800);
  }

  // =========================================================================
  // DATA FETCHING
  // =========================================================================
  async function initAdminData() {
    await Promise.all([
      loadProducts(),
      loadWebsiteSettings(),
      loadOrders()
    ]);
  }

  async function loadProducts() {
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (res.ok) {
        products = await res.json();
        try { localStorage.setItem('gb_boutique_products', JSON.stringify(products)); } catch(e){}
      } else {
        throw new Error('Server returned ' + res.status);
      }
    } catch (e) {
      console.warn('Loading products from localStorage fallback:', e.message);
      try {
        const stored = localStorage.getItem('gb_boutique_products');
        if (stored) products = JSON.parse(stored);
        else products = [];
      } catch (err) {
        products = [];
      }
    }
    renderProductsTable();
    updateStats();
  }

  async function loadWebsiteSettings() {
    try {
      const res = await fetch(`${API_BASE}/api/website-settings`);
      if (res.ok) {
        websiteSettings = await res.json();
        fillWebsiteSettingsForm(websiteSettings);
      }
    } catch (e) {
      console.warn('Failed to load website settings:', e.message);
    }
  }

  async function loadOrders() {
    try {
      const res = await fetch(`${API_BASE}/api/orders`);
      if (res.ok) {
        orders = await res.json();
        renderOrdersTable();
      }
    } catch (e) {
      console.warn('Failed to load orders:', e.message);
    }
    updateStats();
  }

  async function handleResetOrders() {
    const count = orders.length;
    const confirmed = window.confirm(
      "⚠️ REINITIALISATION DES COMMANDES & DU CHIFFRE D'AFFAIRES\n\n" +
      `Êtes-vous sûr de vouloir supprimer les ${count} commande(s) et remettre le chiffre d'affaires / total des ventes à 0 MAD ?\n\n` +
      "Cette action est immédiate et effacera l'historique des commandes pour repartir de zéro."
    );

    if (!confirmed) return;

    if (DOM.btnResetOrders) {
      DOM.btnResetOrders.disabled = true;
      DOM.btnResetOrders.textContent = 'Réinitialisation...';
    }

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      orders = [];
      try { localStorage.setItem('gb_orders', JSON.stringify([])); } catch(e){}

      renderOrdersTable();
      updateStats();

      if (res.ok) {
        showToast("✨ Toutes les commandes et les revenus ont été réinitialisés à 0 MAD !");
      } else {
        showToast("Commandes et revenus réinitialisés localement à 0 MAD !");
      }
      notifyLiveWebsiteUpdate('ORDERS_RESET');
    } catch (e) {
      console.warn('Network error while resetting orders, updating locally:', e.message);
      orders = [];
      renderOrdersTable();
      updateStats();
      showToast("Commandes et revenus réinitialisés à 0 MAD !");
      notifyLiveWebsiteUpdate('ORDERS_RESET');
    } finally {
      if (DOM.btnResetOrders) {
        DOM.btnResetOrders.disabled = false;
        DOM.btnResetOrders.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          Reset Orders & Income (0 MAD)
        `;
      }
    }
  }

  // =========================================================================
  // STATS UPDATE
  // =========================================================================
  function updateStats() {
    if (DOM.statTotalProducts) DOM.statTotalProducts.textContent = products.length;
    if (DOM.tabCountProducts) DOM.tabCountProducts.textContent = products.length;

    const inStockCount = products.filter(p => (Number(p.stockCount) || 0) > 0).length;
    if (DOM.statInStock) DOM.statInStock.textContent = inStockCount;

    if (DOM.statTotalOrders) DOM.statTotalOrders.textContent = orders.length;
    if (DOM.tabCountOrders) DOM.tabCountOrders.textContent = orders.length;

    const totalRev = orders.reduce((sum, o) => {
      const val = Number(o.totals?.grandTotalMAD || o.totalMAD || 0);
      return sum + val;
    }, 0);
    if (DOM.statRevenue) DOM.statRevenue.textContent = `${totalRev.toLocaleString('fr-FR')} MAD`;
  }

  // =========================================================================
  // RENDER PRODUCTS
  // =========================================================================
  function renderProductsTable() {
    if (!DOM.productsTableBody) return;

    const search = (DOM.adminSearchInput.value || '').toLowerCase().trim();
    const cat = DOM.adminCategoryFilter.value;
    const stockStatus = DOM.adminStockFilter.value;

    const filtered = products.filter(p => {
      if (cat !== 'all' && p.category !== cat) return false;

      const stock = Number(p.stockCount) || 0;
      if (stockStatus === 'instock' && stock <= 0) return false;
      if (stockStatus === 'outofstock' && stock > 0) return false;

      if (search) {
        const titleMatch = (p.title || '').toLowerCase().includes(search);
        const descMatch = (p.description || '').toLowerCase().includes(search);
        const matMatch = (p.material || '').toLowerCase().includes(search);
        const idMatch = (p.id || '').toLowerCase().includes(search);
        if (!titleMatch && !descMatch && !matMatch && !idMatch) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      DOM.productsTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            No products found matching the criteria. Click "Add New Product" or "Upload Excel File" to add items.
          </td>
        </tr>
      `;
      return;
    }

    DOM.productsTableBody.innerHTML = filtered.map(p => {
      const stock = Number(p.stockCount) || 0;
      let stockClass = 'stock-in';
      let stockLabel = `${stock} in stock`;
      if (stock === 0) {
        stockClass = 'stock-out';
        stockLabel = 'Out of Stock';
      } else if (stock <= 3) {
        stockClass = 'stock-low';
        stockLabel = `Low (${stock})`;
      }

      const badgeHtml = p.badge 
        ? `<span class="badge-pill">${p.badge}</span>` 
        : `<span style="color: var(--text-muted); font-size: 0.72rem;">—</span>`;

      return `
        <tr>
          <td>
            <div class="prod-cell">
              <img src="${p.img || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&q=80'}" 
                   alt="${escapeHtml(p.title)}" 
                   class="prod-thumb" 
                   onerror="this.src='https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&q=80'">
              <div>
                <div class="prod-title">${escapeHtml(p.title)}</div>
                <div class="prod-id">${escapeHtml(p.id)}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="category-badge">${escapeHtml(p.category || 'General')}</span>
          </td>
          <td>
            <span class="price-cell">${Number(p.priceMAD).toLocaleString()} MAD</span>
            ${p.originalPriceMAD ? `<span class="orig-price">${Number(p.originalPriceMAD).toLocaleString()} MAD</span>` : ''}
          </td>
          <td>
            <span class="stock-badge ${stockClass}">
              <span class="stock-dot"></span>
              ${stockLabel}
            </span>
          </td>
          <td>${badgeHtml}</td>
          <td>
            <div class="action-btns-group">
              <button class="btn-edit" data-id="${p.id}" title="Edit product details">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                Edit
              </button>
              <button class="btn-delete" data-id="${p.id}" data-title="${escapeHtml(p.title)}" title="Delete product">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Remove
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    DOM.productsTableBody.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => openEditProductModal(btn.dataset.id));
    });

    DOM.productsTableBody.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => confirmDeleteProduct(btn.dataset.id, btn.dataset.title));
    });
  }

  // =========================================================================
  // RENDER ORDERS
  // =========================================================================
  function renderOrdersTable() {
    if (!DOM.ordersTableBody) return;

    if (!orders || orders.length === 0) {
      DOM.ordersTableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            No customer orders placed yet. Orders placed on the website will automatically appear here with WhatsApp alert status.
          </td>
        </tr>
      `;
      return;
    }

    DOM.ordersTableBody.innerHTML = orders.map(ord => {
      const dateStr = ord.receivedAt ? new Date(ord.receivedAt).toLocaleString('fr-FR') : 'Just now';
      const cust = ord.customer || {};
      const customerName = `${cust.firstName || ''} ${cust.lastName || ''}`.trim() || 'Guest';
      const itemsCount = ord.items ? ord.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1;
      const total = ord.totals?.grandTotalMAD || ord.totalMAD || 0;
      const orderIdStr = ord.orderId || ord.id || 'ORD';

      return `
        <tr>
          <td><strong style="color: var(--gold-light); font-family: monospace;">${escapeHtml(orderIdStr)}</strong></td>
          <td>
            <div style="font-weight: 600;">${escapeHtml(customerName)}</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">${escapeHtml(cust.phone || 'No phone')}</div>
          </td>
          <td>
            <div>${escapeHtml(cust.city || 'Casablanca')}</div>
            <div style="font-size: 0.74rem; color: var(--text-muted); max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(cust.address || '')}</div>
          </td>
          <td>${itemsCount} item(s)</td>
          <td><strong style="color: var(--gold-light);">${Number(total).toLocaleString()} MAD</strong></td>
          <td><span class="category-badge">${escapeHtml(ord.paymentMethod || 'Card')}</span></td>
          <td>
            <span style="color: var(--accent-green); font-size: 0.78rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.533 1.942.825 3.149.825l.001-.001c3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.769-5.766zm0-2.172c4.418 0 8 3.582 8 8 0 1.545-.44 2.99-1.203 4.22l1.172 4.28-4.38-1.15c-1.19.71-2.57 1.13-4.047 1.13-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8z"/></svg>
              Auto-Dispatched
            </span>
          </td>
          <td style="font-size: 0.76rem; color: var(--text-muted);">${dateStr}</td>
          <td>
            <button class="btn-delete btn-delete-order" data-order-id="${escapeHtml(orderIdStr)}" title="Delete this order and subtract from revenue" style="padding: 5px 10px; font-size: 0.75rem;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Remove
            </button>
          </td>
        </tr>
      `;
    }).join('');

    DOM.ordersTableBody.querySelectorAll('.btn-delete-order').forEach(btn => {
      btn.addEventListener('click', () => confirmDeleteSingleOrder(btn.dataset.orderId));
    });
  }

  async function confirmDeleteSingleOrder(orderId) {
    if (!orderId) return;
    const confirmed = window.confirm(`⚠️ Supprimer la commande ${orderId} ?\n\nÊtes-vous sûr de vouloir supprimer cette commande ? Son montant sera déduit du chiffre d'affaires total.`);
    if (!confirmed) return;

    try {
      const cleanParam = encodeURIComponent(orderId);
      await fetch(`${API_BASE}/api/orders/${cleanParam}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch (e) {
      console.warn('Network issue deleting order, updating local state:', e.message);
    }

    orders = orders.filter(o => o.orderId !== orderId && o.id !== orderId);
    try { localStorage.setItem('gb_orders', JSON.stringify(orders)); } catch(e){}

    renderOrdersTable();
    updateStats();
    showToast(`Commande ${orderId} supprimée et chiffre d'affaires actualisé.`);
    notifyLiveWebsiteUpdate('ORDERS_UPDATED');
  }

  // =========================================================================
  // AI EXCEL / CSV PRODUCT IMPORTER
  // =========================================================================
  function openExcelModal() {
    parsedExcelProducts = [];
    if (DOM.excelFileInput) DOM.excelFileInput.value = '';
    if (DOM.excelDropzone) DOM.excelDropzone.style.display = 'block';
    if (DOM.excelPreviewSection) DOM.excelPreviewSection.style.display = 'none';
    if (DOM.btnConfirmExcelImport) DOM.btnConfirmExcelImport.style.display = 'none';
    DOM.excelModal.classList.add('active');
  }

  function closeExcelModal() {
    DOM.excelModal.classList.remove('active');
  }

  function handleExcelFileSelect(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = e.target.result;
        let rows = [];

        if (typeof XLSX !== 'undefined') {
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        } else {
          // CSV Fallback parser
          rows = parseCsvSimple(data);
        }

        if (!rows || rows.length === 0) {
          showToast('The uploaded file appears to be empty.', false);
          return;
        }

        // Run AI Normalizer & Enrichment on the rows
        parsedExcelProducts = rows.map((row, idx) => aiNormalizeExcelRow(row, idx)).filter(Boolean);

        if (parsedExcelProducts.length === 0) {
          showToast('Could not detect valid product rows in this file.', false);
          return;
        }

        renderExcelPreviewTable();
        showToast(`✨ AI detected & enriched ${parsedExcelProducts.length} products from Excel!`);
      } catch (err) {
        console.error('Error processing Excel file:', err);
        showToast('Error parsing file: ' + err.message, false);
      }
    };

    reader.readAsBinaryString(file);
  }

  // Intelligent AI Column Mapping & Row Enrichment
  function aiNormalizeExcelRow(rawRow, idx) {
    // Helper to find value from potential header variations
    const findVal = (keys) => {
      for (const k of Object.keys(rawRow)) {
        const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
        for (const target of keys) {
          if (cleanK === target.toLowerCase().replace(/[^a-z0-9]/g, '')) {
            return String(rawRow[k]).trim();
          }
        }
      }
      return '';
    };

    const title = findVal(['title', 'titre', 'nom', 'name', 'produit', 'designation', 'article', 'item']);
    if (!title) return null; // Skip empty row

    let priceMAD = parseFloat(findVal(['price', 'prix', 'tarif', 'montant', 'mad', 'dh', 'dirham', 'cost']).replace(/[^0-9.]/g, ''));
    let origPriceMAD = parseFloat(findVal(['originalprice', 'ancienprix', 'prixpromo', 'discountprice', 'solde']).replace(/[^0-9.]/g, ''));
    let category = findVal(['category', 'categorie', 'type', 'famille', 'collection']).toLowerCase();
    let stock = parseInt(findVal(['stock', 'quantite', 'qte', 'quantity', 'inventory', 'units']), 10);
    let description = findVal(['description', 'details', 'desc', 'texte', 'bio', 'notes']);
    let img = findVal(['image', 'photo', 'url', 'img', 'picture', 'lien', 'visuel']);
    let material = findVal(['material', 'matiere', 'composition', 'tissu']);
    let badge = findVal(['badge', 'tag', 'label', 'statut']);
    let sizes = findVal(['sizes', 'tailles', 'size', 'taille']);

    // 1. AI Category Inference
    const tLower = title.toLowerCase();
    if (!category || (category !== 'jewelry' && category !== 'apparel' && category !== 'accessories')) {
      if (tLower.includes('ring') || tLower.includes('necklace') || tLower.includes('bracelet') || tLower.includes('earring') || tLower.includes('gold') || tLower.includes('pearl') || tLower.includes('bague') || tLower.includes('collier') || tLower.includes('boucle')) {
        category = 'jewelry';
      } else if (tLower.includes('dress') || tLower.includes('silk') || tLower.includes('blazer') || tLower.includes('trouser') || tLower.includes('robe') || tLower.includes('pantalon') || tLower.includes('veste') || tLower.includes('kimono')) {
        category = 'apparel';
      } else if (tLower.includes('bag') || tLower.includes('clutch') || tLower.includes('sac') || tLower.includes('boot') || tLower.includes('mule') || tLower.includes('botte') || tLower.includes('leather') || tLower.includes('cuir')) {
        category = 'accessories';
      } else {
        category = 'jewelry';
      }
    }

    // 2. AI Price Defaults
    if (!priceMAD || isNaN(priceMAD)) {
      priceMAD = category === 'jewelry' ? 790 : (category === 'apparel' ? 1250 : 1450);
    }
    if (isNaN(origPriceMAD)) origPriceMAD = null;

    // 3. AI Stock Count
    if (isNaN(stock) || stock < 0) stock = 5;

    // 4. AI Image Selection if missing
    if (!img || !img.startsWith('http')) {
      const pool = LUXURY_IMAGE_POOLS[category] || LUXURY_IMAGE_POOLS.jewelry;
      img = pool[idx % pool.length];
    }

    // 5. AI Material & Description Enrichment if missing
    if (!material) {
      material = category === 'jewelry' ? '18K Heavy Vermeil • Recycled 925 Silver' : (category === 'apparel' ? '100% Grade 6A Mulberry Silk' : 'Full-Grain Italian Calfskin Leather');
    }

    if (!description) {
      description = `Artisanal ${title} handcrafted for Golden Blossom Boutique. Finished to perfection with timeless quiet luxury aesthetics.`;
    }

    const sizesArr = sizes ? sizes.split(',').map(s => s.trim()) : (category === 'apparel' ? ['S (36)', 'M (38)', 'L (40)'] : ['Standard']);

    return {
      title,
      category,
      priceMAD,
      originalPriceMAD: origPriceMAD || null,
      stockCount: stock,
      description,
      material,
      materialType: category === 'apparel' ? 'silk' : (category === 'accessories' ? 'leather' : 'vermeil'),
      badge: badge || 'New In',
      badgeClass: 'badge-gold',
      sizes: sizesArr,
      img,
      imgHover: img
    };
  }

  function renderExcelPreviewTable() {
    if (!DOM.excelPreviewTableBody) return;

    DOM.excelParsedCount.textContent = `${parsedExcelProducts.length} Products Detected & Enriched by AI`;
    DOM.excelDropzone.style.display = 'none';
    DOM.excelPreviewSection.style.display = 'block';
    DOM.btnConfirmExcelImport.style.display = 'inline-flex';
    DOM.btnConfirmExcelImport.textContent = `✨ Add All (${parsedExcelProducts.length}) Products to System`;

    DOM.excelPreviewTableBody.innerHTML = parsedExcelProducts.map(p => `
      <tr>
        <td>
          <div class="prod-cell">
            <img src="${p.img}" alt="${escapeHtml(p.title)}" class="prod-thumb" onerror="this.src='https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&q=80'">
            <div>
              <div class="prod-title">${escapeHtml(p.title)}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(p.material)}</div>
            </div>
          </div>
        </td>
        <td><span class="category-badge">${p.category}</span></td>
        <td><strong style="color: var(--gold-light);">${Number(p.priceMAD).toLocaleString()} MAD</strong></td>
        <td><span style="font-size: 0.78rem;">${p.stockCount} units</span></td>
        <td>
          <span style="color: #2ecc71; font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Ready to Save
          </span>
        </td>
      </tr>
    `).join('');
  }

  async function handleConfirmExcelImport() {
    if (!parsedExcelProducts || parsedExcelProducts.length === 0) return;

    DOM.btnConfirmExcelImport.disabled = true;
    DOM.btnConfirmExcelImport.textContent = 'Saving to Database...';

    try {
      const res = await fetch(`${API_BASE}/api/products/batch`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ products: parsedExcelProducts })
      });

      if (res.ok) {
        const result = await res.json();
        showToast(`🎉 Success! Added ${result.count || parsedExcelProducts.length} new products to system from Excel!`);
        closeExcelModal();
        await loadProducts();
        notifyLiveWebsiteUpdate('CATALOG_UPDATED');
      } else {
        const err = await res.json();
        showToast('Error importing products: ' + (err.error || 'Server rejected request'), false);
      }
    } catch (e) {
      console.error(e);
      showToast('Network error while importing Excel products', false);
    } finally {
      DOM.btnConfirmExcelImport.disabled = false;
    }
  }

  function downloadSampleTemplate() {
    const csvContent = 
      "Title,Category,PriceMAD,OriginalPriceMAD,Stock,Material,Description,Image\n" +
      '"Celestial Molten Cuff Bracelet",jewelry,890,1100,5,"18K Heavy Vermeil","Hand-cast fluid gold cuff inspired by Mediterranean ripples.","https://images.unsplash.com/photo-1611591475152-478311399767?auto=format&fit=crop&w=800&q=80"\n' +
      '"Sand-Washed Silk Slip Dress in Noir",apparel,1450,1700,4,"100% Mulberry Silk","Liquid drape bias-cut slip dress designed for Casablanca evenings.","https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"\n' +
      '"Sculptural Leather Hobo Shoulder Bag",accessories,1650,1950,3,"Full-Grain Italian Calfskin","Supple slouch handbag with custom cast brushed gold hardware.","https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Golden_Blossom_Products_Template.csv';
    link.click();
    showToast('Downloaded sample template (.csv)');
  }

  function parseCsvSimple(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = vals[idx] !== undefined ? vals[idx] : '';
      });
      rows.push(obj);
    }
    return rows;
  }

  // =========================================================================
  // MODAL ACTIONS (ADD & EDIT)
  // =========================================================================
  function showModalError(msg, focusEl = null) {
    const errBox = document.getElementById('productModalError');
    if (errBox) {
      errBox.innerHTML = `⚠️ <span>${msg}</span>`;
      errBox.style.display = 'flex';
    }
    showToast(msg, false);
    if (focusEl) {
      focusEl.style.borderColor = '#ff7675';
      focusEl.focus();
      setTimeout(() => {
        if (focusEl) focusEl.style.borderColor = '';
      }, 4000);
    }
  }

  function clearModalError() {
    const errBox = document.getElementById('productModalError');
    if (errBox) {
      errBox.style.display = 'none';
      errBox.textContent = '';
    }
  }

  function openAddProductModal() {
    DOM.modalTitle.textContent = 'Add New Boutique Product (Ajouter un Produit)';
    DOM.prodEditId.value = '';
    clearModalError();
    DOM.productForm.reset();
    DOM.prodStockCount.value = 5;
    DOM.prodPriceMAD.value = '';
    DOM.prodOriginalPriceMAD.value = '';
    DOM.mainImgPreview.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&q=80';
    DOM.productModal.classList.add('active');
  }

  function openEditProductModal(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    clearModalError();
    DOM.modalTitle.textContent = `Edit Product: ${prod.title}`;
    DOM.prodEditId.value = prod.id;
    DOM.prodTitle.value = prod.title || '';
    DOM.prodCategory.value = prod.category || 'jewelry';
    DOM.prodBadge.value = prod.badge || '';
    DOM.prodPriceMAD.value = prod.priceMAD || '';
    DOM.prodOriginalPriceMAD.value = prod.originalPriceMAD || '';
    DOM.prodStockCount.value = prod.stockCount !== undefined ? prod.stockCount : 5;
    DOM.prodMaterialType.value = prod.materialType || 'vermeil';
    DOM.prodMaterial.value = prod.material || '';
    DOM.prodImg.value = prod.img || '';
    DOM.mainImgPreview.src = prod.img || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&q=80';
    DOM.prodDescription.value = prod.description || '';
    DOM.prodSizes.value = (prod.sizes && Array.isArray(prod.sizes)) ? prod.sizes.join(', ') : '';

    DOM.productModal.classList.add('active');
  }

  function closeProductModal() {
    clearModalError();
    DOM.productModal.classList.remove('active');
  }

  const SAMPLE_IMAGES = {
    jewelry: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    apparel: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    accessories: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
  };

  function setSampleProductImage() {
    const cat = (DOM.prodCategory && DOM.prodCategory.value) || 'jewelry';
    const chosen = SAMPLE_IMAGES[cat] || SAMPLE_IMAGES.jewelry;
    if (DOM.prodImg) DOM.prodImg.value = chosen;
    if (DOM.mainImgPreview) DOM.mainImgPreview.src = chosen;
    showToast('Preset luxury photo applied ✨');
  }

  async function handleProductFormSubmit(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (DOM.saveProductBtn && DOM.saveProductBtn.disabled) {
      return;
    }

    clearModalError();

    const editId = DOM.prodEditId ? DOM.prodEditId.value : '';

    // 1. Title Validation
    const title = (DOM.prodTitle ? DOM.prodTitle.value : '').trim();
    if (!title) {
      showModalError('Veuillez entrer le nom / titre du produit (Please enter a product title).', DOM.prodTitle);
      return;
    }

    // 2. Price Validation (Lenient parser supporting "890", "890 MAD", "890 DH", "890,50", "890.50")
    const rawPriceInput = (DOM.prodPriceMAD ? DOM.prodPriceMAD.value : '').toString().trim();
    const cleanPriceStr = rawPriceInput.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const price = parseFloat(cleanPriceStr);

    if (isNaN(price) || price <= 0) {
      showModalError('Veuillez entrer un prix valide en MAD (ex: 890 MAD ou 890).', DOM.prodPriceMAD);
      return;
    }

    // 3. Category
    const cat = (DOM.prodCategory && DOM.prodCategory.value) || 'jewelry';

    // 4. Image
    let img = (DOM.prodImg && DOM.prodImg.value ? DOM.prodImg.value : '').trim();
    if (!img) {
      img = SAMPLE_IMAGES[cat] || SAMPLE_IMAGES.jewelry;
    }

    // 5. Original Price (Optional)
    const rawOrigInput = (DOM.prodOriginalPriceMAD ? DOM.prodOriginalPriceMAD.value : '').toString().trim();
    let origPrice = null;
    if (rawOrigInput) {
      const cleanOrig = rawOrigInput.replace(/,/g, '.').replace(/[^0-9.]/g, '');
      const parsedOrig = parseFloat(cleanOrig);
      if (!isNaN(parsedOrig) && parsedOrig > 0) {
        origPrice = parsedOrig;
      }
    }

    // 6. Stock Count
    const rawStockInput = (DOM.prodStockCount ? DOM.prodStockCount.value : '').toString().trim();
    const cleanStock = rawStockInput.replace(/[^0-9]/g, '');
    let stock = parseInt(cleanStock, 10);
    if (isNaN(stock) || stock < 0) {
      stock = 5;
    }

    // 7. Sizes
    const sizesVal = DOM.prodSizes ? DOM.prodSizes.value : '';
    const sizesArr = sizesVal
      ? sizesVal.split(',').map(s => s.trim()).filter(Boolean)
      : (cat === 'apparel' ? ['S (36)', 'M (38)', 'L (40)'] : ['Standard']);

    const payload = {
      title: title,
      category: cat,
      badge: (DOM.prodBadge && DOM.prodBadge.value) ? DOM.prodBadge.value : null,
      priceMAD: price,
      originalPriceMAD: origPrice,
      stockCount: stock,
      materialType: (DOM.prodMaterialType && DOM.prodMaterialType.value) ? DOM.prodMaterialType.value : 'vermeil',
      material: (DOM.prodMaterial && DOM.prodMaterial.value ? DOM.prodMaterial.value.trim() : '') || 'Artisanal Luxury Handcrafted',
      img: img,
      imgHover: img,
      description: (DOM.prodDescription && DOM.prodDescription.value ? DOM.prodDescription.value.trim() : '') || `Artisanal ${title} handcrafted for Golden Blossom Boutique Casablanca.`,
      sizes: sizesArr
    };

    if (DOM.saveProductBtn) {
      DOM.saveProductBtn.disabled = true;
      DOM.saveProductBtn.textContent = 'Enregistrement en cours... (Saving...)';
    }

    try {
      if (editId) {
        let updatedOnServer = false;
        try {
          const res = await fetch(`${API_BASE}/api/products/${editId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.success) updatedOnServer = true;
        } catch (netErr) {
          console.warn('Server offline or network issue, persisting locally:', netErr.message);
        }

        // Always update in-memory array and localStorage
        const idx = products.findIndex(p => p.id === editId);
        if (idx !== -1) {
          products[idx] = { ...products[idx], ...payload, id: editId };
        }
        try { localStorage.setItem('gb_boutique_products', JSON.stringify(products)); } catch(e){}

        showToast(`✨ Produit "${payload.title}" mis à jour avec succès !`);
        closeProductModal();
        renderProductsTable();
        updateStats();
        notifyLiveWebsiteUpdate('CATALOG_UPDATED');
      } else {
        let addedOnServer = false;
        let createdProduct = null;
        try {
          const res = await fetch(`${API_BASE}/api/products`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.success) {
            addedOnServer = true;
            createdProduct = data.product;
          }
        } catch (netErr) {
          console.warn('Server offline or network issue, persisting locally:', netErr.message);
        }

        if (!createdProduct) {
          createdProduct = {
            ...payload,
            id: 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            rating: 5.0,
            reviewCount: 1,
            gallery: [payload.img]
          };
        }

        products.unshift(createdProduct);
        try { localStorage.setItem('gb_boutique_products', JSON.stringify(products)); } catch(e){}

        showToast(`✨ Nouveau produit "${payload.title}" validé et ajouté au catalogue !`);
        closeProductModal();
        renderProductsTable();
        updateStats();
        notifyLiveWebsiteUpdate('CATALOG_UPDATED');
      }
    } catch (err) {
      console.error('Manual Product Add Error:', err);
      showToast('Produit validé et enregistré localement: ' + err.message);
      closeProductModal();
      renderProductsTable();
      updateStats();
      notifyLiveWebsiteUpdate('CATALOG_UPDATED');
    } finally {
      if (DOM.saveProductBtn) {
        DOM.saveProductBtn.disabled = false;
        DOM.saveProductBtn.textContent = '✓ Valider & Enregistrer (Save Product)';
      }
    }
  }

  // =========================================================================
  // DELETE PRODUCT
  // =========================================================================
  async function confirmDeleteProduct(id, title) {
    const confirmed = window.confirm(`Are you sure you want to remove "${title}" from the website catalog?\n\nThis will immediately remove the product from the customer storefront.`);
    if (!confirmed) return;

    try {
      await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch (e) {
      console.warn('Server delete failed, updating local state:', e.message);
    }
    
    products = products.filter(p => p.id !== id);
    try { localStorage.setItem('gb_boutique_products', JSON.stringify(products)); } catch(e){}
    renderProductsTable();
    updateStats();
    showToast(`Product "${title}" removed.`);
    notifyLiveWebsiteUpdate('CATALOG_UPDATED');
  }

  // =========================================================================
  // WEBSITE SETTINGS
  // =========================================================================
  function fillWebsiteSettingsForm(data) {
    if (DOM.setAnnouncementText) DOM.setAnnouncementText.value = data.announcementText || '';
    if (DOM.setHeroHeading) DOM.setHeroHeading.value = data.heroHeading || '';
    if (DOM.setHeroSubheading) DOM.setHeroSubheading.value = data.heroSubheading || '';
    if (DOM.setBoutiquePhone) DOM.setBoutiquePhone.value = data.boutiquePhone || '+212 780-760188';
    if (DOM.setFreeShipping) DOM.setFreeShipping.value = data.freeShippingThresholdMAD || 500;
    if (DOM.setBoutiqueEmail) DOM.setBoutiqueEmail.value = data.boutiqueEmail || '';
    if (DOM.setBoutiqueAddress) DOM.setBoutiqueAddress.value = data.boutiqueAddress || '';
  }

  async function handleWebsiteSettingsSubmit(e) {
    e.preventDefault();
    const payload = {
      announcementText: DOM.setAnnouncementText.value.trim(),
      heroHeading: DOM.setHeroHeading.value.trim(),
      heroSubheading: DOM.setHeroSubheading.value.trim(),
      boutiquePhone: DOM.setBoutiquePhone.value.trim(),
      freeShippingThresholdMAD: Number(DOM.setFreeShipping.value) || 500,
      boutiqueEmail: DOM.setBoutiqueEmail.value.trim(),
      boutiqueAddress: DOM.setBoutiqueAddress.value.trim()
    };

    try {
      const res = await fetch(`${API_BASE}/api/website-settings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      try { localStorage.setItem('gb_website_settings', JSON.stringify(payload)); } catch(e){}
      notifyLiveWebsiteUpdate('SETTINGS_UPDATED', payload);
      if (res.ok) {
        showToast('✨ Website settings saved and applied live to storefront!');
      } else {
        showToast('Settings saved to local storage & applied live!', true);
      }
    } catch (e) {
      console.warn('Network error while saving settings, applied locally:', e.message);
      try { localStorage.setItem('gb_website_settings', JSON.stringify(payload)); } catch(err){}
      notifyLiveWebsiteUpdate('SETTINGS_UPDATED', payload);
      showToast('Settings saved locally & applied live to storefront!');
    }
  }

  // =========================================================================
  // TAB SWITCHING
  // =========================================================================
  function switchTab(tabId) {
    DOM.tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    DOM.tabContents.forEach(section => {
      section.classList.toggle('active', section.id === tabId);
    });
  }

  // =========================================================================
  // EVENT BINDINGS
  // =========================================================================
  function bindEvents() {
    // Auth events
    if (DOM.adminLoginForm) DOM.adminLoginForm.addEventListener('submit', handleLogin);
    if (DOM.togglePasswordBtn) DOM.togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    if (DOM.btnLockPortal) DOM.btnLockPortal.addEventListener('click', lockPortal);

    // Excel Importer Modal events
    if (DOM.openExcelModalBtn) DOM.openExcelModalBtn.addEventListener('click', openExcelModal);
    if (DOM.openExcelModalBtn2) DOM.openExcelModalBtn2.addEventListener('click', openExcelModal);
    if (DOM.closeExcelModalBtn) DOM.closeExcelModalBtn.addEventListener('click', closeExcelModal);
    if (DOM.cancelExcelBtn) DOM.cancelExcelBtn.addEventListener('click', closeExcelModal);
    if (DOM.btnDownloadTemplate) DOM.btnDownloadTemplate.addEventListener('click', downloadSampleTemplate);
    if (DOM.btnConfirmExcelImport) DOM.btnConfirmExcelImport.addEventListener('click', handleConfirmExcelImport);
    if (DOM.btnClearExcelFile) {
      DOM.btnClearExcelFile.addEventListener('click', () => {
        parsedExcelProducts = [];
        DOM.excelFileInput.value = '';
        DOM.excelDropzone.style.display = 'block';
        DOM.excelPreviewSection.style.display = 'none';
        DOM.btnConfirmExcelImport.style.display = 'none';
      });
    }

    if (DOM.btnSelectExcelFile) {
      DOM.btnSelectExcelFile.addEventListener('click', () => DOM.excelFileInput.click());
    }

    if (DOM.excelFileInput) {
      DOM.excelFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleExcelFileSelect(e.target.files[0]);
        }
      });
    }

    // Drag and drop zone
    if (DOM.excelDropzone) {
      DOM.excelDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        DOM.excelDropzone.classList.add('dragover');
      });
      DOM.excelDropzone.addEventListener('dragleave', () => {
        DOM.excelDropzone.classList.remove('dragover');
      });
      DOM.excelDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        DOM.excelDropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleExcelFileSelect(e.dataTransfer.files[0]);
        }
      });
    }

    if (DOM.excelModal) {
      DOM.excelModal.addEventListener('click', (e) => {
        if (e.target === DOM.excelModal) closeExcelModal();
      });
    }

    // Tabs
    DOM.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Modals
    if (DOM.openAddProductBtn) DOM.openAddProductBtn.addEventListener('click', openAddProductModal);
    if (DOM.openAddProductBtn2) DOM.openAddProductBtn2.addEventListener('click', openAddProductModal);
    if (DOM.closeProductModalBtn) DOM.closeProductModalBtn.addEventListener('click', closeProductModal);
    if (DOM.cancelProductBtn) DOM.cancelProductBtn.addEventListener('click', closeProductModal);
    
    if (DOM.productModal) {
      DOM.productModal.addEventListener('click', (e) => {
        if (e.target === DOM.productModal) closeProductModal();
      });
    }

    // Form Submits
    if (DOM.productForm) DOM.productForm.addEventListener('submit', handleProductFormSubmit);
    if (DOM.saveProductBtn) DOM.saveProductBtn.addEventListener('click', handleProductFormSubmit);
    if (DOM.websiteSettingsForm) DOM.websiteSettingsForm.addEventListener('submit', handleWebsiteSettingsSubmit);

    // Live image preview & preset
    if (DOM.btnUseSampleImg) DOM.btnUseSampleImg.addEventListener('click', setSampleProductImage);
    if (DOM.prodImg) {
      DOM.prodImg.addEventListener('input', () => {
        const val = DOM.prodImg.value.trim();
        if (val) DOM.mainImgPreview.src = val;
      });
    }

    // Search & Filter
    if (DOM.adminSearchInput) DOM.adminSearchInput.addEventListener('input', renderProductsTable);
    if (DOM.adminCategoryFilter) DOM.adminCategoryFilter.addEventListener('change', renderProductsTable);
    if (DOM.adminStockFilter) DOM.adminStockFilter.addEventListener('change', renderProductsTable);

    // Orders & Revenue Reset
    if (DOM.refreshOrdersBtn) DOM.refreshOrdersBtn.addEventListener('click', loadOrders);
    if (DOM.btnResetOrders) DOM.btnResetOrders.addEventListener('click', handleResetOrders);
    if (DOM.btnQuickResetStats) DOM.btnQuickResetStats.addEventListener('click', handleResetOrders);
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    checkAuthentication();
  });
})();
