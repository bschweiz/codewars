# return masked string, (my solution)
def maskify(cc):
    if len(cc) < 4:
        return cc
    return "#" * (len(cc)-4) + cc[-4:]

# answer set solutions:

def maskify(cc):
    return "#"*(len(cc)-4) + cc[-4:]
