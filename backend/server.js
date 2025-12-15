const express = require('express');
const { chromium } = require('playwright');
const cors = require('cors');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

let browser;
let pagePool = [];
const POOL_SIZE = 5; // Increased pool size for better concurrency

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' })); // Increased limit for large HTML

// Get a page from pool or create new one
async function getPage() {
  if (pagePool.length > 0) {
    return pagePool.pop();
  }
  return await browser.newPage();
}

// Return page to pool - faster reset
async function releasePage(page) {
  try {
    // Quick reset without full content load
    await page.evaluate(() => document.body.innerHTML = '');
    if (pagePool.length < POOL_SIZE) {
      pagePool.push(page);
    } else {
      await page.close();
    }
  } catch (e) {
    try { await page.close(); } catch (_) {}
  }
}

// Pre-warm page pool
async function warmPool() {
  for (let i = 0; i < POOL_SIZE; i++) {
    const page = await browser.newPage();
    pagePool.push(page);
  }
  console.log(`Page pool warmed with ${POOL_SIZE} pages`);
}

// PDF generation endpoint - optimized for speed
app.post('/api/generate-pdf', async (req, res) => {
  const startTime = Date.now();
  let page;
  try {
    const { html } = req.body;
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    page = await getPage();
    
    // Set viewport for consistent rendering
    await page.setViewportSize({ width: 794, height: 1123 }); // A4 at 96dpi
    
    // Load content quickly
    await page.setContent(html, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Generate PDF with optimized settings
    const pdfBuffer = await page.pdf({ 
      format: 'A4', 
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    });
    
    console.log(`PDF generated in ${Date.now() - startTime}ms, size: ${(pdfBuffer.length / 1024).toFixed(1)}KB`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  } finally {
    if (page) {
      releasePage(page);
    }
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running', poolSize: pagePool.length });
});

// Start server with browser
async function startServer() {
  try {
    browser = await chromium.launch({ 
      headless: true, 
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor,TranslateUI',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
        '--disable-ipc-flooding-protection',
        '--disable-extensions',
        '--disable-component-extensions-with-background-pages',
        '--disable-default-apps',
        '--mute-audio',
        '--no-default-browser-check',
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-sync',
        '--metrics-recording-only',
        '--disable-translate',
        '--safebrowsing-disable-auto-update',
        '--disable-client-side-phishing-detection'
      ]
    });
    console.log('Browser launched successfully');
    
    await warmPool();

    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to launch browser:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  for (const page of pagePool) {
    await page.close();
  }
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

startServer();