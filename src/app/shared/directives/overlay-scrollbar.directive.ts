import { Directive, ElementRef, OnInit, NgZone, AfterViewInit, OnDestroy, HostBinding } from '@angular/core'
import * as OverlayScrollbars from 'overlayscrollbars'

@Directive({
  selector: '[appOverlayScrollbar]'
})
export class OverlayScrollbarDirective implements OnInit, AfterViewInit, OnDestroy {

  public instance: any

  constructor(public ref: ElementRef, public zone: NgZone) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      console.log('OverlayScrollbarDirective: ', this.ref.nativeElement)

      this.instance = OverlayScrollbars(this.ref.nativeElement, {
        className       : 'os-theme-minimal-dark os-theme-no-hover',
        // resize          : 'both',
        sizeAutoCapable : true,
        paddingAbsolute : true
      })

    })
  }

  ngOnDestroy() {
    if (this.instance) {
      this.instance.destroy()
    }
  }

}
