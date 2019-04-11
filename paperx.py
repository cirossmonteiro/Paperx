import json, sys, unicodedata

# extract from file
fn = "facebook_group.json"
fh = open(fn)
file_contents = fh.read()
fh.close()

# convert coding, because of emojis
non_bmp_map = dict.fromkeys(range(0x10000, sys.maxunicode + 1), 0xfffd)
file_contents = file_contents.translate(non_bmp_map)

# extract from json
file_contents = json.loads(file_contents)

source = file_contents

about = {
    "languages" : "html css java vue sql bootstrap c# python c++ javascript js php react laravel node express",
    "help" : "help dúvida socorro ajuda auxílio debug erro ?",
    "course" : "curso udemy coursera khan graduacao administração ads engenharia ciência tcc",
    "work" : "trabalh rh contato emprego estágio",
    }

count = 0

for post in [p['content'] for p in source]:
    post2 = post.lower()
    post2 = ''.join(ch for ch in unicodedata.normalize('NFKD', post2) 
    if not unicodedata.combining(ch)) # eliminar acentos
    words = post2.split(' ') # words are strings separated by whitespace
    keys = set()
    for word in words:
        for ab in about:
            about2 = about[ab].split(' ')
            for ab2 in about2:
                ab2 = ''.join(ch for ch in unicodedata.normalize('NFKD', ab2) 
                    if not unicodedata.combining(ch))
                if ab2 in word:
                    keys.add(ab2)
    if len(keys) > 0:
        count += 1
        #print(keys,'\n',post2,'\n\n\n')
    else:
        pass
        # not classified
        #print("<post>%s</post>"%post2,'\n\n\n')

print("Posts classified: %d/%d"%(count,len(source)))
