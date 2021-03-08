

'use strict';

const { Contract } = require('fabric-contract-api');

class Messagerie extends Contract {

  constructor(){
    super('Messagerie');
  }

  async InitialiserMessagerie(ctx){
    try {
      await ctx.stub.putState('1', 'Bienvenue sur la messagerie sécurisée');
    }catch(e){
      throw new Error('erreur' + e);
    }
  }

  async EnregistrerMessage(ctx, message){
    try {
      await ctx.stub.putState('1', 'Dernier message : ' + message);
    }catch(e){
      throw new Error('erreur' + e);
    }
  }

  async LireMessagerie(ctx) {
      const allResults = [];
      const iterator = await ctx.stub.getStateByRange('', '');
      let result = await iterator.next();
      while (!result.done) {
          const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
          let record;
          try {
              record = JSON.parse(strValue);
          } catch (err) {
              console.log(err);
              record = strValue;
          }
          allResults.push({ Key: result.value.key, Record: record });
          result = await iterator.next();
      }
      return JSON.stringify(allResults);
  }

}

module.exports = Messagerie
