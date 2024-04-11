import json

def main():
    #Read dataset.json file
    with open('dataset.json', 'r',encoding="utf8") as file:
        data = json.loads(file.read())
    for pessoa in data:
        #Replace CC or BI with _id
        if 'CC' in pessoa:
            pessoa['_id'] = pessoa['CC']
            del pessoa['CC']
        elif 'BI' in pessoa:
            pessoa['_id'] = pessoa['BI']
            del pessoa['BI']
        
    #Write dataset.json file
    with open('dataset_fixed.json', 'w',encoding="utf8") as file:
        json.dump(data, file, indent=4,ensure_ascii=False)

if __name__ == '__main__':
    main()