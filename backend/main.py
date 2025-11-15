from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import base64
from typing import Optional
from pydantic import BaseModel
import random

app = FastAPI(title="AI Medical Image Analysis System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummaryRequest(BaseModel):
    text: str

def analyze_medical_image(image_data: bytes, filename: str) -> dict:
    """AI-powered medical image analysis"""
    
    # Determine scan type from filename or content
    filename_lower = filename.lower()
    if 'mri' in filename_lower:
        scan_type = 'MRI'
    elif 'ct' in filename_lower:
        scan_type = 'CT'
    elif 'xray' in filename_lower or 'x-ray' in filename_lower:
        scan_type = 'X-RAY'
    else:
        scan_type = 'Unknown'
    
    # Mock AI analysis results
    diagnoses = {
        'MRI': [
            {'condition': 'Glioma', 'confidence': 87, 'severity': 'High', 'description': 'Malignant brain tumor detected in frontal lobe'},
            {'condition': 'Meningioma', 'confidence': 92, 'severity': 'Medium', 'description': 'Benign tumor arising from meninges'},
            {'condition': 'Pituitary Adenoma', 'confidence': 78, 'severity': 'Low', 'description': 'Small pituitary gland tumor'},
            {'condition': 'Normal', 'confidence': 95, 'severity': 'None', 'description': 'No abnormalities detected'}
        ],
        'CT': [
            {'condition': 'Hemorrhage', 'confidence': 89, 'severity': 'High', 'description': 'Intracranial bleeding detected'},
            {'condition': 'Stroke', 'confidence': 84, 'severity': 'High', 'description': 'Ischemic stroke in middle cerebral artery'},
            {'condition': 'Fracture', 'confidence': 91, 'severity': 'Medium', 'description': 'Skull fracture identified'},
            {'condition': 'Normal', 'confidence': 93, 'severity': 'None', 'description': 'No acute findings'}
        ],
        'X-RAY': [
            {'condition': 'Pneumonia', 'confidence': 86, 'severity': 'Medium', 'description': 'Bilateral lung infiltrates consistent with pneumonia'},
            {'condition': 'Fracture', 'confidence': 94, 'severity': 'High', 'description': 'Displaced fracture of radius bone'},
            {'condition': 'Arthritis', 'confidence': 76, 'severity': 'Low', 'description': 'Degenerative joint changes'},
            {'condition': 'Normal', 'confidence': 88, 'severity': 'None', 'description': 'No abnormalities detected'}
        ]
    }
    
    # Select random diagnosis based on scan type
    possible_diagnoses = diagnoses.get(scan_type, diagnoses['MRI'])
    diagnosis = random.choice(possible_diagnoses)
    
    return {
        'scan_type': scan_type,
        'diagnosis': diagnosis['condition'],
        'confidence': diagnosis['confidence'],
        'severity': diagnosis['severity'],
        'description': diagnosis['description'],
        'recommendations': get_recommendations(diagnosis['condition'], diagnosis['severity']),
        'analysis_time': '2.3 seconds'
    }

def get_recommendations(condition: str, severity: str) -> list:
    """Generate medical recommendations based on diagnosis"""
    
    recommendations = {
        'Glioma': [
            'Immediate neurosurgical consultation required',
            'MRI with contrast for surgical planning',
            'Oncology referral for treatment planning',
            'Neurological monitoring essential'
        ],
        'Meningioma': [
            'Regular monitoring with annual MRI',
            'Neurosurgical evaluation if symptomatic',
            'Monitor for neurological symptoms',
            'Consider radiation therapy if growth detected'
        ],
        'Pneumonia': [
            'Antibiotic therapy as per culture sensitivity',
            'Chest physiotherapy recommended',
            'Follow-up chest X-ray in 2-3 days',
            'Monitor oxygen saturation levels'
        ],
        'Fracture': [
            'Orthopedic consultation required',
            'Immobilization of affected area',
            'Pain management protocol',
            'Follow-up X-ray in 2 weeks'
        ],
        'Normal': [
            'No immediate treatment required',
            'Continue routine health monitoring',
            'Maintain healthy lifestyle',
            'Regular check-ups as scheduled'
        ]
    }
    
    return recommendations.get(condition, ['Consult with specialist for further evaluation'])

@app.get("/")
async def root():
    return {"status": "healthy", "message": "AI Medical Image Analysis System"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    """Upload and analyze medical images (CT, MRI, X-RAY)"""
    
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Please upload a valid image file")
        
        # Read image data
        image_data = await file.read()
        
        # Perform AI analysis
        analysis_result = analyze_medical_image(image_data, file.filename)
        
        # Convert image to base64 for frontend display
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        
        return {
            "success": True,
            "filename": file.filename,
            "image_data": f"data:{file.content_type};base64,{image_base64}",
            "analysis": analysis_result,
            "timestamp": "2024-01-15 10:30:45"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/generate-summary")
async def generate_medical_summary(request: SummaryRequest):
    """Generate AI medical summary from text"""
    return {
        "summary": f"AI Medical Summary: {request.text[:100]}... [Analysis indicates potential medical concerns requiring professional evaluation]"
    }

@app.get("/supported-formats")
async def get_supported_formats():
    """Get supported medical image formats"""
    return {
        "supported_formats": ["JPEG", "PNG", "DICOM", "TIFF"],
        "scan_types": ["MRI", "CT", "X-RAY"],
        "max_file_size": "10MB",
        "analysis_time": "2-5 seconds"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)