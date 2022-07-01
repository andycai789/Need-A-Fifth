import {
    trigger,
    style,
    animate,
    transition,
    query,
    sequence,
    group,
    animation,
    stagger
  } from '@angular/animations';

export const valuesEnter = animation([
    query('.statement', [
        style({opacity: 0, transform: 'translateY(-300px)' })
    ]),
    query('.bubble', [
        style({opacity: 0, transform: 'translate(0px, -300px)' })
    ]),
    query('.divider', [
        style({opacity: 0, width: '0px'})
    ]),

    group([
        query('.statement', stagger(300, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'none' }))
        ])),
        query('.bubble', stagger(30, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'none' }))
        ])),
    ]),
    query('.divider', stagger(100, [
        animate('700ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, width: "70%"}))
    ]))
])

export const valuesLeave = animation([
    style({opacity: 0, transform: 'scale(1)' }),
    animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
    style({ opacity: 1, transform: 'scale(0)' }))
])

