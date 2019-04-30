'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.helper.success(this.ctx, 'hi, egg');
  }
}

module.exports = HomeController;
