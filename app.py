from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__)

# Configuração do caminho do banco de dados
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(BASE_DIR, "ranking.db")

def init_db():
    """Inicializa o banco de dados e cria a tabela se não existir."""
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS ranking (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            pontuacao INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()
init_db()

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(BASE_DIR, filename)

@app.route("/salvar", methods=["POST"])
def salvar():
    dados = request.get_json()
    
    nome = dados.get("nome", "").strip()
    pontuacao = dados.get("pontuacao", 0)

    if not nome:
        return jsonify({"erro": "Nome inválido"}), 400

    conn = sqlite3.connect(DB)
    c = conn.cursor()
    
    c.execute("INSERT INTO ranking (nome, pontuacao) VALUES (?, ?)", (nome, pontuacao))
    
    conn.commit()
    conn.close()

    return jsonify({"ok": True})

@app.route("/ranking")
def get_ranking():
    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute("SELECT nome, pontuacao FROM ranking ORDER BY pontuacao DESC LIMIT 20")
    rows = c.fetchall()

    conn.close()

    ranking = [{"nome": r[0], "pontuacao": r[1]} for r in rows]
    return jsonify(ranking)

if __name__ == "__main__":
    app.run(debug=True)
