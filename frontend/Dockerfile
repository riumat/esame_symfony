FROM node:24-alpine

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve static files with a lightweight server
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]