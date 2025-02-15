"use strict";

const query = require("../helper/query");

class ScrubType {
    constructor(id, color, size, description, gender, image) {
        this.id = id;
        this.color = color;
        this.size = size;
        this.description = description;
        this.gender = gender;
        this.image = image;
    };

    getScrubType = async () => await query(
        'Get Scrub Type',
        'SELECT * FROM scrub_type WHERE id_scrub_type = $1;',
        [this.id]
    );

    getAllScrubTypes = async () => await query(
        'Get * scrub types',
        'SELECT * FROM scrub_type;',
        []
    );
}

module.exports = ScrubType;
