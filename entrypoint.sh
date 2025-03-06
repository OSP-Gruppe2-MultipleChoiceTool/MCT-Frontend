./docker-entrypoint.d/env.sh

if [ "$ENABLE_HTTPS" = "true" ]; then
  http-server /app -p 80 -c-1 --proxy http://localhost:80? &
  http-server /app -p 443 -c-1 --ssl --cert /app/cert.pem --key /app/key.pem --proxy https://localhost:443?
else
  http-server /app -p 80 -c-1 --proxy http://localhost:80?
fi
