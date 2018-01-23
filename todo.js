// todo.js
const { status, json } = require('server/reply');
const Todo = require('./model');

exports.read = async (ctx) => {
  return Todo.find().sort('done').lean().exec();
};
exports.create = async (ctx) => {
  let item = new Todo({ text: ctx.data.text });
  return status(201).json(await item.save());
};
exports.update = async (ctx) => {
  await Todo.findByIdAndUpdate(ctx.params.id, { $set: { done: ctx.data.done } }).exec();
  return Todo.find().sort('done').lean().exec();
};
exports.delete = async (ctx) => {
  return Todo.findByIdAndRemove(ctx.params.id).exec();
};
