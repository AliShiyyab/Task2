from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    postBody = StringField('postBody', validators=[DataRequired()])
    authorName = StringField('authorName', validators=[DataRequired()])
    imageField = StringField('imageField', validators=[DataRequired()])
    submit = SubmitField('submit')
