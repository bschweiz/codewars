"""This is my un-successful attempt"""


def to_camel_case(text):
    print(text)
    
    a = "_"
    b = "-"

    if a in text:
        print("underscore")
        array = text.split('_')
        morphed = array[0] + ''.join(word.title() for word in array[1:])
        return morphed

    if b in text:
        print("dash")
        array = text.split("-")
        morphed = array[0] + ''.join(word.title() for word in array[1:])
        return morphed

    else:
        return text


"""
Convert string to camel case
6kyu
by jhoffner
Complete the method/function so that it converts dash/underscore delimited words into camel casing.
The first word within the output should be capitalized only if the original word was capitalized.
Examples
to_camel_case("the-stealth-warrior") # returns "theStealthWarrior"
to_camel_case("The_Stealth_Warrior") # returns "TheStealthWarrior"
"""


def to_camel_case(text):
    list = [x for x in text]
    if len(list) != 0:
        for i in range(len(list)):
            if list[i] in ('-', '_'):
                list[i+1] = list[i+1].upper()
    list = ''.join([i for i in list if i not in ('-', '_')])
    return list
