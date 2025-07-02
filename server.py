from flask import Flask, render_template
# from flask_wtf import FlaskForm
# from wtforms import SubmitField, StringField
# from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv

app = Flask(__name__)

#-----------------------------CORE
@app.route('/')
def index():
    return render_template('core/index.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/info')
def info():
    return render_template('core/info.html')
@app.route('/work')
def work():  
    return render_template('core/work.html')
@app.route('/link-page')
def link_page():  
    return render_template('core/link-page.html')


#---------------------------PROJECTS
@app.route('/a-gent')
def a_gent_info():  
    return render_template('projects/ai-agents/agent-info.html')

# @app.route('/a-gent/chat')
# def a_gent():  
#     return render_template('projects/ai-agents/agent.html')


@app.route('/al-g')
def al_g():  
    return render_template('projects/al-g/al-g.html')
@app.route('/al-g/tool')
def al_g_tool():  
    return render_template('projects/al-g/al-g-tool.html')

@app.route('/kicking-stickman')
def kicking_stickman():  
    return render_template('projects/kicking-stickman.html')

@app.route('/robot')
def robot():  
    return render_template('projects/robot.html')

@app.route('/data-board')
def data_board():  
    return render_template('projects/data-board.html')

#--------------------------VIBECODES
@app.route('/space-invaders')
def space_invaders():  
    return render_template('vibe-codes/space-invaders.html')

@app.route('/shape-quest')
def shape_quest():  
    return render_template('vibe-codes/shape-quest.html')

@app.route('/fractal-glass')
def fractal_glass():  
    return render_template('vibe-codes/fractal-glass.html')


#----------------------------BUSINESS---------
@app.route('/web-dev')
def web_dev():  
    return render_template('mockups/web-index.html')



#-------------------------LOOP
if __name__ == '__main__':
    app.run(debug=True)
