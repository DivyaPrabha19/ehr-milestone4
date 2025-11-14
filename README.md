# AI-Powered Enhanced EHR Imaging & Documentation System

A comprehensive Electronic Health Record system with AI-powered medical summarization and brain tumor analysis capabilities.

## Features

- **Patient Search**: Search patients by ID, name, or diagnosis
- **AI Medical Summarization**: Automatic generation of medical summaries using Falconsai/medical_summarization model
- **MRI Scan Visualization**: Display brain tumor MRI scans with AI analysis
- **Real-time Data**: MySQL database integration with Excel data import
- **Responsive UI**: Modern React interface with Material-UI

## Technology Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **Transformers**: Hugging Face library for medical summarization
- **MySQL**: Database for patient records
- **Pandas**: Excel data processing

### Frontend
- **React 18**: Modern JavaScript framework
- **Material-UI**: Professional UI components
- **Axios**: HTTP client for API calls

### Deployment
- **Docker**: Containerized deployment
- **Docker Compose**: Multi-service orchestration

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Python 3.9+
- Node.js 18+
- MySQL 8.0

### Local Development

1. **Clone and Setup**
   ```bash
   cd "d:\sarav all\Pictures\from stratch\milestone 4"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Database Setup**
   - Create MySQL database: `brain_tumor_ehr`
   - Update credentials in `backend/main.py` if needed

### Docker Deployment

```bash
docker-compose up --build
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## API Endpoints

- `GET /`: Health check
- `POST /generate-summary`: Generate medical summary
- `GET /patient/{patient_id}`: Get patient details with AI summary
- `GET /patients/search?query={query}`: Search patients

## Database Schema

```sql
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    medical_history TEXT,
    diagnosis VARCHAR(100),
    scan_type VARCHAR(50),
    image_path VARCHAR(200)
);
```

## Cloud Deployment Options

### AWS Deployment
1. **ECS with Fargate**: Container orchestration
2. **RDS MySQL**: Managed database
3. **S3**: Static file storage for images
4. **CloudFront**: CDN for frontend

### Azure Deployment
1. **Container Instances**: Docker containers
2. **Azure Database for MySQL**: Managed database
3. **Blob Storage**: Image storage
4. **Static Web Apps**: Frontend hosting

### Google Cloud Deployment
1. **Cloud Run**: Serverless containers
2. **Cloud SQL**: MySQL database
3. **Cloud Storage**: Image storage
4. **Firebase Hosting**: Frontend hosting

## Usage

1. **Search Patient**: Enter patient ID, name, or diagnosis in search box
2. **View Details**: Click on search result to view patient details
3. **Medical Summary**: AI-generated summary appears automatically
4. **Scan Results**: MRI images and analysis results display
5. **Multiple Scan Types**: System supports MRI, CT, and X-RAY (expandable)

## Medical AI Model

Uses `Falconsai/medical_summarization` model for:
- Automatic medical text summarization
- Patient history analysis
- Diagnosis summary generation

## Security Features

- CORS configuration for secure API access
- Input validation and sanitization
- Database connection error handling
- Secure file serving for medical images

## Future Enhancements

- User authentication and authorization
- DICOM image support
- Advanced AI diagnostics
- Telemedicine integration
- Mobile application
- Multi-language support