#!/bin/sh


# Write runtime config to be consumed by the SPA
echo "window.__APP_CONFIG__ = { APP_TITLE: \"${APP_TITLE:-Machine Dashboard}\" };" > /usr/share/nginx/html/config.js

# Start nginx in foreground
exec nginx -g 'daemon off;'
