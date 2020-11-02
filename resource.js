let gameImage = function(name){
    this.img = null; // đây là ảnh thật, cái name ở trên là tên file thôi
    this.name = name;
    this.loaded = false; // trạng thái load ảnh xong hay chưa, tạm thời là false;
    let self = this;
    this.load = function(){
        this.img = new Image();
        this.img.onload = function(){
            self.loaded = true; // load xong ảnh thì đặt lại là true
        }
        this.img.src = 'Picture/' + name + '.png'; // tất cả ảnh là png hết nhé
    }
}
let resource = function(game) {
    this.game       = game;
    this.bar        = new gameImage('bar'); // là cái thanh cho gà đậu
    this.bowl       = new gameImage('bowl'); // là cái bát hứng trứng
    this.chicken    = new gameImage('chicken');
    this.egg1       = new gameImage('egg1'); // có 2 loại trứng
    this.egg2       = new gameImage('egg2'); // có 2 loại trứng
    this.egg3       = new gameImage('egg3');
    let self = this;
    // giờ thì load tất cả hình ảnh nào
    this.load = function(){
        this.bar.load();
        this.bowl.load();
        this.chicken.load();
        this.egg1.load();
        this.egg2.load();
        this.egg3.load();
        setInterval(function(){
            self.checkAllImageLoaded(); // cứ nửa giây, kiểm tra xem tất cả ảnh đã load xong chưa
        }, 500)
    }
    this.checkAllImageLoaded = function(){
        // nếu tất cả ảnh đã load xong
        if (
            (this.bar.loaded) &&
            (this.bowl.loaded) &&
            (this.chicken.loaded) &&
            (this.egg1.loaded) &&
            (this.egg2.loaded) &&
            (this.egg3.loaded)
        ){
            this.game.resourceLoaded = true;
        }
    }
}