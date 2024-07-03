from app import app, db
from flask import request, jsonify
from models import Comment
from sentiment_analysis import SentimentAnalysis

sentiment_map = ['positive','negative','neutral','mixed']

# Get all comments
@app.route('/api/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all() # same as "SELECT * FROM comments"
    result = [comment.to_json() for comment in comments]
    return jsonify(result)

# Create a new comment
@app.route('/api/comments', methods=['POST'])
def create_comment():
    try:
        data = request.get_json()
        author = data.get('author',None)
        gender = data.get('gender',None)
        text = data.get('text',None)
        if author is None or text is None or gender is None:
            return jsonify({'error': 'Please provide author'}),404
        gender = 'male' if gender=='M' else 'female' if gender=='F' else 'pixel'
        sa = SentimentAnalysis()
        sentiment = sentiment_map[sa.predict(text)]
        if data.get('imgUrl') is None:
            img_url = f'https://xsgames.co/randomusers/avatar.php?g={gender}'
        else:
            img_url = data.get('imgUrl')
        
        new_comment = Comment(author=author, 
                              text=text, 
                              img_url=img_url,
                              gender=gender,
                              sentiment=sentiment)
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete a comment
@app.route('/api/comments/<int:id>', methods=['DELETE'])
def delete_comment(id):
    try:
        comment = Comment.query.get(id)
        if comment is None:
            return jsonify({'error': 'Comment not found'}), 404
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update a comment
@app.route('/api/comments/<int:id>', methods=['PATCH'])
## we use PATCH over PUT since for PUT we need to send all fields
## but for PATCH we can send only the fields we want to update
def update_comment(id):
    try:
        comment = Comment.query.get(id)
        if comment is None:
            return jsonify({'error': 'Comment not found'}), 404
        data = request.json()
        comment.author = data.get('author',comment.author)
        comment.text = data.get('text',comment.text) 
        comment.img_url = data.get('imgUrl',comment.img_url)
        comment.gender = data.get('gender',comment.gender)

        db.session.commit()
        return jsonify(comment.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

