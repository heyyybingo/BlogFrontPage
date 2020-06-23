# mongoose

[mongoose npm地址](https://www.npmjs.com/package/mongoose)

[mongoose官方文档](https://mongoosejs.com/)

## 设计Schema发布model

```js
var mongoose=require('mongoose')

var Schema=mongoose.Schema


//连接数据库
//指定数据库不一定要存在，插入第一条数据会新建
mongoose.connect('mongodb://localost/***')

//设计集合结构（表结构）
//字段名称就是表结构的属性名称

//约束的目的是为了保证数据完整，没有脏数据
var userSchema=new Schema({
    username:{
        type:String,
        required:true//必须有
    }
     username:{
        type:String,
        required:true//必须有
    }
     email:{
                          type:String
     }
})


//将文档结构发布为模型
//第一个参数：表示数据表的名称
//mongoose会自动将大写名词的字符串生成小写的复数形式
//第二个参数，架构Schema
//返回之：模型构造函数
var User=mongoose.model('User',userSchema)


//对user集合进行增删该查操作
```

## 新增数据

```js
var admin = new User({
    username:'admin',
    password:'ss',
    emain:'admin@admin.com'
}
                     
admin.save(function(err,ret){
    if(err){
        console.log	('error')
    }else{
        console.log('success')
    }
})
```

## 查询数据

```js
//查询所有
User.find(function(err,ret){
    if(err){
        console.log('error')
    }else{
            console.log(ret)
        }
})

//条件查询,所有匹配
User.find({
    username:'zz'
},function(err,ret){
      if(err){
        console.log('error')
    }else{
            console.log(ret)
        }
})

////条件查询,第一条匹配
User.findOne({
    username:'zz'
},function(err,ret){
      if(err){
        console.log('error')
    }else{
            console.log(ret)
        }
})
```

## 删除数据

```js
//删除匹配的所有数据
User.remove({
	username:'zz'
},function(err,ret){
	 if(err){
        console.log('error')
    }else{
            console.log(ret)
        }
})

```

## 更新数据

```
User,findByIdAndUpdate('id',{
	password:'123'
},function(err,ret){
	 if(err){
        console.log('error')
    }else{
            console.log(ret)
        }
})
```

