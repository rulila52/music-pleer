# Музыкальный плеер, тестовый проект

## Начало работы

Для работы с проектом необходимо иметь установленный [Node.js](https://nodejs.org/ru).
После клонирования проекта, или же после изменения списка зависимостей в
`package.json` необходимо выполнить команду `npm install` для загрузки всех необходимых
зависимостей. Все зависимости будут скачаны в папку **node_modules**.

## Сборка приложения

Для сборки приложения используется сервер разработки [Vite](https://vitejs.ru/guide/).
Основные команды для сборки и запуска приложения:

1. `npx vite` (`npm run dev`) - запуск локального dev-сервера. Запуск обычно занимает
   не больше нескольких секунд, поддерживается горячая перезагрузка при изменении файлов.
2. `npx vite build` (`npm run build`) - сборка приложения для продакшена. После выполнения
   этой команды в папке **dist** появятся итоговые файлы для деплоя приложения.
3. `npx vite preview` (`npm run preview`) - запуск локального веб-сервера из сборки
   в папке dist, по сути - предпросмотр продакшена.
4. `npx eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`
   (`npm run lint`) - запуск линтера.

Каждая из этих команд также представлена скриптом в разделе **scripts** в файле
`package.json`. Скрипты можно запускать через команду `npm run <имя скрипта>`.
