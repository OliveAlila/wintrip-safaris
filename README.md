# Wintrip Safaris

A responsive travel and safari website starter based on the approved Canva visual direction. The palette is warm ivory, dark chocolate, cocoa brown, sand and terracotta; green is intentionally excluded from the UI palette.

## Hosting target

Designed for Hostinger Business with Apache, PHP and MySQL. No PostgreSQL and no persistent Node.js backend is required.

## Features in this first commit

- Responsive homepage with mobile navigation.
- Destination directory and region filters.
- Search-to-enquiry flow.
- Safari package cards, experience categories, travel inspiration/blog mockup, about/why-us content and newsletter signup placeholder.
- Official Wintrip Safaris logo asset in the header and footer.
- PHP JSON endpoint for active destinations and PHP enquiry endpoint using PDO/MySQL prepared statements.
- MySQL schema for destinations and enquiry submissions.

## Run locally

The homepage is static HTML/CSS/JS. You can preview it with a simple static server, but PHP endpoints require PHP and MySQL. For a local PHP preview from the repository root run `php -S localhost:8000`; then open `http://localhost:8000`.

## Deploy to Hostinger

1. Upload the repository contents to `public_html` (or use Git deployment if enabled on your plan).
2. Create a MySQL database and database user in hPanel.
3. Import `database/schema.sql` with phpMyAdmin. If Hostinger has already created the database, remove the `CREATE DATABASE` and `USE` lines if the import tool disallows them.
4. Copy `api/config.example.php` to `api/config.php` and enter the MySQL host, database name, username, and password. `api/config.php` is excluded from Git.
5. Confirm the PHP version and PDO MySQL extension are enabled.
6. Test `api/destinations.php` and then submit a test enquiry. The static site renders before DB configuration; API endpoints return a safe 503 message until the DB is configured.

## Photos and destination data

The destination names follow the 33 places listed on ViuTravel's public destinations directory at the time of implementation. ViuTravel is a benchmark only; Wintrip Safaris is not affiliated with it. Remote Unsplash image URLs are temporary visual placeholders, not verified copies of ViuTravel's images. Before production, replace them with photos owned, licensed, or otherwise authorized for Wintrip Safaris. Some destinations are international; confirm current visa guidance before publishing it to travellers.

## Before production launch

- Replace placeholder phone/email with verified company contact details.
- Review all destinations and regions with the business.
- Replace external image placeholders with licensed assets; download and optimize locally where permitted.
- Add privacy notice, cookie handling as appropriate, terms, and spam protection (e.g. server-side rate limiting and a CAPTCHA/honeypot).
- Add SMTP email notifications, admin access controls, and a booking/payment flow only after requirements are confirmed.
- Do not expose `api/config.php` or commit secrets.

## Brand colours

- Dark chocolate `#3E2B20`
- Cocoa `#795238`
- Warm ivory `#FAF7F0`
- Sand beige `#D8C2A5`
- Muted terracotta `#B96F48`
- Taupe `#9B8A78`
