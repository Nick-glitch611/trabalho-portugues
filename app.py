from flask import Flask

app = Flask(_____name_____)

@app.route("/")
def home():
    return "FUNCIONANDO NO CELULAR"

app.run(host="0.0.0.0", port=5000, debug=True)
