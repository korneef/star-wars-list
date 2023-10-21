[![Build Status](https://api.cirrus-ci.com/github/korneef/star-wars-list.svg?branch=main)](https://cirrus-ci.com/github/korneef/star-wars-list)

## Ссылка на опубликованный проект:
https://korneef.github.io/star-wars-list/#/

## Установка и запуск проекта:
### Требуемая версия Node:18.17.1

#### `git clone korneef/star-wars-list`
#### `npm install`
#### `npm start`

## Техническое описание проекта
Проект выполнен в соответствии с ТЗ, в проекте сознательно не использовались такие библиотеки как axios, RTK Query, MUI так как этого не было в ТЗ.
Установлен минимум необходимых библиотек, кроме тех что указаны в ТЗ.  
Для записи в localStorage используется middleware подключенный к redux
Для запросов к серверу кастомный хук, который отменяет запрос, если компонент размонтирован

## Требуемые доработки
- добавить обработку ошибок
- добавить анимации загрузки на всех страницах
- добавить стилизацию некоторых компонентов
- добавить debounce в компонент, когда мы осуществляем поиск персонажей через input
- рефакторинг компонентов
