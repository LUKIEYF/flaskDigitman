#-*- coding=utf-8 -*-
from flask import render_template, session, redirect, url_for, current_app, request, jsonify
# from .. import db
# from ..models import User
# from ..email import send_email
from . import main
# from .forms import NameForm
# from ..models import Content
# from .forms import DialogForm

# from .tts import textFrequence

from .gpt.gptAPICallRevised import chatbotLukie

chatbot = chatbotLukie()
chatbot.query("I want you to be a hospital doctor who name is lukieee now, and only answer the questions about the health and life science, do not answer any other question which are not related with the topic.")

@main.route('/chatRoom', methods=['GET',"POST"])
def index():
    return render_template('index.html')

@main.route('/home', methods=['GET',"POST"])
def video():
    return render_template('video.html')

@main.route("/chatBox", methods=["POST"])
def chatBox():
    if request.method == 'POST':
        print('interaction ongoing...')
        prompt = request.form["prompt"]
        
        if prompt != "clear":
            ### go through the gTTS to generate mouthParameter first
            ans = chatbot.query(prompt)
            
            response = ans["response"]
            
            ### deploy gpt here, and then return
            return jsonify({"response": response})   

        else:
            chatbot.query("clear")### 清除记录
            
            
    


# @main.route("/mouthParameter", methods=["POST"])
# def mouth():
#     if request.method == 'POST':
        
#         # try:
#         res = textFrequence(request.form["sentence"])
#         content = res
        
#         # except Exception as e:
#         #     print(e)
#         #     content = [0]
        
#         return jsonify({"response":content})