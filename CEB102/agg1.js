
var db = db.getSisterDB("ceb102");

var showCursorItems = function(cursor){
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

var findAllAndShow = function(coll_name){
    print('call findAll');
    var cursor = db[coll_name].find();
    showCursorItems(cursor);
}

var findOneAndShow = function(coll_name){
    printjson(db[coll_name].findOne());
}

findOneAndShow('usersNonIndex');

print('--------------------------');





// var cursor = db.usersNonIndex.aggregate([
//          {$match:{age:{$gte:60}}},
//          {$project:{"年紀":"$age","ID":"$_id", "大名":'$username',"唉":"$i","_id":0}},
//          {$project:{'N':'$大名','A':'$年紀',"唉":1}},       
//          {$limit:3}
//        ]
// )
// showCursorItems(cursor);

// var cursor = db.usersNonIndex.aggregate(
//     [
//         {$match:{age:15}},
//         {$limit:10},
//         {$project:{
//                    'N':'$username',
//                    'age':1,
//                    'add100Years':{$add:['$age',100,30]},
//                     _id:0
//                    }
//         }
//         ,
//         {$out: "out_coll_ceb102"}  //$out是把產生的結果寫到另一個out_coll_ceb102桶子
//      ]
// );
// showCursorItems(cursor);


//db.usersNonIndex.aggregate([{},{},{}])
var cursor = db.usersNonIndex.aggregate([
             {
               $group:{_id:'$age', count : { $sum : 1 }}
             }
        ,
             {$sort:{'_id':1}}
             // ,
             // {$project:{'age':'$_id',count:1,_id:0}}
             // ,
             // {$out: "group_result_ceb102"}
])
showCursorItems(cursor);




//printjson(db.ttl_coll.stats());
