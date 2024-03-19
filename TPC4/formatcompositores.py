import json


def main():
    periodos_db = []
    with open("compositores.json","r") as file:
        data = json.loads(file.read())
        compositores = data['compositores']
        for compositor in compositores:
            periodo = compositor['periodo']
            if {'Periodo': periodo} not in periodos_db:
                periodos_db.append({'Periodo': periodo})
        db = {'compositores': compositores, 'periodos': periodos_db}
        with open("compositores_db.json","w+") as jsonfile:
            json.dump(db,jsonfile,indent=4)
    
if __name__ == "__main__":
    main()