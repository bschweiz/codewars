# my solution:

def song_decoder(song):
    
    final = []
    
    song = song.split('WUB')
    
    for x in song:
        if x != '':
            final += [x]                 
    
    return ' '.join(final)
