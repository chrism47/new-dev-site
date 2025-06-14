from flask import Flask, render_template

from flaskext.markdown import Markdown
import os

app = Flask(__name__)
# Misaka(app, extensions=["tables", "fenced-code"])
Markdown(app, extensions=["fenced_code", "extra", "codehilite"])
# MD_DIR = os.path.join(os.path.dirname(__file__), 'md')

MD_PATH = os.path.join(f'{app.static_folder}', 'md')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():    
    return render_template('test.html')

@app.route('/calculator')
def calculator():
    return render_template('calculator/calculator.html')

@app.route('/work')
def work():  
    return render_template('work.html')

@app.route('/offers')
def offers():  
    return render_template('offers.html')

@app.route('/al-g')
def al_g():  
    return render_template('al-g.html')

@app.route('/notebooks')
def notebooks():

    file_dir = os.listdir(MD_PATH)
    
    preview_text = []
    text_count = len(file_dir)
    for file in range(len(file_dir)):
        
        filepath = os.path.join(MD_PATH, file_dir[file])
        
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines(200)
            print(lines)
            preview_text.append({
                "title": lines[0],
                "preview": lines[2:]
            })
    
    print(len(file_dir))
    return render_template('notebooks.html', md_files=file_dir, preview_text=preview_text, text_count=text_count)

@app.route('/notebooks/<filename>')
def show_markdown(filename):
    if not filename.endswith('.md'):
        filename += '.md'

    md_path = os.path.join(MD_PATH, filename)

    if not os.path.exists(md_path):
        LookupError(404)

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    return render_template("note.html", content=content, filename=filename)


@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/admin')
def admin():  
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(debug=True)
