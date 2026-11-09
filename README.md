# NetConfig Pro - Network Engineer Landing Page

A high-converting, modern landing page designed specifically for freelance and consulting Network Engineers specializing in one-time remote router and switch configurations.

---

## 🚀 Quick Preview & Running Locally

### Option 1: One-Click Startup Script (Recommended)
Open your terminal in this folder and simply run:
```bash
./start.sh
```
*(Yeh script port 3345 ko automatically clean karega, server start karega, aur browser mein site khol dega!)*

### Option 2: Using npm
```bash
npm start
```

### Option 3: Double-click to open
Simply double-click `index.html` in your file explorer, and it will open directly in Google Chrome, Brave, Edge, or Firefox!

---

## ⚙️ How to Customize Your Details (Takes 1 Minute)

Open `js/main.js` in any text editor. At the very top, you will see the `CONFIG` block:

```javascript
const CONFIG = {
  // Your real WhatsApp number with country code (no + or spaces)
  // For India: "919076314255"
  whatsappNumber: "919076314255", 
  
  engineerName: "Certified Network Engineer",
  email: "support@netconfigpro.com",
  phoneDisplay: "+91 90763 14255",
  rawPhone: "9076314255",
  telegramHandle: "NetOpsExpert",
  primaryRemoteTool: "UltraViewer", // UltraViewer (Primary) / AnyDesk
  ultraviewerSupported: true,
  anydeskSupported: true,
  teamviewerSupported: true,
};
```

Whenever anyone clicks any **"WhatsApp Chat"**, **"Calculate Setup Cost"**, or submits the booking form, it will automatically open a chat with **your WhatsApp number** with pre-filled details!

---

## 🎯 Key Features Included

1. **#1 Top Priority Showcase: MikroTik RouterOS Hub**
   - PCC Dual-WAN & Multi-WAN Load Balancing
   - Recursive 0-Second Failover (no dropped Zoom/Teams calls)
   - WireGuard, L2TP/IPSec, SSTP & OpenVPN
   - Queue Tree & PCQ Bandwidth throttling
   - Hotspot & User Manager Voucher Billing
   - Raw Firewall, DDoS and brute-force hardening
   - Support for all models: CCR, RB5009, hEX, hAP, CRS switches, RouterOS v6 & v7.

2. **#2 Priority Showcase: Ubiquiti UniFi Ecosystem**
   - UDM Pro / UDM SE / Cloud Gateway Ultra setup
   - Cloud / VPS UniFi Controller deployment (AWS, DigitalOcean, local server)
   - Isolated VLANs (Staff, Guest, IoT, CCTV)
   - Seamless Fast Roaming (802.11r/k/v RF channel tuning)
   - Branded Guest Captive Portal
   - UniFi Site Magic & Teleport WireGuard VPN

3. **Multi-Brand Switch & Router Support**
   - Cisco Catalyst & Nexus (VLANs, SVI, LACP EtherChannel, RSTP)
   - Fortinet FortiGate (SD-WAN, SSL-VPN, Security Profiles)
   - pfSense & OPNsense (Hardware firewalls, Multi-WAN, Snort)
   - TP-Link Omada SDN, Aruba Instant On, Sophos, SonicWall, D-Link, Huawei.

4. **Interactive Cost Estimator & Quote Generator**
   - Client picks Brand, Devices, Features, Urgency
   - Real-time price breakdown in INR (₹) or USD ($)
   - One-click "Send This Setup to WhatsApp" button with pre-filled specs!

5. **Interactive NOC Terminal Simulation**
   - Visitors can click diagnostic pills (`Test MikroTik PCC`, `Test UniFi VLANs`, `Test WireGuard`, `Ping Test`) to see live terminal outputs.

6. **100% Risk-Free 4-Step Process & Reasonable Pricing**
   - **Basic Router Setup**: ₹699 (~$9)
   - **Dual-WAN PCC Pro & Failover**: ₹1,299 (~$16) [Most Popular]
   - **Full UniFi Stack / Enterprise Multi-VLAN**: ₹1,999 (~$24)
   - **24/7 SOS Emergency Rescue**: ₹999 (~$12)
   - Clear message: **"Pay ONLY after work is done and verified."**
   - Builds instant client trust and boosts conversion.

7. **Google SEO Optimized**
   - JSON-LD Structured Data (`ProfessionalService` schema)
   - FAQ Schema (`FAQPage` schema) for Google Rich Snippets
   - High-density search keywords for Google search ranking:
     - *"mikrotik configuration service"*
     - *"who can configure mikrotik router"*
     - *"unifi setup engineer"*
     - *"remote switch configuration"*
     - *"dual wan load balancing engineer"*

---

## 🌐 How to Host This for Free Online

You can host this website online in less than 3 minutes:

### Option A: Vercel (Recommended - 100% Free & Fast)
1. Go to [vercel.com](https://vercel.com) and sign up for free.
2. Click **"Add New Project"** and drag-and-drop this entire folder.
3. Your site goes live instantly with a free `.vercel.app` domain and free SSL!

### Option B: Netlify (100% Free)
1. Go to [netlify.com](https://netlify.com) and log in.
2. Drag and drop this folder onto the Netlify dashboard.
3. Your website is instantly live!

### Option C: GitHub Pages (100% Free)
1. Create a GitHub repository (e.g. `router-configuration`).
2. Push these files to GitHub.
3. Go to **Settings > Pages** and select `main` branch.

### Option D: Traditional cPanel Hosting (Hostinger, GoDaddy, Namecheap)
1. Open your cPanel File Manager.
2. Navigate to `public_html`.
3. Upload `index.html`, `css/`, `js/`, `robots.txt`, and `sitemap.xml`.

---

## 📈 Tips to Rank on Google & Get Paying Clients Fast

1. **Google Search Console**:
   - Once your website is hosted on a domain (e.g. `yourname-networks.com`), submit your domain to [Google Search Console](https://search.google.com/search-console).
   - Submit your `sitemap.xml` URL.
2. **Google Business Profile (Crucial for Local Calls)**:
   - Create a free [Google Business Profile](https://business.google.com/) with name like: *"YourName - MikroTik & UniFi Network Engineer"*.
   - Add service category *"Computer Support and Services"* or *"Telecommunications Consultant"*.
   - Add your website link and WhatsApp number.
3. **Reddit & Forums**:
   - Participate in `r/mikrotik`, `r/Ubiquiti`, `r/HomeNetworking`, and Indian tech forums (BroadbandForum.co).
   - Help people answering router questions with your website link in your bio.

