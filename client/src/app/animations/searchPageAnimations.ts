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

export const searchEnter = animation([
    query('.left', style({opacity: 0, transform: 'translateY(-800px)' })),
    query('.right', style({opacity: 0, transform: 'translateY(800px)' })),
    query('h2', style({opacity: 0, transform: 'scale(0)' })),

    sequence([
      group([
        query('.right', 
          animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
            style({ opacity: 1, transform: 'none' }))),

        query('.left', 
          animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
            style({ opacity: 1, transform: 'none' }))),
      ]),
      query('h2', 
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ),
    ])
])

export const searchLeave = animation([
    query('.left', style({opacity: 1})),
    query('.right', style({opacity: 1})),
    
    group([
        query('.right', 
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
            style({ opacity: 0, transform: 'translateX(800px)' }))),

        query('.left', 
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
            style({ opacity: 0, transform: 'translateX(-800px)' }))),

    ])
]);





// transition('searchPage => *', [
//     query('.left', style({opacity: 1})),
//     query('.right', style({opacity: 1})),

//     group([
//       query('.right', 
//         animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
//           style({ opacity: 0, transform: 'translateX(800px)' }))),

//       query('.left', 
//         animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
//           style({ opacity: 0, transform: 'translateX(-800px)' }))),
//     ])
//   ]),