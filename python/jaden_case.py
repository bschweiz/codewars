# my solution:

def to_jaden_case(string):
    
    return " ".join(word.capitalize() for word in string.split())

# different way using an import and a special built-in python func


import string

def toJadenCase(NonJadenStrings):
    return string.capwords(NonJadenStrings)

# or

from string import capwords as toJadenCase

import string
toJadenCase = string.capwords
