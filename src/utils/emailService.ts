/**
 * Client-Side Order Notification & Delivery Service
 * FormSubmit AJAX integration for static GitHub Pages SPA deployments
 */

export interface OrderNotificationPayload {
  id: string;
  customerName: string;
  email: string;
  telegram?: string;
  whatsapp?: string;
  country?: string;
  serviceName: string;
  packageQuantity: number;
  totalAmount: number;
  paymentMethod: string;
  transactionId: string;
  customerNotes?: string;
  date?: string;
}

const ADMIN_EMAIL = 'smmbuy2022@gmail.com';

export async function sendClientSideOrderEmails(order: OrderNotificationPayload): Promise<{ adminSent: boolean; customerSent: boolean }> {
  let adminSent = false;
  let customerSent = false;

  console.log('[EmailService] Dispatching order emails for Order #', order.id);

  // 1. Send Order Notification to Admin (smmbuy2022@gmail.com)
  try {
    const adminRes = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `⚡ [NEW ORDER #${order.id}] ${order.serviceName} ($${order.totalAmount})`,
        _replyto: order.email,
        _template: 'table',
        "Order ID": order.id,
        "Service Name": order.serviceName,
        "Quantity": `${order.packageQuantity} Accounts`,
        "Total Paid": `$${order.totalAmount} USD`,
        "Payment Protocol": order.paymentMethod,
        "Transaction Hash / TxID": order.transactionId || 'Pending Verification',
        "Customer Name": order.customerName,
        "Customer Email": order.email,
        "Telegram Handle": order.telegram || 'Not Provided',
        "WhatsApp Number": order.whatsapp || 'Not Provided',
        "Country / Region": order.country || 'USA',
        "Customer Notes": order.customerNotes || 'None',
        "Timestamp": order.date || new Date().toLocaleString()
      })
    });

    if (adminRes.ok) {
      adminSent = true;
      console.log('[EmailService] Admin alert sent successfully to', ADMIN_EMAIL);
    } else {
      console.warn('[EmailService] Admin alert response not OK:', await adminRes.text());
    }
  } catch (err) {
    console.error('[EmailService Error] Failed to send admin alert:', err);
  }

  // 2. Send Automated Confirmation Receipt to Customer
  try {
    if (order.email && order.email.includes('@')) {
      const customerRes = await fetch(`https://formsubmit.co/ajax/${order.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Order Confirmation #${order.id} - buyusagmail.com Delivery Portal`,
          _replyto: ADMIN_EMAIL,
          _template: 'table',
          "Order Status": "Pending Verification (Verifying TxID Hash)",
          "Order ID": order.id,
          "Service Purchased": order.serviceName,
          "Quantity": `${order.packageQuantity} Accounts`,
          "Total Price": `$${order.totalAmount} USD`,
          "Payment Method": order.paymentMethod,
          "Transaction Hash": order.transactionId || 'Pending Verification',
          "Customer Name": order.customerName,
          "Support Desk Telegram": "@EgSupport24",
          "WhatsApp Desk": "+1 (307) 393-9979",
          "Support Email": ADMIN_EMAIL,
          "Message": `Thank you for your order on buyusagmail.com! We have received your payment hash (${order.transactionId}). Once verified on-chain, your account spreadsheet will be dispatched automatically to this email address.`
        })
      });

      if (customerRes.ok) {
        customerSent = true;
        console.log('[EmailService] Customer confirmation sent successfully to', order.email);
      } else {
        console.warn('[EmailService] Customer confirmation response not OK:', await customerRes.text());
      }
    }
  } catch (err) {
    console.error('[EmailService Error] Failed to send customer confirmation:', err);
  }

  return { adminSent, customerSent };
}
