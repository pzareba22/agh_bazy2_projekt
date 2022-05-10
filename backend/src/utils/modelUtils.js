const jsonFormatterPlugin = (schema) => {
    schema.set('toJSON', {
        getters: true,
        transform: (doc, ret) => {
            delete ret.__v;
            ret.id = ret._id.toString();
            delete ret._id;
        },
    });
};

module.exports = {
    jsonFormatterPlugin
}