function ChessCache(){
    this.allPlayerInfo = [];
}

module.exports = ChessCache;

ChessCache.prototype.pushPlayer = function(player){
    this.allPlayerInfo.push(player);
}

ChessCache.prototype.removerPlayer = function(playerId){
    for(var i = 0;i < this.allPlayerInfo.length;i ++){
        if(this.allPlayerInfo[i].getPlayerid() == playerId){
            this.allPlayerInfo.splice(i,1);
            break;
        }
    }
    console.log(this.allPlayerInfo.length);
}