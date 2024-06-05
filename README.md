
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

## Компоненты React

### Home

Главная страница, отображающая все дизайны пользователей.

```jsx
import DesignCard from './DesignCard';
import { useEffect, useState } from 'react';

const Home = () => {
  const [designs, setDesigns] = useState([]);
  
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch('http://localhost:8080/design');
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
    };

    fetchDesigns();
  }, []);
  
  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen">
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold text-white mb-4">Дизайн футболок</h1>
        <p className="text-lg text-gray-400 mb-8">
          Создай свой уникальный дизайн
        </p>
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/design">
          Начать
        </a>
      </div>
      <section className="mt-6 w-full flex flex-col items-center sm:mt-20">
        <h1 className="text-3xl font-bold text-white mb-8">Дизайны пользователей</h1>
        <input type="text" placeholder="Поиск футболки" className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400" />
        <div className="mt-12 ml-20 flex w-full flex-wrap justify-center gap-8 sm:justify-start">
          {designs.map((design) => (
            <DesignCard key={design._id} title={design.name} image={design.image} user={design.user} id={design._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
```

### Account

Личный кабинет пользователя, отображающий его данные и дизайны.

```jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesignCard from './DesignCard';

const Account = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const fetchUserDesigns = async () => {
      try {
        const response = await fetch(`http://localhost:8080/design/user/${user.username}`);
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error('Error fetching user designs:', error);
      }
    };

    if (user) {
      fetchUserDesigns();
    }
  }, [user]);

  const handleDeleteDesign = async (designId) => {
    try {
      await fetch(`http://localhost:8080/design/${designId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDesigns(designs.filter((design) => design._id !== designId));
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Личный кабинет</h2>
      <p className="text-white">Почта: {user ? user.email : ''}</p>
      <p className="text-white">Имя пользователя: {user ? user.username : ''}</p>
      <button onClick={logout} className="bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded mt-5">
        Выйти
      </button>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Ваши дизайны</h3>
        <div className="flex flex-wrap">
          {designs.map((design) => (
            <div key={design._id} className="bg-gray-700 p-4 rounded mb-4 mr-4">
              <DesignCard title={design.name} image={design.image} user={design.user} id={design._id} />
              <button onClick={() => handleDeleteDesign(design._id)} className

="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
```

## Лицензия

Этот проект лицензируется на условиях [MIT License](LICENSE).

