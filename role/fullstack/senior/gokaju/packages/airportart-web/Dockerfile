# Build frontend application
FROM node:16-alpine AS buidler
WORKDIR /app/
COPY . .
RUN ls -la /app/
RUN npm install  && npm run build 

# Setup nginx server for frontend
FROM nginx:stable-alpine AS nginx
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DEFAULT_USER=$VITE_DEFAULT_USER
ENV VITE_DEFAULT_PASSWORD=$VITE_DEFAULT_PASSWORD
COPY --from=buidler /app/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;" ]