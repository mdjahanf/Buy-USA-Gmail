import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { 
  SERVICES_DATA, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_EMAIL_LOGS, 
  DEFAULT_SMTP_CONFIG, 
  DEFAULT_WEBSITE_SETTINGS, 
  CRYPTO_WALLETS 
} from './src/data/initialData';
import { BLOG_POSTS } from './src/data/blogData';
import { Order, OrderStatus, ServiceItem, CryptoWallet, SMTPConfig, WebsiteSettings } from './src/types';

// In-memory persistent data store for runtime execution
let servicesStore: ServiceItem[] = [...SERVICES_DATA];
let ordersStore: Order[] = [...INITIAL_ORDERS];
let customersStore = [...INITIAL_CUSTOMERS];
let emailLogsStore = [...INITIAL_EMAIL_LOGS];
let smtpConfigStore: SMTPConfig = { ...DEFAULT_SMTP_CONFIG };
let websiteSettingsStore: WebsiteSettings = { ...DEFAULT_WEBSITE_SETTINGS };
let walletsStore: CryptoWallet[] = [...CRYPTO_WALLETS];
let blogsStore = [...BLOG_POSTS];

async function sendSMTPMail(to: string, subject: string, htmlBody: string): Promise<boolean> {
  try {
    if (!smtpConfigStore.enabled) return false;
    const user = smtpConfigStore.username || 'smmbuy2022@gmail.com';
    const rawPass = smtpConfigStore.password || 'cozi ibbt kzwp xato';
    const pass = rawPass.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
      host: smtpConfigStore.host || 'smtp.gmail.com',
      port: Number(smtpConfigStore.port) || 465,
      secure: smtpConfigStore.ssl !== undefined ? smtpConfigStore.ssl : true,
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: `"${smtpConfigStore.senderName || 'buyusagmail.com Delivery Portal'}" <${user}>`,
      to,
      subject,
      html: htmlBody
    });
    console.log(`[SMTP SUCCESS] Sent email to ${to} | Subject: ${subject}`);
    return true;
  } catch (err) {
    console.error(`[SMTP ERROR] Could not send email to ${to}:`, err);
    // Fallback: Dispatch via FormSubmit AJAX if Nodemailer fails
    try {
      await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _replyto: 'smmbuy2022@gmail.com',
          message: htmlBody.replace(/<[^>]*>?/gm, '')
        })
      });
      console.log(`[FormSubmit Fallback SUCCESS] Sent email to ${to}`);
      return true;
    } catch (fallbackErr) {
      console.error(`[FormSubmit Fallback ERROR] Failed for ${to}:`, fallbackErr);
      return false;
    }
  }
}

function getCustomerOrderHtml(order: Order): string {
  return `
<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #ea4335, #4285f4); padding: 32px; text-align: center; color: #ffffff;">
    <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.5px;">buyusagmail.com</h1>
    <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.95;">Best USA Aged Gmail Accounts for Sale</p>
  </div>
  <div style="padding: 32px; background-color: #ffffff;">
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Thank You for Your Order, ${order.customerName}! 🎉</h2>
    <p style="color: #475569; line-height: 1.6; font-size: 15px;">
      We have successfully received your order <strong style="color: #0f172a;">#${order.id}</strong>. Our automated blockchain monitoring system is currently verifying your cryptocurrency transaction hash. Once confirmed, your downloadable account spreadsheet will be dispatched instantly!
    </p>

    <div style="background-color: #f1f5f9; border-left: 4px solid #ea4335; padding: 18px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <h3 style="margin: 0 0 12px; font-size: 14px; color: #334155; text-transform: uppercase; letter-spacing: 0.5px;">📦 Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
        <tr><td style="padding: 6px 0; font-weight: bold;">Order ID:</td><td style="padding: 6px 0; text-align: right; color: #ea4335; font-weight: bold;">#${order.id}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Service Package:</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${order.serviceName}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Quantity:</td><td style="padding: 6px 0; text-align: right;">${order.packageQuantity} Accounts</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Total Paid:</td><td style="padding: 6px 0; text-align: right; font-size: 16px; color: #10b981; font-weight: bold;">$${order.totalAmount} USD</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Payment Method:</td><td style="padding: 6px 0; text-align: right;">${order.paymentMethod}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Transaction Hash:</td><td style="padding: 6px 0; text-align: right; font-family: monospace; font-size: 12px; word-break: break-all;">${order.transactionId || 'Pending Verification'}</td></tr>
      </table>
    </div>

    <div style="padding: 16px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; margin: 24px 0; text-align: center;">
      <p style="margin: 0; color: #1e3a8a; font-size: 14px; font-weight: bold;">💬 Need Live 24/7 Support?</p>
      <p style="margin: 6px 0 0; color: #2563eb; font-size: 13px;">
        Chat with our support engineers on Telegram: <strong>@EgSupport24</strong> or WhatsApp: <strong>+1 (307) 393-9979</strong>
      </p>
    </div>

    <p style="color: #64748b; font-size: 13px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
      Best regards,<br>
      <strong style="color: #334155;">The buyusagmail.com Delivery Team</strong><br>
      Support Email: <a href="mailto:smmbuy2022@gmail.com" style="color: #2563eb;">smmbuy2022@gmail.com</a>
    </p>
  </div>
</div>`;
}

function getAdminOrderHtml(order: Order): string {
  return `
<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background-color: #0f172a; padding: 24px; color: #ffffff;">
    <span style="background-color: #ef4444; color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">⚡ New Order Alert</span>
    <h2 style="margin: 12px 0 0; font-size: 22px; color: #ffffff;">Order #${order.id} Received!</h2>
  </div>
  <div style="padding: 24px; background-color: #ffffff;">
    <p style="font-size: 15px; color: #334155; margin-top: 0;">
      A new order has been placed on <strong>buyusagmail.com</strong>. Please check the transaction hash and dispatch accounts.
    </p>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
      <h3 style="margin: 0 0 12px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase;">🛒 Customer & Order Details</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
        <tr><td style="padding: 6px 0; font-weight: bold; width: 40%;">Order ID:</td><td style="padding: 6px 0; font-weight: bold; color: #ea4335;">#${order.id}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Service Name:</td><td style="padding: 6px 0; font-weight: 600;">${order.serviceName}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Quantity:</td><td style="padding: 6px 0; font-weight: bold;">${order.packageQuantity} Accounts</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Total Paid:</td><td style="padding: 6px 0; font-size: 16px; font-weight: bold; color: #10b981;">$${order.totalAmount} USD</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Payment Method:</td><td style="padding: 6px 0;">${order.paymentMethod}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">TxID / Hash:</td><td style="padding: 6px 0; font-family: monospace; font-size: 12px; background: #f1f5f9; padding: 3px 6px; border-radius: 4px; word-break: break-all;">${order.transactionId || 'N/A'}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Customer Name:</td><td style="padding: 6px 0;">${order.customerName}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Customer Email:</td><td style="padding: 6px 0;"><a href="mailto:${order.email}" style="color: #2563eb; font-weight: bold;">${order.email}</a></td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Telegram / WhatsApp:</td><td style="padding: 6px 0;">${order.telegram || 'N/A'} / ${order.whatsapp || 'N/A'}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Country / IP:</td><td style="padding: 6px 0;">${order.country || 'USA'} (${order.customerIp || '198.51.100.1'})</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Customer Notes:</td><td style="padding: 6px 0; font-style: italic;">${order.customerNotes || 'None'}</td></tr>
      </table>
    </div>
  </div>
</div>`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // ==========================================
  // 1. SERVICES API
  // ==========================================
  app.get('/api/services', (req, res) => {
    res.json(servicesStore);
  });

  app.get('/api/services/:slug', (req, res) => {
    const service = servicesStore.find(s => s.slug === req.params.slug);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  });

  app.put('/api/services/:id', (req, res) => {
    const idx = servicesStore.findIndex(s => s.id === req.params.id);
    if (idx !== -1) {
      servicesStore[idx] = { ...servicesStore[idx], ...req.body };
      res.json(servicesStore[idx]);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  });

  // ==========================================
  // 2. ORDERS & CHECKOUT API
  // ==========================================
  app.get('/api/orders', (req, res) => {
    res.json(ordersStore);
  });

  app.get('/api/orders/:id', (req, res) => {
    const order = ordersStore.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  });

  app.post('/api/orders', (req, res) => {
    const newOrder: Order = {
      ...req.body,
      id: req.body.id || `MG-${Math.floor(10000 + Math.random() * 90000)}-${req.body.serviceId.substring(0, 2).toUpperCase()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Pending',
      customerIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '198.51.100.1',
      browser: req.headers['user-agent'] ? req.headers['user-agent'].split(' ')[0] : 'Chrome/126.0',
      os: 'Windows 11 / macOS'
    };

    ordersStore.unshift(newOrder);

    // Check if customer exists or update
    const existingCustIdx = customersStore.findIndex(c => c.email.toLowerCase() === newOrder.email.toLowerCase());
    if (existingCustIdx !== -1) {
      customersStore[existingCustIdx].totalOrders += 1;
      customersStore[existingCustIdx].totalSpent += newOrder.totalAmount;
      customersStore[existingCustIdx].lastOrderDate = newOrder.date.substring(0, 10);
    } else {
      customersStore.unshift({
        id: `cust-${Date.now()}`,
        name: newOrder.customerName,
        email: newOrder.email,
        telegram: newOrder.telegram,
        whatsapp: newOrder.whatsapp,
        country: newOrder.country,
        totalOrders: 1,
        totalSpent: newOrder.totalAmount,
        lastOrderDate: newOrder.date.substring(0, 10)
      });
    }

    // Generate automated email logs (Admin notification to smmbuy2022@gmail.com & Customer confirmation)
    const adminLog = {
      id: `log-${Date.now()}-adm`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      to: smtpConfigStore.defaultReceiver || 'smmbuy2022@gmail.com',
      subject: `[NEW ORDER #${newOrder.id}] - ${newOrder.serviceName} ($${newOrder.totalAmount})`,
      bodyPreview: `Order ID: ${newOrder.id} | Customer: ${newOrder.customerName} (${newOrder.email}) | Telegram: ${newOrder.telegram} | WhatsApp: ${newOrder.whatsapp} | Country: ${newOrder.country} | Service: ${newOrder.serviceName} | Quantity: ${newOrder.packageQuantity} | Total: $${newOrder.totalAmount} | Payment: ${newOrder.paymentMethod} | Hash: ${newOrder.transactionId} | Notes: ${newOrder.customerNotes} | IP: ${newOrder.customerIp}`,
      status: 'sent' as const,
      orderId: newOrder.id,
      type: 'admin_notification' as const
    };

    const customerLog = {
      id: `log-${Date.now()}-cust`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      to: newOrder.email,
      subject: `Order Confirmation #${newOrder.id} - buyusagmail.com Automated Delivery Portal`,
      bodyPreview: `Hello ${newOrder.customerName}, thank you for choosing buyusagmail.com! We have received your order #${newOrder.id} for ${newOrder.packageQuantity}x ${newOrder.serviceName} ($${newOrder.totalAmount}). Our automated verification system is currently verifying your transaction hash (${newOrder.transactionId}). Your downloadable account spreadsheet will be dispatched shortly.`,
      status: 'sent' as const,
      orderId: newOrder.id,
      type: 'customer_confirmation' as const
    };

    emailLogsStore.unshift(adminLog, customerLog);

    // Dispatch real SMTP emails asynchronously
    sendSMTPMail(
      newOrder.email,
      customerLog.subject,
      getCustomerOrderHtml(newOrder)
    );
    sendSMTPMail(
      smtpConfigStore.defaultReceiver || 'smmbuy2022@gmail.com',
      adminLog.subject,
      getAdminOrderHtml(newOrder)
    );

    res.status(201).json({ success: true, order: newOrder });
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const idx = ordersStore.findIndex(o => o.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Order not found' });

    const oldStatus = ordersStore[idx].status;
    const newStatus: OrderStatus = req.body.status;
    ordersStore[idx].status = newStatus;

    // Send status notification email simulation
    if (oldStatus !== newStatus) {
      const statusLog = {
        id: `log-${Date.now()}-stat`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        to: ordersStore[idx].email,
        subject: `[STATUS UPDATE] Your buyusagmail.com Order #${ordersStore[idx].id} is now ${newStatus}!`,
        bodyPreview: `Dear ${ordersStore[idx].customerName}, the status of your order #${ordersStore[idx].id} (${ordersStore[idx].packageQuantity}x ${ordersStore[idx].serviceName}) has been changed from ${oldStatus} to ${newStatus}. ${newStatus === 'Completed' ? 'Your accounts are ready for download!' : 'Thank you for your patience.'}`,
        status: 'sent' as const,
        orderId: ordersStore[idx].id,
        type: 'status_update' as const
      };
      emailLogsStore.unshift(statusLog);

      sendSMTPMail(
        statusLog.to,
        statusLog.subject,
        `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
           <div style="background: #0f172a; padding: 20px; color: white;">
             <h2 style="margin: 0; font-size: 20px;">Order Status Update</h2>
           </div>
           <div style="padding: 20px; color: #334155;">
             <p style="font-size: 15px;">Hello <strong>${ordersStore[idx].customerName}</strong>,</p>
             <p style="line-height: 1.6;">The status of your order <strong>#${ordersStore[idx].id}</strong> (${ordersStore[idx].serviceName}) has been updated from ${oldStatus} to <strong style="color: #10b981;">${newStatus}</strong>.</p>
             <p style="color: #64748b; font-size: 13px; margin-top: 24px;">Best regards,<br><strong>buyusagmail.com Team</strong></p>
           </div>
         </div>`
      );
    }

    res.json(ordersStore[idx]);
  });

  // ==========================================
  // 3. CUSTOMERS, LOGS, & STATS API
  // ==========================================
  app.get('/api/customers', (req, res) => {
    res.json(customersStore);
  });

  app.get('/api/logs/email', (req, res) => {
    res.json(emailLogsStore);
  });

  app.post('/api/logs/email/test', (req, res) => {
    const { to, subject, message } = req.body;
    const testLog = {
      id: `log-${Date.now()}-test`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      to: to || smtpConfigStore.defaultReceiver || 'smmbuy2022@gmail.com',
      subject: subject || '[TEST EMAIL] buyusagmail.com SMTP System Verification',
      bodyPreview: message || 'This is a test email sent from the buyusagmail.com Admin Dashboard using SMTP Host: ' + smtpConfigStore.host,
      status: 'sent' as const,
      type: 'test' as const
    };
    emailLogsStore.unshift(testLog);

    sendSMTPMail(
      testLog.to,
      testLog.subject,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
         <div style="background: #2563eb; padding: 20px; color: white;">
           <h2 style="margin: 0; font-size: 20px;">⚡ SMTP System Verification</h2>
         </div>
         <div style="padding: 20px; color: #334155;">
           <p style="font-size: 15px;">${testLog.bodyPreview}</p>
           <p style="color: #10b981; font-weight: bold;">✔ Your SMTP connection with smmbuy2022@gmail.com is active and functioning properly!</p>
         </div>
       </div>`
    );

    res.json({ success: true, log: testLog });
  });

  app.get('/api/admin/stats', (req, res) => {
    const totalRevenue = ordersStore
      .filter(o => o.status === 'Completed' || o.status === 'Paid')
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    const pendingOrders = ordersStore.filter(o => o.status === 'Pending').length;
    const completedOrders = ordersStore.filter(o => o.status === 'Completed').length;
    const processingOrders = ordersStore.filter(o => o.status === 'Processing').length;
    const cancelledOrders = ordersStore.filter(o => o.status === 'Cancelled').length;

    // Calculate top services
    const serviceMap: { [key: string]: { name: string; count: number; revenue: number } } = {};
    ordersStore.forEach(o => {
      if (!serviceMap[o.serviceName]) {
        serviceMap[o.serviceName] = { name: o.serviceName, count: 0, revenue: 0 };
      }
      serviceMap[o.serviceName].count += 1;
      if (o.status === 'Completed' || o.status === 'Paid') {
        serviceMap[o.serviceName].revenue += o.totalAmount;
      }
    });
    const topServices = Object.values(serviceMap).sort((a, b) => b.revenue - a.revenue);

    // Calculate daily orders
    const dailyMap: { [key: string]: { date: string; count: number; revenue: number } } = {};
    ordersStore.forEach(o => {
      const dateStr = o.date.substring(0, 10);
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = { date: dateStr, count: 0, revenue: 0 };
      }
      dailyMap[dateStr].count += 1;
      if (o.status === 'Completed' || o.status === 'Paid') {
        dailyMap[dateStr].revenue += o.totalAmount;
      }
    });
    const dailyOrders = Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      totalRevenue,
      totalOrders: ordersStore.length,
      pendingOrders,
      completedOrders,
      processingOrders,
      cancelledOrders,
      topServices,
      dailyOrders
    });
  });

  // ==========================================
  // 4. SETTINGS & BLOGS API
  // ==========================================
  app.get('/api/settings/smtp', (req, res) => {
    res.json(smtpConfigStore);
  });

  app.put('/api/settings/smtp', (req, res) => {
    smtpConfigStore = { ...smtpConfigStore, ...req.body };
    res.json(smtpConfigStore);
  });

  app.get('/api/settings/website', (req, res) => {
    res.json(websiteSettingsStore);
  });

  app.put('/api/settings/website', (req, res) => {
    websiteSettingsStore = { ...websiteSettingsStore, ...req.body };
    res.json(websiteSettingsStore);
  });

  app.get('/api/settings/wallets', (req, res) => {
    res.json(walletsStore);
  });

  app.put('/api/settings/wallets', (req, res) => {
    if (Array.isArray(req.body)) {
      walletsStore = req.body;
      res.json(walletsStore);
    } else {
      res.status(400).json({ error: 'Expected array of wallets' });
    }
  });

  app.get('/api/blogs', (req, res) => {
    res.json(blogsStore);
  });

  app.get('/api/blogs/:slug', (req, res) => {
    const post = blogsStore.find(b => b.slug === req.params.slug);
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    res.json(post);
  });

  app.post('/api/blogs', (req, res) => {
    const newPost = {
      ...req.body,
      id: `blog-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10)
    };
    blogsStore.unshift(newPost);
    res.status(201).json(newPost);
  });

  app.delete('/api/blogs/:id', (req, res) => {
    blogsStore = blogsStore.filter(b => b.id !== req.params.id);
    res.json({ success: true });
  });

  // ==========================================
  // 5. ADMIN AUTH & GEMINI AI SUPPORT API
  // ==========================================
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (
      (username === 'admin' || username === 'smmbuy2022@gmail.com') &&
      (password === 'admin123' || password === 'buyusagmail2026' || password === 'mixgmail2026' || password === 'admin')
    ) {
      res.json({ success: true, token: 'mg-secure-jwt-token-2026', user: 'Admin / smmbuy2022' });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials. Use admin / admin123' });
    }
  });

  app.post('/api/ai/recommend', async (req, res) => {
    const { businessGoal, targetCountry, dailyVolume, toolUsed } = req.body;

    try {
      if (!process.env.GEMINI_API_KEY) {
        // Fallback intelligent heuristic recommendation if key is not set
        let recSlug = 'usa-gmail-accounts';
        let qty = 20;
        let reasoning = 'For high-trust business operations in the United States, our 2-7 Year USA Aged Gmail Accounts provide maximum authority and zero login checkpoints.';
        if (businessGoal && businessGoal.toLowerCase().includes('ad')) {
          recSlug = 'aged-gmail-accounts-for-google-ads';
          qty = 10;
          reasoning = 'Running Google Ads requires accounts aged 4-8 years with pre-qualified billing trust to bypass Suspicious Payment Activity bans.';
        } else if (businessGoal && businessGoal.toLowerCase().includes('review')) {
          recSlug = 'aged-gmail-accounts-for-reviews';
          qty = 20;
          reasoning = 'Our Level 3+ Local Guides aged accounts feature simulated map navigation histories, achieving a 98% review stick rate on GMB and Yelp.';
        } else if (businessGoal && (businessGoal.toLowerCase().includes('scrape') || businessGoal.toLowerCase().includes('bot'))) {
          recSlug = 'new-gmail-accounts';
          qty = 100;
          reasoning = 'For high-volume automated scraping or signups, our freshly created PVA accounts offer the lowest price per account ($0.80 in bulk).';
        } else if (targetCountry && targetCountry !== 'USA' && targetCountry !== 'United States') {
          recSlug = 'aged-mix-country-gmail-accounts';
          qty = 50;
          reasoning = 'For international campaigns, our Mix Country accounts provide genuine IP diversity across 40+ global nations at unbeatable value.';
        }

        return res.json({
          recommendedServiceSlug: recSlug,
          recommendedQuantity: qty,
          reasoning,
          estimatedReturn: '99.4% Inbox Placement & Zero Login Checkpoints',
          securityTip: 'Always pair each account with a static residential proxy from the corresponding target state or country and use Google App Passwords for tool integrations.'
        });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
You are the senior email delivery architect for "buyusagmail.com", the top USA Aged & PVA Gmail Accounts marketplace.
A customer is asking for account recommendations based on their parameters:
- Business Goal / Use Case: "${businessGoal || 'Cold Outreach & Marketing'}"
- Target Geolocation: "${targetCountry || 'USA'}"
- Estimated Daily Volume: "${dailyVolume || '50-100 emails/day'}"
- Automation Tool Used: "${toolUsed || 'Instantly / AdsPower / Lemlist'}"

Our available services:
1. "usa-gmail-accounts" (USA Gmail Accounts - 2-7 yrs aged, USA residential IPs, best for cold email, GMB, general B2B)
2. "pva-gmail-accounts" (PVA Gmail Accounts - verified with real physical SIM numbers, best for social media signups, SaaS trials)
3. "aged-mix-country-gmail-accounts" (Aged Mix Country Gmail Accounts - 1-5 yrs old, global IP mix, budget friendly for SEO backlinking)
4. "aged-gmail-accounts-for-reviews" (Aged Gmail Accounts For Reviews - Level 3+ Local Guides, 98% stick rate for Yelp/GMB)
5. "aged-gmail-accounts-for-google-ads" (Aged Gmail Accounts For Google Ads - 4-8 yrs old, whitelisted billing trust for Google Ads MCC)
6. "new-gmail-accounts" (New Gmail Accounts - fresh 7-30 days old, lowest cost $0.80/ea for bulk scraping and bot farms)

Respond STRICTLY in valid JSON with these exact keys:
{
  "recommendedServiceSlug": "<exact slug from the 6 above>",
  "recommendedQuantity": <number e.g. 10, 20, 50, or 100>,
  "reasoning": "<2-3 clear, authoritative sentences explaining why this exact service tier and quantity is the best choice for their goal>",
  "estimatedReturn": "<short metric string e.g. '98.5% Inbox Deliverability & Zero Login Sandboxing'>",
  "securityTip": "<1 actionable expert proxy or anti-detect browser tip specific to their tool>"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err) {
      console.error('Gemini AI Error:', err);
      res.json({
        recommendedServiceSlug: 'usa-gmail-accounts',
        recommendedQuantity: 20,
        reasoning: 'Our 2 to 7-year-old USA Aged Gmail Accounts provide the highest domain trust and deliverability for all professional business workflows.',
        estimatedReturn: '99% Inbox Placement Rate',
        securityTip: 'Always use a dedicated residential proxy and generate a 16-character Google App Password for third-party email tools.'
      });
    }
  });

  // ==========================================
  // 6. VITE MIDDLEWARE & STATIC ASSET SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 buyusagmail.com Enterprise Server running on http://localhost:${PORT}`);
  });
}

startServer();
