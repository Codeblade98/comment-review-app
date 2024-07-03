from app import db

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), nullable=False)
    text = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    gender = db.Column(db.String(120), nullable=False)
    sentiment = db.Column(db.String(120), nullable=True)

    def to_json(self):
        dict_obj = {
            'id': self.id,
            'author': self.author,
            'text': self.text,
            'imgUrl': self.img_url,
            'gender': self.gender,
            'sentiment': self.sentiment
        }
        return dict_obj
