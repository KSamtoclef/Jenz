# JENZ Community

A mobile-first campus marketplace preview connecting student buyers, sellers and service providers.

## Current preview

The first version includes:

- Responsive marketplace homepage
- Product search, categories and sorting
- Sample campus products and services
- Shopping cart saved in the browser
- Checkout preview with campus pickup and delivery options
- Buyer account preview
- Seller onboarding and verification preview
- Buyer-to-seller messaging preview
- Trusted seller section
- Campus deals, community reviews and newsletter form
- Payment placeholders for Paystack, Flutterwave and JENZ Wallet

## Run locally

Open `index.html` in a browser, or serve the repository with any static web server.

## Deploy

The project is currently static and can be deployed directly to Vercel without a build command.

- Framework preset: Other
- Root directory: `./`
- Build command: leave empty
- Output directory: leave empty

## Planned backend phase

Supabase will later provide:

- Authentication and email verification
- Buyer, seller, support and admin roles
- Product and image storage
- Orders and inventory
- Messages and notifications
- Reviews and seller verification
- Wallet and transaction records
- Admin permissions and audit logs

Payment processing will be connected later through Paystack or Flutterwave. Secret keys must be stored as environment variables and must never be placed directly in frontend JavaScript.
