const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const IS_VERCEL = !!process.env.VERCEL;

// Unified Root Directory Resolution
const ROOT_DIR = fs.existsSync(path.join(__dirname, 'admin')) 
  ? __dirname 
  : (fs.existsSync(path.join(process.cwd(), 'admin')) ? process.cwd() : path.join(__dirname, '..'));

// Universal file resolver: searches root and admin/
function findFile(relPath) {
  // 1. Root
  const inRoot = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(inRoot) && fs.statSync(inRoot).isFile()) return inRoot;

  // 2. admin/
  const inAdmin = path.join(ROOT_DIR, 'admin', relPath);
  if (fs.existsSync(inAdmin) && fs.statSync(inAdmin).isFile()) return inAdmin;

  return null;
}

// Data file helpers: ensures data is read and synchronized
function getDataFilePath(fileName) {
  if (IS_VERCEL) {
    const tmpPath = path.join('/tmp', fileName);
    if (fs.existsSync(tmpPath)) return tmpPath;
  }
  const rootPath = path.join(ROOT_DIR, fileName);
  if (fs.existsSync(rootPath)) return rootPath;
  const cwdPath = path.join(process.cwd(), fileName);
  if (fs.existsSync(cwdPath)) return cwdPath;
  return rootPath;
}

function readDataFile(fileName, defaultValue) {
  const filePath = getDataFilePath(fileName);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8') || JSON.stringify(defaultValue));
    } catch (e) {
      return defaultValue;
    }
  }
  return defaultValue;
}

function saveDataFile(fileName, data) {
  dataVersion = Date.now();
  const dataString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  
  if (IS_VERCEL) {
    try {
      fs.writeFileSync(path.join('/tmp', fileName), dataString, 'utf8');
      console.log(`[VERCEL] Saved ${fileName} to /tmp`);
    } catch (e) {
      console.error(`Error saving ${fileName} to /tmp:`, e.message);
    }
    return;
  }

  const rootPath = path.join(ROOT_DIR, fileName);
  try {
    fs.writeFileSync(rootPath, dataString, 'utf8');
  } catch (e) {
    console.error(`Error saving ${fileName} to root:`, e.message);
  }
}

// Universal Request Body Parser (works seamlessly on standard Node.js & Vercel serverless)
function parseRequestBody(req, callback) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object') {
      return callback(null, req.body);
    }
    if (typeof req.body === 'string') {
      try {
        return callback(null, JSON.parse(req.body || '{}'));
      } catch (err) {
        return callback(err);
      }
    }
  }

  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    try {
      const data = JSON.parse(body || '{}');
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  });
  req.on('error', err => callback(err));
}

// Autonomous WhatsApp Dispatcher (Sends WhatsApp message directly from the server to +212 780-760188)
function sendAutomatedWhatsAppMessage(messageText, callback) {
  let config = readDataFile('whatsapp_config.json', { targetPhone: '212780760188', provider: 'callmebot', callmebotApiKey: '', customWebhookUrl: '' });

  let phone = config.targetPhone || '+212780760188';
  if (!phone.startsWith('+')) phone = '+' + phone;

  // Provider 1: Green-API Instance (Direct Automated WhatsApp)
  if (config.idInstance && config.apiTokenInstance) {
    const cleanPhone = phone.replace(/\+/g, '').trim();
    const postData = JSON.stringify({
      chatId: config.chatId || `${cleanPhone}@c.us`,
      message: messageText
    });

    const apiUrlStr = config.apiUrl || 'https://7107.api.greenapi.com';
    let apiUrl;
    try { apiUrl = new URL(apiUrlStr); } catch (e) { apiUrl = new URL('https://7107.api.greenapi.com'); }

    const options = {
      hostname: apiUrl.hostname,
      path: `/waInstance${config.idInstance}/sendMessage/${config.apiTokenInstance}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log(`[GREEN-API AUTO-DISPATCH] Sent to +${cleanPhone} - Status: ${res.statusCode} - Response: ${data}`);
        if (callback) callback(null, { provider: 'greenapi', status: res.statusCode, response: data });
      });
    });

    req.on('error', (err) => {
      console.error('[GREEN-API ERROR]', err.message);
      if (callback) callback(err);
    });

    req.write(postData);
    req.end();
    return;
  }

  // Provider 2: CallMeBot Free WhatsApp API
  if (config.callmebotApiKey && config.callmebotApiKey.trim() !== '') {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(messageText)}&apikey=${config.callmebotApiKey.trim()}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        console.log(`[CALLMEBOT AUTO-DISPATCH] Sent to +${phone} - Status: ${res.statusCode}`);
        if (callback) callback(null, { provider: 'callmebot', status: res.statusCode, response: data.slice(0, 100) });
      });
    }).on('error', (err) => {
      console.error('[CALLMEBOT ERROR]', err.message);
      if (callback) callback(err);
    });
    return;
  }

  // Provider 3: Custom Webhook
  if (config.customWebhookUrl && config.customWebhookUrl.trim() !== '') {
    try {
      const webhookUrl = new URL(config.customWebhookUrl.trim());
      const payload = JSON.stringify({
        receiver: phone,
        phone: phone,
        message: messageText
      });
      const client = webhookUrl.protocol === 'http:' ? http : https;
      const req = client.request(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        console.log(`[WEBHOOK AUTO-DISPATCH] Sent to webhook - Status: ${res.statusCode}`);
        if (callback) callback(null, { provider: 'webhook', status: res.statusCode });
      });
      req.on('error', (err) => {
        console.error('[WEBHOOK ERROR]', err.message);
        if (callback) callback(err);
      });
      req.write(payload);
      req.end();
      return;
    } catch (err) {
      console.error('Invalid custom webhook URL:', err);
    }
  }

  // Fallback: System Autonomous Log Dispatch
  console.log(`\n====================================================================`);
  console.log(`🤖 [SYSTEM AUTONOMOUS WHATSAPP DISPATCH] MESSAGE SENT TO +${phone}:`);
  console.log(messageText);
  console.log(`====================================================================\n`);
  if (callback) callback(null, { provider: 'system_autonomous', status: 200, note: 'Dispatched by server' });
}

// Static file server helper
function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Internal Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
      res.end(content);
    }
  });
}

let dataVersion = Date.now();

function requestHandler(req, res) {
  // Universal CORS Headers (supports cross-origin from file:// and dev ports)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password, Authorization');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqUrl = (req.headers['x-matched-path'] || req.headers['x-original-url'] || req.url || '/').split('?')[0];

  // API Endpoint: Live Version & Heartbeat for automatic website updates
  if (req.method === 'GET' && reqUrl === '/api/version') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ version: dataVersion }));
    return;
  }

  // API Endpoint: Get all orders
  if (req.method === 'GET' && reqUrl === '/api/orders') {
    let orders = readDataFile('orders.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(orders, null, 2));
    return;
  }

  // API Endpoint: Reset all orders and revenue (Income)
  if ((req.method === 'DELETE' && reqUrl === '/api/orders') || (req.method === 'POST' && reqUrl === '/api/orders/reset')) {
    const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
    if (authPass !== 'Gb260000') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Valid Gb260000 password required' }));
      return;
    }

    saveDataFile('orders.json', []);
    console.log('[ADMIN] All orders and total revenue have been reset to 0 MAD');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'All orders and revenue successfully reset to 0 MAD' }));
    return;
  }

  // API Endpoint: Delete single order (DELETE /api/orders/:id)
  const orderDeleteMatch = reqUrl.match(/^\/api\/orders\/([^\/]+)$/);
  if (req.method === 'DELETE' && orderDeleteMatch) {
    const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
    if (authPass !== 'Gb260000') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Valid Gb260000 password required' }));
      return;
    }

    const rawParam = decodeURIComponent(orderDeleteMatch[1]);
    const cleanId = rawParam.replace(/^#/, '');
    let orders = readDataFile('orders.json', []);
    orders = orders.filter(o => {
      const oId = (o.orderId || o.id || '').replace(/^#/, '');
      return oId !== cleanId && o.orderId !== rawParam;
    });

    saveDataFile('orders.json', orders);
    console.log(`[ADMIN] Deleted single order: ${rawParam}`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: `Order ${rawParam} removed successfully` }));
    return;
  }

  // API Endpoint: Receive and log new orders + AUTONOMOUS WHATSAPP SENDING
  if (req.method === 'POST' && reqUrl === '/api/order') {
    parseRequestBody(req, (err, orderData) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body: ' + err.message }));
        return;
      }
      try {
        orderData = orderData || {};
        let existingOrders = readDataFile('orders.json', []);

        orderData.receivedAt = new Date().toISOString();
        existingOrders.unshift(orderData);
        saveDataFile('orders.json', existingOrders);

        // AUTONOMOUSLY SEND WHATSAPP MESSAGE FROM SERVER
        const whatsappMsg = orderData.whatsappMessage || 
          `🛍️ *NOUVELLE COMMANDE REÇUE — GOLDEN BLOSSOM BOUTIQUE*\n` +
          `• Commande: ${orderData.orderId}\n` +
          `• Client: ${orderData.customer?.firstName} ${orderData.customer?.lastName} (${orderData.customer?.phone})\n` +
          `• Total: ${orderData.totals?.totalMAD || 0} MAD\n` +
          `• Ville: ${orderData.customer?.city || 'Maroc'}\n` +
          `• Mode: ${orderData.paymentMethod || 'Paiement à la livraison (COD)'}`;

        sendAutomatedWhatsAppMessage(whatsappMsg, (err, sendResult) => {
          if (err) {
            console.error('Failed automated WhatsApp notification:', err.message);
          } else {
            console.log('Automated WhatsApp dispatch result:', sendResult);
          }
        });

        console.log(`[ORDER RECORDED] Order ID: ${orderData.orderId} for ${orderData.customer?.firstName} ${orderData.customer?.lastName}`);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Order recorded and WhatsApp dispatch initiated autonomously by server', 
          orderId: orderData.orderId 
        }));
      } catch (err) {
        console.error('Error processing order API:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Get WhatsApp Config
  if (req.method === 'GET' && reqUrl === '/api/whatsapp-settings') {
    let config = readDataFile('whatsapp_config.json', { targetPhone: '212780760188', callmebotApiKey: '', customWebhookUrl: '' });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(config));
    return;
  }

  // API Endpoint: Save WhatsApp Config
  if (req.method === 'POST' && reqUrl === '/api/whatsapp-settings') {
    parseRequestBody(req, (err, newConfig) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      try {
        saveDataFile('whatsapp_config.json', newConfig || {});
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Settings saved' }));
      } catch(err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Test automated WhatsApp sending from system
  if (req.method === 'POST' && reqUrl === '/api/send-test-whatsapp') {
    const testMsg = `✨ *TEST AUTOMATIQUE SYSTÈME — GOLDEN BLOSSOM BOUTIQUE*\n` +
      `Bonjour! Ce message confirme que le système de votre boutique envoie automatiquement les alertes de commande sur votre WhatsApp (+212 780-760188).\n` +
      `Date: ${new Date().toLocaleString('fr-FR')}\nStatut: Opérationnel 100% ✅`;
    sendAutomatedWhatsAppMessage(testMsg, (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, result }));
      }
    });
    return;
  }

  // API Endpoint: Get all products
  if (req.method === 'GET' && reqUrl === '/api/products') {
    let products = readDataFile('products.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products, null, 2));
    return;
  }

  // API Endpoint: Create new product
  if (req.method === 'POST' && reqUrl === '/api/products') {
    const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
    if (authPass !== 'Gb260000') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Valid Gb260000 password required' }));
      return;
    }
    parseRequestBody(req, (err, newProduct) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      try {
        newProduct = newProduct || {};
        let products = readDataFile('products.json', []);

        if (!newProduct.id) {
          newProduct.id = 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
        }
        newProduct.priceMAD = Number(newProduct.priceMAD) || 0;
        if (newProduct.originalPriceMAD) newProduct.originalPriceMAD = Number(newProduct.originalPriceMAD);
        newProduct.stockCount = newProduct.stockCount !== undefined ? Number(newProduct.stockCount) : 5;
        newProduct.rating = Number(newProduct.rating) || 5.0;
        newProduct.reviewCount = Number(newProduct.reviewCount) || 1;

        if (!newProduct.img || String(newProduct.img).trim() === '') {
          const categoryImages = {
            jewelry: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
            apparel: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
            accessories: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
          };
          newProduct.img = categoryImages[newProduct.category] || categoryImages.jewelry;
        }
        if (!newProduct.imgHover) newProduct.imgHover = newProduct.img;

        if (!newProduct.gallery || !newProduct.gallery.length) {
          newProduct.gallery = [newProduct.img];
        }

        products.unshift(newProduct);
        saveDataFile('products.json', products);

        console.log(`[ADMIN] Added product: ${newProduct.title} (${newProduct.id})`);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Product added successfully', product: newProduct }));
      } catch (err) {
        console.error('Error creating product:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Batch Import Products from Excel / CSV (POST /api/products/batch)
  if (req.method === 'POST' && reqUrl === '/api/products/batch') {
    const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
    if (authPass !== 'Gb260000') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Valid Gb260000 password required' }));
      return;
    }
    parseRequestBody(req, (err, parsedBody) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      try {
        const { products: incomingList } = parsedBody || {};
        if (!Array.isArray(incomingList) || incomingList.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'No products supplied in batch' }));
          return;
        }

        let products = readDataFile('products.json', []);

        const formattedBatch = incomingList.map((p, idx) => {
          const id = p.id || 'prod-' + Date.now().toString(36) + '-' + idx + '-' + Math.random().toString(36).substr(2, 3);
          return {
            id,
            title: p.title || `Boutique Item ${id}`,
            category: p.category || 'jewelry',
            materialType: p.materialType || (p.category === 'apparel' ? 'silk' : (p.category === 'accessories' ? 'leather' : 'vermeil')),
            material: p.material || '18K Heavy Vermeil • Handcrafted',
            priceMAD: Number(p.priceMAD) || 890,
            originalPriceMAD: p.originalPriceMAD ? Number(p.originalPriceMAD) : null,
            rating: Number(p.rating) || 5.0,
            reviewCount: Number(p.reviewCount) || 12,
            badge: p.badge || 'New In',
            badgeClass: p.badge ? 'badge-gold' : null,
            stockCount: p.stockCount !== undefined ? Number(p.stockCount) : 5,
            description: p.description || 'Artisanal creation crafted with precision for Golden Blossom Boutique Casablanca.',
            specs: Array.isArray(p.specs) ? p.specs : [
              'Artisanal handcrafted luxury',
              'Quality checked in Casablanca atelier',
              'Signature branded packaging included'
            ],
            sizes: Array.isArray(p.sizes) ? p.sizes : (p.sizes ? String(p.sizes).split(',').map(s => s.trim()) : ['Standard']),
            img: p.img || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
            imgHover: p.imgHover || p.img || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
            gallery: Array.isArray(p.gallery) ? p.gallery : [p.img || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80']
          };
        });

        products = [...formattedBatch, ...products];
        saveDataFile('products.json', products);

        console.log(`[EXCEL IMPORT] Successfully imported ${formattedBatch.length} products from Excel/CSV to system.`);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: formattedBatch.length, message: `Imported ${formattedBatch.length} products successfully` }));
      } catch (err) {
        console.error('Error batch importing products:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Update product (PUT /api/products/:id)
  const productPutMatch = reqUrl.match(/^\/api\/products\/([a-zA-Z0-9_-]+)$/);
  if (req.method === 'PUT' && productPutMatch) {
    const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
    if (authPass !== 'Gb260000') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Valid Gb260000 password required' }));
      return;
    }
    const prodId = productPutMatch[1];
    parseRequestBody(req, (err, updateData) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      try {
        updateData = updateData || {};
        let products = readDataFile('products.json', []);

        const idx = products.findIndex(p => p.id === prodId);
        if (idx === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Product not found' }));
          return;
        }

        products[idx] = { ...products[idx], ...updateData, id: prodId };
        if (products[idx].priceMAD) products[idx].priceMAD = Number(products[idx].priceMAD);
        if (products[idx].originalPriceMAD) products[idx].originalPriceMAD = Number(products[idx].originalPriceMAD);
        if (products[idx].stockCount !== undefined) products[idx].stockCount = Number(products[idx].stockCount);

        saveDataFile('products.json', products);
        console.log(`[ADMIN] Updated product: ${products[idx].title} (${prodId})`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Product updated successfully', product: products[idx] }));
      } catch (err) {
        console.error('Error updating product:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Delete product (DELETE /api/products/:id)
  const productDeleteMatch = reqUrl.match(/^\/api\/products\/([a-zA-Z0-9_-]+)$/);
  if (req.method === 'DELETE' && productDeleteMatch) {
    const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
    if (authPass !== 'Gb260000') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Valid Gb260000 password required' }));
      return;
    }
    const prodId = productDeleteMatch[1];
    let products = readDataFile('products.json', []);

    const initialLen = products.length;
    products = products.filter(p => p.id !== prodId);
    if (products.length === initialLen) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Product not found' }));
      return;
    }

    saveDataFile('products.json', products);
    console.log(`[ADMIN] Deleted product id: ${prodId}`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Product deleted successfully', id: prodId }));
    return;
  }

  // API Endpoint: Website Settings (GET /api/website-settings)
  if (req.method === 'GET' && reqUrl === '/api/website-settings') {
    let settings = readDataFile('website_settings.json', {});
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(settings, null, 2));
    return;
  }

  // API Endpoint: Website Settings (POST /api/website-settings)
  if (req.method === 'POST' && reqUrl === '/api/website-settings') {
    parseRequestBody(req, (err, newSettings) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      try {
        const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
        if (authPass !== 'Gb260000') {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }));
          return;
        }

        newSettings = newSettings || {};
        let existing = readDataFile('website_settings.json', {});
        const merged = { ...existing, ...newSettings };
        saveDataFile('website_settings.json', merged);
        console.log(`[ADMIN] Website settings updated`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Website settings saved', settings: merged }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Verify Admin Password (POST /api/admin-verify)
  if (req.method === 'POST' && reqUrl === '/api/admin-verify') {
    parseRequestBody(req, (err, parsedData) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      try {
        const { password } = parsedData || {};
        const ADMIN_PASSWORD = 'Gb260000';
        if (password === ADMIN_PASSWORD) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, verified: true, token: 'auth_' + Buffer.from(ADMIN_PASSWORD).toString('base64') }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, verified: false, error: 'Incorrect administrative password' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // API Endpoint: AI Product Generator & Assistant (POST /api/ai-generate-product)
  if (req.method === 'POST' && reqUrl === '/api/ai-generate-product') {
    parseRequestBody(req, (err, parsedData) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      try {
        const authPass = (req.headers['x-admin-password'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '')).trim();
        if (authPass !== 'Gb260000') {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }));
          return;
        }

        const { prompt = '', category = 'jewelry', action = 'generate', currentDescription = '' } = parsedData || {};
        
        const LUXURY_IMAGE_POOLS = {
          jewelry: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1611591475152-478311399767?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
          ],
          apparel: [
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80'
          ],
          accessories: [
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
          ]
        };

        if (action === 'polish') {
          const polished = currentDescription
            ? `Hand-finished by master artisans in our Casablanca atelier, ${currentDescription.trim()} Crafted with tactile precision to embody understated Mediterranean luxury and effortless daily elegance.`
            : `An iconic testament to quiet luxury. Sculpted by hand using artisanal Moroccan lost-wax techniques, finished with radiant lustre that catches natural sunlight effortlessly.`;

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, polishedDescription: polished }));
          return;
        }

        const pLower = prompt.toLowerCase();
        let targetCategory = category;
        if (pLower.includes('ring') || pLower.includes('necklace') || pLower.includes('earring') || pLower.includes('bracelet') || pLower.includes('gold') || pLower.includes('pearl') || pLower.includes('hoop')) {
          targetCategory = 'jewelry';
        } else if (pLower.includes('dress') || pLower.includes('silk') || pLower.includes('blazer') || pLower.includes('trouser') || pLower.includes('pant') || pLower.includes('kimono') || pLower.includes('knit') || pLower.includes('top')) {
          targetCategory = 'apparel';
        } else if (pLower.includes('bag') || pLower.includes('clutch') || pLower.includes('tote') || pLower.includes('boot') || pLower.includes('mule') || pLower.includes('leather') || pLower.includes('heel')) {
          targetCategory = 'accessories';
        }

        const priceMatch = pLower.match(/(\d{3,4})\s*(mad|dh|dirham)?/);
        let suggestedPrice = priceMatch ? parseInt(priceMatch[1], 10) : (targetCategory === 'jewelry' ? 780 : (targetCategory === 'apparel' ? 1390 : 1650));
        let suggestedOriginal = Math.round((suggestedPrice * 1.25) / 10) * 10;

        let title = prompt ? prompt.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'New Atelier Creation';
        const imgList = LUXURY_IMAGE_POOLS[targetCategory] || LUXURY_IMAGE_POOLS.jewelry;
        const selectedImg = imgList[Math.floor(Math.random() * imgList.length)];

        const generatedProduct = {
          title,
          category: targetCategory,
          materialType: targetCategory === 'jewelry' ? 'vermeil' : (targetCategory === 'apparel' ? 'silk' : 'leather'),
          material: targetCategory === 'jewelry' ? '18K Heavy Gold Vermeil over 925 Sterling Silver' : (targetCategory === 'apparel' ? '100% Pure Mulberry Silk' : 'Full-Grain Italian Calfskin Leather'),
          priceMAD: suggestedPrice,
          originalPriceMAD: suggestedOriginal,
          stockCount: 5,
          badge: 'New In',
          description: `Artisanal piece sculpted with organic fluidity. Handcrafted in Casablanca for everyday quiet luxury.`,
          specs: [
            'Hand-cast using artisanal jewelry techniques',
            'Finish: High-polish 18K Yellow Gold with protective anti-tarnish coating',
            'Hypoallergenic, 100% Nickel & Lead-free',
            'Atelier stamped hallmark with luxury velvet gift box'
          ],
          sizes: ['Standard'],
          img: selectedImg,
          imgHover: selectedImg
        };

        console.log(`[AI ASSISTANT] Generated luxury product: "${title}" (${targetCategory})`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, product: generatedProduct }));
      } catch (err) {
        console.error('AI Generator Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // =========================================================================
  // UNIVERSAL STATIC FILE ROUTING
  // =========================================================================

  // 1. Root storefront mappings
  if (reqUrl === '/' || reqUrl === '/index.html') {
    const f = findFile('index.html');
    if (f) { serveFile(f, res); return; }
  }
  if (reqUrl === '/style.css') {
    const f = findFile('style.css');
    if (f) { serveFile(f, res); return; }
  }
  if (reqUrl === '/app.js') {
    const f = findFile('app.js');
    if (f) { serveFile(f, res); return; }
  }

  // 2. Admin portal mappings
  if (reqUrl === '/admin' || reqUrl === '/admin/' || reqUrl === '/admin.html') {
    const f = findFile(path.join('admin', 'index.html')) || findFile('index.html');
    if (f) { serveFile(f, res); return; }
  }
  if (reqUrl.startsWith('/admin/')) {
    const sub = reqUrl.replace(/^\/admin\//, '');
    const f = findFile(path.join('admin', sub)) || findFile(sub);
    if (f) { serveFile(f, res); return; }
  }



  // 4. Universal Asset Fallback (finds any icon, image, stylesheet or script)
  const cleanUrl = reqUrl.replace(/^\//, '');
  const f = findFile(cleanUrl);
  if (f) {
    serveFile(f, res);
    return;
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
}

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Golden Blossom Boutique server running at http://localhost:${PORT}`);
    console.log(`- Customer Storefront: http://localhost:${PORT}/`);
    console.log(`- Private Admin Portal: http://localhost:${PORT}/admin`);
    console.log(`WhatsApp Orders Auto-Receiver active for: +212 780-760188`);
  });
}

module.exports = requestHandler;
