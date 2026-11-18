/**
 * NetConfig Pro - Main Interactive Script
 * High-Converting Network Engineering Landing Page
 */

// ==========================================
// USER CONFIGURATION (Easily change your details here)
// ==========================================
const CONFIG = {
  // Real WhatsApp number (India +91)
  whatsappNumber: "919076314255", 
  engineerName: "Certified Network Engineer",
  email: "support@netconfigpro.com",
  phoneDisplay: "+91 90763 14255",
  rawPhone: "9076314255",
  telegramHandle: "NetOpsExpert",
  primaryRemoteTool: "UltraViewer",
  ultraviewerSupported: true,
  anydeskSupported: true,
  teamviewerSupported: true,
};

// ==========================================
// STATE MANAGEMENT
// ==========================================
let currentCurrency = 'INR'; // 'INR' or 'USD'
const currencyRates = {
  INR: { symbol: '₹', multiplier: 1 },
  USD: { symbol: '$', multiplier: 0.0125 } // 1 INR ~ 0.0125 USD (approx $1 = 80-83 INR)
};

// Base costs in INR (Pocket-friendly & transparent rates)
const basePricing = {
  brands: {
    mikrotik: { name: 'MikroTik RouterOS (CCR, RB, hAP, hEX)', category: 'router', base: 699, desc: 'Base WAN/LAN, DHCP, NAT, DNS & firewall protection' },
    unifi: { name: 'Ubiquiti UniFi (UDM, Gateway, USW, U6/U7)', category: 'router', base: 799, desc: 'UniFi Network controller adoption, SSID & routing setup' },
    cisco: { name: 'Cisco Switches & Routers (Catalyst, SG, CBS)', category: 'switch', base: 899, desc: 'CLI console setup, VLAN trunking, SSH & port hardening' },
    cctv: { name: 'CCTV NVR / DVR & IP Cameras (Hikvision, Dahua, CP Plus)', category: 'cctv', base: 599, desc: 'NVR network setup, camera IP assignment & phone app' },
    fortinet: { name: 'Fortinet FortiGate Firewall (40F, 60F, 70F, 100F)', category: 'firewall', base: 1499, desc: 'Policy routes, SD-WAN, NAT & security profiles' },
    sonicwall: { name: 'SonicWall TZ & NSa Firewalls', category: 'firewall', base: 1499, desc: 'Access rules, NAT policies & interface security zones' },
    sophos: { name: 'Sophos XGS Next-Gen Firewall', category: 'firewall', base: 1499, desc: 'Firewall rules, NAT policies & SSL inspection setup' },
    pfsense: { name: 'pfSense / OPNsense Appliance', category: 'firewall', base: 1299, desc: 'WAN/LAN interfaces, gateway routing, DNS & packages' },
    tplink: { name: 'TP-Link Omada SDN & SafeStream', category: 'router', base: 599, desc: 'Omada Controller or standalone gateway configuration' },
    other: { name: 'Other Enterprise Router/Switch', category: 'other', base: 599, desc: 'General managed router or switch configuration' }
  },
  addons: {
    dualWan: { 
      name: 'Dual-WAN Auto-Failover & Load Balancing', 
      price: 499, 
      desc: 'Combine 2 ISPs (Airtel + Jio) — 0-sec auto-failover' 
    },
    vpn: { 
      name: 'Remote VPN / WireGuard Access', 
      price: 399, 
      desc: 'Access office Tally, NAS files & servers securely from home' 
    },
    vlan: { 
      name: 'VLAN Segmentation & Network Isolation', 
      price: 299, 
      desc: 'Separate Staff, Guest Wi-Fi & CCTV on isolated subnets' 
    },
    cctvRemote: { 
      name: 'CCTV Mobile App & Remote View', 
      price: 299, 
      desc: 'Hik-Connect / DMSS / gCMOB phone viewing without static IP' 
    },
    qos: { 
      name: 'Bandwidth Limiting & QoS Speed Limits', 
      price: 199, 
      desc: 'Stop torrent hogs; prioritize Zoom, Teams & VoIP calls' 
    },
    firewall: { 
      name: 'Firewall Hardening & Attack Defense', 
      price: 299, 
      desc: 'Block brute-force bot attacks, port knocking & DDoS scans' 
    },
    hotspot: { 
      name: 'Guest Wi-Fi Hotspot & Vouchers', 
      price: 399, 
      desc: 'Custom splash login page with time or data limit tokens' 
    },
    wifi: { 
      name: 'Wi-Fi Fast Roaming & RF Tuning', 
      price: 249, 
      desc: 'Seamless 802.11r/k roaming across rooms without dropped calls' 
    }
  }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupHeroSearch();
  setupHardwareRotator();
  setupCalculator();
  setupTerminal();
  setupSocialProofToasts();
  setupFaqAccordion();
  setupBrandTabs();
  setupContactForm();
  setupFailoverSimulator();
  setupGuideModal();
  setupGuideTabs();
  updateWhatsAppLinks();
});

// ==========================================
// NAVIGATION & MOBILE MENU
// ==========================================
function setupNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
    
    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // Header background on scroll - Keep crisp canvas/white matching reference palette
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.background = 'rgba(255,255,255,0.98)';
        header.style.boxShadow = '0 4px 16px rgba(0,23,55,0.08)';
        header.style.borderBottomColor = '#E2E8F0';
      } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = '0 1px 4px rgba(0,23,55,0.03)';
      }
    });
  }
}

// ==========================================
// INTERACTIVE HERO EQUIPMENT SEARCH BAR
// ==========================================
function setupHeroSearch() {
  const searchInput = document.getElementById('heroModelSearch');
  const searchBtn = document.getElementById('heroSearchBtn');
  const quickTags = document.querySelectorAll('.hero-quick-tag');

  function executeSearch(query) {
    if (!query) return;
    const q = query.toLowerCase().trim();
    let targetId = null;

    if (q.includes('mikro') || q.includes('routeros') || q.includes('5009') || q.includes('hex') || q.includes('ax3') || q.includes('ccr') || q.includes('winbox') || q.includes('mangle')) {
      targetId = 'mikrotik';
    } else if (q.includes('unifi') || q.includes('ubiquiti') || q.includes('udm')) {
      targetId = 'unifi';
    } else if (q.includes('firewall') || q.includes('pfsense') || q.includes('fortinet') || q.includes('fortigate') || q.includes('sophos') || q.includes('sonicwall') || q.includes('opnsense')) {
      targetId = 'switches';
      document.querySelector('.brand-tab-btn[data-tab="firewalls"]')?.click();
    } else if (q.includes('cctv') || q.includes('nvr') || q.includes('dvr') || q.includes('camera') || q.includes('hikvision') || q.includes('dahua') || q.includes('nas') || q.includes('synology') || q.includes('qnap') || q.includes('storage')) {
      targetId = 'switches';
      document.querySelector('.brand-tab-btn[data-tab="cctv-nas"]')?.click();
    } else if (q.includes('voip') || q.includes('pbx') || q.includes('phone') || q.includes('grandstream') || q.includes('yeastar') || q.includes('sip')) {
      targetId = 'switches';
      document.querySelector('.brand-tab-btn[data-tab="voip"]')?.click();
    } else if (q.includes('wifi') || q.includes('ap') || q.includes('access point') || q.includes('capsman') || q.includes('roam') || q.includes('eap') || q.includes('u6') || q.includes('u7')) {
      targetId = 'switches';
      document.querySelector('.brand-tab-btn[data-tab="wifi"]')?.click();
    } else if (q.includes('draytek') || q.includes('vigor') || q.includes('omada') || q.includes('er605') || q.includes('bridge') || q.includes('modem') || q.includes('ont') || q.includes('onu')) {
      targetId = 'switches';
      document.querySelector('.brand-tab-btn[data-tab="routers"]')?.click();
    } else if (q.includes('cisco') || q.includes('switch') || q.includes('vlan') || q.includes('trunk') || q.includes('lacp') || q.includes('aruba') || q.includes('catalyst')) {
      targetId = 'switches';
      document.querySelector('.brand-tab-btn[data-tab="switches"]')?.click();
    } else if (q.includes('failover') || q.includes('pcc') || q.includes('dual wan') || q.includes('airtel') || q.includes('jio') || q.includes('load balance')) {
      targetId = 'failover-demo';
    } else if (q.includes('price') || q.includes('rate') || q.includes('cost') || q.includes('plan') || q.includes('pack')) {
      targetId = 'pricing';
    } else if (q.includes('calc') || q.includes('estimate') || q.includes('quote')) {
      targetId = 'calculator';
    } else if (q.includes('contact') || q.includes('call') || q.includes('book') || q.includes('phone') || q.includes('form')) {
      targetId = 'contact';
    } else if (q.includes('faq') || q.includes('question') || q.includes('ultraviewer') || q.includes('anydesk')) {
      targetId = 'faq';
    } else if (q.includes('guide') || q.includes('solution') || q.includes('how to') || q.includes('troubleshoot') || q.includes('step') || q.includes('blueprint')) {
      targetId = 'setup-guides';
    } else {
      targetId = 'switches';
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetEl.classList.add('ring-4', 'ring-[#005CE6]/30', 'transition-all', 'duration-500');
      setTimeout(() => {
        targetEl.classList.remove('ring-4', 'ring-[#005CE6]/30');
      }, 2000);
    }
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      executeSearch(searchInput.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch(searchInput.value);
      }
    });
  }

  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const targetSelector = tag.getAttribute('data-target');
      if (targetSelector) {
        const el = document.querySelector(targetSelector);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('ring-4', 'ring-[#005CE6]/30', 'transition-all', 'duration-500');
          setTimeout(() => {
            el.classList.remove('ring-4', 'ring-[#005CE6]/30');
          }, 2000);
        }
      }
    });
  });
}

// ==========================================
// ROTATIONAL HARDWARE & BRAND SHOWCASE CAROUSEL
// ==========================================
function setupHardwareRotator() {
  const rotator = document.getElementById('hardwareRotator');
  if (!rotator) return;

  const slides = rotator.querySelectorAll('.rotator-slide');
  const tabs = rotator.querySelectorAll('.rotator-tab-btn');
  const dots = rotator.querySelectorAll('.rotator-dot');
  const prevBtn = document.getElementById('rotatorPrevBtn');
  const nextBtn = document.getElementById('rotatorNextBtn');

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoRotateInterval = null;

  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
        slide.style.display = 'block';
      } else {
        slide.classList.remove('active');
        slide.style.display = 'none';
      }
    });

    tabs.forEach((tab, i) => {
      if (i === currentIndex) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoRotate() {
    stopAutoRotate();
    autoRotateInterval = setInterval(nextSlide, 3500);
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  // Event Listeners for Nav buttons
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoRotate(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoRotate(); });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const slideIndex = parseInt(tab.getAttribute('data-slide'), 10);
      if (!isNaN(slideIndex)) {
        showSlide(slideIndex);
        startAutoRotate();
      }
    });
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slideIndex)) {
        showSlide(slideIndex);
        startAutoRotate();
      }
    });
  });

  // Pause on hover
  rotator.addEventListener('mouseenter', stopAutoRotate);
  rotator.addEventListener('mouseleave', startAutoRotate);

  // Initialize auto rotation
  startAutoRotate();
}

// ==========================================
// INTERACTIVE COST CALCULATOR & RECEIPT
// ==========================================
function setupCalculator() {
  const brandSelect = document.getElementById('calcBrand');
  const urgencySelect = document.getElementById('calcUrgency');
  const currencyToggle = document.getElementById('calcCurrencyToggle');
  const checkboxes = document.querySelectorAll('.calc-addon-check');
  const breakdownListEl = document.getElementById('calcBreakdownList');
  const categoryPills = document.querySelectorAll('.calc-cat-pill');
  
  if (!brandSelect) return;

  // Sync category filter pills with brand dropdown
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.category;
      
      // Auto-select representative equipment if a specific category is clicked
      if (cat === 'router') brandSelect.value = 'mikrotik';
      else if (cat === 'cctv') brandSelect.value = 'cctv';
      else if (cat === 'switch') brandSelect.value = 'cisco';
      else if (cat === 'firewall') brandSelect.value = 'fortinet';
      
      recalculate();
    });
  });

  // When dropdown changes, update category pill highlight
  brandSelect.addEventListener('change', () => {
    const selectedOption = brandSelect.options[brandSelect.selectedIndex];
    const cat = selectedOption ? selectedOption.dataset.cat : 'all';
    categoryPills.forEach(p => {
      if (p.dataset.category === cat) {
        categoryPills.forEach(btn => btn.classList.remove('active'));
        p.classList.add('active');
      }
    });
    recalculate();
  });

  // Feature cards active styling and click handling
  checkboxes.forEach(cb => {
    const card = cb.closest('.calc-feature-card');
    
    // Toggle active class on change
    cb.addEventListener('change', () => {
      if (card) {
        if (cb.checked) {
          card.classList.add('calc-card-active');
        } else {
          card.classList.remove('calc-card-active');
        }
      }
      recalculate();
    });

    // Make entire card surface clickable
    if (card) {
      card.addEventListener('click', (e) => {
        if (e.target !== cb && e.target.tagName !== 'INPUT') {
          e.preventDefault();
          cb.checked = !cb.checked;
          cb.dispatchEvent(new Event('change'));
        }
      });
    }
  });

  function recalculate() {
    const selectedBrandKey = brandSelect.value;
    const brandData = basePricing.brands[selectedBrandKey] || basePricing.brands.mikrotik;
    let baseInr = brandData.base;
    let addonsTotalInr = 0;
    
    let selectedAddonItems = [];

    checkboxes.forEach(cb => {
      const card = cb.closest('.calc-feature-card');
      if (cb.checked) {
        if (card) card.classList.add('calc-card-active');
        const addonKey = cb.dataset.addon;
        const addon = basePricing.addons[addonKey];
        if (addon) {
          addonsTotalInr += addon.price;
          selectedAddonItems.push(addon);
        }
      } else {
        if (card) card.classList.remove('calc-card-active');
      }
    });

    const subtotalInr = baseInr + addonsTotalInr;

    // Urgency factor
    const isEmergency = urgencySelect.value === 'emergency';
    let emergencyFeeInr = 0;
    if (isEmergency) {
      emergencyFeeInr = Math.round(subtotalInr * 0.20); // 20% priority emergency dispatch fee
    }

    const grandTotalInr = subtotalInr + emergencyFeeInr;

    // Currency conversion
    const curr = currencyRates[currentCurrency];
    const convertPrice = (inrVal) => {
      return currentCurrency === 'INR' 
        ? Math.round(inrVal) 
        : Math.round(inrVal * curr.multiplier);
    };

    const displayBase = convertPrice(baseInr);
    const displayGrandTotal = convertPrice(grandTotalInr);
    const displayEmergencyFee = convertPrice(emergencyFeeInr);

    // Update UI elements
    const priceEl = document.getElementById('calcTotalPrice');
    const symbolEl = document.getElementById('calcCurrencySymbol');
    const baseSummaryEl = document.getElementById('calcBaseSummary');
    const addonsSummaryEl = document.getElementById('calcAddonsSummary');
    
    if (priceEl) priceEl.textContent = displayGrandTotal.toLocaleString();
    if (symbolEl) symbolEl.textContent = curr.symbol;
    if (baseSummaryEl) baseSummaryEl.textContent = brandData.name;
    if (addonsSummaryEl) {
      addonsSummaryEl.textContent = selectedAddonItems.length > 0 
        ? `${selectedAddonItems.length} add-on${selectedAddonItems.length > 1 ? 's' : ''} selected` 
        : '0 add-ons (Base Setup Only)';
    }

    // Render detailed itemized calculation breakdown (The Receipt)
    if (breakdownListEl) {
      let rowsHtml = '';

      // 1. Base Setup Row
      rowsHtml += `
        <div class="calc-receipt-row">
          <div class="flex items-start gap-2.5">
            <span class="w-5 h-5 rounded-full bg-blue-100 text-[#005CE6] flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">1</span>
            <div>
              <span class="font-bold text-[#001737] block leading-tight">Base Setup: ${brandData.name}</span>
              <span class="text-xs text-slate-500 leading-tight">${brandData.desc}</span>
            </div>
          </div>
          <span class="font-mono font-bold text-[#001737] text-sm whitespace-nowrap ml-3">${curr.symbol}${displayBase}</span>
        </div>
      `;

      // 2. Selected Add-ons or "None"
      if (selectedAddonItems.length > 0) {
        selectedAddonItems.forEach((addon, idx) => {
          const addonPriceConverted = convertPrice(addon.price);
          rowsHtml += `
            <div class="calc-receipt-row">
              <div class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">+</span>
                <div>
                  <span class="font-bold text-[#001737] block leading-tight">${addon.name}</span>
                  <span class="text-xs text-slate-500 leading-tight">${addon.desc}</span>
                </div>
              </div>
              <span class="font-mono font-semibold text-emerald-700 text-sm whitespace-nowrap ml-3">+${curr.symbol}${addonPriceConverted}</span>
            </div>
          `;
        });
      } else {
        rowsHtml += `
          <div class="calc-receipt-row opacity-80">
            <div class="flex items-center gap-2.5 text-xs text-slate-500">
              <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">0</span>
              <span>No optional add-ons selected (Clean standard single-device setup)</span>
            </div>
            <span class="font-mono text-xs text-slate-400">+${curr.symbol}0</span>
          </div>
        `;
      }

      // 3. Emergency SOS row if active
      if (isEmergency) {
        rowsHtml += `
          <div class="calc-receipt-row bg-amber-50/80 -mx-2 px-2 py-1.5 rounded-lg border border-amber-200/60">
            <div class="flex items-start gap-2.5">
              <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">🚨</span>
              <div>
                <span class="font-bold text-amber-900 block leading-tight">Priority SOS Emergency Dispatch</span>
                <span class="text-xs text-amber-700 leading-tight">Priority queue jump — engineer connects in 30-60 mins (+20%)</span>
              </div>
            </div>
            <span class="font-mono font-bold text-amber-800 text-sm whitespace-nowrap ml-3">+${curr.symbol}${displayEmergencyFee}</span>
          </div>
        `;
      }

      breakdownListEl.innerHTML = rowsHtml;
    }

    // Build customized WhatsApp URL
    const sendWhatsappBtn = document.getElementById('calcSendWhatsappBtn');
    if (sendWhatsappBtn) {
      let addonsTextList = selectedAddonItems.length > 0 
        ? selectedAddonItems.map(a => `  • ${a.name} (+${curr.symbol}${convertPrice(a.price)})`).join('\n')
        : '  • Standard Initial Setup (No extra add-ons)';
      
      const urgencyText = isEmergency ? '🚨 Priority SOS (< 1 Hour)' : 'Standard Setup (Within 24 Hours)';
      
      const message = `Hello Network Engineer! 👋\n\nI calculated my setup cost on your website:\n• Equipment: ${brandData.name} (${curr.symbol}${displayBase})\n• Features Selected:\n${addonsTextList}\n• Urgency: ${urgencyText}\n• Total Calculated Price: ${curr.symbol}${displayGrandTotal} (Zero Advance • 100% Pay After Testing)\n\nCould you please check availability and connect via UltraViewer / AnyDesk? Thank you!`;
      
      const encodedMsg = encodeURIComponent(message);
      sendWhatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;
    }
  }

  // Event Listeners
  urgencySelect.addEventListener('change', recalculate);

  if (currencyToggle) {
    currencyToggle.addEventListener('click', () => {
      currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
      currencyToggle.textContent = currentCurrency === 'INR' ? 'Switch to USD ($)' : 'Switch to INR (₹)';
      recalculate();
    });
  }

  // Initial calculation
  recalculate();
}

// ==========================================
// INTERACTIVE NOC TERMINAL SIMULATOR
// ==========================================
function setupTerminal() {
  const terminalOutput = document.getElementById('terminalOutput');
  const commandButtons = document.querySelectorAll('.term-cmd-btn');
  
  if (!terminalOutput) return;

  const terminalCommands = {
    'ping': [
      '<span class="text-cyan-400">admin@netops:~$</span> ping 8.8.8.8 -c 4',
      'PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.',
      '64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=4.12 ms',
      '64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=3.98 ms',
      '64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=4.05 ms',
      '64 bytes from 8.8.8.8: icmp_seq=4 ttl=118 time=3.92 ms',
      '--- 8.8.8.8 ping statistics ---',
      '<span class="text-emerald-400">4 packets transmitted, 4 received, 0% packet loss, time 3004ms</span>',
      'rtt min/avg/max = 3.92/4.01/4.12 ms (OPTIMIZED)'
    ],
    'mikrotik': [
      '<span class="text-red-400">[admin@MikroTik-CCR]</span> > /ip firewall mangle print',
      '# Flags: X - disabled, I - invalid, D - dynamic',
      '0   chain=prerouting dst-address-type=!local in-interface=LAN per-connection-classifier=both-addresses:2/0 action=mark-connection new-connection-mark=WAN1_conn',
      '1   chain=prerouting dst-address-type=!local in-interface=LAN per-connection-classifier=both-addresses:2/1 action=mark-connection new-connection-mark=WAN2_conn',
      '<span class="text-emerald-400">[OK] PCC 2-WAN Load Balancing Active: WAN1 (Airtel Fibernet) + WAN2 (JioFiber)</span>',
      '<span class="text-emerald-400">[OK] Recursive Route Failover Status: ONLINE (0ms packet drop)</span>'
    ],
    'unifi': [
      '<span class="text-blue-400">root@UDM-Pro-SE:~#</span> unifi-os status --vlans',
      '=== UniFi Network 8.1 Controller Active ===',
      '• VLAN 10 [Default / Management]  -> 192.168.10.0/24 (Isolation: Off)',
      '• VLAN 20 [Corporate Staff]      -> 192.168.20.0/24 (QoS: High Priority)',
      '• VLAN 30 [Guest Captive Portal]  -> 192.168.30.0/24 (Client Isolation: ON)',
      '• VLAN 40 [Surveillance & IoT]    -> 192.168.40.0/24 (Internet Restricted)',
      '<span class="text-emerald-400">[OK] 8x UniFi U6-Pro APs Roaming: Fast BSS 802.11r/k Active</span>'
    ],
    'vpn': [
      '<span class="text-cyan-400">admin@netops:~$</span> wireguard show wg0',
      'interface: wg0 (Headquarters to Branch Office)',
      '  public key: oP8fW9d2kQ...kM72=',
      '  listening port: 51820',
      'peer: 7X8L1mQz...aB4=',
      '  endpoint: 203.0.113.45:51820',
      '  allowed ips: 10.100.0.0/24, 192.168.50.0/24',
      '  latest handshake: 14 seconds ago',
      '  transfer: 4.82 GiB received, 12.19 GiB sent',
      '<span class="text-emerald-400">[OK] Tunnel Active | End-to-End Encrypted</span>'
    ]
  };

  commandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      const lines = terminalCommands[cmd];
      if (lines) {
        terminalOutput.innerHTML = '';
        let i = 0;
        function printLine() {
          if (i < lines.length) {
            const p = document.createElement('div');
            p.className = 'py-0.5';
            p.innerHTML = lines[i];
            terminalOutput.appendChild(p);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            i++;
            setTimeout(printLine, 70);
          }
        }
        printLine();
      }
    });
  });
}

// ==========================================
// SOCIAL PROOF TOAST NOTIFICATIONS
// ==========================================
function setupSocialProofToasts() {
  const toast = document.getElementById('liveToast');
  const toastText = document.getElementById('toastText');
  const toastTime = document.getElementById('toastTime');
  
  if (!toast || !toastText) return;

  const simulatedBookings = [
    { city: 'Mumbai', desc: 'MikroTik CCR Dual-WAN Load Balancing setup', time: '8 mins ago' },
    { city: 'Bengaluru', desc: 'UniFi Dream Machine Pro & 6x AP Wi-Fi 6 optimization', time: '14 mins ago' },
    { city: 'Delhi NCR', desc: 'Cisco Catalyst 2960 Inter-VLAN & LACP Trunking', time: '22 mins ago' },
    { city: 'Dubai (UAE)', desc: 'Fortinet FortiGate SSL-VPN & SD-WAN configuration', time: '35 mins ago' },
    { city: 'Hyderabad', desc: 'MikroTik Hotspot + Voucher Billing system configured', time: '41 mins ago' },
    { city: 'Pune', desc: 'pfSense Multi-WAN Failover & WireGuard Tunnel', time: '55 mins ago' },
    { city: 'London (UK)', desc: 'Ubiquiti UniFi Cloud Gateway & Guest Isolation', time: '1 hour ago' }
  ];

  let currentIndex = 0;

  function showNextToast() {
    const item = simulatedBookings[currentIndex];
    toastText.innerHTML = `<strong>${item.city} client:</strong> ${item.desc}`;
    toastTime.textContent = item.time;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);

    currentIndex = (currentIndex + 1) % simulatedBookings.length;
  }

  // First toast after 3 seconds, then every 22 seconds
  setTimeout(showNextToast, 3500);
  setInterval(showNextToast, 22000);
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        
        // Close all others
        faqItems.forEach(other => {
          other.querySelector('.faq-answer')?.classList.add('hidden');
          other.querySelector('.faq-icon')?.classList.remove('rotate-180');
        });

        // Toggle current
        if (!isOpen) {
          answer.classList.remove('hidden');
          icon?.classList.add('rotate-180');
        }
      });
    }
  });
}

// ==========================================
// BRAND SHOWCASE TABS
// ==========================================
function setupBrandTabs() {
  const tabBtns = document.querySelectorAll('.brand-tab-btn');
  const brandCards = document.querySelectorAll('.brand-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const brand = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      brandCards.forEach(card => {
        const cardBrands = (card.dataset.brand || '').split(' ');
        if (brand === 'all' || cardBrands.includes(brand) || card.dataset.brand === brand) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Connect Flipkart/Uber style category shortcut cards to the tabs
  const shortcutCards = document.querySelectorAll('.category-shortcut-card');
  shortcutCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      if (cat) {
        const targetBtn = document.querySelector(`.brand-tab-btn[data-tab="${cat}"]`);
        if (targetBtn) {
          targetBtn.click();
        }
      }
    });
  });
}

// ==========================================
// ANTI-SPAM & ANTI-FLOOD SECURITY SHIELD
// Protects phone number from being spammed (1000 requests)
// ==========================================
let currentCaptchaResult = null;

function generateMathCaptcha() {
  const num1 = Math.floor(Math.random() * 12) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;
  currentCaptchaResult = num1 + num2;

  const questionEl = document.getElementById('captchaQuestion');
  if (questionEl) {
    questionEl.textContent = `${num1} + ${num2} = ?`;
  }
  const answerInput = document.getElementById('captchaAnswer');
  if (answerInput) {
    answerInput.value = '';
  }
}

// Check Rate Limits (Max 2 requests per 5 minutes, 60s cooldown)
const RATE_LIMIT_CONFIG = {
  maxRequests: 2,
  windowMs: 5 * 60 * 1000, // 5 minutes
  cooldownSeconds: 60
};

function getSubmissionHistory() {
  try {
    const raw = localStorage.getItem('netconfig_submissions');
    if (!raw) return [];
    const list = JSON.parse(raw);
    const now = Date.now();
    // Keep only timestamps within window
    return list.filter(ts => now - ts < RATE_LIMIT_CONFIG.windowMs);
  } catch (e) {
    return [];
  }
}

function saveSubmissionTimestamp() {
  try {
    const history = getSubmissionHistory();
    history.push(Date.now());
    localStorage.setItem('netconfig_submissions', JSON.stringify(history));
    localStorage.setItem('netconfig_cooldown_until', (Date.now() + RATE_LIMIT_CONFIG.cooldownSeconds * 1000).toString());
  } catch (e) {}
}

function checkCooldownAndStartTimer() {
  const submitBtn = document.getElementById('submitBookingBtn');
  const alertBox = document.getElementById('formSecurityAlert');
  if (!submitBtn) return;

  const cooldownUntil = parseInt(localStorage.getItem('netconfig_cooldown_until') || '0', 10);
  const now = Date.now();

  if (cooldownUntil > now) {
    const remaining = Math.ceil((cooldownUntil - now) / 1000);
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-60', 'cursor-not-allowed');
    submitBtn.innerHTML = `
      <svg class="w-4 h-4 animate-spin inline mr-1" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
      <span>Anti-Spam Cooldown (${remaining}s)</span>
    `;

    setTimeout(checkCooldownAndStartTimer, 1000);
  } else {
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
    submitBtn.innerHTML = `
      <span>Send Request via WhatsApp</span>
      <svg class="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    `;
    if (alertBox && !alertBox.classList.contains('rate-limit-active')) {
      alertBox.classList.add('hidden');
    }
  }
}

// ==========================================
// CONTACT / BOOKING FORM WITH SECURITY SHIELD
// ==========================================
function setupContactForm() {
  const contactForm = document.getElementById('serviceBookingForm');
  const refreshBtn = document.getElementById('refreshCaptchaBtn');
  const alertBox = document.getElementById('formSecurityAlert');
  const formSuccess = document.getElementById('formSuccessMsg');

  // Initialize Captcha
  generateMathCaptcha();
  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.preventDefault();
      generateMathCaptcha();
    });
  }

  // Check cooldown on page load
  checkCooldownAndStartTimer();

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. HONEYPOT CHECK (Bot Trap)
    const honeypot = document.getElementById('formWebsiteShield');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Bot submission blocked via Honeypot');
      contactForm.reset();
      return; // Silent discard for automated bot scripts
    }

    // 2. RATE LIMIT CHECK (Max 2 requests in 5 minutes)
    const history = getSubmissionHistory();
    if (history.length >= RATE_LIMIT_CONFIG.maxRequests) {
      if (alertBox) {
        alertBox.classList.remove('hidden');
        alertBox.classList.add('rate-limit-active');
        alertBox.innerHTML = `
          <strong class="font-bold">⛔ Rate Limit Exceeded (Anti-Flood Protection):</strong>
          <p class="mt-1">To protect against spam attacks, a maximum of 2 requests per 5 minutes is allowed. Please wait 5 minutes or directly call/WhatsApp <strong>${CONFIG.phoneDisplay}</strong>.</p>
        `;
      }
      return;
    }

    // 3. COOLDOWN CHECK
    const cooldownUntil = parseInt(localStorage.getItem('netconfig_cooldown_until') || '0', 10);
    if (cooldownUntil > Date.now()) {
      const waitSec = Math.ceil((cooldownUntil - Date.now()) / 1000);
      alert(`🛡️ Anti-Flood Protection Active: Please wait ${waitSec} seconds before sending another request.`);
      return;
    }

    // 4. MATH CAPTCHA VERIFICATION
    const answerInput = document.getElementById('captchaAnswer');
    const userAnswer = parseInt(answerInput?.value?.trim() || '', 10);
    if (isNaN(userAnswer) || userAnswer !== currentCaptchaResult) {
      alert('❌ Security Verification Failed: Please answer the math question correctly to prove you are human.');
      generateMathCaptcha();
      if (answerInput) {
        answerInput.value = '';
        answerInput.focus();
      }
      return;
    }

    // 5. SANITIZE & BUILD MESSAGE
    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const brand = document.getElementById('formBrand').value;
    const issue = document.getElementById('formIssue').value.trim();
    const tool = document.getElementById('formTool').value;

    const message = `🚨 *New One-Time Setup Request*\n\n` +
      `• *Client Name:* ${name}\n` +
      `• *Contact / WhatsApp:* ${phone}\n` +
      `• *Equipment / Brand:* ${brand}\n` +
      `• *Preferred Tool:* ${tool}\n` +
      `• *Issue / Configuration Needed:* ${issue}\n\n` +
      `🔒 *Security Token:* ${Date.now().toString(36).toUpperCase()}\n` +
      `Please let me know your earliest UltraViewer / AnyDesk availability and quote.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;

    // Record submission timestamp for sliding window rate limiter
    saveSubmissionTimestamp();
    checkCooldownAndStartTimer();

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show on-screen confirmation
    if (formSuccess) {
      formSuccess.classList.remove('hidden');
    }
    contactForm.reset();
    generateMathCaptcha();
  });
}

// ==========================================
// UPDATE ALL WHATSAPP CTA LINKS GLOBALLY (WITH DEBOUNCE)
// ==========================================
let lastWhatsAppClickTime = 0;

function updateWhatsAppLinks() {
  const defaultMessage = encodeURIComponent("Hello Network Engineer! 👋 I found your website and need urgent one-time router/switch configuration. Could you please help?");
  const defaultUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${defaultMessage}`;

  document.querySelectorAll('.whatsapp-link').forEach(link => {
    const contextAttr = link.getAttribute('data-context');
    const btnText = link.textContent.trim();
    if (contextAttr) {
      const specificMsg = encodeURIComponent(`Hello Network Engineer! 👋\n\nI found your website and need urgent help with: *${contextAttr}*.\nCould you please connect via UltraViewer or AnyDesk? Thank you!`);
      link.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${specificMsg}`);
    } else if (btnText && (btnText.toLowerCase().includes('configure') || btnText.toLowerCase().includes('tune') || btnText.toLowerCase().includes('setup'))) {
      const cleanName = btnText.replace(/Configure\s*|Tune\s*|Setup\s*/gi, '').trim();
      const specificMsg = encodeURIComponent(`Hello Network Engineer! 👋\n\nI found your website and want to configure my: *${cleanName}*.\nCould you please let me know your earliest availability and connect via UltraViewer or AnyDesk? Thank you!`);
      link.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${specificMsg}`);
    } else if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
      link.setAttribute('href', defaultUrl);
    }

    // Debounce listener to stop click flood
    link.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - lastWhatsAppClickTime < 2500) {
        e.preventDefault();
        console.warn('Click flood suppressed by rate limiter.');
        return false;
      }
      lastWhatsAppClickTime = now;
    });
  });

  // Display phone number in text wherever marked
  document.querySelectorAll('.display-phone').forEach(el => {
    el.textContent = CONFIG.phoneDisplay;
  });

  // Direct tel links
  document.querySelectorAll('.link-phone').forEach(el => {
    el.setAttribute('href', `tel:${CONFIG.rawPhone}`);
  });
}


// ==========================================
// INTERACTIVE FAILOVER TOPOLOGY SIMULATOR
// ==========================================
function setupFailoverSimulator() {
  const toggleBtn = document.getElementById('simulateFailoverBtn');
  const isp1Status = document.getElementById('simIsp1Status');
  const isp1Line = document.getElementById('simIsp1Line');
  const isp2Status = document.getElementById('simIsp2Status');
  const isp2Line = document.getElementById('simIsp2Line');
  const simLog = document.getElementById('simTopologyLog');
  const routerIndicator = document.getElementById('simRouterIndicator');

  if (!toggleBtn) return;

  let isIsp1Down = false;

  toggleBtn.addEventListener('click', () => {
    isIsp1Down = !isIsp1Down;

    if (isIsp1Down) {
      toggleBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        <span>Restore Primary ISP 1</span>
      `;
      toggleBtn.classList.remove('bg-red-600', 'hover:bg-red-500');
      toggleBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-500');

      if (isp1Status) {
        isp1Status.textContent = 'DOWN (Cable Cut / Offline)';
        isp1Status.className = 'text-red-400 font-bold';
      }
      if (isp1Line) {
        isp1Line.classList.add('border-dashed', 'border-red-500', 'opacity-30');
        isp1Line.classList.remove('border-emerald-500', 'flow-line');
      }

      if (isp2Status) {
        isp2Status.textContent = 'ACTIVE (100% Traffic Load)';
        isp2Status.className = 'text-cyan-400 font-bold animate-pulse';
      }
      if (isp2Line) {
        isp2Line.classList.add('border-cyan-400', 'flow-line');
        isp2Line.classList.remove('opacity-40');
      }

      if (routerIndicator) {
        routerIndicator.className = 'w-3 h-3 rounded-full bg-amber-400 animate-ping';
      }
      
      if (simLog) {
        simLog.innerHTML = `
          <div class="text-red-400"><span class="text-slate-500">[0.00s]</span> ❌ WAN1 Gateway check failed: 0/3 ICMP responses from 8.8.8.8.</div>
          <div class="text-cyan-400"><span class="text-slate-500">[0.24s]</span> ⚡ MikroTik Recursive Routing: Distance 1 route marked unreachable.</div>
          <div class="text-emerald-400"><span class="text-slate-500">[0.35s]</span> ✅ 100% Traffic seamlessly shifted to WAN2 (JioFiber). <strong>ZERO CALL DROPS.</strong></div>
        `;
      }
    } else {
      toggleBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728B9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
        <span>Simulate Cable Cut (ISP 1 Failure)</span>
      `;
      toggleBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
      toggleBtn.classList.add('bg-red-600', 'hover:bg-red-500');

      if (isp1Status) {
        isp1Status.textContent = 'ONLINE (Primary Line)';
        isp1Status.className = 'text-emerald-400 font-bold';
      }
      if (isp1Line) {
        isp1Line.classList.remove('border-dashed', 'border-red-500', 'opacity-30');
        isp1Line.classList.add('border-emerald-500', 'flow-line');
      }

      if (isp2Status) {
        isp2Status.textContent = 'ONLINE (PCC Balanced)';
        isp2Status.className = 'text-slate-400';
      }
      if (isp2Line) {
        isp2Line.classList.remove('border-cyan-400');
      }

      if (routerIndicator) {
        routerIndicator.className = 'w-3 h-3 rounded-full bg-emerald-400 animate-pulse';
      }

      if (simLog) {
        simLog.innerHTML = `
          <div class="text-emerald-400"><span class="text-slate-500">[0.00s]</span> 🟢 WAN1 link restored. 5 ICMP echo replies confirmed.</div>
          <div class="text-cyan-400"><span class="text-slate-500">[0.18s]</span> ⚡ Routing distance 1 restored.</div>
          <div class="text-slate-200"><span class="text-slate-500">[OK]</span> PCC Dual-WAN balanced state active: WAN1 + WAN2 aggregating bandwidth.</div>
        `;
      }
    }
  });
}

// ==========================================
// ANYDESK & CABLE SETUP GUIDE MODAL
// ==========================================
function setupGuideModal() {
  const modal = document.getElementById('anydeskGuideModal');
  const openTopBtn = document.getElementById('openGuideModalTopBtn');
  const openStepBtn = document.getElementById('openGuideModalStepBtn');
  const closeBtn = document.getElementById('closeGuideModalBtn');
  const cancelBtn = document.getElementById('cancelGuideModalBtn');

  if (!modal) return;

  function openModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    modal.classList.remove('hidden');
    modal.style.setProperty('display', 'flex', 'important');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    modal.classList.add('hidden');
    modal.style.setProperty('display', 'none', 'important');
    document.body.style.overflow = '';
  }

  if (openTopBtn) openTopBtn.addEventListener('click', openModal);
  if (openStepBtn) openStepBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop outside modal card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(e);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(e);
    }
  });
}

// ==========================================
// KNOWLEDGE HUB / CONFIGURATION GUIDE TABS
// ==========================================
function setupGuideTabs() {
  const tabBtns = document.querySelectorAll('.guide-tab-btn');
  const cards = document.querySelectorAll('.guide-card');

  if (!tabBtns.length || !cards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#005CE6]', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-[#475569]', 'border', 'border-[#E2E8F0]');
      });
      btn.classList.add('active', 'bg-[#005CE6]', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-[#475569]', 'border', 'border-[#E2E8F0]');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Auto-align canonical URL to current live origin on production domains
if (typeof window !== 'undefined' && window.location.hostname && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
  const canonicalTag = document.querySelector('link[rel="canonical"]');
  if (canonicalTag) {
    canonicalTag.href = window.location.origin + window.location.pathname;
  }
}
