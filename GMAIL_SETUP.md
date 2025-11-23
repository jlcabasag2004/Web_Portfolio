# Gmail Contact Form Setup Guide

## Quick Setup for jlcabasag89@gmail.com

Your contact form is already configured to send emails to **jlcabasag89@gmail.com**. You just need to set up the Gmail App Password.

## Step 1: Generate Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the setup process
3. **Generate App Password**:
   - Go to Security → App passwords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "Portfolio Contact Form"
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

## Step 2: Update contact.php

1. **Open** `backend/contact.php`
2. **Find line 54** where it says:
   ```php
   $mail->Password = 'your_app_password';
   ```
3. **Replace** `'your_app_password'` with your actual 16-character App Password:
   ```php
   $mail->Password = 'abcdefghijklmnop';  // Your actual App Password (remove spaces)
   ```

## Step 3: Deploy Backend

Make sure your backend PHP file is accessible on your server:
- For Vercel/Netlify: You may need to use a serverless function or external service
- For traditional hosting: Upload the `backend` folder to your server
- Update the frontend API URL in `src/Pages/Contact.jsx` or use environment variable

## Step 4: Test

1. Fill out the contact form on your website
2. Submit the form
3. Check your Gmail inbox at **jlcabasag89@gmail.com**
4. You should receive the message!

## Troubleshooting

- **"Authentication failed"**: Double-check your App Password (no spaces, all lowercase)
- **"Connection refused"**: Make sure your server allows SMTP connections
- **"Class not found"**: Run `composer install` in the backend directory
- **CORS errors**: Make sure your backend has proper CORS headers (already configured)

## Security Note

✅ Your email is already configured: **jlcabasag89@gmail.com**
✅ The form includes input validation
✅ Uses secure SMTP (STARTTLS on port 587)
✅ App Password is more secure than regular password

## Alternative: Use Email Service

If you prefer not to use Gmail SMTP, you can use services like:
- **EmailJS** (free tier available)
- **FormSubmit** (simple, no backend needed)
- **SendGrid** (free tier available)

