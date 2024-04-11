import json
import sys
import requests

def main():
    #Read dataset.json file
    print(sys.argv[1])
    with open(sys.argv[1], 'r',encoding="utf8") as file:
        data = json.loads(file.read())
    for pessoa in data:
        #Replace CC or BI with _id
        if 'CC' in pessoa:
            pessoa['_id'] = pessoa['CC']
            del pessoa['CC']
        elif 'BI' in pessoa:
            pessoa['_id'] = pessoa['BI']
            del pessoa['BI']
        #make a post request to localhost:3000/pessoas
        r = requests.post('http://localhost:3000/pessoas/registo',json=pessoa)
    

if __name__ == '__main__':
    main()