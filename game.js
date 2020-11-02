let game = function(){
    this.canvas         = null;
    this.context        = null;
    this.resource       = null;
    this.chickens       = [];
    this.eggs           = [];
    this.bar            = null;
    this.bowl           = null;
    this.resourceLoaded = false; // cái này kiểm tra tất cả ảnh đã tải xong chưa
    this.score          = 0;

    let self = this;

    this.init = function(){
        this.canvas        = document.createElement('canvas');
        this.canvas.width  = 900; // chiều rộng game
        this.canvas.height = 500; // chiều cao game
        this.context       = this.canvas.getContext('2d');
        this.canvas.style.marginLeft = "300px";

        this.canvas.style.marginTop = "10px";
        document.body.appendChild(this.canvas);

        // tạo tất cả các object
        this.resource = new resource(this);
        this.bar      = new bar(this);
        this.resource.load();
        this.chickens = [
            new chicken(this, 50, 25),
            new chicken(this, 150, 25),
            new chicken(this, 250, 25),
            new chicken(this, 350, 25),
            new chicken(this, 450, 25),
            new chicken(this, 550, 25),
            new chicken(this, 650, 25),
            new chicken(this, 750, 25),
        ];

        this.bowl = new bowl(this);
        this.bowl.init();

        setInterval(self.createNewEgg, 1000);

    }

    this.start = function(){
        this.loop();
    }

    this.loop = function(){
        self.update();
        self.draw();
        setTimeout(self.loop, 1); // 50 hình trên giây
    }

    this.update = function(){
        this.updateAllEggs();
    }

    this.updateAllEggs = function(){
        for (let i = 0; i < this.eggs.length; i++){
            this.eggs[i].update();
        }
    }

    this.draw = function(){
        // vẽ cái hình nền
        self.context.fillStyle = "#F0E68C";
        self.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (self.resourceLoaded == false){
            self.drawLoading();
        }
        else {
            self.drawTotal(); // vẽ thế giới =))
        }
    }

    // tạo quả trứng mới
    this.createNewEgg = function(){
        if (self.resourceLoaded){
            let newEgg = new egg(self);
            newEgg.init();
            self.eggs.push(newEgg); // cho vào mảng các quả trứng, đây này
        }
    }

    this.drawTotal = function(){
        self.drawScore();
        self.bar.draw();
        self.bowl.draw();
        self.drawAllEggs();
        self.drawAllChickens();
    }

    this.drawAllEggs = function(){
        // lặp qua từng quả trứng rồi vẽ nó
        for (let i = 0; i < this.eggs.length; i++){
            this.eggs[i].draw();
        }
    }

    // vẽ tất cả các con gà lên
    this.drawAllChickens = function(){
        for (let i = 0; i < this.chickens.length; i++){
            this.chickens[i].draw();
        }
    }

    // vẽ cái chữ loading
    this.drawLoading = function(){
        self.context.fillStyle = '#FF0000';
        self.context.font = '30px Arial';
        self.context.fillText('Loading...', 100, 100);
    }

    // vẽ điểm
    this.drawScore = function(){
        self.context.fillStyle = '#4B0082';
        self.context.font = '30px Arial';
        self.context.fillText('Your Score are: ' + this.score, 300, 450);

    }

}