"use strict";

const query = require("../helper/query");

class Room {
    constructor(id, name, number) {
        this.id = id;
        this.name = name;
        this.number = number;
    };

    getAllRooms = async () => await query(
        'Get * room',
        'SELECT * FROM room',
        []
    );
}

module.exports = Room;
