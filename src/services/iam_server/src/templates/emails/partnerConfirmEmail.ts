export type PartnerConfirmEmailTemplateData = {
  companyName: string;
  taxCode: string;
  firstName: string;
  businessType: string;
  confirmationLink: string;
  expirationTime: number; // in hours
  appName: string;
  currentYear: number;
};

export const partnerConfirmEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Partner Registration Confirmation</title>
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
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .info-box h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            font-weight: 600;
            color: #333333;
        }
        .info-row {
            display: flex;
            margin-bottom: 10px;
        }
        .info-label {
            font-weight: 600;
            color: #555555;
            min-width: 120px;
            font-size: 14px;
        }
        .info-value {
            color: #333333;
            font-size: 14px;
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
            .info-row {
                flex-direction: column;
            }
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤝 Partner Registration</h1>
        </div>

        <div class="content">
            <h2>Welcome {{firstName}}!</h2>
            <p>Thank you for registering as a partner with us. We're excited to have your business join our network!</p>
            <p>A partner account has been created with the following details:</p>

            <div class="info-box">
                <h3>Partner Registration Details</h3>
                <div class="info-row">
                    <div class="info-label">Company Name:</div>
                    <div class="info-value">{{companyName}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Tax ID:</div>
                    <div class="info-value">{{taxCode}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Business Type:</div>
                    <div class="info-value">{{businessType}}</div>
                </div>
            </div>

            <p>To complete your partner registration and activate your account, please confirm your email address by clicking the button below:</p>

            <div class="button-container">
                <a href="{{confirmationLink}}" class="confirm-button">Confirm Email & Activate Partner Account</a>
            </div>

            <div class="security-note">
                <p><strong>⏰ Important:</strong> This confirmation link will expire in {{expirationTime}} hours for security purposes.</p>
            </div>

            <div class="alternative-link">
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p class="link-text">{{confirmationLink}}</p>
            </div>

            <p style="margin-top: 30px;">If you didn't register for a partner account, please contact our support team immediately.</p>
        </div>

        <div class="footer">
            <p><strong>{{appName}}</strong></p>
            <p>This is an automated message, please do not reply to this email.</p>
            <p>For support inquiries, please contact us at {{supportEmail}}</p>
            <p>&copy; {{currentYear}} {{appName}}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
