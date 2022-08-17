const { BaseRepos } = require('./base');
const { Segment } = require('./../models/segment');

class SegmentRepository extends BaseRepos {
    _segment;
    constructor(){
        let segment = new Segment();
        super(segment);
        this._segment = segment;
        console.log(`================== constructor ${this.constructor.name}`)
    }

}

module.exports = {
    SegmentRepository
}