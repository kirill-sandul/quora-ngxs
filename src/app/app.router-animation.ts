import { trigger, style, transition, animate } from '@angular/animations';

export const router_animation = trigger('router_animation', [
  transition('* <=> *', [
    style({ opacity: '0' }),
    animate('200ms', style({
      opacity: '1'
    }))
  ])
]);