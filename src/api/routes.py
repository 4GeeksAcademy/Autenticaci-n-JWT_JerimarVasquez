import datetime
import jwt
from flask import Blueprint, request, jsonify, current_app
from .models import db, User

api = Blueprint('api', __name__)

# -----------------------------
# SIGNUP
# -----------------------------


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    # Verificar si el usuario ya existe
    exists = User.query.filter_by(email=email).first()
    if exists:
        return jsonify({"msg": "User already exists"}), 400

    # Crear usuario
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 201


# -----------------------------
# LOGIN
# -----------------------------
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Bad credentials"}), 401

    payload = {
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }

    token = jwt.encode(
        payload,
        current_app.config["JWT_SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token}), 200


# -----------------------------
# PRIVATE ROUTE
# -----------------------------
@api.route('/private', methods=['GET'])
def private():
    auth = request.headers.get("Authorization", None)

    if not auth or not auth.startswith("Bearer "):
        return jsonify({"msg": "Missing token"}), 401

    token = auth.split(" ")[1]

    try:
        data = jwt.decode(
            token,
            current_app.config["JWT_SECRET_KEY"],
            algorithms=["HS256"]
        )
    except Exception:
        return jsonify({"msg": "Invalid or expired token"}), 401

    user = User.query.get(data["user_id"])

    return jsonify({
        "msg": "Private content",
        "user": user.serialize()
    }), 200
