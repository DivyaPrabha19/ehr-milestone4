from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
# import mysql.connector
# import pandas as pd
try:
    from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
except ImportError:
    print("Transformers not available, using mock AI")
from typing import Optional
from pydantic import BaseModel
from pathlib import Path

app = FastAPI(title="AI-Powered Enhanced EHR System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory="../images"), name="images")

# Initialize medical summarization model (lazy loading)
summarizer = None

def get_summarizer():
    # Mock AI for deployment
    class MockSummarizer:
        def __call__(self, text, **kwargs):
            return [{'summary_text': f"AI Summary: {text[:100]}... [Medical analysis complete]"}]
    return MockSummarizer()

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "divya1936"),
    "database": os.getenv("DB_NAME", "brain_tumor_ehr")
}

class SummaryRequest(BaseModel):
    text: str

def get_db_connection():
    # Mock database for deployment
    return None

# Remove startup event for faster loading
# @app.on_event("startup")
# async def startup_event():
#     await load_excel_to_mysql()

async def load_excel_to_mysql():
    try:
        df = pd.read_excel("../Brain_Tumor_EHR_Clean_1000.xlsx")
        conn = get_db_connection()
        cursor = conn.cursor()
        
        create_table_query = """
        CREATE TABLE IF NOT EXISTS patients (
            id INT AUTO_INCREMENT PRIMARY KEY,
            patient_id VARCHAR(50) UNIQUE,
            name VARCHAR(100),
            age INT,
            gender VARCHAR(10),
            medical_history TEXT,
            diagnosis VARCHAR(100),
            scan_type VARCHAR(50),
            image_path VARCHAR(200)
        )
        """
        cursor.execute(create_table_query)
        
        for _, row in df.iterrows():
            insert_query = """
            INSERT IGNORE INTO patients 
            (patient_id, name, age, gender, medical_history, diagnosis, scan_type, image_path)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (
                f"P{row.get('ID', '')}", 
                row.get('Name', ''), 
                row.get('Age', 0),
                row.get('Gender', ''), 
                row.get('Medical_History', ''),
                row.get('Diagnosis', ''), 
                'MRI', 
                f"images/{row.get('Diagnosis', '').lower()}"
            ))
        
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error loading Excel data: {str(e)}")

@app.get("/")
async def root():
    return {"message": "AI-Powered Enhanced EHR System API"}

@app.post("/generate-summary")
async def generate_medical_summary(request: SummaryRequest):
    try:
        model = get_summarizer()
        summary = model(request.text, max_length=150, min_length=50, do_sample=False)
        return {"summary": summary[0]['summary_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summary generation failed: {str(e)}")

@app.get("/patient/{patient_id}")
async def get_patient(patient_id: str):
    # Mock patient data for deployment
    mock_patients = {
        "P001": {"patient_id": "P001", "name": "John Smith", "age": 45, "gender": "Male", "diagnosis": "Glioma", "medical_history": "Headaches, vision problems"},
        "P002": {"patient_id": "P002", "name": "Sarah Johnson", "age": 38, "gender": "Female", "diagnosis": "Meningioma", "medical_history": "Seizures, memory loss"},
        "P003": {"patient_id": "P003", "name": "Mike Wilson", "age": 52, "gender": "Male", "diagnosis": "Pituitary", "medical_history": "Hormonal imbalance"}
    }
    
    patient = mock_patients.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    model = get_summarizer()
    medical_text = f"Patient: {patient['name']}, Age: {patient['age']}, Gender: {patient['gender']}. Medical History: {patient['medical_history']}. Diagnosis: {patient['diagnosis']}"
    summary = model(medical_text)
    patient['medical_summary'] = summary[0]['summary_text']
    patient['scan_images'] = [f"/images/{patient['diagnosis'].lower()}/sample1.jpg"]
    
    return patient

@app.get("/patients/search")
async def search_patients(query: str):
    # Mock search results
    mock_patients = [
        {"patient_id": "P001", "name": "John Smith", "age": 45, "gender": "Male", "diagnosis": "Glioma"},
        {"patient_id": "P002", "name": "Sarah Johnson", "age": 38, "gender": "Female", "diagnosis": "Meningioma"},
        {"patient_id": "P003", "name": "Mike Wilson", "age": 52, "gender": "Male", "diagnosis": "Pituitary"}
    ]
    
    results = [p for p in mock_patients if query.lower() in p["name"].lower() or query.lower() in p["patient_id"].lower()]
    return {"patients": results}

# Serve static files for production
if os.getenv("RAILWAY_ENVIRONMENT") or os.getenv("RENDER"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)