<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>mygame</title>
    <script src="my$js.js"></script>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        #mycanvas{
            /* border: solid 1px black; */
            background-image: url("fly_images/background.jpg");
        }
        div{
            margin-left: auto;
            margin-right: auto;
            /* border: solid 1px black; */
            text-align: center;
            margin-top: 30px;
        }
        button{
            width: 100%;
            height: 30px;
        }
    </style>
    <script>
        var butt_ = false;
        var fx_ = "right";
        window.onload = function(){
            //舞台
            my$("button").onclick = function(){
                butt_ = true;
            }
            var stage = function(canvas,color){
                var stage_this = this;
                var canvas = canvas;
                var scene = null;
                var color = color;
                var backY = 0;
                var elf_ = elf;
                var canvas_k = canvas.getContext("2d");
                if(color)canvas_k.fillStyle=color;
                else
                    canvas_k.fillStyle="black";

                this.add = function(sce){
                    scene = sce;
                }
                this.circulation = function(){
                    if(scene == null)return;
                    
                    scene.circulation();
                    this.move();
                    this.draw();
                    if(butt_)
                        this.addBullet();
                }
                this.move = function(){
                var elf = scene.elf;
                    for(var i in elf){
                        if(fx_ == "right")
                            elf[0].x+=10;
                        else if(fx_ == "left")
                        elf[0].x-=10;
                        // if(elf[0].left)elf[0].x-=10;
                        // if(elf[0].right)elf[0].x+=10;
                        // if(elf[0].up)elf[0].y-=10;
                        // if(elf[0].down)elf[0].y+=10;

                        if(elf[0].x<=0){elf[0].x = 0;fx_="right"}
                        if(elf[0].x>=my$("mycanvas").width - elf[0].w){
                        elf[0].x = my$("mycanvas").width - elf[0].w;
                        fx_ = "left";
                    }
                        // if(elf[0].y<0)elf[0].y = 0;
                        // if(elf[0].y>my$("mycanvas").height - elf[0].h)elf[0].y = my$("mycanvas").height - elf[0].h;
                    }
                }
                this.addBullet = function(){
                    var elf = scene.elf;
                    var bullet1 = new bullet(elf[0].x+34.5,elf[0].y-20,7,18,"fly_images/bullet1.png");
                    elf[0].add(bullet1);
                }

                this.draw = function(x,y,w,h,src){
                    var bullet = bullet;
                    var elf = scene.elf;
                    canvas_k.clearRect(0,0,500,700);
                        for(var i in scene.elf){
                            if(elf[i].src){
                                var img = new Image();
                                img.src = elf[i].src;
                                canvas_k.drawImage(img,  elf[i].x,  elf[i].y,  elf[i].w,  elf[i].h);
                            }
                            else  canvas_k.fillRect(elf[i].x,  elf[i].y,  elf[i].w,  elf[i].h);
                        }
                        
                    for(var i in elf[0].bullet){ 
                         var img = new Image();
                         img.src = elf[0].bullet[0].src;
                         canvas_k.drawImage(img,  elf[0].bullet[i].x,  elf[0].bullet[i].y,  elf[0].bullet[i].w,  elf[0].bullet[i].h);
                         canvas_k.drawImage(img,  elf[0].bullet[i].xx,  elf[0].bullet[i].yy,  elf[0].bullet[i].w,  elf[0].bullet[i].h);
                         elf[0].bullet[i].y -= 25;
                         elf[0].bullet[i].yy -= 25;

                         if(elf[0].bullet[i].y < 0){
                            //  for(var i=0;i<elf[0].bullet.length-1;i++){
                            //      elf[0].bullet[i] = elf[0].bullet[i+1];
                            //      delete elf[0].bullet[ elf[0].bullet.length-1 ];
                            //  }
                         }
                    }
                }

                setInterval(function(){
                    stage_this.circulation();
                    my$("mycanvas").style.backgroundPositionY = backY++ + 'px';
                },1000/60)
            }
            
            //场景
            var scene = function(){
                this.elf = [];

                this.add = function(elf){
                    this.elf[this.elf.length] = elf;
                }
                this.circulation = function(){
                    for(var i in this.elf)this.elf[i].circulation();
                }
            }

            //精灵
            var elf = function(x,y,w,h,src){
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.left = false;
                this.right = false;
                this.up = false;
                this.down = false;
                this.src = src;
                this.bullet = [];

                this.add = function(e){
                    this.bullet[this.bullet.length] = e;
                }
                this.circulation = function(){
                    
                }
            }
            var bullet = function(x,y,w,h,src){
                this.x = x;
                this.y = y;
                this.xx = x+30;
                this.yy = y;
                this.w = w;
                this.h = h;
                this.src = src;
            }
            
            var wt = new stage(my$("mycanvas"));
            var sce = new scene();
            var my = new elf(192,600,110,80,"fly_images/my1.png");

            sce.add(my);
            wt.add(sce);

            document.onkeydown=function(e){
            //var e=arguments[0]||window.event;
                e=e||window.event;
                switch(e.keyCode){
                            case 37: my.left = true;break;//37 左移
                            case 38: my.up = true;break;// 上键R转
                            case 39: my.right = true;break;//39 右移
                            case 40: my.down = true;break;//40 下移
                           // case 67: me.state==me.PAUSE&&me.myContinue();break;// C键继续
                            //case 80: me.state==me.RUNNING&&me.pause();break;// P键暂停
                            //case 81: me.gameOver();break;// 结束游戏
                        }
                };
                document.onkeyup=function(e){
            //var e=arguments[0]||window.event;
                e=e||window.event;
                switch(e.keyCode){
                            case 37: my.left = false;break;//37 左移
                            case 38: my.up = false;break;// 上键R转
                            case 39: my.right = false;break;//39 右移
                            case 40: my.down = false;break;//40 下移
                           // case 67: me.state==me.PAUSE&&me.myContinue();break;// C键继续
                            //case 80: me.state==me.RUNNING&&me.pause();break;// P键暂停
                            //case 81: me.gameOver();break;// 结束游戏
                        }
                };
        }
    </script>
</head>
<body>
    <div>
        <canvas id="mycanvas" width="500" height="700">
                Your browser does not support the canvas element.
        </canvas>
        <button id="button">开始</button>
    </div>
</body>
</html>
