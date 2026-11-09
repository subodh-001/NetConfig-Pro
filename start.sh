#!/usr/bin/env bash
# ==============================================================================
# NetConfig Pro - One-Click Project Runner
# Automatically clears port 3345, starts HTTP server, and opens browser!
# ==============================================================================

# Ensure script runs from project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

PORT=3345
URL="http://localhost:${PORT}"

# Terminal Colors
C_CYAN='\033[1;36m'
C_GREEN='\033[1;32m'
C_YELLOW='\033[1;33m'
C_BLUE='\033[1;34m'
C_RESET='\033[0m'
C_BOLD='\033[1m'

echo -e "\n${C_CYAN}╔══════════════════════════════════════════════════════════════╗${C_RESET}"
echo -e "${C_CYAN}║${C_RESET}  ${C_BOLD}NetConfig Pro — Network Engineer Landing Page Portal${C_RESET}        ${C_CYAN}║${C_RESET}"
echo -e "${C_CYAN}╚══════════════════════════════════════════════════════════════╝${C_RESET}\n"

# 1. Kill any stale process on port 3345 to prevent 'Address already in use' error
echo -e "${C_YELLOW}⚡ Checking and clearing port ${PORT}...${C_RESET}"
fuser -k "${PORT}/tcp" 2>/dev/null || true
if command -v lsof >/dev/null 2>&1; then
    OLD_PID=$(lsof -ti:"${PORT}" 2>/dev/null)
    if [ -n "$OLD_PID" ]; then
        kill -9 $OLD_PID 2>/dev/null || true
    fi
fi
sleep 0.5
echo -e "${C_GREEN}✔ Port ${PORT} is ready and free.${C_RESET}"

# 2. Open browser automatically in background after server spins up
(
  sleep 1.2
  if [ -n "$DISPLAY" ] || [ -n "$WAYLAND_DISPLAY" ]; then
    if command -v xdg-open >/dev/null 2>&1; then
      xdg-open "$URL" >/dev/null 2>&1 &
    elif command -v google-chrome >/dev/null 2>&1; then
      google-chrome "$URL" >/dev/null 2>&1 &
    elif command -v firefox >/dev/null 2>&1; then
      firefox "$URL" >/dev/null 2>&1 &
    fi
  fi
) &

# 3. Print access information
echo -e "\n${C_GREEN}🚀 Server is LIVE!${C_RESET}"
echo -e "   Local URL:    ${C_CYAN}${C_BOLD}${URL}/${C_RESET}"
echo -e "   Target Port:  ${C_BLUE}${PORT}${C_RESET}"
echo -e "   Directory:    ${SCRIPT_DIR}"
echo -e "   Stop Server:  Press ${C_YELLOW}Ctrl + C${C_RESET} anytime\n"
echo -e "${C_CYAN}──────────────────────────────────────────────────────────────${C_RESET}\n"

# 4. Start Python HTTP Server with socket address reuse enabled (prevents TIME_WAIT conflicts)
exec python3 -c "
import socketserver, http.server, sys

port = int(sys.argv[1]) if len(sys.argv) > 1 else 3345

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

Handler = http.server.SimpleHTTPRequestHandler
try:
    with ReusableTCPServer(('', port), Handler) as httpd:
        httpd.serve_forever()
except OSError as e:
    # If 3345 is still held by an external process, try next port
    fallback_port = port + 1
    print(f'Port {port} busy, trying fallback port {fallback_port}...')
    with ReusableTCPServer(('', fallback_port), Handler) as httpd:
        httpd.serve_forever()
" "$PORT"

