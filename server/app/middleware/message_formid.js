'use strict';


module.exports = () => {
    return async function (ctx, next) {
        const method = ctx.method.toLowerCase();
        let form_id = '';
        if (method === 'get') {
            form_id = ctx.query.form_id;
            // console.log('get formid' + form_id);
            delete ctx.query.form_id;
        } else {
            form_id = ctx.request.body.form_id;
            // console.log('post formid' + form_id);
            delete ctx.request.body.form_id;
        }
        if (form_id && form_id !== '' && form_id !== 'the formId is a mock one') {
            const user = ctx.state.user.data._id;
            const expirationTime = new Date(new Date().setDate(new Date().getDate() + 7));
            ctx.model.Miniformid.create({
                user,
                formid: form_id,
                expirationTime
            });
        }
        await next();
    };
};
