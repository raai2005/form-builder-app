# FormBuilder Backend API

A RESTful API built with Express.js, TypeScript, and MongoDB for the FormBuilder application.

## 📋 Features

- **User Authentication**: Register, login with JWT tokens
- **Form Management**: Create, read, update, delete forms
- **Response Collection**: Submit and manage form responses
- **Real-time Stats**: Track views, responses, and form metrics
- **Secure**: Password hashing with bcrypt, JWT authentication
- **TypeScript**: Full type safety and better developer experience

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## 📁 Project Structure

```
server/
├── src/
│   ├── models/           # Mongoose models
│   │   ├── User.ts       # User model
│   │   ├── Form.ts       # Form model
│   │   └── Response.ts   # Response model
│   ├── routes/           # API routes
│   │   ├── authRoutes.ts
│   │   ├── formRoutes.ts
│   │   └── responseRoutes.ts
│   ├── controllers/      # Route controllers
│   │   ├── authController.ts
│   │   ├── formController.ts
│   │   └── responseController.ts
│   ├── middleware/       # Custom middleware
│   │   └── auth.ts       # JWT authentication
│   ├── config/           # Configuration
│   │   └── database.ts   # MongoDB connection
│   └── server.ts         # Main server file
├── package.json
├── tsconfig.json
└── .env.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to server directory**:

   ```bash
   cd server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the values:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/formbuilder
   JWT_SECRET=your-super-secret-key
   ```

4. **Start MongoDB** (if running locally):

   ```bash
   mongod
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Access  |
| ------ | -------------------- | ----------------- | ------- |
| POST   | `/api/auth/register` | Register new user | Public  |
| POST   | `/api/auth/login`    | Login user        | Public  |
| GET    | `/api/auth/me`       | Get current user  | Private |

### Forms

| Method | Endpoint               | Description        | Access  |
| ------ | ---------------------- | ------------------ | ------- |
| POST   | `/api/forms`           | Create new form    | Private |
| GET    | `/api/forms`           | Get all user forms | Private |
| GET    | `/api/forms/:id`       | Get single form    | Private |
| PUT    | `/api/forms/:id`       | Update form        | Private |
| DELETE | `/api/forms/:id`       | Delete form        | Private |
| POST   | `/api/forms/:id/views` | Increment views    | Private |

### Responses

| Method | Endpoint                      | Description         | Access  |
| ------ | ----------------------------- | ------------------- | ------- |
| POST   | `/api/responses/:formId`      | Submit response     | Public  |
| GET    | `/api/responses/form/:formId` | Get form responses  | Private |
| GET    | `/api/responses/:id`          | Get single response | Private |
| DELETE | `/api/responses/:id`          | Delete response     | Private |

## 📝 API Usage Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Form

```bash
POST /api/forms
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Customer Feedback",
  "description": "Tell us what you think",
  "fields": [
    {
      "id": "1",
      "type": "text",
      "label": "Name",
      "required": true
    },
    {
      "id": "2",
      "type": "email",
      "label": "Email",
      "required": true
    }
  ],
  "status": "active"
}
```

### Submit Response

```bash
POST /api/responses/:formId
Content-Type: application/json

{
  "data": {
    "1": "John Doe",
    "2": "john@example.com"
  }
}
```

## 🗄️ Database Models

### User Model

- fullName: string
- email: string (unique)
- password: string (hashed)
- timestamps

### Form Model

- userId: ObjectId (ref: User)
- title: string
- description: string
- fields: FormField[]
- status: 'active' | 'draft' | 'archived'
- views: number
- responseCount: number
- timestamps

### Response Model

- formId: ObjectId (ref: Form)
- data: object
- submittedAt: Date
- ipAddress: string
- timestamps

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Request validation using express-validator
- **CORS**: Configured to accept requests from frontend
- **Environment Variables**: Sensitive data stored in .env file

## 🧪 Testing

The server includes a health check endpoint:

```bash
GET /health
```

Response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 📦 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

| Variable    | Description               | Default                               |
| ----------- | ------------------------- | ------------------------------------- |
| PORT        | Server port               | 5000                                  |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/formbuilder |
| JWT_SECRET  | Secret key for JWT        | -                                     |
| NODE_ENV    | Environment mode          | development                           |

## 🚧 Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## 📈 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Form templates
- [ ] File upload support
- [ ] Analytics dashboard
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] WebSocket support for real-time updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.
