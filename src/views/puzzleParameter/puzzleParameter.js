class PuzzleParameter{

    constructor(width = 310 , height = 200, sliderHeight =40 , el = document.body , text = '向右滑动填充拼图'){
        // 画布宽度
        this.width = width
        // 画布高度
        this.height = height
        // 滑块边长
        this.sliderL = width / 6
        this.sliderHeight = sliderHeight
         // 滑块半径
        this.r = 12
        //滑块真实边长
        this.sliderW = this.sliderL + this.r * 2 + 3
        //滑条提示文字
        this.text = text
        //dom元素
        el.style.position = el.style.position || 'relative'
        this.el = el
        this.PI = Math.PI
    }

    init(){
        //画布
        const fillCanvas = this.createCanvas()
        const clipCanvas = fillCanvas.cloneNode(true) 
        const slider = this.createElement('div' , 'slider')
        const sphere = this.createElement('div' , 'block')
        const el = this.el
        clipCanvas.className = 'carbon'
        slider.style.top = this.height + 12
        slider.style.left =  this.r
        slider.style.width = this.width - 2 * this.r
        slider.style.height = this.sliderHeight
        slider.style.borderRadius = this.sliderHeight + 'px'
        slider.innerHTML = this.text

        sphere.style.width = this.sliderHeight + 6
        sphere.style.borderRadius = (this.sliderHeight + 6) + 'px'
        sphere.style.height = this.sliderHeight + 6
        sphere.style.left =  0

        el.appendChild(fillCanvas)
        el.appendChild(clipCanvas)
        el.appendChild(slider)
        slider.appendChild(sphere)

        Object.assign(this , {
            fillCanvas,
            clipCanvas,
            slider,
            sphere,
            fillCanvasCtx: fillCanvas.getContext('2d'),
            clipCanvasCtx: clipCanvas.getContext('2d'),
        })
        
      
        this.initImg()
        this.bindEvents()
    }

    getRandomNumber(x , y , z){
        return Math.round(Math.random() * (x - y) + z)
    }

    getRandomNumberByRange (start, end) {
        return Math.round(Math.random() * (end - start) + start)
    }

    createImg(onload){
       
        let img = document.createElement('img')
      
        
        img.onload = onload
        img.crossOrigin='anonymous'
        img.onerror = () => {
            img.src = 'https://picsum.photos/'+ this.width + '/' + this.height+ '/?image=' + this.getRandomNumberByRange(0, 1084)
        }
        img.src = 'https://picsum.photos/'+ this.width + '/' + this.height+ '/?image=' + this.getRandomNumberByRange(0, 1084)
        return img
    }

    initImg(){
        const img = this.createImg(() => {
            this.createSlider()
            this.fillCanvasCtx.drawImage(img , 0 , 0 , this.width , this.height)
            this.clipCanvasCtx.drawImage(img , 0 , 0 , this.width , this.height)
            const ImageData = this.clipCanvasCtx.getImageData(this.x , this.y - 2 * this.r , this.sliderW - 3 , this.sliderW)
            this.clipCanvas.width = this.sliderW
            this.clipCanvasCtx.putImageData(ImageData , 0 , this.y - 2 * this.r)
           
        })
        this.img = img
    }

    createCanvas(){
        let canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        return canvas
    }

    createSlider(){
        this.x = this.getRandomNumber(this.width , 2 * this.sliderW , this.sliderW)
        this.y = this.getRandomNumber(this.height , this.sliderW , 2 * this.r - 3)
        this.draw(this.fillCanvasCtx , this.x , this.y , 'fill')
        this.draw(this.clipCanvasCtx , this.x , this.y , 'clip')
    }

    createElement(element , name){
        let dom = document.createElement(element)
        dom.className = name
        return dom
    }

    draw(ctx , x , y , operation){
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.arc(x + this.sliderL / 2 , y - this.r + 3, this.r , 0.72 * this.PI , 0.28 * this.PI)
        ctx.lineTo(x + this.sliderL , y)
        ctx.arc(x + this.sliderL + this.r - 3 , y + this.sliderL / 2 , this.r , 1.28 * this.PI , 0.72 * this.PI)
        ctx.lineTo(x + this.sliderL , y + this.sliderL)
        ctx.lineTo(x , y + this.sliderL)
        ctx.arc(x + this.r - 3 ,  y + this.sliderL / 2 , this.r , 2.76 * this.PI , 1.24 * this.PI , true)
        ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.stroke()
        ctx[operation]()
        ctx.globalCompositeOperation = 'overlay'
    }

    bindEvents() {
        let isMouseDown = false,
            startX,
            startY

        const sphereStart = e =>{
            startX = e.clientX
            startY = e.clientY
            isMouseDown = true
        }

        const sphereMove = e =>{
            if(!isMouseDown) {
                return false
            }
            const eventX = e.clientX
            const eventY = e.clientY
            const moveX = eventX - startX
            const moveY = eventX - startY

            if(moveX < 0 || moveX + this.sliderHeight + 9 > this.width - 2 * this.r) {
                return false
            }
            this.sphere.style.left = moveX
            this.clipCanvas.style.left = moveX
        }

        const sphereEnd = e =>{
            isMouseDown = false
            const endX = e.clientX
            const moveX = endX - startX
            console.log(this.x - moveX)
            if(-3 < this.x - moveX && this.x - moveX < 3){
                console.log('验证成功')
            }else{
                setTimeout(() => {
                    this.sphere.style.left = 0
                    this.clipCanvas.style.left = 0
                } , 1000)
            }
        }

        this.sphere.addEventListener('mousedown', sphereStart)
        document.addEventListener('mousemove', sphereMove)
        document.addEventListener('mouseup', sphereEnd)
    }

}

function puzzleParameter(data){
    return new PuzzleParameter(data)
}

export default puzzleParameter