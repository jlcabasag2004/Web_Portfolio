# EmailJS Setup Guide for Contact Form

## Quick Setup to Send Emails to jlcabasag89@gmail.com

Since Vercel doesn't support PHP, we're using EmailJS which works directly from the frontend.

## Step 1: Create EmailJS Account

1. **Sign up for free**: Go to https://www.emailjs.com/
2. **Create an account** (free tier allows 200 emails/month)

## Step 2: Add Gmail Service

1. **Go to Email Services** in your EmailJS dashboard
2. **Click "Add New Service"**
3. **Select "Gmail"**
4. **Connect your Gmail account** (jlcabasag89@gmail.com)
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Template

1. **Go to Email Templates** in your EmailJS dashboard
2. **Click "Create New Template"**
3. **Use this template**:

```
Subject: New Contact Form Message from {{from_name}}

Hello,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
You can reply directly to: {{from_email}}
```

4. **Set the "To Email"** field to: `jlcabasag89@gmail.com`
5. **Set "From Name"** to: `{{from_name}}`
6. **Set "Reply To"** to: `{{from_email}}`
7. **Save the template** and copy the Template ID

## Step 4: Get Your Public Key

1. **Go to Account** → **General** in EmailJS dashboard
2. **Copy your Public Key**

## Step 5: Add Environment Variables

1. **Create a `.env` file** in your project root (if it doesn't exist)
2. **Add these variables**:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. **Replace the values** with your actual IDs from EmailJS

## Step 6: Update Vercel Environment Variables

1. **Go to your Vercel project dashboard**
2. **Go to Settings** → **Environment Variables**
3. **Add the same three variables**:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. **Redeploy your site**

## Step 7: Test

1. **Fill out the contact form** on your website
2. **Submit the form**
3. **Check your Gmail** at jlcabasag89@gmail.com
4. **You should receive the message!**

## Troubleshooting

- **"Service ID not found"**: Make sure you've added the environment variables
- **"Template not found"**: Check your template ID
- **"Authentication failed"**: Verify your Gmail connection in EmailJS
- **Not receiving emails**: Check spam folder and EmailJS dashboard for errors

## Security Note

✅ No backend needed - works directly from frontend
✅ Free tier: 200 emails/month
✅ Secure - uses your Gmail account
✅ Easy to set up and maintain

## Alternative: Update Code Directly

If you prefer to hardcode the values (not recommended for production), you can update `src/Pages/Contact.jsx`:

```javascript
const serviceId = 'your_service_id';
const templateId = 'your_template_id';
const publicKey = 'your_public_key';
```

But using environment variables is more secure!

