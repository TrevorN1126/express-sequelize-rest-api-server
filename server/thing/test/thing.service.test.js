const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect, assert } = chai;

const ThingService = require('../thing.service');

const badThing = {
  description: 'Thing without the required name'
};
let goodThing = {
  name: 'The Good Thing',
  description: 'The Good Thing Description'
};
let updatedGoodThing = {
  name: 'The Updated Good Thing',
  description: 'The Updated Good Thing Description'
};
const fakeId = 696969696969;

describe('## Thing Service', () => {

  describe('# Create', () => {

    it('It should return a validation error', async function() {
      const newBadThing = await ThingService.Create(badThing);
      expect(newBadThing).to.be.instanceOf(Error);
    });

    it('It should create a new thing', async function() {
      const newThing = await ThingService.Create(goodThing);
      expect(newThing).to.be.an('object');
      expect(newThing.name).to.equal(goodThing.name);
      goodThing = newThing;
    });

  });

  describe('# List', () => {
    it('It should return a list of things', async function() {
      const list = await ThingService.List();
      expect(list).to.be.an('array');
      expect(list[0]).to.be.an('object');
    });
  });

  describe('# Get', () => {
    it('It should return a thing ', async function() {
      const thing = await ThingService.GetItem(goodThing.id);
      expect(thing).to.be.an('object');
      expect(thing.name).to.equal(goodThing.name);
    });

    it('It should return an error - Thing not found', async function() {
      const thing = await ThingService.GetItem(fakeId);
      expect(thing.message).to.equal('Thing not found.')
    });
  });

  describe('# update', () => {
    it('It should update a thing ', async function() {
      const thing = await ThingService.Update(goodThing.id, updatedGoodThing);
      expect(thing).to.be.an('object');
      expect(thing.name).to.equal(updatedGoodThing.name);
    });
  });

  describe('# remove', () => {
    it('It should remove an thing by id ', async function() {
      const removed = await ThingService.Remove(goodThing.id);
      expect(removed).to.equal(1);
    });
  });


});
