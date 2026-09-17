import json
import urllib.parse
from flask import Flask, render_template

app = Flask(__name__)

# Configuración del contacto directo
WHATSAPP_PHONE = "593995028362"  # Reemplazar con el número real de tu papá (+593)

def cargar_propiedades():
    try:
        with open("data/properties.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def cargar_proyectos():
    try:
        with open("data/projects.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

@app.context_processor
def inject_global_vars():
    def wa_link(message: str) -> str:
        encoded_msg = urllib.parse.quote(message)
        return f"https://wa.me/{WHATSAPP_PHONE}?text={encoded_msg}"
    
    return dict(wa_link=wa_link, whatsapp_phone=WHATSAPP_PHONE)

@app.route("/")
def index():
    propiedades = cargar_propiedades()
    proyectos = cargar_proyectos()
    return render_template("index.html", propiedades=propiedades, proyectos=proyectos)

if __name__ == "__main__":
    app.run(debug=True, port=5000)