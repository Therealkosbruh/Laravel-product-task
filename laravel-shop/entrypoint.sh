#!/bin/sh
set -e

echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h"$DB_HOST" --silent; do
    sleep 1
done
echo "MySQL is up!"

php artisan migrate --force
php artisan serve --host=0.0.0.0 --port=8000
