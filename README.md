# DisasterVerse Backend API

Spring Boot backend for DisasterVerse — a real-time disaster management platform with JWT authentication, PostgreSQL (Supabase) database, SOS alerts, and live WebSocket broadcasting.

## 🚀 Tech Stack

- Java 17
- Spring Boot 3.5.0
- PostgreSQL (Supabase)
- JWT Authentication
- WebSocket (STOMP)
- Swagger / OpenAPI
- Docker
- Maven

---

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- Docker (optional)
- Supabase account (free tier works)

---

## 🛠️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/disasterverse-backend.git
cd disasterverse-backend
```

### 2. Configure Environment Variables

**Windows PowerShell**
```powershell
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require"
$env:SPRING_DATASOURCE_USERNAME="postgres.your_project_ref"
$env:SPRING_DATASOURCE_PASSWORD="your_database_password"
$env:JWT_SECRET="your_generated_secret"
```

**Linux / Mac**
```bash
export SPRING_DATASOURCE_URL="jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require"
export SPRING_DATASOURCE_USERNAME="postgres.your_project_ref"
export SPRING_DATASOURCE_PASSWORD="your_database_password"
export JWT_SECRET="your_generated_secret"
```

### 3. Run Locally

**Option A: Maven**
```bash
mvn spring-boot:run -DskipTests
```

**Option B: Docker**
```bash
docker build -t disasterverse-backend .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL="your_url" \
  -e SPRING_DATASOURCE_USERNAME="your_username" \
  -e SPRING_DATASOURCE_PASSWORD="your_password" \
  -e JWT_SECRET="your_secret" \
  disasterverse-backend
```

---

## 🔗 API Endpoints

### 🔓 Public (No Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/signup` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and get JWT token |
| `GET` | `/api/v1/alerts` | Get all disaster alerts |
| `GET` | `/api/v1/alerts/active` | Get all active alerts |

### 🔒 Protected (Requires Bearer Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/alerts` | Create a disaster alert |
| `POST` | `/api/v1/sos` | Submit an SOS report |
| `GET` | `/api/v1/sos` | Get all SOS reports |
| `PATCH` | `/api/v1/sos/status/{id}` | Update SOS report status |
| `GET` | `/api/v1/dashboard/stats` | Get dashboard statistics |

### 🔌 WebSocket

| Endpoint | Description |
|----------|-------------|
| `/ws` | WebSocket connection (SockJS) |
| `/topic/alerts` | Subscribe to live alert broadcasts |
| `/topic/sos` | Subscribe to live SOS broadcasts |

---

## 🧪 Quick Test (cURL)

### Signup
```bash
curl -X POST http://localhost:8080/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Alert (Protected)
```bash
curl -X POST http://localhost:8080/api/v1/alerts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Major Earthquake Detected",
    "description": "7.2 magnitude near coastal region",
    "disasterType": "EARTHQUAKE",
    "severity": "CRITICAL",
    "latitude": 22.5726,
    "longitude": 88.3639
  }'
```

### Submit SOS (Protected)
```bash
curl -X POST http://localhost:8080/api/v1/sos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "message": "Trapped under rubble, need help!",
    "latitude": 22.5726,
    "longitude": 88.3639
  }'
```

---

## 📊 Valid Enum Values

```
disasterType : EARTHQUAKE | FLOOD | FIRE | HURRICANE | TORNADO | TSUNAMI | LANDSLIDE | OTHER
severity     : LOW | MEDIUM | HIGH | CRITICAL
sosStatus    : PENDING | ACTIVE | RESOLVED
role         : USER | ADMIN
```

---

## 🐳 Docker Commands

```bash
# Build image
docker build -t disasterverse-backend .

# Run container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL="your_url" \
  -e SPRING_DATASOURCE_USERNAME="your_username" \
  -e SPRING_DATASOURCE_PASSWORD="your_password" \
  -e JWT_SECRET="your_secret" \
  disasterverse-backend
```

---

## 🌐 Deploy to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and create an account
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Set Runtime to **Docker**
6. Add the environment variables listed below
7. Click **Create Web Service**

**Live API:** `https://disasterverse-backend-nnez.onrender.com`

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SPRING_DATASOURCE_URL` | PostgreSQL connection string from Supabase | ✅ Yes |
| `SPRING_DATASOURCE_USERNAME` | Database username (`postgres.your_project_ref`) | ✅ Yes |
| `SPRING_DATASOURCE_PASSWORD` | Database password | ✅ Yes |
| `JWT_SECRET` | Base64-encoded secret key for JWT signing | ✅ Yes |
| `PORT` | Server port | No (default: 8080) |

### Generating a JWT Secret
```bash
# Linux / Mac
openssl rand -base64 64

# Windows PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

---

## 📁 Project Structure

```
disasterverse/
├── src/main/java/com/disasterverse/
│   ├── DisasterVerseApplication.java
│   ├── config/
│   │   ├── CorsConfig.java
│   │   ├── SecurityConfig.java
│   │   └── SwaggerConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── DashboardController.java
│   │   ├── DisasterAlertController.java
│   │   └── SosReportController.java
│   ├── dto/
│   │   ├── request/
│   │   │   ├── CreateAlertRequest.java
│   │   │   ├── LoginRequest.java
│   │   │   ├── SignupRequest.java
│   │   │   ├── SosRequest.java
│   │   │   └── UpdateSosStatusRequest.java
│   │   └── response/
│   │       ├── AlertResponse.java
│   │       ├── ApiResponse.java
│   │       ├── AuthResponse.java
│   │       ├── DashboardStatsResponse.java
│   │       └── SosResponse.java
│   ├── entity/
│   │   ├── BaseEntity.java
│   │   ├── DisasterAlert.java
│   │   ├── SosReport.java
│   │   └── User.java
│   ├── enums/
│   │   ├── AlertSeverity.java
│   │   ├── DisasterType.java
│   │   ├── SosStatus.java
│   │   └── UserRole.java
│   ├── exception/
│   │   ├── BusinessException.java
│   │   ├── GlobalExceptionHandler.java
│   │   └── ResourceNotFoundException.java
│   ├── repository/
│   │   ├── DisasterAlertRepository.java
│   │   ├── SosReportRepository.java
│   │   └── UserRepository.java
│   ├── security/
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── JwtService.java
│   │   └── UserDetailsServiceImpl.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── DashboardService.java
│   │   ├── DisasterAlertService.java
│   │   ├── SosReportService.java
│   │   └── impl/
│   │       ├── AuthServiceImpl.java
│   │       ├── DashboardServiceImpl.java
│   │       ├── DisasterAlertServiceImpl.java
│   │       └── SosReportServiceImpl.java
│   └── websocket/
│       ├── AlertPublisher.java
│       ├── SosPublisher.java
│       └── WebSocketConfig.java
├── src/main/resources/
│   └── application.yml
├── Dockerfile
├── render.yaml
└── pom.xml
```

---

## 👥 Contributors

**Ankur Banik**
GitHub: [@AnkurBanik124](https://github.com/AnkurBanik124)

---

For issues or questions, please open an issue on GitHub.