const logger = require('../util/logger');
const dbUtil = require('../util/dbUtil');
const { fail: _fail, succeed: _succeed } = require('./common');


async function get(ctx) {
    logger.debug('getAbi', ctx.request.params);

    let { id } = ctx.request.query;
    if (!id) return _succeed(ctx, null);

    let where = { id };

    let abiModel = await dbUtil.getOne('abi', where);
    const respData = {
        "id": abiModel.id,
        "name": abiModel.name,
        "network": abiModel.chain_id,
        "address": abiModel.address,
        "abi": abiModel.abi,
    }

    return _succeed(ctx, respData);
}

async function submit(ctx) {
    logger.debug('submitAbi', ctx.request.body);

    let { name, network, address, abi } = ctx.request.body;
    if (!network || !address || !abi) return _fail(ctx, 'Invalid params');

    // 检查参数
    // 检查重复

    const model = {
        "name": name,
        "chain_id": network,
        "address": address,
        "abi": abi,
    }

    let id = await dbUtil.insert('abi', model);

    return _succeed(ctx, { id });
}


module.exports = {
    get,
    submit,
};