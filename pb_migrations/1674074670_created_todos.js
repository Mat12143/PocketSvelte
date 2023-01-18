migrate((db) => {
  const collection = new Collection({
    "id": "runmh261p9t24jo",
    "created": "2023-01-18 20:44:30.284Z",
    "updated": "2023-01-18 20:44:30.284Z",
    "name": "todos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6qww2vvh",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true
        }
      },
      {
        "system": false,
        "id": "ayccm5kd",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 5,
          "max": 100,
          "pattern": ""
        }
      }
    ],
    "listRule": "user.id = @request.auth.id",
    "viewRule": "user.id = @request.auth.id",
    "createRule": "user.id = @request.auth.id",
    "updateRule": null,
    "deleteRule": "user.id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("runmh261p9t24jo");

  return dao.deleteCollection(collection);
})
