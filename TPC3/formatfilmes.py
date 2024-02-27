import json


def main():
    movies_db = []
    genres_db = []
    actors_db = []
    with open("filmes.json","r") as file:
        for line in file:
            movie = json.loads(line)
            movie['id'] = movie['_id']['$oid']
            del movie['_id']
            cast = None
            if 'cast' in movie:
                cast = movie['cast']
            if cast:
                for actor in cast:
                    if actor not in actors_db:
                        actors_db.append({'Name': actor})
            genres = None
            if 'genres' in movie:
                genres = movie['genres']
            if genres:
                for genre in genres:
                    if genre not in genres_db:
                        genres_db.append({'Name': genre})
            movies_db.append(movie)
            print(movie)
        db = {'movies' : movies_db, 'genres': genres_db, 'actors': actors_db}
        with open("movies.json","w+") as jsonfile:
            json.dump(db,jsonfile,indent=4)
    
if __name__ == "__main__":
    main()