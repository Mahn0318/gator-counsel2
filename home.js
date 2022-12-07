'use strict';

const { Controller } = require('egg');
const jsonfile = require('jsonfile')
const fs = require('fs')
const msg_file = 'data/message.json'

const user_file = 'data/user.json'


class HomeController extends Controller {
  
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }


  async register() {
    const { ctx,app } = this;
    // console.log(this.appInfo.baseDir)
    try{
    	
    	let body =ctx.request.body;
    	console.log(body);
    	let users = JSON.parse(fs.readFileSync(user_file))

    	if(users[body.username]){
    		ctx.body = {code:-1,msg:"ERROR : user already exists!"};
    		return
    	}

    	
    	users[body.username] = 
    	{
    		"pass"   : body.password,
  			"created": Date.now(),
    	}

    	fs.writeFileSync(user_file, JSON.stringify(users));

    	ctx.body = {code:0,msg:"register success!"};
    	return
    }catch(e){
    	console.log(e.stack)
    	ctx.body = {code:500,msg:"ERROR : server error !"}
    }
	
  }

  async login() {
    const { ctx,app } = this;
    // console.log(this.appInfo.baseDir)
    try{
    	
    	let body =ctx.request.body;
    	console.log(body);
    	let users = JSON.parse(fs.readFileSync(user_file));

    	if(!users[body.username]){
    		ctx.body = {code:-1,msg:"ERROR : user not exists!"};
    		return
    	}

    	if(users[body.username].pass != body.password){
    		ctx.body = {code:-2,msg:"password error !"};
    		return
    	}

   		// cookie
   		this.ctx.cookies.set('username',body.username,{
            maxAge:1000*60*60*24,
            signed:true,     //对cookie进行签名  防止用户修改cookie
            encrypt:true     //是否对cookie进行加密 如果cookie加密那么获取的时候要对cookie进行解密
        });

        // 注销 this.ctx.cookies.set('username',null);

    	ctx.body = {code:0,msg:"login success!"};
    	return
    }catch{
    	ctx.body = {code:500,msg:"ERROR : server error !"}
    }
	
  }

  async save_msg() {
    const { ctx,app } = this;
    // console.log(this.appInfo.baseDir)
    try{

    	 // 清除cookie  this.ctx.cookies.set('xx',null)  再进行重定向到指定页面
        let name=this.ctx.cookies.get('username',{
            // 对加密的cookie 必须设置
            encrypt:true 
        })

        if (!name) {
        	ctx.body = {code:-1,msg:"please login first!"};
    		return
        }

        console.log('22222 ::  ' + name)
    	
    	let body =ctx.request.body;
    	console.log(body);
    	let users = JSON.parse(fs.readFileSync(user_file));

    	if(!users[name]){
    		ctx.body = {code:-1,msg:"ERROR : user not exists!"};
    		return
    	}

    	let msgs = JSON.parse(fs.readFileSync(msg_file));

    	let new_msg = 
		{
			"author"  : name,
			"content" : body.msg,
			"created" : Date.now()
		}

		msgs.msgs.push(new_msg)
    	
    	fs.writeFileSync(msg_file, JSON.stringify(msgs));

   
    	ctx.body = {code:0,msg:"save message success!"};
    	return
    }catch(e){
    	console.log(e.stack)
    	ctx.body = {code:500,msg:"ERROR : server error !"}
    }
	
  }


  async all_msg() {
    const { ctx,app } = this;
    // console.log(this.appInfo.baseDir)
    try{

    	let msgs = JSON.parse(fs.readFileSync(msg_file));
    	ctx.body = {code:0,msg:"save message success!",data:msgs.msgs};
    	return
    }catch{
    	ctx.body = {code:500,msg:"ERROR : server error !",data:[]}
    }
	
  }


  async logout() {
    const { ctx,app } = this;
    // console.log(this.appInfo.baseDir)
    try{
    	
    	let body =ctx.request.body;
    	console.log(body);
        this.ctx.cookies.set('username',null);
    	ctx.body = {code:0,msg:"logout success!"};
    	return
    }catch{
    	ctx.body = {code:500,msg:"ERROR : server error !"}
    }
	
  }
  


}

module.exports = HomeController;
