const { BaseService } = require('./base');
const { SegmentRepository } = require('./../respositories/segment');

class SegmentService extends BaseService {
    _segmentRepo;
    constructor() {
        let segmentRepo = new SegmentRepository();
        super(segmentRepo);
        this._segmentRepo = segmentRepo;
        console.log(`================== constructor ${this.constructor.name}`)
    }
}

module.exports = { SegmentService }