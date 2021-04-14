# my solution:

def song_decoder(song):
    
    final = []
    
    song = song.split('WUB')
    
    for x in song:
        if x != '':
            final += [x]                 
    
    return ' '.join(final)

# simpler/shorter

def song_decoder(song):
    return " ".join(song.replace('WUB', ' ').split())

# regex solution:

def song_decoder(song):
    import re
    return re.sub('(WUB)+', ' ', song).strip()
