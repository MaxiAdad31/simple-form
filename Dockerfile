FROM nginx:latest
COPY cuestionario_puestero.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]