export type ConfirmEmailTemplateData = {
  firstName: string;
  confirmationLink: string;
  expirationTime: number; // in hours
  appName: string;
  currentYear: number;
};
export const confirmEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
            color: #333333;
            line-height: 1.6;
        }
        .content h2 {
            margin: 0 0 20px 0;
            font-size: 22px;
            font-weight: 600;
            color: #333333;
        }
        .content p {
            margin: 0 0 20px 0;
            font-size: 16px;
            color: #555555;
        }
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        .confirm-button {
            display: inline-block;
            padding: 14px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .confirm-button:hover {
            transform: translateY(-2px);
        }
        .alternative-link {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            font-size: 14px;
            color: #777777;
        }
        .alternative-link p {
            margin: 0 0 10px 0;
            font-size: 14px;
        }
        .link-text {
            word-break: break-all;
            color: #667eea;
            font-size: 13px;
        }
        .footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            font-size: 13px;
            color: #999999;
            border-top: 1px solid #e0e0e0;
        }
        .footer p {
            margin: 5px 0;
        }
        .security-note {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .security-note p {
            margin: 0;
            font-size: 14px;
            color: #856404;
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 20px;
            }
            .header, .content, .footer {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✉️ Confirm Your Email</h1>
        </div>

        <div class="content">
            <h2>Welcome {{firstName}}!</h2>
            <p>Thank you for signing up. We're excited to have you on board!</p>
            <p>To complete your registration and start using your account, please confirm your email address by clicking the button below:</p>

            <div class="button-container">
                <a href="{{confirmationLink}}" class="confirm-button">Confirm Email Address</a>
            </div>

            <div class="security-note">
                <p><strong>⏰ Important:</strong> This confirmation link will expire in {{expirationTime}} hours for security purposes.</p>
            </div>

            <div class="alternative-link">
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p class="link-text">{{confirmationLink}}</p>
            </div>

            <p style="margin-top: 30px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>

        <div class="footer">
            <p><strong>PulcherBook</strong></p>
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; {{currentYear}} PulcherBook. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
