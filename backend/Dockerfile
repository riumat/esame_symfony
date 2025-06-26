FROM php:8.4-fpm-alpine

RUN apk update \
    && apk add --no-cache libpq git unzip zip postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /app/var/log /app/var/cache \
    && chmod -R 777 /app/var/log /app/var/cache

WORKDIR /app

# dipendenze
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

COPY . .


RUN composer install

# comandi per migrazioni e fixtures
CMD ["sh", "-c", "php bin/console doctrine:migrations:migrate --no-interaction && php bin/console doctrine:fixtures:load --no-interaction || true && php-fpm"]