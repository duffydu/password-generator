########  imports  ##########
from ast import Num
from re import A
from flask import Flask, jsonify, request, render_template, json
from generator import password_generator_main
# from generator import test
import json

app = Flask(__name__)

# fake data:
def generateJSONList(answer_one, answer_two, answer_three, password_length, is_exact, have_symbols, have_numbers, have_uppercase,
                                                        have_ambiguous_characters):
    passwordList = {'passwords': []}
    is_exact = False
    for i in range(10):
        generated_password = password_generator_main(answer_one, answer_two, answer_three, password_length, is_exact,
                                                        have_symbols, have_numbers, have_uppercase,
                                                        have_ambiguous_characters)
        print(f"Your password on iteration {i} is: {generated_password}")
        passwordList['passwords'].append({'id': i, 'password': generated_password})

    return json.dumps(passwordList, indent=4)

# def password_serializer(password):
#     return {
#         'id': password.id,
#         'password': password.content
#     }


# Passwords API Route
# @app.route('/passwords')
# def passwords():
#     return generateJSONList()
    # return {"passwords": ["Password1", "Password2", "Password3"]}

@app.route('/passwords/generate', methods=['POST'])
def generate():
    request_data = json.loads(request.data)
    print(request_data)
    a1 = request_data['answer1']
    a2 = request_data['answer2']
    a3 = request_data['answer3']
    len = 10
    sym = False if request_data['symbols'] == 'False' else True
    num = False if request_data['numbers'] == 'False' else True
    upper = False if request_data['upperCase'] == 'False' else True
    amb = False if request_data['ambiguous'] == 'False' else True
    # print("List: ", generateJSONList(a1, a2, a3, len, False, sym, num, upper, amb))
    # print(a1, a2, a3, len, False, sym, num, upper, amb)
    return generateJSONList(a1, a2, a3, len, False, sym, num, upper, amb)


# @app.route('/test', methods=['GET', 'POST'])
# def testfn():
#     # GET request
#     if request.method == 'GET':
#         message = {'greeting':'Hello from Flask!'}
#         return jsonify(message)  # serialize and use JSON headers
#     # POST request
#     if request.method == 'POST':
#         print(request.get_json())  # parse as JSON
#         return 'Sucesss', 200

if __name__ == "__main__":
    app.run(debug=True)