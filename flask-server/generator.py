# password generation algorithm


import random

# todo: fix the double backslash symbols -- the escape character is not working as intended
# Ambiguous symbols: ` [ ] { } ( ) | \ /
ALL_SYMBOLS          = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=",
                        "{", "[", "}", "]", "|", "\\", ":", ";", "\"", "'", "<", ">", ".", "?", "/"]
NO_AMBIGUOUS_SYMBOLS = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "_", "-", "+", "=", ":", ";", "\"",
                        "'", "<", ">", ".", "?"]
NUMBERS              = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def password_generator_main(answer_one, answer_two, answer_three, password_length, is_exact, have_symbols, have_numbers,
                            have_uppercase, have_ambiguous_characters):

    # STEP 1: check if inputs are valid, and fail if any are invalid
    is_input_valid = input_validation(answer_one, answer_two, answer_three, password_length, have_symbols,
                                      have_numbers, have_uppercase, have_ambiguous_characters)

    if is_input_valid != 0:

        if is_input_valid == 1:
            print("ERROR: Desired password length must be at least 1. Please increase your desired password" +
                  " length.")
        elif is_input_valid == 2:
            print("ERROR: Desired password length is less than the shortest question response. Please " +
                  " increase your desired password length to at least" +
                  f" {min(answer_one, answer_two, answer_three)}.")
        elif is_input_valid == 3:
            print("ERROR: You must select 'include uppercase'.")
        elif is_input_valid == 4:
            print("ERROR: You must either deselect 'exclude ambiguous characters' or select" +
                  " 'include symbols'")

        return ""

    # STEP 2: format answer strings into what the user specified
    formatted_answers = answer_formatter(answer_one, answer_two, answer_three, have_uppercase)

    # STEP 3: check how much "space" was allotted for the password, and see which answers can fit within the
    #         specified password length

    answers_to_use, remaining_space = choose_answers_for_password(formatted_answers, password_length)

    # STEP 4: fill the remaining password space with numbers and symbols if the user desired
    password, error_code = add_numbers_and_symbols(answers_to_use, remaining_space, is_exact, have_symbols, have_numbers, have_ambiguous_characters)

    if error_code != 0:
        print("MILD ERROR: in order to generate a password of your desired length, you must chose to include" +
              " numbers or symbols")

    return password


# Checks if any inputs are invalid, leading to an error and no password generated
def input_validation(answer_one, answer_two, answer_three, password_length, have_symbols, have_numbers,
                     have_uppercase, have_ambiguous_characters):

    if password_length < 1:
        error_code = 1
    elif password_length < min(len(answer_one), len(answer_two), len(answer_three)):
        error_code = 2
    elif have_uppercase == False:
        error_code = 3
    elif have_symbols == False and have_ambiguous_characters == True:
        error_code = 4
    else:
        error_code = 0

    return error_code


# Format answer strings (user-specified case, strip whitespace, sort by increasing length)
def answer_formatter(answer_one, answer_two, answer_three, have_uppercase):
    not_formatted_answers = [answer_one, answer_two, answer_three]
    formatted_answers = []

    not_formatted_answers.sort(key=len)

    for answer in not_formatted_answers:
        formatted_answer = answer.upper()

        formatted_answer = formatted_answer.replace(" ", "")
        formatted_answers.append(formatted_answer)

    return formatted_answers


# Determine answers to be included in password and subsequent remaining space
def choose_answers_for_password(answer_list, password_length):
    answers_to_use = []

    remaining_space = password_length

    for i in range(len(answer_list)):
        if remaining_space >= len(answer_list[i]):
            answers_to_use.append(answer_list[i])
            remaining_space -= len(answer_list[i])

    return answers_to_use, remaining_space


# Fill in remaining space in password with numbers and symbols, if user desires
def add_numbers_and_symbols(answers_to_add, num_characters_to_add, is_exact, have_symbols, have_numbers, have_ambiguous_characters):
    error_code = 0

    random.shuffle(answers_to_add)

    if is_exact == False:
            num_characters_to_add += random.randint(1, 5)

    if num_characters_to_add == 0:
        password = "".join(answers_to_add)
    elif num_characters_to_add != 0 and have_symbols == False and have_numbers == False:
        error_code = 1
        password = "".join(answers_to_add)
    else:
        character_pool = []

        if have_numbers:
            character_pool += NUMBERS

        if have_ambiguous_characters:
            character_pool += ALL_SYMBOLS

        elif have_symbols:
            character_pool += NO_AMBIGUOUS_SYMBOLS

        chosen_characters = random.choices(character_pool, k=num_characters_to_add)

        password_component_list = chosen_characters + answers_to_add

        random.shuffle(password_component_list)

        password = "".join(password_component_list)

    return password, error_code


if __name__ == "__main__":
    # todo: get the actual data from the front end to substitute in here

    # fake data:
    answer_one = "pear"
    answer_two = "Red Sox"
    answer_three = "car"
    password_length = 12
    is_exact = True # when set to False, password_length is the minimum
    have_symbols = True
    have_numbers = True
    have_uppercase = True
    have_ambiguous_characters = False

    for i in range(10):
        generated_password = password_generator_main(answer_one, answer_two, answer_three, password_length, is_exact,
                                                     have_symbols, have_numbers, have_uppercase,
                                                     have_ambiguous_characters)
        print(f"Your password on iteration {i} is: {generated_password}")

