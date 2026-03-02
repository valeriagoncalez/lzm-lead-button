=== LZM Lead Button ===
Contributors: lzmdigital
Tags: whatsapp, chat, conversion, lead
Requires at least: 6.2
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Prevent accidental clicks. Add a confirmation form before opening WhatsApp to ensure only real leads are counted.

== Description ==
Source Code: https://github.com/valeriagoncalez/lzm-lead-button

**LZM Lead Button** is a solution designed for Traffic Managers and Agencies requiring precision in WhatsApp conversion tracking.

In performance campaigns, accidental clicks often skew analytics and inefficiently use ad budget. This plugin addresses this issue by implementing a **Double-Intent Validation Layer**.

**How it works:**
Instead of an immediate redirect, the click triggers a confirmation modal. The user must confirm their intent (by entering their name) before opening WhatsApp. This ensures that every conversion signal sent to your tracking pixels represents a qualified lead with genuine interest.

### 🛡️ Technical Highlights

* **WordPress Block Standards:** Built strictly following the official WordPress Block API guidelines. This ensures seamless integration with the Gutenberg editor, stability, and future-proof compatibility.
* **Performance First:** Engineered to be lightweight. No heavy external libraries or jQuery dependencies that could negatively impact your Core Web Vitals.
* **Privacy & Compliance:** Designed with data minimization in mind. The plugin validates the intent and passes data directly to WhatsApp via URL parameters. No personal data is stored in your WordPress database.

### 🚀 Key Features

* **Intent Verification Modal:** Filters out low-quality "ghost clicks" before they impact your conversion metrics.
* **Hybrid Routing:** Choose between automatically generating a WhatsApp link or setting a **Custom URL** (for CRMs or API routes).
* **Granular Tracking (GTM/Pixel):** Add custom HTML IDs to both the trigger button and the modal submit button for precise event firing.
* **Dynamic Message Builder:** Automatically inserts the lead's name into the WhatsApp message (e.g., "Hello, my name is [Name]...").
* **Native Design System:** Full control over colors, border radius, and **icon variations** (Solid, Outline, or None) directly within the editor.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/lzm-lead-button` directory, or install the plugin directly through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. **How to use:** Go to any Page or Post, click the "+" (Block Inserter) button, and search for **"LZM Lead Button"**.
4. Configure your WhatsApp number and customize the styles in the block sidebar.

== Frequently Asked Questions ==

= Does this plugin store leads in the database? =
No. To ensure maximum speed and privacy compliance (GDPR/LGPD), this plugin acts as a pass-through validator. It confirms the user's intent and forwards the data directly to WhatsApp via URL parameters. No personal data is saved in your WordPress.

= Can I track conversions with Google Ads/Facebook (Meta)? =
Yes. You can add a custom CSS Class or ID in the block's "Advanced" settings to trigger your GTM tags or Pixel events specifically on the click.

= Is it compatible with any theme? =
Yes. Being a native Gutenberg block, it works seamlessly with any theme that supports the WordPress Block Editor.

== Screenshots ==

1. **The 3-Step Validation Flow:** (1) User clicks, (2) Intent Modal opens, (3) User confirms name to unlock WhatsApp.
2. **Native Integration:** Works seamlessly with the Block Editor search and toolbar.
3. **Full Control:** Customization options for destination numbers, button styling, and modal text labels.
4. **Smart Features:** Advanced settings for dynamic messages and tracking IDs (Pixel/GTM).

== Changelog ==

= 1.0.0 =
* Initial release.
* Added Dual Routing System (Auto-WhatsApp Generator or Custom URL).
* Added Native Block Styling integration (Colors, Typography, Border Radius).
* Added Icon options (Outline, Solid, or None) for both button and modal.
* Added Dynamic Message Builder with name insertion.
* Added HTML ID fields for advanced tracking (Pixel/GTM) on both trigger and submit buttons.
* Added Layout controls (Desktop Max-Width and Open in New Tab).
* Added full customization for all Modal text labels.