import {
    trigger,
    style,
    animate,
    transition,
    query,
    sequence,
    group,
    animation
  } from '@angular/animations';

export const settingsEnter = animation([
    query('.settings', style({ opacity: 0, transform: 'scale(0)' })),
    query('.settings', 
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
        style({ opacity: 1, transform: 'none' }))
    )
])

export const settingsLeave = animation([
    // query('.settings', style({ opacity: 1 })),
    // query('.settings', 
    //   animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
    //     style({ opacity: 0 }))
    // )
])

