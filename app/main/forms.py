#-*- coding=utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired


class DialogForm(FlaskForm):
    dialog = TextAreaField('', validators=[DataRequired()], render_kw={"rows": 3})
    submit = SubmitField('Submit')
