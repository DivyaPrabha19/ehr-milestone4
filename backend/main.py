from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import mysql.connector
import pandas as pd
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
    global summarizer
    if summarizer is None:
        print("Loading AI model...")
        tokenizer = AutoTokenizer.from_pretrained("Falconsai/medical_summarization")
        model = AutoModelForSeq2SeqLM.from_pretrained("Falconsai/medical_summarization")
        summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)
        print("AI model loaded!")
    return summarizer

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "divya1936"),
    "database": os.getenv("DB_NAME", "brain_tumor_ehr")
}

class SummaryRequest(BaseModel):
    text: str

def get_db_connection():
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

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
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        query = "SELECT * FROM patients WHERE patient_id = %s"
        cursor.execute(query, (patient_id,))
        patient = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        medical_text = f"Patient: {patient['name']}, Age: {patient['age']}, Gender: {patient['gender']}. Medical History: {patient['medical_history']}. Diagnosis: {patient['diagnosis']}"
        model = get_summarizer()
        summary = model(medical_text, max_length=100, min_length=30, do_sample=False)
        patient['medical_summary'] = summary[0]['summary_text']
        
        image_dir = Path(f"../images/{patient['diagnosis'].lower()}")
        if image_dir.exists():
            images = [f"/images/{patient['diagnosis'].lower()}/{img.name}" 
                    for img in image_dir.glob("*.jpg")][:3]
            patient['scan_images'] = images
        else:
            patient['scan_images'] = []
        
        return patient
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving patient: {str(e)}")

@app.get("/patients/search")
async def search_patients(query: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        search_query = """
        SELECT patient_id, name, age, gender, diagnosis 
        FROM patients 
        WHERE name LIKE %s OR patient_id LIKE %s OR diagnosis LIKE %s
        LIMIT 10
        """
        search_term = f"%{query}%"
        cursor.execute(search_query, (search_term, search_term, search_term))
        patients = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return {"patients": patients}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

# Serve static files for production
if os.getenv("RAILWAY_ENVIRONMENT") or os.getenv("RENDER"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)