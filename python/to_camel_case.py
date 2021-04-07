def to_camel_case(text):
    print(text)
    # your code here
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
