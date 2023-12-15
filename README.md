# Mesto - социальная сеть для обмена фотографиями

Mesto - это проект для изучения vanilla JavaScript, HTML, CSS и методологии БЭМ.

## Описание проекта

Mesto представляет собой социальную сеть, где пользователи могут обмениваться фотографиями и ставить им лайки. Проект состоит из нескольких этапов разработки, охватывающих верстку, добавление интерактивности с использованием JavaScript, валидацию форм, сборку проекта с помощью Webpack и использование ООП.
В четвёртом спринте мы получили опыт командной (парной) разработки.

## Установка

Для запуска проекта выполните следующие шаги:

- Запуск проекта: `npm run dev`
- Сборка проекта: `npm run build`
- Деплой c помощью pm2: `npm run deploy:pm`
- Шаблон для переменных окружения: `.env.deploy.example`

## Этапы разработки

### Первый этап - Вёрстка и стили CSS

- Использование медиазапросов для адаптивности
- Применение технологий: флексбокс, БЭМ с файловой структурой nested, CSS calc
- Реализация модального диалога с формой редактирования профиля

### Второй этап - Добавление интерактива на сайт на JavaScript

- Открытие и закрытие модальных окон с использованием addEventListener
- Функции редактирования профиля и добавления новых карточек
- Динамическая загрузка карточек из массива JavaScript
- Возможность лайкать и удалять карточки

### Третий этап - Добавление валидации форм, сборка проекта Webpack

- Валидация форм с использованием регулярных выражений и браузерной валидации
- Улучшение навигации и структуры проекта с помощью Webpack
- Минификация и транспиляция JS с использованием Babel, минификация CSS с автоматическим добавлением вендорных префиксов PostCSS

### Четвертый этап - Парное программирование и ООП

- Создание ES6-классов: Api.js, Сard.js, FormValidator.js, Section.js, Popup.js, PopupWithForm.js, PopupWithImage.js, UserInfo.js
- Разработка классов с использованием ООП и слабого связывания
- Изучение техники парного программирования совместно с [Arialink](https://github.com/Aria1ink).

## Описание классов

- **Api**: запросы к серверу
- **Card**: создание карточек с изображениями
- **FormValidator**: валидация полей формы
- **Section**: отрисовка карточек на странице
- **Popup**: управление открытием и закрытием попапов
- **PopupWithForm** и **PopupWithImage**: наследуются от **Popup** и предоставляют специфичные функции
- **UserInfo**: управление информацией о пользователе на странице

## Полезные ссылки

1. [Мой проект на Github Pages](https://margo-yunanova.github.io/mesto-project);
1. [Ссылка на макет в Figma для первого этапа](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=28212%3A155);
1. [Ссылка на макет в Figma для второго этапа](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5);
1. [Ссылка на макет в Figma для третьего этапа](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1);
1. [Чеклист второго этапа](https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-4.pdf);
1. [Техзадание первого этапа](https://code.s3.yandex.net/web-plus/static/second-month/mesto-project/index.html);
1. [Техзадание второго этапа](https://code.s3.yandex.net/web-plus/static/third-month/mesto-project/index.html);
1. [Техзадание третьего этапа](https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-8.pdf);
1. [Техзадание четвертого этапа](https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-10.pdf).

