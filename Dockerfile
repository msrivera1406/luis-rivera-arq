FROM python:3.11-slim

# Evitar que Python escriba archivos .pyc y forzar salida limpia de logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instalar dependencias del proyecto
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Crear usuario no-root por seguridad
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Gunicorn con 2 workers (más que suficiente para el tráfico esperado)
CMD ["gunicorn", "--workers=2", "--bind=0.0.0.0:5000", "app:app"]