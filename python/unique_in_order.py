# my solution

def unique_in_order(iterable):
    
    unique = []
    
    for i in iterable: 
        if len(unique) < 1 or i != unique[len(unique) - 1]:
            unique.append(i)
            
    return unique
