function ProtobufUtil(){

}

ProtobufUtil.protoFunCache = {};

exports.getProtoClassByString = function(classStr){
    if(!classStr){
        return;
    }

    if(ProtobufUtil.protoFunCache[classStr]){
        return ProtobufUtil.protoFunCache[classStr]
    }

    var curScope = global;
    var nameArr = classStr.split('.');
    for(var i = 0;i < nameArr.length;i ++){
        curScope = curScope[nameArr[i]];
        if(!curScope){
            return null;
        }
    }
    ProtobufUtil.protoFunCache[classStr] = curScope;
    return curScope;
}