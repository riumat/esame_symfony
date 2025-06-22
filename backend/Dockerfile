FROM php:8.4-fpm-alpine

RUN apk update \
    && apk add --no-cache libpq git unzip zip postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /app/var/log /app/var/cache \
    && chmod -R 777 /app/var/log /app/var/cache

WORKDIR /app

# Installa le dipendenze PHP (incluso doctrine)
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Copia il resto del codice
COPY . .

# Installa autoloader e scripts (migrations, fixtures)
RUN composer install

# Comando di default: esegui le migrations e (opzionale) le fixtures all'avvio
CMD ["sh", "-c", "php bin/console doctrine:migrations:migrate --no-interaction && php bin/console doctrine:fixtures:load --no-interaction || true && php-fpm"]