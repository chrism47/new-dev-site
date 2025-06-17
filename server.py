from flask import Flask, render_template
from flask_ckeditor import CKEditor, CKEditorField
from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv

# load_dotenv()

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your-secret-key'
# app.config['CKEDITOR_PKG_TYPE'] = 'standard'  # or 'basic', 'full'
# app.config['CKEDITOR_ENABLE_CODESNIPPET'] = True

# db = SQLAlchemy()
# class Post(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(80), nullable=False)
#     subtitle = db.Column(db.String(80), nullable=False)
#     content = db.Column(db.String(80), nullable=False)



# ckeditor = CKEditor(app)
# class MyForm(FlaskForm):
#     title = StringField('Title')
#     subtitle = StringField('Subtitle')
#     date = StringField('Date')  # Date stored as a string
#     content = CKEditorField('Content')
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
    return render_template('book-of-shaders.html')

@app.route('/work')
def work():  
    return render_template('work.html')

@app.route('/space-invaders')
def space_invaders():  
    return render_template('vibe-codes/space-invaders.html')

@app.route('/al-g')
def al_g():  
    return render_template('al-g.html')

# @app.route('/notebooks')
# def notebooks():

#     file_dir = os.listdir(MD_PATH)
    
#     preview_text = []
#     text_count = len(file_dir)
#     for file in range(len(file_dir)):
        
#         filepath = os.path.join(MD_PATH, file_dir[file])
        
#         with open(filepath, 'r', encoding='utf-8') as f:
#             lines = f.readlines(200)
#             print(lines)
#             preview_text.append({
#                 "title": lines[0],
#                 "preview": lines[2:]
#             })
    
#     print(len(file_dir))
#     return render_template('notebooks.html', md_files=file_dir, preview_text=preview_text, text_count=text_count)

# @app.route('/notebooks/<filename>')
# def show_markdown(filename):
#     if not filename.endswith('.md'):
#         filename += '.md'

#     md_path = os.path.join(MD_PATH, filename)

#     if not os.path.exists(md_path):
#         LookupError(404)

#     with open(md_path, 'r', encoding='utf-8') as f:
#         content = f.read()
    
#     return render_template("note.html", content=content, filename=filename)


@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/admin')
def admin():  
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(debug=True)
