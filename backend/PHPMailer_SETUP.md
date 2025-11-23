# PHPMailer Setup Instructions

## Step 1: Install PHPMailer

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install PHPMailer via Composer**:
   ```bash
   composer install
   ```

   If you don't have Composer installed:
   - Download from [getcomposer.org](https://getcomposer.org/)
   - Or use: `php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"`
   - Then: `php composer-setup.php && php composer.phar install`

## Step 2: Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Go to Google Account Settings** → Security → 2-Step Verification
3. **Generate App Password**:
   - Go to "App passwords"
   - Select "Mail" and "Other (custom name)"
   - Enter "Portfolio Contact Form"
   - Copy the generated password

4. **Update contact.php**:
   Replace `'your_app_password'` with your actual App Password:
   ```php
   $mail->Password = 'your_16_character_app_password';
   ```

## Step 3: Update Frontend

The frontend needs to be updated to use the PHP endpoint instead of FormSubmit.

## Step 4: Test the Setup

1. **Start your web server** (XAMPP Apache)
2. **Test the contact form**
3. **Check your Gmail** for the message

## Security Notes

- ✅ **Input Validation**: All inputs are validated and sanitized
- ✅ **CSRF Protection**: Can be added if needed
- ✅ **Rate Limiting**: Consider adding if you expect high traffic
- ✅ **App Password**: More secure than regular password

## Troubleshooting

- **"Authentication failed"**: Check your App Password
- **"Connection refused"**: Check SMTP settings
- **"Permission denied"**: Check file permissions
- **"Class not found"**: Run `composer install` again
