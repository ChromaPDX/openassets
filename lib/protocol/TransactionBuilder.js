/* Copyright (c) 2014, Andrew Hart <hello@andrewfhart.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var bitcore = require('bitcore');

/**
 * TransactionBuilder
 *
 * Provides methods for constructing Open Assets transactions
**/

/**
 * Constructor
 * @param int  dustAmount  The minimum allowed output data
**/
var TransactionBuilder = function (dustAmount) {
  self.dustAmount = dustAmount;
};

/**
 * Create a transaction for issuing an asset
 * @param TransferParameter issuanceSpec  The parameters of the issuance
 * @param Buffer            metadata      The metadata to be embedded in the transaction
 * @param int               fees          The fees to include in the transaction
 * @return  Transaction     an unsigned transaction for issuing an asset
**/
TransactionBuilder.prototype.issue = function (issuanceSpec, metadata, fees) {
  var inputs, totalAmount, outputInfo, builder, tx;

  // Returns an object containing two keys: inputs, totalAmount
  outputInfo = _collectUncoloredOutputs(
    issuanceSpec.unspentOutputs, 2 * self.dustAmount + fees);

  builder = (new bitcore.TransactionBuilder({
    feeSat: fees,
    amountSat: outputInfo.totalAmount
  }))
    .setUnspent('foo')
    .setOutputs('foo');



};

TransactionBuilder.prototype.transfer = function (transferSpec, fees) {

};

TransactionBuilder.prototype.transferBitcoin = function (transferSpec, fees) {

};

TransactionBuilder.prototype.transferAssets = function (assetId, transferSpec, btcChangeScript, fees) {

};

TransactionBuilder.prototype.bitcoinAssetSwap = function (btcTransferSpec, assetId, assetTransferSpec, fees) {

};

TransactionBuilder.prototype.assetAssetSwap = function (asset1Id, asset1TransferSpec, asset2Id, asset2TransferSpec, fees) {

};

/**
 * Return a list of uncolored outputs for the specified amount
 * @param  array(SpendableOutput) unspentOutputs  The list of available outputs
 * @param  int                    amount          The amount to collect
 * @return Object(inputs:array(SpendableOutput),totalAmount:int)
**/
TransactionBuilder.prototype._collectUncoloredOutputs = function(unspentOutputs, amount) {
  var totalAmount = 0, result = [];

  unspentOutputs.forEach(function (spendableOutput) {
    if (spendableOutput.output.assetId == null) {
      result.push(spendableOutput);
      totalAmount += spendableOutput.output.value);
    }

    if (totalAmount >= amount) {
      return {
        inputs: result,
        totalAmount: totalAmount
      };
    }

    throw new Error("Insufficient funds");
  });
};

TransactionBuilder.prototype._getUncoloredOutput = function (script) {

};

TransactionBuilder.prototype._collecteColoredOutputs = function (unspentOutputs, assetId, assetQuantity) {

};

TransactionBuilder.prototype._getColoredOutput = function (script) {

};

TransactionBuilder.prototype._getMarkerOutput = function (script) {

};