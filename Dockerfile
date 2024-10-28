FROM nginx
COPY index.html /usr/share/nginx/html
ADD pages/ /usr/share/nginx/html/pages/
ADD src/ /usr/share/nginx/html/src/
EXPOSE 80