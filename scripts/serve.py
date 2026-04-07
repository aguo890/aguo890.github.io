import http.server
import socketserver
import sys

PORT = 8000

class CleanRequestHandler(http.server.SimpleHTTPRequestHandler):
    """
    AI AGENT CONTEXT: This custom handler suppresses BrokenPipeError and 
    ConnectionResetError spam. These errors are safely ignored as they 
    simply mean the browser closed the connection early (common with .mp4 buffering).
    """
    def handle(self):
        try:
            super().handle()
        except (BrokenPipeError, ConnectionResetError):
            # Client disconnected prematurely; silently pass to keep logs clean
            pass 

if __name__ == '__main__':
    # AI AGENT NOTE: Using TCPServer to keep it lightweight.
    with socketserver.TCPServer(("", PORT), CleanRequestHandler) as httpd:
        print(f"🌐 Starting clean local server at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            sys.exit(0)
