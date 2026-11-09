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
    mikrotik: { name: 'MikroTik RouterOS', base: 699 },
    unifi: { name: 'Ubiquiti UniFi Ecosystem', base: 799 },
    cisco: { name: 'Cisco Switches & Routers', base: 899 },
    fortinet: { name: 'Fortinet FortiGate Firewall', base: 1199 },
    pfsense: { name: 'pfSense / OPNsense', base: 899 },
    tplink: { name: 'TP-Link Omada SDN', base: 599 },
    other: { name: 'Other Enterprise Router/Switch', base: 599 }
  },
  addons: {
    dualWan: { name: 'Dual/Multi-WAN Load Balancing & Failover', price: 599 },
    vpn: { name: 'Site-to-Site / Remote VPN (WireGuard/IPsec)', price: 499 },
    vlan: { name: 'VLAN Segmentation & Trunking', price: 399 },
    qos: { name: 'Bandwidth Limiting & QoS Queue Tree', price: 299 },
    hotspot: { name: 'Hotspot / Guest Portal & Vouchers', price: 599 },
    firewall: { name: 'Firewall Hardening & DDoS Filter', price: 399 },
    wifi: { name: 'Wi-Fi Roaming & RF Channel Tuning', price: 349 }
  }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupCalculator();
  setupTerminal();
  setupSocialProofToasts();
  setupFaqAccordion();
  setupBrandTabs();
  setupContactForm();
  setupFailoverSimulator();
  setupGuideModal();
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
        header.style.boxShadow = '0 2px 12px rgba(11,40,61,0.08)';
        header.style.borderBottomColor = '#E5E7EB';
      } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = '0 1px 4px rgba(11,40,61,0.04)';
      }
    });
  }
}

// ==========================================
// INTERACTIVE COST CALCULATOR
// ==========================================
function setupCalculator() {
  const brandSelect = document.getElementById('calcBrand');
  const urgencySelect = document.getElementById('calcUrgency');
  const currencyToggle = document.getElementById('calcCurrencyToggle');
  const checkboxes = document.querySelectorAll('.calc-addon-check');
  
  if (!brandSelect) return;

  function recalculate() {
    const selectedBrandKey = brandSelect.value;
    const brandData = basePricing.brands[selectedBrandKey] || basePricing.brands.mikrotik;
    let totalInr = brandData.base;
    
    let selectedAddonNames = [];

    checkboxes.forEach(cb => {
      if (cb.checked) {
        const addonKey = cb.dataset.addon;
        const addon = basePricing.addons[addonKey];
        if (addon) {
          totalInr += addon.price;
          selectedAddonNames.push(addon.name);
        }
      }
    });

    // Urgency factor
    const isEmergency = urgencySelect.value === 'emergency';
    if (isEmergency) {
      totalInr = Math.round(totalInr * 1.20); // 20% priority emergency dispatch fee
    }

    // Currency conversion
    const curr = currencyRates[currentCurrency];
    const displayTotal = currentCurrency === 'INR' 
      ? Math.round(totalInr) 
      : Math.round(totalInr * curr.multiplier);

    // Update UI elements
    const priceEl = document.getElementById('calcTotalPrice');
    const symbolEl = document.getElementById('calcCurrencySymbol');
    const baseSummaryEl = document.getElementById('calcBaseSummary');
    const addonsSummaryEl = document.getElementById('calcAddonsSummary');
    
    if (priceEl) priceEl.textContent = displayTotal.toLocaleString();
    if (symbolEl) symbolEl.textContent = curr.symbol;
    if (baseSummaryEl) baseSummaryEl.textContent = `${brandData.name} Base Config`;
    if (addonsSummaryEl) {
      addonsSummaryEl.textContent = selectedAddonNames.length > 0 
        ? `${selectedAddonNames.length} add-on features selected` 
        : 'Core configuration only';
    }

    // Build customized WhatsApp URL
    const sendWhatsappBtn = document.getElementById('calcSendWhatsappBtn');
    if (sendWhatsappBtn) {
      const addonsText = selectedAddonNames.length > 0 
        ? `\n• Features: ${selectedAddonNames.join(', ')}` 
        : '\n• Features: Standard Initial Configuration';
      
      const urgencyText = isEmergency ? '🚨 Emergency Setup (< 1 Hour)' : 'Standard Setup';
      
      const message = `Hello Network Engineer! 👋\n\nI need a one-time network configuration:\n• Brand: ${brandData.name}${addonsText}\n• Urgency: ${urgencyText}\n• Estimated Quote: ${curr.symbol}${displayTotal}\n\nCould you please check availability and connect via UltraViewer / AnyDesk? Thank you!`;
      
      const encodedMsg = encodeURIComponent(message);
      sendWhatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;
    }
  }

  // Event Listeners
  brandSelect.addEventListener('change', recalculate);
  urgencySelect.addEventListener('change', recalculate);
  checkboxes.forEach(cb => cb.addEventListener('change', recalculate));

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
        if (brand === 'all' || card.dataset.brand === brand) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
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
    const btnText = link.textContent.trim();
    if (btnText && (btnText.toLowerCase().includes('configure') || btnText.toLowerCase().includes('tune') || btnText.toLowerCase().includes('setup'))) {
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

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (openTopBtn) openTopBtn.addEventListener('click', openModal);
  if (openStepBtn) openStepBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}
