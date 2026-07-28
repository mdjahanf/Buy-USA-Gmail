import nodemailer from 'nodemailer';

const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  user: 'smmbuy2022@gmail.com',
  pass: 'cozi ibbt kzwp xato',
  senderName: 'buyusagmail.com Automation Portal',
  senderEmail: 'smmbuy2022@gmail.com',
  defaultReceiver: 'smmbuy2022@gmail.com'
};

async function sendMail(to: string, subject: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: SMTP_CONFIG.secure,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
      }
    });

    await transporter.sendMail({
      from: `"${SMTP_CONFIG.senderName}" <${SMTP_CONFIG.senderEmail}>`,
      to,
      subject,
      html
    });
    console.log(`[Netlify Function SMTP SUCCESS] Sent to: ${to} | Subject: ${subject}`);
    return true;
  } catch (err) {
    console.error(`[Netlify Function SMTP ERROR] Failed to send to ${to}:`, err);
    return false;
  }
}

function getCustomerOrderHtml(order: any): string {
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

function getAdminOrderHtml(order: any): string {
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

export const handler = async (event: any) => {
  const path = event.path || '';
  const httpMethod = event.httpMethod || 'GET';

  if (httpMethod === 'POST' && path.includes('/api/orders')) {
    try {
      const payload = JSON.parse(event.body || '{}');
      const order = {
        ...payload,
        id: payload.id || `MG-${Math.floor(10000 + Math.random() * 90000)}-${(payload.serviceId || 'US').substring(0, 2).toUpperCase()}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'Pending',
        customerIp: event.headers?.['x-forwarded-for'] || '198.51.100.1'
      };

      // Dispatch Customer Thank You Email
      await sendMail(
        order.email,
        `Order Confirmation #${order.id} - buyusagmail.com Automated Delivery Portal`,
        getCustomerOrderHtml(order)
      );

      // Dispatch Admin Notification Email
      await sendMail(
        SMTP_CONFIG.defaultReceiver,
        `[NEW ORDER #${order.id}] - ${order.serviceName} ($${order.totalAmount})`,
        getAdminOrderHtml(order)
      );

      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ success: true, order })
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: err?.message || 'Server error' })
      };
    }
  }

  return {
    statusCode: 404,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Endpoint not found in serverless mode' })
  };
};
