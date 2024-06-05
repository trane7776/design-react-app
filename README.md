
# T-Shirt Design App
## Протестировать онлайн
### - https://design-shirt-app.netlify.app/
## Описание проекта

Этот проект представляет собой веб-приложение для создания и публикации дизайнов футболок. Пользователи могут регистрироваться, создавать уникальные дизайны футболок с помощью различных инструментов, публиковать свои работы и комментировать дизайны других пользователей.

## Функционал

- Регистрация и авторизация пользователей
- Создание и редактирование дизайнов футболок
- Публикация дизайнов
- Просмотр всех дизайнов на главной странице
- Поиск дизайнов
- Просмотр деталей дизайна и комментариев
- Добавление комментариев к дизайнам
- Просмотр и управление своими дизайнами в личном кабинете

## Установка и запуск

### Клиентская часть (React)

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/trane7776/design-react-app.git
   cd design-react-app/client
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите приложение:

   ```bash
   npm start
   ```

### Серверная часть (Node.js/Express)

1. Перейдите в директорию сервера:

   ```bash
   cd ../server
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Настройте переменные окружения, создав файл `.env`:

   ```env
   MONGODB_URI=your_mongodb_connection_string

   ```

4. Запустите сервер:

   ```bash
   npm start
   ```

## Использование API

### Базовый URL

`http://localhost:8080/api`

### Маршруты для дизайнов

#### Получение всех дизайнов

```http
GET /design
```

Ответ:

```json
[
  {
    "_id": "design_id",
    "user": "username",
    "name": "Design Name",
    "image": "base64_image_string",
    "description": "Design description",
    "prompt": "AI prompt",
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  ...
]
```

#### Получение дизайна по ID

```http
GET /design/:id
```

Ответ:

```json
{
  "_id": "design_id",
  "user": "username",
  "name": "Design Name",
  "image": "base64_image_string",
  "description": "Design description",
  "prompt": "AI prompt",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

#### Создание нового дизайна

```http
POST /design
```

Требуется аутентификация.

Тело запроса:

```json
{
  "name": "Design Name",
  "image": "base64_image_string",
  "description": "Design description",
  "prompt": "AI prompt"
}
```

Ответ:

```json
{
  "_id": "new_design_id",
  "user": "username",
  "name": "Design Name",
  "image": "base64_image_string",
  "description": "Design description",
  "prompt": "AI prompt",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

#### Удаление дизайна

```http
DELETE /design/:id
```

Требуется аутентификация.

Ответ:

```json
{
  "message": "Shirt design deleted"
}
```

### Маршруты для комментариев

#### Получение комментариев к дизайну

```http
GET /comments/:designId
```

Ответ:

```json
[
  {
    "_id": "comment_id",
    "design": "design_id",
    "user": "username",
    "text": "Comment text",
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  ...
]
```

#### Создание нового комментария

```http
POST /comments
```

Требуется аутентификация.

Тело запроса:

```json
{
  "design": "design_id",
  "text": "Comment text"
}
```

Ответ:

```json
{
  "_id": "new_comment_id",
  "design": "design_id",
  "user": "username",
  "text": "Comment text",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

## Лицензия

Этот проект лицензируется на условиях [MIT License](LICENSE).

