/**
 * Created by Administrator on 2020/7/6 0006.
 */
import {
  Directive,  // 创建一个指令必须依赖这个装饰器
  ElementRef, // 获取原生dom的
  Input, // 接收外部数据的
  Renderer2, // 渲染相关的(v4+)，angular2.x 用的是Renderer(v4里面依旧标记不赞成deprecate),两者大同小异，具体看手册API的变动
  HostListener, // 监听事件
} from '@angular/core';

@Directive({
  selector: '[dragsortbeauty]',
})
export class dragsortinstruct {

  public div: HTMLDivElement;
  // 判断是否按下鼠标
  isDown = false;

  constructor(
    private el: ElementRef,
    private r2: Renderer2
  ) {
  }

  CheckContentType(src,x,y) {
    this.div = this.r2.createElement('div');
    // 往当前指令绑定的元素添加一个div的子元素
    this.r2.appendChild(this.el.nativeElement, this.div);
    // 设置div相关的样式
    this.r2.setStyle(this.div, 'position', 'fixed');
    this.r2.setStyle(this.div, 'width', '160px');
    this.r2.setStyle(this.div, 'height', '160px');
    this.r2.setStyle(this.div, 'top', (y-100)+'px');
    this.r2.setStyle(this.div, 'left', (x-100)+'px');
    this.r2.setStyle(this.div, 'background-image', 'url("'+src+'")');
    this.r2.setStyle(this.div, 'background-size', '100% 100%');
    this.r2.setStyle(this.div, 'background-position', 'center');
    this.r2.setStyle(this.div, 'display', 'block');
    this.r2.setStyle(this.div, 'pointer-events', 'none');
    this.r2.setStyle(this.div, 'opacity', '.5');
    this.r2.addClass(this.div, 'createHoverDiv');

  }

  // 鼠标按下事件
  @HostListener('mousedown', ['$event']) onMousedown(btn: any) {
    let x = btn.x;
    let y = btn.y;
    // 如果鼠标按下位置是图片位置  创建元素
    console.log(btn.target.classList);
    console.log(btn.target.classList);
    if (btn.target.classList[0] === 'dsimg') {
      this.CheckContentType(btn.target.currentSrc,x,y);
      this.isDown = true
    }
  }
  // 鼠标移动事件
  @HostListener('mousemove', ['$event']) onMousemove(btn: any){
    //判断该元素是否被点击了
    if(this.isDown) {
      console.log(btn);
      // 鼠标移动时创建的元素移动
      this.r2.setStyle(this.div, 'top', (btn.y-100)+'px');
      this.r2.setStyle(this.div, 'left', (btn.x-100)+'px');
    }
  }
  @HostListener('document:mouseup', ['$event']) onMouseup(btn: any) { // 鼠标抬起事件
    // 鼠标抬起时删除添加的元素
    if(this.isDown){
      this.isDown = false;
      this.r2.removeChild(this.el.nativeElement, this.div);
    }
  }
}