import Joi from 'joi';

export const adminLoginReq = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
}).required();

export const updateAuthorizationReq = Joi.object({
    authorized: Joi.required(),
    userId: Joi.required()
}).required();

export const addUserReq = Joi.object({
    userId: Joi.required()
}).required()

export const mapClientReq = Joi.object({
    userId: Joi.required(),
    accoid: Joi.required()
}).required()

export const insertIntoTrDailyPublishReq = Joi.object({
    Tender_No: Joi.required(),
    Tender_Date: Joi.required(),
    season: Joi.required(),
    Grade: Joi.required(),
    Quantal: Joi.required(),
    Lifting_Date: Joi.required(),
    Purc_Rate: Joi.required(),
    Mill_Rate: Joi.required(),
    mc: Joi.required(),
    pt: Joi.required(),
    itemcode: Joi.required(),
    ic: Joi.required(),
    tenderid: Joi.required(),
    td: Joi.required(),
    unit: Joi.allow(...['Q', 'M', 'L']).required(),
    sale_rate: Joi.required(),
    publish_quantal: Joi.required(),
    multiple_of: Joi.required(),
    auto_confirm: Joi.allow(...['Y', 'N']).required(),
    Tender_Do: Joi.required(),
    type: Joi.allow(...['F', 'P']).required(),
    Mill_Code: Joi.required(),
    Payment_To: Joi.required()
}).required()

export const stopSingleTradeReq = Joi.object({
    tenderid: Joi.required()
}).required()