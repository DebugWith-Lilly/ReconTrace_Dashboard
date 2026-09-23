from flask import *
from database import *

app = Flask(__name__)
app.secret_key = "some_secret_key"

#Routes
@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        session["email"] = request.form["email"]
        session["password"] = request.form["password"]
        return redirect("/dashboard")
    return render_template("index.html")

@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    if request.method == "GET":
        password = session.get("password")
        email = session.get("email")
    
        db = get_db_connection()
        user = db.execute("""
            SELECT * FROM users
            WHERE email = ?
            """, (email,)).fetchone()
            
        if user is None:  
            return redirect("/")
        if  user["password"] == password:
            return render_template("dashboard.html")
        
    return render_template("index.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():   
    if request.method == "POST":
        name = request.form["full_name"]
        email = request.form["email"]
        password = request.form["password"]
    
        db = get_db_connection() #Adding doctor to database
        db.execute("""
            INSERT INTO users
            (full_name, email, password)
                VALUES (?,?,?)
            """,
            (name, email, password))
        db.commit()
        return render_template("index.html")
    return render_template("signup.html")

@app.route("/cases")
def cases():
    return render_template("cases.html")

@app.route("/scene-viewer")
def scene_viewer():
    return render_template("scene-viewer.html")

@app.route("/evidence")
def evidence():
    return render_template("evidence.html")

@app.route("/reports")
def reports():
    return render_template("reports.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/activity")
def activity():
    return render_template("activity.html")

if __name__ == "__main__":
    app.run(debug=True) 

app.teardown_appcontext(close_db_connection)