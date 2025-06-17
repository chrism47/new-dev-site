from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv

# load_dotenv()

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your-secret-key'

# db = SQLAlchemy()
# class Post(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(80), nullable=False)
#     subtitle = db.Column(db.String(80), nullable=False)
#     content = db.Column(db.String(80), nullable=False)


# class MyForm(FlaskForm):
#     title = StringField('Title')
#     subtitle = StringField('Subtitle')
#     date = StringField('Date')  # Date stored as a string
#     submit = SubmitField('Submit')

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/editor', methods=['GET', 'POST'])
# def editor():    
#     form = MyForm()
#     if form.validate_on_submit():
#         form_data= {
#             "title" : form.title.data,
#             "subtitle": form.subtitle.data,
#             "date": form.date.data,
#             "content" : form.content.data   
#         }
#         return render_template('post-verify.html', form_data=form_data)
#     return render_template('editor.html', form=form)

# @app.route('/post-verify', methods=['GET', 'POST'])
# def post_verify():
#     return render_template('post-verify.html')

@app.route('/shaders')
def shaders():  
    return render_template('shaders.html')

@app.route('/work')
def work():  
    return render_template('work.html')

@app.route('/space-invaders')
def space_invaders():  
    return render_template('vibe-codes/space-invaders.html')

@app.route('/al-g')
def al_g():  
    return render_template('al-g.html')

@app.route('/info')
def info():
    return render_template('info.html')


if __name__ == '__main__':
    app.run(debug=True)
