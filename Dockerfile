FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./
COPY images/ ./images/
COPY Brain_Tumor_EHR_Clean_1000.xlsx ./

# Install Node.js for frontend build
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Skip frontend build for now - deploy backend only

EXPOSE $PORT

CMD uvicorn main:app --host 0.0.0.0 --port $PORT