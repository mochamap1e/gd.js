# this is a mitmproxy script to forward boomlings requests to localhost
# this is useful if u cant or dont wanna use gdps switcher

# usage: mitmdump -s proxy.py
# with gui: mitmweb -s proxy.py

from mitmproxy import http

def request(flow: http.HTTPFlow):
    original_url = flow.request.pretty_url

    if flow.request.pretty_host == "www.boomlings.com":
        flow.request.scheme = "http"
        flow.request.host = "127.0.0.1"
        flow.request.port = 3000
        flow.request.path = flow.request.path.replace("database/", "")
        print(f"- Forwarded {original_url} -> {flow.request.pretty_url}")